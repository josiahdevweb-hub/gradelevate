import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import styles from "@/styles/admin.module.css";

interface FollowUp {
  id: string;
  scheduledDate: string;
  notes: string;
  status: "pending" | "done" | "cancelled";
  addedAt: string;
  completedAt?: string;
}

interface EmailLog {
  id: string;
  subject: string;
  type: string;
  sentAt: string;
  status: "sent" | "failed";
}

interface Booking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service: string;
  stage: string;
  message?: string;
  status: string;
  submittedAt: string;
  emails?: EmailLog[];
  followUps?: FollowUp[];
}

const EMAIL_TYPES: Record<string, { label: string; color: string; bg: string }> = {
  booking_confirmation: { label: "Booking Confirmation", color: "#10b981", bg: "rgba(16,185,129,0.1)" },
  admin_notification: { label: "Admin Notification", color: "#3b82f6", bg: "rgba(59,130,246,0.1)" },
};

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function fuStatusInfo(fu: FollowUp) {
  if (fu.status === "done") return { label: "Done", color: "#10b981", bg: "rgba(16,185,129,0.1)" };
  if (fu.status === "cancelled") return { label: "Cancelled", color: "#6b7280", bg: "rgba(107,114,128,0.1)" };
  if (new Date(fu.scheduledDate) < new Date()) return { label: "Overdue", color: "#ef4444", bg: "rgba(239,68,68,0.1)" };
  return { label: "Pending", color: "#f59e0b", bg: "rgba(245,158,11,0.1)" };
}

export default function BookingProfile() {
  const router = useRouter();
  const { id } = router.query;
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFUModal, setShowFUModal] = useState(false);
  const [fuForm, setFuForm] = useState({ scheduledDate: "", notes: "" });
  const [saving, setSaving] = useState(false);
  const [resending, setResending] = useState<string | null>(null);

  const loadBooking = useCallback(async () => {
    if (!id) return;
    const data: Booking[] = await fetch("/api/bookings").then((r) => r.json());
    setBooking(data.find((b) => b.id === id) ?? null);
    setLoading(false);
  }, [id]);

  useEffect(() => { loadBooking(); }, [loadBooking]);

  const updateStatus = async (status: string) => {
    if (!booking) return;
    await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: booking.id, status }),
    });
    setBooking((b) => b ? { ...b, status } : b);
  };

  const addFollowUp = async () => {
    if (!booking || !fuForm.scheduledDate || saving) return;
    setSaving(true);
    const res = await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: booking.id, addFollowUp: { ...fuForm, status: "pending" } }),
    });
    const updated = await res.json();
    setBooking(updated);
    setShowFUModal(false);
    setFuForm({ scheduledDate: "", notes: "" });
    setSaving(false);
  };

  const markFUDone = async (fuId: string) => {
    if (!booking) return;
    const res = await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: booking.id, updateFollowUp: { id: fuId, status: "done", completedAt: new Date().toISOString() } }),
    });
    const updated = await res.json();
    setBooking(updated);
  };

  const resendEmail = async (type: string) => {
    if (!booking || resending) return;
    setResending(type);
    await fetch("/api/resend-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId: booking.id, type }),
    });
    await loadBooking();
    setResending(null);
  };

  if (loading) return (
    <>
      <Head><title>Loading — GradElevate Admin</title></Head>
      <AdminLayout title="Client Profile"><div className={styles.emptyState}>Loading…</div></AdminLayout>
    </>
  );

  if (!booking) return (
    <>
      <Head><title>Not Found — GradElevate Admin</title></Head>
      <AdminLayout title="Client Profile">
        <div className={styles.emptyState}>
          Booking not found. <Link href="/admin/bookings" style={{ color: "#C9A227" }}>Back to bookings</Link>
        </div>
      </AdminLayout>
    </>
  );

  const emailGroups = (booking.emails || []).reduce<Record<string, EmailLog[]>>((acc, em) => {
    (acc[em.type] = acc[em.type] || []).push(em);
    return acc;
  }, {});

  const statusColors: Record<string, { bg: string; color: string }> = {
    New: { bg: "rgba(201,162,39,0.12)", color: "#8a6c10" },
    Contacted: { bg: "rgba(59,130,246,0.12)", color: "#1d4ed8" },
    Completed: { bg: "rgba(16,185,129,0.12)", color: "#065f46" },
  };
  const sc = statusColors[booking.status] || { bg: "#f4f6fa", color: "#5a6a80" };

  return (
    <>
      <Head><title>{booking.name} — GradElevate Admin</title></Head>
      <AdminLayout title="Client Profile">

        {/* Back nav */}
        <Link href="/admin/bookings" className={styles.profileBackLink}>
          <svg width="13" height="13" fill="none" viewBox="0 0 14 14">
            <path d="M9 1L3 7l6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Bookings
        </Link>

        {/* Client header */}
        <div className={styles.profileHeader}>
          <div className={styles.profileHeaderLeft}>
            <div className={styles.profileAvatar}>{initials(booking.name)}</div>
            <div>
              <h1 className={styles.profileName}>{booking.name}</h1>
              <div className={styles.profileMeta}>
                <a href={`mailto:${booking.email}`} className={styles.profileMetaLink}>{booking.email}</a>
                {booking.phone && <><span className={styles.profileMetaDot}>·</span><span>{booking.phone}</span></>}
              </div>
            </div>
          </div>
          <div className={styles.profileHeaderRight}>
            <span className={styles.badge} style={{ background: sc.bg, color: sc.color, fontSize: "0.82rem", padding: "5px 14px" }}>
              {booking.status}
            </span>
            <a href={`mailto:${booking.email}`} className={styles.btnPrimary} style={{ textDecoration: "none" }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 14 14">
                <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M1 4l6 5 6-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
              Email Client
            </a>
          </div>
        </div>

        {/* Two-column layout */}
        <div className={styles.profileGrid}>

          {/* LEFT: comms + follow-ups */}
          <div className={styles.profileMain}>

            {/* Communications History */}
            <div className={styles.profileCard}>
              <div className={styles.profileCardHeader}>
                <div className={styles.profileCardTitle}>
                  <svg width="15" height="15" fill="none" viewBox="0 0 14 14">
                    <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M1 4l6 5 6-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                  Communications History
                </div>
                {(booking.emails || []).length > 0 && (
                  <span className={styles.emailPill}>{(booking.emails || []).length} emails</span>
                )}
              </div>

              {/* Type summary cards */}
              {Object.keys(emailGroups).length > 0 && (
                <div className={styles.commCards}>
                  {Object.entries(emailGroups).map(([type, emails]) => {
                    const cfg = EMAIL_TYPES[type] || { label: type, color: "#9aaab8", bg: "#f4f6fa" };
                    const lastSent = emails[emails.length - 1]?.sentAt;
                    return (
                      <div key={type} className={styles.commCard} style={{ borderColor: cfg.color }}>
                        <div className={styles.commCardIcon} style={{ color: cfg.color, background: cfg.bg }}>
                          <svg width="17" height="17" fill="none" viewBox="0 0 14 14">
                            <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                            <path d="M1 4l6 5 6-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                          </svg>
                        </div>
                        <div className={styles.commCardLabel}>{cfg.label}</div>
                        <div className={styles.commCardCount}>{emails.length}x</div>
                        <div className={styles.commCardDate}>
                          {lastSent ? new Date(lastSent).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "—"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Quick Resend */}
              <div className={styles.quickResend}>
                <div className={styles.quickResendLabel}>
                  <svg width="12" height="12" fill="none" viewBox="0 0 14 14">
                    <path d="M13 1L1 5.5l5 1.5 1.5 5L13 1z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
                  </svg>
                  Quick Resend
                </div>
                <div className={styles.quickResendBtns}>
                  {Object.entries(EMAIL_TYPES).map(([type, cfg]) => (
                    <button
                      key={type}
                      className={styles.resendBtn}
                      style={{ borderColor: cfg.color, color: cfg.color }}
                      onClick={() => resendEmail(type)}
                      disabled={resending !== null}
                    >
                      <svg width="11" height="11" fill="none" viewBox="0 0 14 14">
                        <path d="M12 7A5 5 0 112 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        <path d="M12 3v4H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {resending === type ? "Sending…" : cfg.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Email table */}
              {(booking.emails || []).length === 0 ? (
                <div className={styles.emptyStateMini}>
                  <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                    <rect x="3" y="7" width="22" height="16" rx="2" stroke="#d0d8e4" strokeWidth="1.5"/>
                    <path d="M3 9l11 9 11-9" stroke="#d0d8e4" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                  <p>No emails sent yet for this booking.</p>
                </div>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th style={{ width: 32 }}>#</th>
                        <th>Type</th>
                        <th>Subject</th>
                        <th>Recipient</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th style={{ width: 48 }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(booking.emails || []).map((em, i) => {
                        const cfg = EMAIL_TYPES[em.type] || { label: em.type, color: "#9aaab8", bg: "#f4f6fa" };
                        return (
                          <tr key={em.id}>
                            <td className={styles.tdMuted}>{i + 1}</td>
                            <td>
                              <span className={styles.typeBadge} style={{ background: cfg.bg, color: cfg.color }}>
                                {cfg.label}
                              </span>
                            </td>
                            <td style={{ fontSize: "0.8rem", color: "#2a3a4a", maxWidth: 160 }}>
                              <span title={em.subject}>{em.subject.length > 38 ? em.subject.slice(0, 38) + "…" : em.subject}</span>
                            </td>
                            <td className={styles.tdMuted}>
                              <div style={{ fontSize: "0.78rem" }}>{booking.email}</div>
                              <div style={{ fontSize: "0.7rem", color: "#b0bece" }}>{booking.name}</div>
                            </td>
                            <td>
                              <span className={em.status === "sent" ? styles.emailLogStatusSent : styles.emailLogStatusFailed}>
                                {em.status === "sent" ? "✓ Sent" : "✗ Failed"}
                              </span>
                            </td>
                            <td className={styles.tdMuted}>
                              <div style={{ fontSize: "0.78rem" }}>{new Date(em.sentAt).toLocaleDateString("en-GB")}</div>
                              <div style={{ fontSize: "0.7rem", color: "#b0bece" }}>
                                {new Date(em.sentAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                              </div>
                            </td>
                            <td>
                              <button
                                className={styles.iconBtn}
                                title="Resend this email"
                                onClick={() => resendEmail(em.type)}
                                disabled={resending !== null}
                              >
                                <svg width="13" height="13" fill="none" viewBox="0 0 14 14">
                                  <path d="M12 7A5 5 0 112 7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                                  <path d="M12 3v4H8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Follow-up History */}
            <div className={styles.profileCard}>
              <div className={styles.profileCardHeader}>
                <div className={styles.profileCardTitle}>
                  <svg width="15" height="15" fill="none" viewBox="0 0 14 14">
                    <circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M7 4v3.5l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Follow-up History
                  {(booking.followUps || []).length > 0 && (
                    <span className={styles.emailPill} style={{ background: "rgba(59,130,246,0.1)", color: "#1d4ed8" }}>
                      {(booking.followUps || []).length}
                    </span>
                  )}
                </div>
                <button className={styles.btnPrimary} style={{ fontSize: "0.78rem" }} onClick={() => setShowFUModal(true)}>
                  + Add Follow-up
                </button>
              </div>

              {(booking.followUps || []).length === 0 ? (
                <div className={styles.emptyStateMini}>
                  <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                    <circle cx="14" cy="14" r="11" stroke="#d0d8e4" strokeWidth="1.5"/>
                    <path d="M14 9v5.5l3 3" stroke="#d0d8e4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p>No follow-ups scheduled yet. Add one to stay on track with this client.</p>
                </div>
              ) : (
                <div className={styles.tableWrap}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th style={{ width: 32 }}>#</th>
                        <th>Scheduled Date</th>
                        <th>Notes</th>
                        <th>Status</th>
                        <th>Added</th>
                        <th style={{ width: 64 }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(booking.followUps || []).map((fu, i) => {
                        const st = fuStatusInfo(fu);
                        return (
                          <tr key={fu.id}>
                            <td className={styles.tdMuted}>{i + 1}</td>
                            <td className={styles.tdBold} style={{ fontWeight: 600 }}>
                              {new Date(fu.scheduledDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                              <div style={{ fontSize: "0.7rem", color: "#9aaab8", fontWeight: 400 }}>
                                {new Date(fu.scheduledDate).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                              </div>
                            </td>
                            <td className={styles.tdMuted} style={{ maxWidth: 220 }}>{fu.notes || "—"}</td>
                            <td>
                              <span className={styles.typeBadge} style={{ background: st.bg, color: st.color }}>
                                {st.label}
                              </span>
                            </td>
                            <td className={styles.tdMuted} style={{ fontSize: "0.72rem" }}>
                              {new Date(fu.addedAt).toLocaleDateString("en-GB")}
                            </td>
                            <td>
                              {fu.status === "pending" && (
                                <button
                                  className={styles.iconBtn}
                                  title="Mark as done"
                                  onClick={() => markFUDone(fu.id)}
                                >
                                  <svg width="13" height="13" fill="none" viewBox="0 0 14 14">
                                    <path d="M2 7l4 4 6-7" stroke="#10b981" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                                  </svg>
                                </button>
                              )}
                              {fu.status === "done" && fu.completedAt && (
                                <span style={{ fontSize: "0.7rem", color: "#10b981" }}>
                                  {new Date(fu.completedAt).toLocaleDateString("en-GB")}
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: booking details sidebar */}
          <div className={styles.profileSidebar}>
            <div className={styles.profileCard}>
              <div className={styles.profileCardHeader}>
                <div className={styles.profileCardTitle}>Booking Details</div>
              </div>
              <div className={styles.sidebarField}>
                <span className={styles.sidebarFieldLabel}>Service</span>
                <span className={styles.sidebarFieldValue}>{booking.service || "—"}</span>
              </div>
              <div className={styles.sidebarField}>
                <span className={styles.sidebarFieldLabel}>Stage</span>
                <span className={styles.sidebarFieldValue}>{booking.stage || "—"}</span>
              </div>
              <div className={styles.sidebarField}>
                <span className={styles.sidebarFieldLabel}>Submitted</span>
                <span className={styles.sidebarFieldValue}>
                  {new Date(booking.submittedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </span>
              </div>
              <div className={styles.sidebarField} style={{ alignItems: "center" }}>
                <span className={styles.sidebarFieldLabel}>Status</span>
                <select className={styles.statusSelect} value={booking.status} onChange={(e) => updateStatus(e.target.value)}>
                  <option>New</option>
                  <option>Contacted</option>
                  <option>Completed</option>
                </select>
              </div>
            </div>

            {booking.message && (
              <div className={styles.profileCard}>
                <div className={styles.profileCardHeader}>
                  <div className={styles.profileCardTitle}>Client Message</div>
                </div>
                <p className={styles.drawerMessage}>{booking.message}</p>
              </div>
            )}

            <div className={styles.profileCard}>
              <div className={styles.profileCardHeader}>
                <div className={styles.profileCardTitle}>Progress</div>
              </div>
              <div className={styles.progressTrack}>
                {["New", "Contacted", "Completed"].map((s, i) => {
                  const steps = ["New", "Contacted", "Completed"];
                  const currentIdx = steps.indexOf(booking.status);
                  const done = i <= currentIdx;
                  return (
                    <div key={s} className={styles.progressStep}>
                      <div className={`${styles.progressDot} ${done ? styles.progressDotDone : ""}`}>
                        {done && (
                          <svg width="10" height="10" fill="none" viewBox="0 0 10 10">
                            <path d="M2 5l2.5 2.5 3.5-4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span className={`${styles.progressLabel} ${done ? styles.progressLabelDone : ""}`}>{s}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Add Follow-up Modal */}
        {showFUModal && (
          <div className={styles.modalOverlay} onClick={() => setShowFUModal(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalHeader}>
                <span className={styles.modalTitle}>Schedule a Follow-up</span>
                <button className={styles.modalClose} onClick={() => setShowFUModal(false)}>✕</button>
              </div>
              <div className={styles.modalBody}>
                <p style={{ fontSize: "0.82rem", color: "#7a8ea0", marginBottom: 20 }}>
                  Scheduling a follow-up for <strong style={{ color: "#0F2744" }}>{booking.name}</strong>
                </p>
                <div className={styles.formGroup} style={{ marginBottom: 16 }}>
                  <label className={styles.formLabel}>Date & Time *</label>
                  <input
                    type="datetime-local"
                    className={styles.formInput}
                    value={fuForm.scheduledDate}
                    onChange={(e) => setFuForm((f) => ({ ...f, scheduledDate: e.target.value }))}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Notes</label>
                  <textarea
                    className={styles.formTextarea}
                    placeholder="What is the purpose of this follow-up? e.g. Check in on dissertation progress, send resources…"
                    value={fuForm.notes}
                    onChange={(e) => setFuForm((f) => ({ ...f, notes: e.target.value }))}
                    rows={4}
                  />
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.btnOutline} onClick={() => setShowFUModal(false)}>Cancel</button>
                <button
                  className={styles.btnPrimary}
                  onClick={addFollowUp}
                  disabled={!fuForm.scheduledDate || saving}
                >
                  {saving ? "Saving…" : "Schedule Follow-up"}
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
}
