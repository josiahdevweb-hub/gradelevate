import styles from "./Differentiator.module.css";

export default function Differentiator() {
  return (
    <section className={styles.section}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.left}>
          <p className="section-eyebrow">Why GradElevate</p>
          <h2 className={styles.title}>A Different Kind of Academic Support</h2>
          <p className={styles.body}>
            What makes GradElevate unique is the combination of academic leadership experience,
            research expertise, and real-world understanding of how students succeed in higher
            education and beyond.
          </p>
          <p className={styles.highlight}>
            We don't just support assignments, we help you build long-term academic
            confidence, research capability, and career readiness.
          </p>
        </div>
        <div className={styles.right}>
          <div className={styles.statGrid}>
            {[
              { value: "500+", label: "Students Supported" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "15+", label: "Years Academic Experience" },
              { value: "10+", label: "Years Career Development Experience" },
              
            ].map((s, i) => (
              <div key={i} className={styles.stat}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
