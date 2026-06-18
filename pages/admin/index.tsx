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
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const [pwForm, setPwForm] = useState<{ current: string; next: string; confirm: string }>({ current: "", next: "", confirm: "" });
  const [pwMsg, setPwMsg]   = useState<{ text: string; ok: boolean } | null>(null);
  const [pwBusy, setPwBusy] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const [s, bookings] = await Promise.all([
        api.get<Stats>("/api/admin/stats"),
        api.get<Booking[]>("/api/admin/bookings"),
      ]);
      setStats(s);
      setRecent(bookings.slice(0, 8));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

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
                          {b.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase()}
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
      </AdminLayout>
    </>
  );
}
