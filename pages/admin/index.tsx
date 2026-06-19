import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import { api } from "@/lib/api";
import styles from "@/styles/admin.module.css";

interface Stats {
  totalBookings: number;
  newEnquiries: number;
  blogCount: number;
  eventCount: number;
}

interface FollowUp {
  id: string;
  scheduledDate: string;
  notes: string;
  status: "pending" | "done" | "cancelled";
  addedAt: string;
  completedAt?: string;
}

interface Booking {
  id: string;
  name: string;
  email: string;
  service: string;
  stage: string;
  status: string;
  submittedAt: string;
  followUps?: FollowUp[];
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function fuUrgency(fu: FollowUp): "overdue" | "due-soon" | "upcoming" {
  const now = Date.now();
  const scheduled = new Date(fu.scheduledDate).getTime();
  if (scheduled <= now) return "overdue";
  if (scheduled - now <= 24 * 60 * 60 * 1000) return "due-soon";
  return "upcoming";
}

export default function AdminDashboard() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFollowUps, setShowFollowUps] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [pwForm, setPwForm] = useState<{ current: string; next: string; confirm: string }>({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg]   = useState<{ text: string; ok: boolean } | null>(null);
  const [pwBusy, setPwBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [s, data] = await Promise.all([
        api.get<Stats>("/api/admin/stats"),
        api.get<Booking[]>("/api/admin/bookings"),
      ]);
      setStats(s);
      setBookings(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const recent = bookings.slice(0, 8);

  const bookingsWithFollowUps = bookings
    .filter((b) => (b.followUps || []).some((fu) => fu.status === "pending"))
    .map((b) => ({
      ...b,
      pendingFUs: (b.followUps || []).filter((fu) => fu.status === "pending"),
    }));

  const urgentFollowUps = bookings.flatMap((b) =>
    (b.followUps || [])
      .filter((fu) => fu.status === "pending" && fuUrgency(fu) !== "upcoming")
      .map((fu) => ({ ...fu, bookingId: b.id, clientName: b.name, service: b.service }))
  ).sort((a, b) => new Date(a.scheduledDate).getTime() - new Date(b.scheduledDate).getTime());

  const urgentCount = urgentFollowUps.length;

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (pwForm.next !== pwForm.confirm) {
      setPwMsg({ text: "New passwords do not match.", ok: false });
      return;
    }
    if (pwForm.next.length < 8) {
      setPwMsg({ text: "New password must be at least 8 characters.", ok: false });
      return;
    }
    setPwBusy(true);
    setPwMsg(null);
    try {
      await api.post("/api/auth/change-password", { currentPassword: pwForm.current, newPassword: pwForm.next });
      setPwMsg({ text: "Password updated successfully.", ok: true });
      setPwForm({ current: "", next: "", confirm: "" });
    } catch (err: unknown) {
      setPwMsg({ text: err instanceof Error ? err.message : "Failed to update password.", ok: false });
    } finally {
      setPwBusy(false);
    }
  };

  return (
    <>
      <Head>
        <title>Dashboard — GradElevate Admin</title>
      </Head>
      <AdminLayout title="Dashboard">
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageHeading}>Overview</h1>
            <p className={styles.pageSubheading}>
              {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              className={styles.btnFollowUp}
              onClick={() => { setShowFollowUps(true); setShowNotifications(false); }}
            >
              <svg width="14" height="14" fill="none" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4"/>
                <path d="M8 5v3.5l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Follow-ups
            </button>
            <button
              className={styles.btnNotifBell}
              onClick={() => { setShowNotifications(true); setShowFollowUps(false); }}
            >
              <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                <path d="M6 13a2 2 0 004 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                <path d="M3.5 10.5c0 0 .5-1 .5-4.5a4 4 0 018 0c0 3.5.5 4.5.5 4.5H3.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
              </svg>
              {urgentCount > 0 && <span className={styles.notifDot}>{urgentCount}</span>}
            </button>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Total Bookings</p>
              <p className={styles.statValue}>{loading ? "—" : stats?.totalBookings ?? 0}</p>
              <p className={styles.statSub}><span className={styles.statAccent}>{stats?.newEnquiries ?? 0}</span> new / unread</p>
            </div>
            <div className={styles.statIcon}>
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <rect x="1.5" y="2.5" width="17" height="15" rx="1.5" stroke="#C9A227" strokeWidth="1.4"/>
                <path d="M1.5 7h17" stroke="#C9A227" strokeWidth="1.4"/>
                <path d="M6 1.5v2M14 1.5v2" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>New Enquiries</p>
              <p className={styles.statValue}>{loading ? "—" : stats?.newEnquiries ?? 0}</p>
              <p className={styles.statSub}>Awaiting response</p>
            </div>
            <div className={`${styles.statIcon} ${styles.statIconNavy}`}>
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <circle cx="10" cy="7" r="4" stroke="#0F2744" strokeWidth="1.4"/>
                <path d="M2 18c0-4 3.6-7 8-7s8 3 8 7" stroke="#0F2744" strokeWidth="1.4" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Blog Posts</p>
              <p className={styles.statValue}>{loading ? "—" : stats?.blogCount ?? 0}</p>
              <p className={styles.statSub}>Published articles</p>
            </div>
            <div className={styles.statIcon}>
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <rect x="2" y="2" width="16" height="16" rx="2" stroke="#C9A227" strokeWidth="1.4"/>
                <path d="M5 7h10M5 10h10M5 13h6" stroke="#C9A227" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Upcoming Events</p>
              <p className={styles.statValue}>{loading ? "—" : stats?.eventCount ?? 0}</p>
              <p className={styles.statSub}>Scheduled events</p>
            </div>
            <div className={`${styles.statIcon} ${styles.statIconNavy}`}>
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                <circle cx="10" cy="10" r="7.5" stroke="#0F2744" strokeWidth="1.4"/>
                <path d="M10 6v4l3 2" stroke="#0F2744" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span className={styles.tableTitle}>Recent Bookings</span>
            <a href="/admin/bookings" className={styles.btnOutline} style={{ textDecoration: "none" }}>
              View All
            </a>
          </div>
          {loading ? (
            <div className={styles.emptyState}>Loading...</div>
          ) : recent.length === 0 ? (
            <div className={styles.emptyState}>No bookings yet. They will appear here when clients submit the booking form.</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Service</th>
                  <th>Stage</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((b) => (
                  <tr key={b.id} style={{ cursor: "pointer" }} onClick={() => router.push(`/admin/bookings/${b.id}`)}>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className={styles.rowAvatar}>
                          {initials(b.name)}
                        </div>
                        <span className={styles.tdBold}>{b.name}</span>
                      </div>
                    </td>
                    <td className={styles.tdMuted}>{b.email}</td>
                    <td>{b.service || "—"}</td>
                    <td className={styles.tdMuted}>{b.stage || "—"}</td>
                    <td>
                      <span className={`${styles.badge} ${
                        b.status === "New" ? styles.badgeNew :
                        b.status === "Contacted" ? styles.badgeContacted :
                        styles.badgeCompleted
                      }`}>{b.status}</span>
                    </td>
                    <td className={styles.tdMuted}>
                      {b.submittedAt ? new Date(b.submittedAt).toLocaleDateString("en-GB") : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className={styles.formCard} style={{ marginTop: 24 }}>
          <div style={{ marginBottom: 20 }}>
            <p style={{ fontSize: "0.88rem", fontWeight: 700, color: "#0F2744", margin: "0 0 4px" }}>Change Password</p>
            <p style={{ fontSize: "0.78rem", color: "#7a8ea0", margin: 0 }}>Update your admin account password.</p>
          </div>
          <form onSubmit={handlePasswordChange} style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 420 }}>
            {(["current", "next", "confirm"] as const).map((key) => (
              <div key={key} className={styles.formGroup}>
                <label className={styles.formLabel}>
                  {key === "current" ? "Current Password" : key === "next" ? "New Password" : "Confirm New Password"}
                </label>
                <input
                  type="password"
                  className={styles.formInput}
                  value={pwForm[key]}
                  onChange={(e) => { setPwForm(f => ({ ...f, [key]: e.target.value })); setPwMsg(null); }}
                  required
                  minLength={key === "current" ? 1 : 8}
                  placeholder={key === "current" ? "Enter current password" : key === "next" ? "Min. 8 characters" : "Repeat new password"}
                />
              </div>
            ))}
            {pwMsg && (
              <p style={{ fontSize: "0.82rem", color: pwMsg.ok ? "#16a34a" : "#dc2626", margin: 0 }}>{pwMsg.text}</p>
            )}
            <div>
              <button type="submit" className={styles.btnPrimary} disabled={pwBusy}>
                {pwBusy ? "Updating…" : "Update Password"}
              </button>
            </div>
          </form>
        </div>

        {/* Follow-ups drawer */}
        {showFollowUps && (
          <div className={styles.drawerOverlay} onClick={() => setShowFollowUps(false)}>
            <div className={styles.fuDrawer} onClick={(e) => e.stopPropagation()}>
              <div className={styles.fuDrawerHeader}>
                <div className={styles.fuDrawerTitle}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M8 5v3.5l2 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  All Follow-ups
                  <span className={styles.fuDrawerCount}>{bookingsWithFollowUps.reduce((s, b) => s + b.pendingFUs.length, 0)}</span>
                </div>
                <button className={styles.fuDrawerClose} onClick={() => setShowFollowUps(false)}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                    <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div className={styles.fuDrawerBody}>
                {bookingsWithFollowUps.length === 0 ? (
                  <div className={styles.emptyStateMini}>
                    <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                      <circle cx="14" cy="14" r="11" stroke="#d0d8e4" strokeWidth="1.5"/>
                      <path d="M14 9v5.5l3 3" stroke="#d0d8e4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p>No pending follow-ups</p>
                  </div>
                ) : (
                  bookingsWithFollowUps.map((b) => (
                    <div key={b.id} className={styles.fuClientBlock}>
                      <div
                        className={styles.fuClientRow}
                        onClick={() => router.push(`/admin/bookings/${b.id}`)}
                      >
                        <div className={styles.rowAvatar} style={{ width: 32, height: 32, fontSize: "0.65rem" }}>{initials(b.name)}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className={styles.tdBold} style={{ fontSize: "0.78rem" }}>{b.name}</div>
                          <div className={styles.tdMuted} style={{ fontSize: "0.68rem" }}>{b.service || "—"}</div>
                        </div>
                        <svg width="12" height="12" fill="none" viewBox="0 0 14 14" style={{ color: "#b0bece", flexShrink: 0 }}>
                          <path d="M5 2l5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                      {b.pendingFUs.map((fu) => {
                        const urg = fuUrgency(fu);
                        const urgColor = urg === "overdue" ? "#ef4444" : urg === "due-soon" ? "#f59e0b" : "#3b82f6";
                        const urgBg = urg === "overdue" ? "rgba(239,68,68,0.08)" : urg === "due-soon" ? "rgba(245,158,11,0.08)" : "rgba(59,130,246,0.06)";
                        const urgLabel = urg === "overdue" ? "Overdue" : urg === "due-soon" ? "Due soon" : "Upcoming";
                        return (
                          <div key={fu.id} className={styles.fuItem} style={{ borderLeftColor: urgColor }}>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
                              <span style={{ fontSize: "0.72rem", fontWeight: 600, color: "#0F2744" }}>
                                {new Date(fu.scheduledDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                                {" "}
                                <span style={{ fontWeight: 400, color: "#9aaab8" }}>
                                  {new Date(fu.scheduledDate).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                                </span>
                              </span>
                              <span style={{ fontSize: "0.6rem", fontWeight: 700, color: urgColor, background: urgBg, padding: "2px 7px", borderRadius: 12 }}>
                                {urgLabel}
                              </span>
                            </div>
                            {fu.notes && (
                              <div style={{ fontSize: "0.7rem", color: "#7a8ea0", marginTop: 3 }}>{fu.notes}</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Notifications drawer */}
        {showNotifications && (
          <div className={styles.drawerOverlay} onClick={() => setShowNotifications(false)}>
            <div className={styles.fuDrawer} onClick={(e) => e.stopPropagation()}>
              <div className={styles.fuDrawerHeader} style={{ background: urgentCount > 0 ? "#dc2626" : "#0F2744" }}>
                <div className={styles.fuDrawerTitle}>
                  <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                    <path d="M6 13a2 2 0 004 0" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    <path d="M3.5 10.5c0 0 .5-1 .5-4.5a4 4 0 018 0c0 3.5.5 4.5.5 4.5H3.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                  </svg>
                  Urgent Follow-ups
                  {urgentCount > 0 && <span className={styles.fuDrawerCount}>{urgentCount}</span>}
                </div>
                <button className={styles.fuDrawerClose} onClick={() => setShowNotifications(false)}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                    <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>
              <div className={styles.fuDrawerBody}>
                {urgentFollowUps.length === 0 ? (
                  <div className={styles.emptyStateMini}>
                    <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
                      <path d="M12 25a4 4 0 008 0" stroke="#d0d8e4" strokeWidth="1.5" strokeLinecap="round"/>
                      <path d="M7 21c0 0 1-2 1-9a6 6 0 0112 0c0 7 1 9 1 9H7z" stroke="#d0d8e4" strokeWidth="1.5" strokeLinejoin="round"/>
                    </svg>
                    <p>No urgent follow-ups. You&apos;re all caught up!</p>
                  </div>
                ) : (
                  urgentFollowUps.map((fu) => {
                    const urg = fuUrgency(fu);
                    const urgColor = urg === "overdue" ? "#ef4444" : "#f59e0b";
                    const urgBg = urg === "overdue" ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)";
                    const urgLabel = urg === "overdue" ? "Overdue" : "Due soon";
                    return (
                      <div
                        key={fu.id}
                        className={styles.fuNotifItem}
                        style={{ borderLeftColor: urgColor }}
                        onClick={() => { setShowNotifications(false); router.push(`/admin/bookings/${fu.bookingId}`); }}
                      >
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 6 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                            <div className={styles.rowAvatar} style={{ width: 28, height: 28, fontSize: "0.6rem", flexShrink: 0 }}>
                              {initials(fu.clientName)}
                            </div>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: "0.74rem", fontWeight: 600, color: "#0F2744" }}>{fu.clientName}</div>
                              <div style={{ fontSize: "0.66rem", color: "#9aaab8" }}>{fu.service || "—"}</div>
                            </div>
                          </div>
                          <span style={{ fontSize: "0.58rem", fontWeight: 700, color: urgColor, background: urgBg, padding: "2px 7px", borderRadius: 12, flexShrink: 0 }}>
                            {urgLabel}
                          </span>
                        </div>
                        <div style={{ fontSize: "0.7rem", color: "#0F2744", fontWeight: 600, marginTop: 6 }}>
                          {new Date(fu.scheduledDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                          {" "}
                          <span style={{ fontWeight: 400, color: "#9aaab8" }}>
                            {new Date(fu.scheduledDate).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        {fu.notes && (
                          <div style={{ fontSize: "0.68rem", color: "#7a8ea0", marginTop: 2 }}>{fu.notes}</div>
                        )}
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
}
