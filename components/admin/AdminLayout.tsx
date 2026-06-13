import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "@/styles/admin.module.css";

const navItems = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
        <rect x="1" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="9" y="1" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="1" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
        <rect x="9" y="9" width="6" height="6" rx="1" stroke="currentColor" strokeWidth="1.4"/>
      </svg>
    ),
  },
  {
    href: "/admin/bookings",
    label: "Bookings",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
        <rect x="1" y="2" width="14" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M1 6h14" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M5 1v2M11 1v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M4 10h3M4 12.5h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: "/admin/blogs",
    label: "Blog Posts",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
        <rect x="1.5" y="1.5" width="13" height="13" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M4 5.5h8M4 8h8M4 10.5h5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    href: "/admin/events",
    label: "Events",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.4"/>
        <path d="M8 4.5v3.5l2.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    href: "/admin/services",
    label: "Services",
    icon: (
      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
        <path d="M8 1.5L1.5 5v4.5c0 3 2.5 5.5 6.5 6.5 4-1 6.5-3.5 6.5-6.5V5L8 1.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M5.5 8l2 2 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function AdminLayout({ children, title }: { children: React.ReactNode; title?: string }) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("admin_auth");
      if (!auth) router.replace("/admin/login");
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  return (
    <div className={styles.adminShell}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLogo}>
          <Link href="/admin" className={styles.sidebarBrand}>
            <span className={styles.sidebarName}>GradElevate</span>
          </Link>
          <span className={styles.sidebarSub}>Admin Panel</span>
        </div>

        <nav className={styles.sidebarNav}>
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? router.pathname === "/admin"
                : router.pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ""}`}
              >
                {item.icon}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarBottom}>
          <div className={styles.sidebarDivider} />
          <Link href="/" target="_blank" className={styles.sidebarLink} style={{ marginBottom: 4 }}>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M7 3H3a1.5 1.5 0 00-1.5 1.5v8A1.5 1.5 0 003 14h8a1.5 1.5 0 001.5-1.5V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M10 2h4v4M14 2l-6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            View Site
          </Link>
          <button className={styles.logoutBtn} onClick={logout}>
            <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
              <path d="M6 2H3a1.5 1.5 0 00-1.5 1.5v9A1.5 1.5 0 003 14h3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
              <path d="M10.5 11L14 8l-3.5-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M14 8H6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
            </svg>
            Log Out
          </button>
        </div>
      </aside>

      <div className={styles.mainArea}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <span className={styles.topbarTitle}>{title || "Admin Panel"}</span>
          </div>
          <div className={styles.topbarRight}>
            <div className={styles.adminBadge}>
              <div className={styles.adminAvatar}>A</div>
              <span>Admin</span>
            </div>
          </div>
        </header>
        <main className={styles.contentArea}>{children}</main>
      </div>
    </div>
  );
}
