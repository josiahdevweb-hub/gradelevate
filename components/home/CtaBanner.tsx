import Link from "next/link";
import styles from "./CtaBanner.module.css";

export default function CtaBanner() {
  return (
    <section className={styles.section}>
      <div className={styles.bg} />
      <div className={styles.overlay} />
      <div className={`container ${styles.content}`}>
        <p className="section-eyebrow">Take the Next Step</p>
        <h2 className={styles.title}>
          Ready to Elevate Your<br />Academic Journey?
        </h2>
        <p className={styles.sub}>
          Book a free consultation and take the next step towards
          academic success and career confidence.
        </p>
        <Link href="/book" className="btn-primary">
          Book Your Free Consultation
        </Link>
      </div>
    </section>
  );
}
