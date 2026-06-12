import styles from "./PageHero.module.css";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}

export default function PageHero({ eyebrow, title, subtitle }: PageHeroProps) {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={`container ${styles.content}`}>
        {eyebrow && <p className="section-eyebrow">{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.sub}>{subtitle}</p>}
      </div>
    </section>
  );
}
