import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./Navbar.module.css";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    dropdown: [
      { label: "Academic Success", href: "/services/academic-success" },
      { label: "Career Development", href: "/services/career-development" },
      { label: "Research & Postgraduate Support", href: "/services/research" },
      { label: "AI & Digital Skills", href: "/services/ai-digital-skills" },
    ],
  },
  { label: "Events", href: "/events" },
  { label: "Resources", href: "/resources" },
  { label: "Blog", href: "/blog" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🎓</span>
          <div>
            <span className={styles.logoName}>GradElevate</span>
            <span className={styles.logoTagline}>ELEVATE. ACHIEVE. SUCCEED.</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <ul className={styles.links}>
          {navLinks.map((link) =>
            link.dropdown ? (
              <li
                key={link.label}
                className={styles.dropdown}
                onMouseEnter={() => {
                  if (closeTimer.current) clearTimeout(closeTimer.current);
                  setServicesOpen(true);
                }}
                onMouseLeave={() => {
                  closeTimer.current = setTimeout(() => setServicesOpen(false), 250);
                }}
              >
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                {servicesOpen && (
                  <div className={styles.dropdownMenu}>
                    {link.dropdown.map((item) => (
                      <Link key={item.label} href={item.href} className={styles.dropdownItem}>
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ) : (
              <li key={link.label}>
                <Link href={link.href} className={styles.navLink}>
                  {link.label}
                </Link>
              </li>
            )
          )}
          <li className={styles.ctaItem}>
            <Link href="/book" className="btn-primary">
              Book a Consultation
            </Link>
          </li>
          <li>
            <Link href="/contact" className={styles.navLink}>
              Contact
            </Link>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button className={styles.hamburger} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span className={`${styles.bar} ${mobileOpen ? styles.barOpen1 : ""}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.barOpen2 : ""}`} />
          <span className={`${styles.bar} ${mobileOpen ? styles.barOpen3 : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link key={link.label} href={link.href} className={styles.mobileLink} onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/book" className={`btn-primary ${styles.mobileCta}`} onClick={() => setMobileOpen(false)}>
            Book a Consultation
          </Link>
        </div>
      )}
    </nav>
  );
}
