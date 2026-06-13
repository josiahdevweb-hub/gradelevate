import Link from "next/link";
import Image from "next/image";
import styles from "./Hero.module.css";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.bgWrap}>
        <Image
          src="/wide.jpg"
          alt="Diverse graduates in academic gowns"
          fill
          priority
          quality={90}
          style={{ objectFit: "cover", objectPosition: "center 30%" }}
        />
      </div>

      <div className={styles.overlay} />

      <div className={styles.content}>
        <h1 className={styles.headline}>
          Elevate Your<br />
          Academic Journey.<br />
          <span className={styles.accentLine}>Accelerate Your Career.</span>
        </h1>

        <p className={styles.sub}>
          Expert academic, research, and career support for students, graduates,
          and early-career researchers ready to achieve more.
        </p>

        <div className={styles.ctas}>
          <Link href="/book" className={styles.ctaPrimary}>
            Book a Free Consultation
          </Link>
          <Link href="/services" className={styles.ctaOutline}>
            Explore Services
          </Link>
        </div>

        <div className={styles.badge}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <path
              d="M7.5 1.5L2 3.5V7.5C2 10.5 4.5 13.2 7.5 14C10.5 13.2 13 10.5 13 7.5V3.5L7.5 1.5Z"
              stroke="#C9A227"
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
            <path
              d="M5.5 7.5L6.8 8.8L9.5 6"
              stroke="#C9A227"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Trusted support for undergraduate, postgraduate, and PhD success.
        </div>
      </div>
    </section>
  );
}
