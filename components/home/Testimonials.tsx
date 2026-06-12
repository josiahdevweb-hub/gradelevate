import { useState } from "react";
import styles from "./Testimonials.module.css";

const testimonials = [
  {
    text: "The dissertation support completely changed my approach to academic writing. The structured guidance helped me improve my confidence and final result significantly.",
    name: "Master's Student",
    role: "University of Birmingham",
    stars: 5,
  },
  {
    text: "The CV and interview support helped me secure my dream graduate role. I'd highly recommend GradElevate to anyone navigating the transition from university to career.",
    name: "Recent Graduate",
    role: "Brunel University",
    stars: 5,
  },
  {
    text: "The academic writing support completely changed my approach to essays and research reports. Within two sessions I had a framework that I now apply to all my assignments.",
    name: "PhD Researcher",
    role: "King's College London",
    stars: 5,
  },
  {
    text: "As an international student, I found academic expectations really challenging at first. GradElevate gave me practical skills and confidence I couldn't get anywhere else.",
    name: "International Postgraduate",
    role: "University of Manchester",
    stars: 5,
  },
  {
    text: "The research proposal support was exceptional. My supervisor commented that my proposal was one of the strongest she had seen from a first-year doctoral student.",
    name: "Doctoral Student",
    role: "University of Leeds",
    stars: 5,
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive((a) => (a + 1) % testimonials.length);

  return (
    <section className={`section ${styles.section}`}>
      <div className="container">
        <div className={styles.header}>
          <p className="section-eyebrow">What Students Are Saying</p>
          <h2 className={styles.title}>Trusted by Students Across the UK</h2>
        </div>

        <div className={styles.carousel}>
          <div className={styles.track} style={{ transform: `translateX(-${active * 100}%)` }}>
            {testimonials.map((t, i) => (
              <div key={i} className={styles.slide}>
                <div className={styles.card}>
                  <div className={styles.stars}>
                    {"★".repeat(t.stars)}
                    {"☆".repeat(5 - t.stars)}
                  </div>
                  <p className={styles.quote}>"{t.text}"</p>
                  <div className={styles.author}>
                    <div className={styles.avatar}>{t.name[0]}</div>
                    <div>
                      <p className={styles.name}>{t.name}</p>
                      <p className={styles.role}>{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className={`${styles.arrow} ${styles.arrowLeft}`} onClick={prev} aria-label="Previous">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M13 16l-6-6 6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next">
            <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
              <path d="M7 4l6 6-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.dots}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
              onClick={() => setActive(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
