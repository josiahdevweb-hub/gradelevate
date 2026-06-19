import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        {/* Col 1: Brand */}
        <div className={styles.col}>
          <Link href="/" className={styles.logo}>
            <svg width="34" height="27" viewBox="0 0 38 30" fill="none" style={{ display: "block", flexShrink: 0 }}>
              <path d="M19 30L1 20L19 12L37 20L19 30Z" fill="#C9A227" fillOpacity="0.55"/>
              <path d="M19 21L1 11L19 3L37 11L19 21Z" fill="#C9A227" fillOpacity="0.8"/>
              <path d="M19 12L1 2L19 0L37 2L19 12Z" fill="#C9A227"/>
            </svg>
            <div>
              <span className={styles.logoName}>GradElevate</span>
              <span className={styles.logoTagline}>LEARN. ACHIEVE. SUCCEED.</span>
            </div>
          </Link>
          <p className={styles.brandDesc}>
            Academic and career development consultancy supporting undergraduates, postgraduates, PhD researchers, graduates, and early-career professionals.
          </p>
          <div className={styles.socials}>
            {["LinkedIn", "Twitter", "Instagram"].map((s) => (
              <a key={s} href="#" className={styles.social} aria-label={s}>
                {s === "LinkedIn" && (
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                )}
                {s === "Twitter" && (
                  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                  </svg>
                )}
                {s === "Instagram" && (
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                  </svg>
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Col 2+3: Quick Links & Our Services — always side-by-side */}
        <div className={styles.linksGroup}>
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <nav className={styles.links}>
              {["Home", "About", "Services", "Events", "Resources", "Blog", "Book a Consultation"].map((l) => (
                <Link key={l} href={l === "Home" ? "/" : `/${l.toLowerCase().replace(/ /g, "-")}`} className={styles.link}>{l}</Link>
              ))}
            </nav>
          </div>

          <div className={styles.col}>
            <h4 className={styles.colTitle}>Our Services</h4>
            <nav className={styles.links}>
              {[
                "Academic Tutoring",
                "Career Development",
                "Research & Postgraduate Support",
                "AI & Digital Skills",
              ].map((s) => (
                <Link key={s} href="/services" className={styles.link}>{s}</Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Col 4: Contact */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Contact</h4>
          <div className={styles.contacts}>
            <a href="mailto:hello@gradelevate.com" className={styles.contactItem}>
              hello@gradelevate.com
            </a>
            <p className={styles.contactItem}>UK | Online</p>
            <p className={styles.contactItem}>Flexible appointments to suit your schedule.</p>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className="container">
          <p className={styles.copy}>© {new Date().getFullYear()} GradElevate. All rights reserved.</p>
          <Link href="/admin/login" style={{ fontSize: "11px", color: "inherit", opacity: 0.3, textDecoration: "none" }}>done</Link>
        </div>
      </div>
    </footer>
  );
}
