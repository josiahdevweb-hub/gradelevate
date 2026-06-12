import styles from "./HowItWorks.module.css";

const steps = [
  {
    icon: (
      <svg width="34" height="34" fill="none" viewBox="0 0 34 34">
        <rect x="4" y="6" width="26" height="22" rx="2" stroke="#C9A227" strokeWidth="1.5"/>
        <path d="M4 12h26" stroke="#C9A227" strokeWidth="1.5"/>
        <path d="M11 4v4M23 4v4" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 19h6M10 24h10" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Book a Free Consultation",
    desc: "Discuss your goals and challenges.",
  },
  {
    icon: (
      <svg width="34" height="34" fill="none" viewBox="0 0 34 34">
        <rect x="7" y="3" width="20" height="28" rx="2" stroke="#C9A227" strokeWidth="1.5"/>
        <path d="M12 11h10M12 16h10M12 21h6" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Get a Personalised Plan",
    desc: "We design support tailored to your needs.",
  },
  {
    icon: (
      <svg width="34" height="34" fill="none" viewBox="0 0 34 34">
        <path d="M4 27h26" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 27V18" stroke="#C9A227" strokeWidth="2" strokeLinecap="round"/>
        <path d="M14 27V14" stroke="#C9A227" strokeWidth="2" strokeLinecap="round"/>
        <path d="M20 27V10" stroke="#C9A227" strokeWidth="2" strokeLinecap="round"/>
        <path d="M26 27V6" stroke="#C9A227" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Start Your Progress Journey",
    desc: "Work with expert guidance to achieve results.",
  },
];

export default function HowItWorks() {
  return (
    <section className={styles.section}>
      <div className="container">
        <p className={`section-eyebrow ${styles.eyebrow}`}>Simple, Structured Support</p>

        <div className={styles.steps}>
          {steps.map((step, i) => (
            <div key={i} className={styles.step}>
              {/* numbered circle + dashed connector */}
              <div className={styles.circleRow}>
                <div className={styles.numCircle}>{i + 1}</div>
                {i < steps.length - 1 && (
                  <div className={styles.connector}>
                    <div className={styles.arrowHead} />
                  </div>
                )}
              </div>

              <div className={styles.iconWrap}>{step.icon}</div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
