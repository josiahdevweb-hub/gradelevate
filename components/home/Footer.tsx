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
            <a href="https://www.linkedin.com/company/grad-elevate/" target="_blank" rel="noopener noreferrer" className={`${styles.social} ${styles.socialLinkedIn}`} aria-label="LinkedIn">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="https://x.com/GradElevate" target="_blank" rel="noopener noreferrer" className={`${styles.social} ${styles.socialX}`} aria-label="X (Twitter)">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/gradelevate?utm_source=qr&igsh=MXVkMzlnYm4yZXB0aw==" target="_blank" rel="noopener noreferrer" className={`${styles.social} ${styles.socialInstagram}`} aria-label="Instagram">
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" className={`${styles.social} ${styles.socialWeChat}`} aria-label="WeChat">
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
            <a href="tel:+447957982810" className={styles.contactItem}>
              +44 7957 982810
            </a>
            <a href="https://wa.me/447957982810" target="_blank" rel="noopener noreferrer" className={styles.contactItem} style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
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
