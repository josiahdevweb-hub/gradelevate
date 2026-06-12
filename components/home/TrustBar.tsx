import styles from "./TrustBar.module.css";

const items = [
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <path d="M16 6L4 12l12 6 12-6-12-6z" stroke="#C9A227" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M4 12v8" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M8 20c0 3.3 3.6 6 8 6s8-2.7 8-6" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
    label: ["University-Level", "Academic Expertise"],
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <path d="M6 6h8v20H6z" stroke="#C9A227" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M18 6h8v20h-8z" stroke="#C9A227" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M8 11h4M8 15h4M20 11h4M20 15h4" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    label: ["Research-Led", "Guidance"],
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <rect x="4" y="12" width="24" height="16" rx="2" stroke="#C9A227" strokeWidth="1.6"/>
        <path d="M11 12V9a5 5 0 0110 0v3" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M12 20h8" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    label: ["Career Development", "Support"],
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="12" stroke="#C9A227" strokeWidth="1.6"/>
        <circle cx="16" cy="13" r="4" stroke="#C9A227" strokeWidth="1.4"/>
        <path d="M9 24c0-3.9 3.1-7 7-7s7 3.1 7 7" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    label: ["1-to-1 Personalised", "Sessions"],
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <rect x="4" y="7" width="24" height="16" rx="2" stroke="#C9A227" strokeWidth="1.6"/>
        <path d="M10 27h12" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M16 23v4" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
    label: ["Online & Flexible", "Learning"],
  },
];

export default function TrustBar() {
  return (
    <div className={styles.trustBar}>
      <div className={styles.inner}>
        {items.map((item, i) => (
          <div key={i} className={styles.itemGroup}>
            <div className={styles.item}>
              <div className={styles.icon}>{item.icon}</div>
              <p className={styles.label}>
                {item.label[0]}<br />{item.label[1]}
              </p>
            </div>
            {i < items.length - 1 && <div className={styles.divider} />}
          </div>
        ))}
      </div>
    </div>
  );
}
