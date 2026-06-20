import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AdminLayout from "@/components/admin/AdminLayout";
import { api } from "@/lib/api";
import styles from "@/styles/admin.module.css";

interface EventItem {
  id: string;
  title: string;
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
  phone?: string;
  service: string;
  stage: string;
  message?: string;
  status: string;
  submittedAt: string;
  emails?: unknown[];
  followUps?: FollowUp[];
}

function initials(name: string) {
  return name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

function statusBadgeClass(status: string) {
  if (status === "New") return styles.badgeNew;
  if (status === "Contacted") return styles.badgeContacted;
  if (status === "Completed") return styles.badgeCompleted;
  return styles.badge;
}

function fuUrgency(fu: FollowUp): "overdue" | "due-soon" | "upcoming" {
  const now = Date.now();
  const scheduled = new Date(fu.scheduledDate).getTime();
  if (scheduled <= now) return "overdue";
  if (scheduled - now <= 24 * 60 * 60 * 1000) return "due-soon";
  return "upcoming";
}

function exportCSV(bookings: Booking[]) {
  const headers = ["Name", "Email", "Phone", "Service", "Academic Stage", "Message", "Status", "Submitted At"];
  const rows = bookings.map((b) => [
    b.name, b.email, b.phone || "", b.service || "", b.stage || "",
    (b.message || "").replace(/\n/g, " "), b.status,
    b.submittedAt ? new Date(b.submittedAt).toLocaleString("en-GB") : "",
  ]);
  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `gradelevate-bookings-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminBookings() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [serviceFilter, setServiceFilter] = useState("All");
  const [eventFilter, setEventFilter] = useState("All");
  const [events, setEvents] = useState<EventItem[]>([]);
  const [showFollowUps, setShowFollowUps] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const load = () =>
    api.get<Booking[]>("/api/admin/bookings")
      .then((data) => { setBookings(data); setLoading(false); });

  useEffect(() => {
    load();
    fetch("https://gradeelevate-backend-production.up.railway.app/api/events")
      .then((r) => r.ok ? r.json() : [])
      .then((data: EventItem[]) => setEvents(Array.isArray(data) ? data : []))
      .catch(() => {});
  }, []);

  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      (b.service || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "None" || statusFilter === "All" || b.status === statusFilter;
    const matchService = serviceFilter === "None" || serviceFilter === "All" || b.service === serviceFilter;
    const matchEvent = eventFilter === "None" || eventFilter === "All" || (b.service || "").toLowerCase() === eventFilter.toLowerCase();
    return matchSearch && matchStatus && matchService && matchEvent;
  });

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

  return (
    <>
      <Head><title>Bookings — GradElevate Admin</title></Head>
      <AdminLayout title="Bookings">
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageHeading}>Bookings</h1>
            <p className={styles.pageSubheading}>{bookings.length} total submissions</p>
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
            <button className={styles.btnExport} onClick={() => exportCSV(filtered)}>
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                <path d="M7 2v7M4 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Export CSV
            </button>
          </div>
        </div>

        <div className={styles.filterBar}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Search</label>
            <div className={styles.searchBox}>
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                <circle cx="6" cy="6" r="4.5" stroke="#9aaab8" strokeWidth="1.3"/>
                <path d="M10 10l2.5 2.5" stroke="#9aaab8" strokeWidth="1.3" strokeLinecap="round"/>
              </svg>
              <input
                placeholder="Name, email, phone…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Service</label>
            <select className={styles.filterSelect} value={serviceFilter} onChange={(e) => { setServiceFilter(e.target.value); if (e.target.value !== "None" && e.target.value !== "All") setEventFilter("None"); }}>
              <option value="All">All Services</option>
              <option value="None">None</option>
              <option value="Academic Tutoring & Writing Support">Academic Tutoring & Writing</option>
              <option value="Dissertation / Thesis Support">Dissertation / Thesis</option>
              <option value="Research Design & Methodology">Research & Methodology</option>
              <option value="PhD Application Support">PhD Application</option>
              <option value="Career Development & CV Coaching">Career & CV Coaching</option>
              <option value="Interview Preparation">Interview Prep</option>
              <option value="AI & Digital Skills Coaching">AI & Digital Skills</option>
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Event</label>
            <select className={styles.filterSelect} value={eventFilter} onChange={(e) => { setEventFilter(e.target.value); if (e.target.value !== "None" && e.target.value !== "All") setServiceFilter("None"); }}>
              <option value="All">All Events</option>
              <option value="None">None</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.title}>{ev.title}</option>
              ))}
            </select>
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Status</label>
            <select className={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="All">All Status</option>
              <option value="None">None</option>
              <option>New</option>
              <option>Contacted</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span className={styles.tableTitle}>Showing {filtered.length} of {bookings.length}</span>
            <span style={{ fontSize: "0.72rem", color: "#9aaab8" }}>Click a row to view full profile</span>
          </div>
          {loading ? (
            <div className={styles.emptyState}>Loading…</div>
          ) : filtered.length === 0 ? (
            <div className={styles.emptyState}>No bookings found.</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Client</th>
                  <th>Service</th>
                  <th>Stage</th>
                  <th>Status</th>
                  <th>Emails</th>
                  <th>Follow-ups</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr
                    key={b.id}
                    onClick={() => router.push(`/admin/bookings/${b.id}`)}
                    style={{ cursor: "pointer" }}
                  >
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className={styles.rowAvatar}>{initials(b.name)}</div>
                        <div>
                          <div className={styles.tdBold}>{b.name}</div>
                          <div className={styles.tdMuted} style={{ fontSize: "0.72rem" }}>{b.email}</div>
                        </div>
                      </div>
                    </td>
                    <td style={{ fontSize: "0.82rem", color: "#2a3a4a" }}>{b.service || "—"}</td>
                    <td className={styles.tdMuted}>{b.stage || "—"}</td>
                    <td>
                      <span className={`${styles.badge} ${statusBadgeClass(b.status)}`}>{b.status}</span>
                    </td>
                    <td>
                      {(b.emails?.length ?? 0) > 0
                        ? <span className={styles.emailPill} style={{ background: "rgba(201,162,39,0.1)", color: "#7a5c10" }}>{b.emails!.length} sent</span>
                        : <span className={styles.tdMuted}>—</span>}
                    </td>
                    <td>
                      {(b.followUps?.length ?? 0) > 0
                        ? <span className={styles.emailPill} style={{ background: "rgba(59,130,246,0.1)", color: "#1d4ed8" }}>{b.followUps!.length} scheduled</span>
                        : <span className={styles.tdMuted}>—</span>}
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

        {/* Notifications dropdown */}
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
