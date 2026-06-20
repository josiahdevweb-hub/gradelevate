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
    <svg width="28" height="28" fill="none" viewBox="0 0 32 32">
      <path d="M16 4L4 10v6c0 7.2 5.2 13.9 12 15.6C22.8 29.9 28 23.2 28 16v-6L16 4z" stroke="#C9A227" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M11 16l4 4 6-7" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  career: (
    <svg width="28" height="28" fill="none" viewBox="0 0 32 32">
      <rect x="4" y="6" width="24" height="20" rx="2" stroke="#C9A227" strokeWidth="1.5"/>
      <path d="M10 16l4 4 8-8" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M16 6V4M10 6V4M22 6V4" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  research: (
    <svg width="28" height="28" fill="none" viewBox="0 0 32 32">
      <path d="M5 8h22M5 14h14M5 20h18" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="24" cy="22" r="5" stroke="#C9A227" strokeWidth="1.5"/>
      <path d="M22 22l1.5 1.5L26 20" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  ai: (
    <svg width="28" height="28" fill="none" viewBox="0 0 32 32">
      <rect x="4" y="8" width="24" height="16" rx="2" stroke="#C9A227" strokeWidth="1.5"/>
      <circle cx="16" cy="16" r="4" stroke="#C9A227" strokeWidth="1.5"/>
      <path d="M16 12v-2M16 22v-2M20 16h2M10 16h2" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  coaching: (
    <svg width="28" height="28" fill="none" viewBox="0 0 32 32">
      <circle cx="12" cy="12" r="6" stroke="#C9A227" strokeWidth="1.5"/>
      <circle cx="24" cy="12" r="6" stroke="#C9A227" strokeWidth="1.5"/>
      <path d="M2 30c0-6 4.5-10 10-10M34 30c0-6-4.5-10-10-10M18 20c-3 0-6 2-6 6h12c0-4-3-6-6-6z" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  writing: (
    <svg width="28" height="28" fill="none" viewBox="0 0 32 32">
      <path d="M8 28l4-1 14-14a2.8 2.8 0 000-4 2.8 2.8 0 00-4 0L8 23l-1 5z" stroke="#C9A227" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M6 32h24" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  default: (
    <svg width="28" height="28" fill="none" viewBox="0 0 32 32">
      <path d="M16 4L4 10v6c0 7.2 5.2 13.9 12 15.6C22.8 29.9 28 23.2 28 16v-6L16 4z" stroke="#C9A227" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
};

export default function Services({ services = [] }: { services?: ServiceItem[] }) {
  if (services.length === 0) return null;

  return (
    <section className={`section ${styles.services}`}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-eyebrow">How We Support You</p>
        </div>

        <div className={styles.grid}>
          {services.map((s) => {
            const href = s.href || `/services/${s.id}`;
            const icon = ICONS[s.iconType] || ICONS.default;
            const items = Array.isArray(s.features) ? s.features.slice(0, 4) : [];
            return (
              <div key={s.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.iconWrap}>{icon}</div>
                  <div>
                    <p className={styles.tagline}>{s.description}</p>
                    <h3 className={styles.cardTitle}>{s.title}</h3>
                  </div>
                  <ul className={styles.list}>
                    {items.map((item) => (
                      <li key={item} className={styles.listItem}>
                        <span className={styles.dot} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href={href} className={styles.cta}>
                  Learn more →
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
