import styles from "./Founder.module.css";

const credentials = [
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <path d="M14 4L3 9.5l11 5.5 11-5.5L14 4z" stroke="#C9A227" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M3 9.5v7" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M7 18c0 2.8 3.1 5 7 5s7-2.2 7-5" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    label: "Senior Academic\nLeadership Experience",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <path d="M5 5h7v18H5z" stroke="#C9A227" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M16 5h7v18h-7z" stroke="#C9A227" strokeWidth="1.4" strokeLinejoin="round"/>
        <path d="M7 10h3M7 13h3M18 10h3M18 13h3" stroke="#C9A227" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
    ),
    label: "Postgraduate\nSupervision Experience",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <path d="M4 23h20" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
        <path d="M7 23V16M12 23V12M17 23V8M22 23V5" stroke="#C9A227" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    label: "Research & Int'l\nLeadership Background",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
        <circle cx="14" cy="14" r="10" stroke="#C9A227" strokeWidth="1.4"/>
        <ellipse cx="14" cy="14" rx="4" ry="10" stroke="#C9A227" strokeWidth="1.2"/>
        <path d="M4 14h20" stroke="#C9A227" strokeWidth="1.2" strokeLinecap="round"/>
        <path d="M5.5 9h17M5.5 19h17" stroke="#C9A227" strokeWidth="1" strokeLinecap="round"/>
      </svg>
    ),
    label: "International Academic\nCollaboration",
  },
];

const testimonials = [
  {
    text: "Clear, structured guidance that improved my dissertation confidence and final result.",
    label: "Master's Student",
    stars: 5,
  },
  {
    text: "The CV and interview support helped me secure my dream graduate role.",
    label: "Recent Graduate",
    stars: 5,
  },
  {
    text: "The academic writing support completely changed my approach to research.",
    label: "PhD Student",
    stars: 5,
  },
];

export default function Founder() {
  return (
    <section className={styles.section}>
      {/* Left: full-bleed dark image panel */}
      <div className={styles.imgPanel}>
        <img
          src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&q=80"
          alt="Academic workspace"
          className={styles.img}
        />
        <div className={styles.logoCard}>
          <span className={styles.logoMark}>🎓</span>
          <div>
            <p className={styles.logoName}>GradElevate</p>
            <p className={styles.logoSub}>ELEVATE. ACHIEVE. SUCCEED.</p>
          </div>
        </div>
      </div>

      {/* Right: white content + testimonials */}
      <div className={styles.rightPanel}>
        {/* Middle: text + credentials */}
        <div className={styles.contentSide}>
          <p className="section-eyebrow">Learn From Experience</p>
          <h2 className={styles.title}>
            Learn from Experienced<br />Academic Leadership
          </h2>
          <p className={styles.body}>
            GradElevate is led by an experienced academic with senior leadership
            roles in higher education, extensive postgraduate teaching experience,
            and a strong background in research, curriculum development, and
            international collaboration.
          </p>

          <div className={styles.credentials}>
            {credentials.map((c, i) => (
              <div key={i} className={styles.credential}>
                <div className={styles.credIcon}>{c.icon}</div>
                <p className={styles.credLabel}>
                  {c.label.split("\n").map((line, j) => (
                    <span key={j}>{line}{j === 0 && <br />}</span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: testimonials */}
        <div className={styles.testimonialsSide}>
          <p className={styles.testimonialsHeader}>What Students Are Saying</p>
          <div className={styles.testimonialsList}>
            {testimonials.map((t, i) => (
              <div key={i} className={styles.testimonialCard}>
                <p className={styles.testimonialText}>"{t.text}"</p>
                <div className={styles.stars}>{"★".repeat(t.stars)}</div>
                <p className={styles.testimonialLabel}>— {t.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
