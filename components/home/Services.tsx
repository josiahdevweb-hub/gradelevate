import Link from "next/link";
import styles from "./Services.module.css";

const services = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 32 32">
        <path d="M16 4L4 10v6c0 7.2 5.2 13.9 12 15.6C22.8 29.9 28 23.2 28 16v-6L16 4z" stroke="#C9A227" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M11 16l4 4 6-7" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    tagline: "For when you don't know where to start",
    title: "Academic Success",
    items: [
      "Dissertation support",
      "Essay planning and writing",
      "Academic writing",
      "Study skills",
    ],
    href: "/services/academic-success",
    cta: "Get academic support",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 32 32">
        <rect x="4" y="6" width="24" height="20" rx="2" stroke="#C9A227" strokeWidth="1.5"/>
        <path d="M10 16l4 4 8-8" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 6V4M10 6V4M22 6V4" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    tagline: "For graduates ready to take the next step",
    title: "Career Development",
    items: [
      "CV and cover letter support",
      "LinkedIn optimisation",
      "Interview preparation",
      "Graduate job applications",
    ],
    href: "/services/career-development",
    cta: "Start your career journey",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 32 32">
        <path d="M5 8h22M5 14h14M5 20h18" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"/>
        <circle cx="24" cy="22" r="5" stroke="#C9A227" strokeWidth="1.5"/>
        <path d="M22 22l1.5 1.5L26 20" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    tagline: "For researchers who need a thinking partner",
    title: "Research & Postgraduate",
    items: [
      "MA and PhD research proposals",
      "Academic publishing support",
      "How to write your first journal article",
      "PhD viva preparation",
    ],
    href: "/services/research",
    cta: "Explore research support",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 32 32">
        <rect x="4" y="8" width="24" height="16" rx="2" stroke="#C9A227" strokeWidth="1.5"/>
        <circle cx="16" cy="16" r="4" stroke="#C9A227" strokeWidth="1.5"/>
        <path d="M16 12v-2M16 22v-2M20 16h2M10 16h2" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    tagline: "For students who want to work smarter",
    title: "AI & Digital Skills",
    items: [
      "AI research tools",
      "Ethical AI use in academia",
      "AI literacy for academic work",
      "Digital skills for career readiness",
    ],
    href: "/services/ai-digital-skills",
    cta: "Build your digital skills",
  },
];

export default function Services() {
  return (
    <section className={`section ${styles.services}`}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-eyebrow">How We Support You</p>
          {/*<h2 className={styles.title}>
            We&apos;ve been where you are.
          </h2>
          <p className={styles.intro}>
            Behind every service is a team that understands the pressure of deadlines,
            the frustration of not knowing where to start, and what it actually takes
            to turn things around. We don&apos;t just advise — we walk alongside you.
          </p>*/}
        </div>

        <div className={styles.grid}>
          {services.map((s, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.iconWrap}>{s.icon}</div>
                <div>
                  <p className={styles.tagline}>{s.tagline}</p>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                </div>
                <ul className={styles.list}>
                  {s.items.map((item, j) => (
                    <li key={j} className={styles.listItem}>
                      <span className={styles.dot} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href={s.href} className={styles.cta}>
                {s.cta} →
              </Link>
            </div>
          ))}
        </div>

        {/* <div className={styles.quote}>
          <svg className={styles.quoteIcon} width="32" height="24" viewBox="0 0 32 24" fill="none">
            <path d="M0 24v-8.8C0 6.4 5.067 1.6 15.2 0l1.6 3.2C12.267 4.533 9.333 7.733 8.533 12H14.4V24H0zm17.6 0v-8.8C17.6 6.4 22.667 1.6 32.8 0l1.6 3.2c-4.533 1.333-7.467 4.533-8.267 8.8H31.2V24H17.6z" fill="#C9A227" fillOpacity="0.2"/>
          </svg>
          <p className={styles.quoteText}>
            &ldquo;I came to GradElevate with a dissertation I&apos;d barely started and three weeks to go.
            They didn&apos;t panic — they planned. I submitted on time and I actually felt proud of what I handed in.&rdquo;
          </p>
          <p className={styles.quoteAuthor}>— Amara K., MSc Education, University of Birmingham</p>
        </div> */}
      </div>
    </section>
  );
}
