import Head from "next/head";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import styles from "@/styles/admin.module.css";

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
                  <th>Phone</th>
                  <th>Service / Event</th>
                  <th>Stage</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Submitted</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((b) => (
                  <tr key={b.id}>
                    <td className={styles.tdBold}>{b.name}</td>
                    <td className={styles.tdMuted}>{b.email}</td>
                    <td className={styles.tdMuted}>{b.phone || "—"}</td>
                    <td>{b.service || "—"}</td>
                    <td className={styles.tdMuted}>{b.stage || "—"}</td>
                    <td className={styles.tdMuted} style={{ maxWidth: 200 }}>
                      <span title={b.message}>
                        {b.message ? (b.message.length > 60 ? b.message.slice(0, 60) + "…" : b.message) : "—"}
                      </span>
                    </td>
                    <td>
                      <select
                        className={styles.statusSelect}
                        value={b.status}
                        onChange={(e) => updateStatus(b.id, e.target.value)}
                      >
                        <option>New</option>
                        <option>Contacted</option>
                        <option>Completed</option>
                      </select>
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
      </AdminLayout>
    </>
  );
}
