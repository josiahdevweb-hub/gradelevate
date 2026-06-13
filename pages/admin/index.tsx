import Head from "next/head";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import styles from "@/styles/admin.module.css";

interface Booking {
  id: string;
  name: string;
  email: string;
  service: string;
  stage: string;
  status: string;
  submittedAt: string;
}

export default function AdminDashboard() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [blogCount, setBlogCount] = useState(0);
  const [eventCount, setEventCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/bookings").then((r) => r.json()),
      fetch("/api/blogs").then((r) => r.json()),
      fetch("/api/events").then((r) => r.json()),
    ]).then(([b, bl, ev]) => {
      setBookings(b);
      setBlogCount(bl.length);
      setEventCount(ev.length);
      setLoading(false);
    });
  }, []);

  const newCount = bookings.filter((b) => b.status === "New").length;
  const recent = bookings.slice(0, 8);

  return (
    <>
      <Head>
        <title>Dashboard — GradElevate Admin</title>
      </Head>
      <AdminLayout title="Dashboard">
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageHeading}>Overview</h1>
            <p className={styles.pageSubheading}>Welcome back — here's what's happening today.</p>
          </div>
        </div>

        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <p className={styles.statLabel}>Total Bookings</p>
              <p className={styles.statValue}>{loading ? "—" : bookings.length}</p>
              <p className={styles.statSub}><span className={styles.statAccent}>{newCount}</span> new / unread</p>
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
              <p className={styles.statValue}>{loading ? "—" : newCount}</p>
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
              <p className={styles.statValue}>{loading ? "—" : blogCount}</p>
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
              <p className={styles.statValue}>{loading ? "—" : eventCount}</p>
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
                  <tr key={b.id}>
                    <td className={styles.tdBold}>{b.name}</td>
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
      </AdminLayout>
    </>
  );
}
