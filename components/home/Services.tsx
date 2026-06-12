import Link from "next/link";
import styles from "./Services.module.css";

const services = [
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <path d="M16 4L4 10v6c0 7.2 5.2 13.9 12 15.6C22.8 29.9 28 23.2 28 16v-6L16 4z" stroke="#C9A227" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M11 16l4 4 6-7" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Academic Success",
    items: [
      "Dissertation support",
      "Academic writing development",
      "Study skills and planning",
      "Research methods guidance",
    ],
    href: "/services/academic-success",
    cta: "Explore Academic Support",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <rect x="4" y="6" width="24" height="20" rx="2" stroke="#C9A227" strokeWidth="1.5"/>
        <path d="M10 16l4 4 8-8" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 6V4M10 6V4M22 6V4" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Career Development",
    items: [
      "CV and cover letter support",
      "LinkedIn optimisation",
      "Interview preparation",
      "Graduate applications",
    ],
    href: "/services/career-development",
    cta: "Explore Career Support",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <path d="M5 8h22M5 14h14M5 20h18" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="22" r="5" stroke="#C9A227" strokeWidth="1.5"/>
        <path d="M22 22l1.5 1.5L26 20" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Research & Postgraduate Support",
    items: [
      "Masters and PhD guidance",
      "Research proposal development",
      "Academic publishing support",
      "Literature review assistance",
    ],
    href: "/services/research",
    cta: "Explore Research Support",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <rect x="4" y="8" width="24" height="16" rx="2" stroke="#C9A227" strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="4" stroke="#C9A227" strokeWidth="1.5"/>
        <path d="M16 12v-2M16 22v-2M20 16h2M10 16h2" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "AI & Digital Skills",
    items: [
      "AI for academic work",
      "Responsible AI literacy",
      "Productivity tools for students",
      "Digital research skills",
    ],
    href: "/services/ai-digital-skills",
    cta: "Explore AI Skills",
  },
];

export default function Services() {
  return (
    <section className={`section ${styles.services}`}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-eyebrow">How We Support You</p>
          <h2 className={styles.title}>
            Comprehensive Support<br />Across Every Stage
          </h2>
        </div>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrap}>{s.icon}</div>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <ul className={styles.list}>
                  {s.items.map((item, j) => (
                    <li key={j} className={styles.listItem}>
                      <span className={styles.dot} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href={s.href} className="btn-gold-outline">
                {s.cta} →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
