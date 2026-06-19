import Link from "next/link";
import styles from "./Services.module.css";

interface ServiceItem {
  id: string;
  title: string;
  description: string;
  features: string[];
  href: string;
  iconType: string;
}

const ICONS: Record<string, React.ReactNode> = {
  academic: (
    <svg width="24" height="24" fill="none" viewBox="0 0 32 32">
      <path d="M16 4L4 10v6c0 7.2 5.2 13.9 12 15.6C22.8 29.9 28 23.2 28 16v-6L16 4z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M11 16l4 4 6-7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  career: (
    <svg width="24" height="24" fill="none" viewBox="0 0 32 32">
      <rect x="4" y="6" width="24" height="20" rx="2" stroke="#fff" strokeWidth="1.8"/>
      <path d="M10 16l4 4 8-8" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 6V4M10 6V4M22 6V4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  research: (
    <svg width="24" height="24" fill="none" viewBox="0 0 32 32">
      <path d="M5 8h22M5 14h14M5 20h18" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
      <circle cx="24" cy="22" r="5" stroke="#fff" strokeWidth="1.8"/>
      <path d="M22 22l1.5 1.5L26 20" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ai: (
    <svg width="24" height="24" fill="none" viewBox="0 0 32 32">
      <rect x="4" y="8" width="24" height="16" rx="2" stroke="#fff" strokeWidth="1.8"/>
      <circle cx="16" cy="16" r="4" stroke="#fff" strokeWidth="1.8"/>
      <path d="M16 12v-2M16 22v-2M20 16h2M10 16h2" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  default: (
    <svg width="24" height="24" fill="none" viewBox="0 0 32 32">
      <path d="M16 4L4 10v6c0 7.2 5.2 13.9 12 15.6C22.8 29.9 28 23.2 28 16v-6L16 4z" stroke="#fff" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
};

export default function Services({ services = [] }: { services?: ServiceItem[] }) {
  if (services.length === 0) return null;

  return (
    <section className={`section ${styles.services}`}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-eyebrow" style={{ color: "#fff" }}>How We Support You</p>
        </div>

        <div className={styles.grid}>
          {services.map((s) => {
            const href = s.href || `/services/${s.id}`;
            const icon = ICONS[s.iconType] || ICONS.default;
            return (
              <div key={s.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.iconWrap}>{icon}</div>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <p className={styles.tagline}>{s.description}</p>
                </div>
                <Link href={href} className={styles.cta}>
                  Explore →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
