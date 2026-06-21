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
            <a href="https://www.linkedin.com/company/grad-elevate/" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="LinkedIn">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://x.com/GradElevate" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="X (Twitter)">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/gradelevate?utm_source=qr&igsh=MXVkMzlnYm4yZXB0aw==" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Instagram">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" className={styles.social} aria-label="WeChat">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.5 11a1 1 0 100-2 1 1 0 000 2zM5 11a1 1 0 100-2 1 1 0 000 2z"/>
                <path d="M9 2C4.58 2 1 5.07 1 8.8c0 2.1 1.1 3.98 2.82 5.2L3 17l3.2-1.6c.9.27 1.83.4 2.8.4.33 0 .66-.02.98-.05A6.46 6.46 0 009.5 13.5C9.5 10.46 12.19 8 15.5 8c.52 0 1.03.06 1.52.16C16.23 4.64 12.96 2 9 2z" opacity="0.6"/>
                <circle cx="13.5" cy="15" r="0.75"/>
                <circle cx="17.5" cy="15" r="0.75"/>
                <path d="M15.5 10c-3.04 0-5.5 2.24-5.5 5s2.46 5 5.5 5c.7 0 1.37-.12 2-.35L20 21l-.6-2.4C20.44 17.5 21 16.3 21 15c0-2.76-2.46-5-5.5-5z"/>
              </svg>
            </a>
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
            <a href="mailto:info@gradelevate.co.uk" className={styles.contactItem}>
              info@gradelevate.co.uk
            </a>
            <a href="tel:+447732761855" className={styles.contactItem}>
              +44 7732 761855
            </a>
            <a href="https://wa.me/447732761855" target="_blank" rel="noopener noreferrer" className={styles.contactItem}>
              WhatsApp
            </a>
            <p className={styles.contactItem}>UK | Online</p>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <div className={`container ${styles.bottomInner}`}>
          <p className={styles.copy}>© {new Date().getFullYear()} GradElevate. All rights reserved.</p>
          <div className={styles.bottomLinks}>
            <Link href="/privacy-policy#privacy" className={styles.bottomLink}>Privacy Policy</Link>
            <Link href="/privacy-policy#terms" className={styles.bottomLink}>Terms of Service</Link>
            <Link href="/privacy-policy#refund" className={styles.bottomLink}>Refund Policy</Link>
          </div>
          <Link href="/admin/login" style={{ fontSize: "11px", color: "inherit", opacity: 0.3, textDecoration: "none" }}></Link>
        </div>
      </div>
    </footer>
  );
}
