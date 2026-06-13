import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./AnnouncementPopup.module.css";

interface Announcement {
  active: boolean;
  title: string;
  body: string;
  ctaText?: string;
  ctaLink?: string;
  image?: string;
  updatedAt: string;
}

export default function AnnouncementPopup({ announcement }: { announcement: Announcement | null }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!announcement?.active) return;
    const key = `popup_dismissed_${announcement.updatedAt}`;
    if (localStorage.getItem(key)) return;
    const t = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(t);
  }, [announcement]);

  const dismiss = () => {
    if (!announcement) return;
    localStorage.setItem(`popup_dismissed_${announcement.updatedAt}`, "1");
    setVisible(false);
  };

  if (!visible || !announcement?.active) return null;

  const hasImage = !!announcement.image;

  return (
    <div className={styles.backdrop} onClick={dismiss}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>

        {hasImage && (
          <div className={styles.imgWrap}>
            <img src={announcement.image} alt="" className={styles.img} />
            <div className={styles.imgOverlay} />
          </div>
        )}

        <button
          className={`${styles.close} ${hasImage ? styles.closeOnImage : ""}`}
          onClick={dismiss}
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
        </button>

        <div className={styles.content}>
          <p className={styles.eyebrow}>Update</p>
          <h3 className={styles.title}>{announcement.title}</h3>
          <p className={styles.body}>{announcement.body}</p>

          {announcement.ctaText && announcement.ctaLink && (
            <Link href={announcement.ctaLink} className={styles.cta} onClick={dismiss}>
              {announcement.ctaText} →
            </Link>
          )}

          <button className={styles.dismiss} onClick={dismiss}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
