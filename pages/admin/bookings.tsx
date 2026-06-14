import Head from "next/head";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import styles from "@/styles/admin.module.css";

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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selected, setSelected] = useState<Booking | null>(null);

  const load = () =>
    fetch("/api/bookings")
      .then((r) => r.json())
      .then((data) => { setBookings(data); setLoading(false); });

  useEffect(() => { load(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch("/api/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)));
    if (selected?.id === id) setSelected((s) => s ? { ...s, status } : s);
  };

  const filtered = bookings.filter((b) => {
    const matchSearch =
      b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.email.toLowerCase().includes(search.toLowerCase()) ||
      (b.service || "").toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <>
      <Head><title>Bookings — GradElevate Admin</title></Head>
      <AdminLayout title="Bookings">
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageHeading}>Bookings</h1>
            <p className={styles.pageSubheading}>{bookings.length} total submissions</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className={styles.btnOutline} onClick={load} title="Refresh bookings">
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                <path d="M12 7A5 5 0 112 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M12 3v4H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Refresh
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

        <div className={styles.filterRow}>
          <div className={styles.searchBox}>
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <circle cx="6" cy="6" r="4.5" stroke="#9aaab8" strokeWidth="1.3"/>
              <path d="M10 10l2.5 2.5" stroke="#9aaab8" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input
              placeholder="Search by name, email or service…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select className={styles.filterSelect} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option>All</option>
            <option>New</option>
            <option>Contacted</option>
            <option>Completed</option>
          </select>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span className={styles.tableTitle}>
              Showing {filtered.length} of {bookings.length}
            </span>
            <span style={{ fontSize: "0.72rem", color: "#9aaab8" }}>Click a row to view profile</span>
          </div>
          {loading ? (
            <div className={styles.emptyState}>Loading…</div>
          ) : filtered.length === 0 ? (
            <div className={styles.emptyState}>No bookings found.</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Service / Event</th>
                  <th>Stage</th>
                  <th>Status</th>
                  <th>Submitted</th>
                  <th>Emails</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr
                    key={b.id}
                    onClick={() => setSelected(b)}
                    style={{ cursor: "pointer" }}
                    className={selected?.id === b.id ? styles.trSelected : ""}
                  >
                    <td className={styles.tdBold}>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div className={styles.rowAvatar}>{initials(b.name)}</div>
                        {b.name}
                      </div>
                    </td>
                    <td className={styles.tdMuted}>{b.email}</td>
                    <td>{b.service || "—"}</td>
                    <td className={styles.tdMuted}>{b.stage || "—"}</td>
                    <td>
                      <span className={`${styles.badge} ${statusBadgeClass(b.status)}`}>
                        {b.status}
                      </span>
                    </td>
                    <td className={styles.tdMuted}>
                      {b.submittedAt ? new Date(b.submittedAt).toLocaleDateString("en-GB") : "—"}
                    </td>
                    <td className={styles.tdMuted}>
                      {(b.emails?.length ?? 0) > 0 ? (
                        <span className={styles.emailPill}>{b.emails!.length} sent</span>
                      ) : "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Client profile drawer */}
        {selected && (
          <>
            <div className={styles.drawerOverlay} onClick={() => setSelected(null)} />
            <div className={styles.drawer}>
              <div className={styles.drawerHeader}>
                <span className={styles.drawerTitle}>Client Profile</span>
                <button className={styles.drawerClose} onClick={() => setSelected(null)}>
                  <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              <div className={styles.drawerBody}>
                {/* Client header */}
                <div className={styles.drawerClientHeader}>
                  <div className={styles.drawerAvatar}>{initials(selected.name)}</div>
                  <div>
                    <div className={styles.drawerClientName}>{selected.name}</div>
                    <div className={styles.drawerClientEmail}>{selected.email}</div>
                    {selected.phone && (
                      <div className={styles.drawerClientEmail} style={{ marginTop: 2 }}>{selected.phone}</div>
                    )}
                  </div>
                </div>

                {/* Booking details */}
                <div className={styles.drawerSection}>
                  <div className={styles.drawerSectionTitle}>Booking Details</div>
                  <div className={styles.drawerField}>
                    <span className={styles.drawerFieldLabel}>Service</span>
                    <span className={styles.drawerFieldValue}>{selected.service || "—"}</span>
                  </div>
                  <div className={styles.drawerField}>
                    <span className={styles.drawerFieldLabel}>Academic Stage</span>
                    <span className={styles.drawerFieldValue}>{selected.stage || "—"}</span>
                  </div>
                  <div className={styles.drawerField}>
                    <span className={styles.drawerFieldLabel}>Submitted</span>
                    <span className={styles.drawerFieldValue}>
                      {selected.submittedAt ? new Date(selected.submittedAt).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }) : "—"}
                    </span>
                  </div>
                  <div className={styles.drawerField}>
                    <span className={styles.drawerFieldLabel}>Status</span>
                    <select
                      className={styles.statusSelect}
                      value={selected.status}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateStatus(selected.id, e.target.value)}
                    >
                      <option>New</option>
                      <option>Contacted</option>
                      <option>Completed</option>
                    </select>
                  </div>
                  {selected.message && (
                    <div style={{ marginTop: 12 }}>
                      <div className={styles.drawerFieldLabel} style={{ marginBottom: 6 }}>Message</div>
                      <p className={styles.drawerMessage}>{selected.message}</p>
                    </div>
                  )}
                </div>

                {/* Email history */}
                <div className={styles.drawerSection}>
                  <div className={styles.drawerSectionTitle}>
                    Email History
                    {selected.emails && selected.emails.length > 0 && (
                      <span className={styles.drawerEmailCount}>{selected.emails.length}</span>
                    )}
                  </div>
                  {(!selected.emails || selected.emails.length === 0) ? (
                    <p className={styles.noEmails}>No emails sent for this booking.</p>
                  ) : (
                    <div>
                      {selected.emails.map((em) => (
                        <div key={em.id} className={styles.emailLogItem}>
                          <div className={`${styles.emailLogIcon} ${em.status === "failed" ? styles.emailLogIconFailed : ""}`}>
                            {em.status === "sent" ? (
                              <svg width="13" height="13" fill="none" viewBox="0 0 13 13">
                                <path d="M1 7l3.5 3.5 7.5-7" stroke="#C9A227" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                            ) : (
                              <svg width="13" height="13" fill="none" viewBox="0 0 13 13">
                                <path d="M1 1l11 11M12 1L1 12" stroke="#dc2626" strokeWidth="1.6" strokeLinecap="round"/>
                              </svg>
                            )}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div className={styles.emailLogSubject}>{em.subject}</div>
                            <div className={styles.emailLogMeta}>
                              {em.type === "booking_confirmation" ? "To client" : "To admin"} ·{" "}
                              {new Date(em.sentAt).toLocaleString("en-GB", { dateStyle: "short", timeStyle: "short" })}
                            </div>
                          </div>
                          <span className={em.status === "sent" ? styles.emailLogStatusSent : styles.emailLogStatusFailed}>
                            {em.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.drawerFooter}>
                <a href={`mailto:${selected.email}`} className={styles.btnPrimary} style={{ textDecoration: "none" }}>
                  <svg width="13" height="13" fill="none" viewBox="0 0 14 14">
                    <rect x="1" y="3" width="12" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
                    <path d="M1 4l6 5 6-5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                  </svg>
                  Email Client
                </a>
                <button className={styles.btnOutline} onClick={() => setSelected(null)}>Close</button>
              </div>
            </div>
          </>
        )}
      </AdminLayout>
    </>
  );
}
