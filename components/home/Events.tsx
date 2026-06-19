import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./Events.module.css";

interface EventItem {
  id: string;
  title: string;
  category: string;
  format: string;
  duration: string;
  price: string;
  date: string;
  imageUrl: string;
  spots: number;
}

const formatIcon = (
  <svg width="13" height="13" fill="none" viewBox="0 0 13 13">
    <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M6.5 3.5v3l2 1.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const calIcon = (
  <svg width="13" height="13" fill="none" viewBox="0 0 13 13">
    <rect x="1.5" y="2.5" width="10" height="9" rx="1" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M1.5 6h10M4.5 1v3M8.5 1v3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const priceIcon = (
  <svg width="13" height="13" fill="none" viewBox="0 0 13 13">
    <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
    <path d="M6.5 4v5M4.5 5.5h3a1 1 0 010 2h-3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

const AUTOPLAY_INTERVAL = 4000;

export default function Events({ events = [] }: { events?: EventItem[] }) {
  const [index, setIndex] = useState(0);
  const [perView, setPerView] = useState(3);
  const [paused, setPaused] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = events.length;
  const maxIndex = Math.max(0, total - perView);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setPerView(1);
      else if (window.innerWidth < 1024) setPerView(2);
      else setPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const goTo = useCallback((i: number) => {
    if (total === 0) return;
    const next = maxIndex === 0 ? 0 : ((i % (maxIndex + 1)) + (maxIndex + 1)) % (maxIndex + 1);
    setIndex(next);
    if (trackRef.current) {
      const card = trackRef.current.children[next] as HTMLElement;
      if (card) {
        trackRef.current.style.transform = `translateX(-${card.offsetLeft}px)`;
      }
    }
  }, [maxIndex, total]);

  useEffect(() => {
    if (paused || total === 0) return;
    timerRef.current = setTimeout(() => goTo(index + 1), AUTOPLAY_INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [index, paused, goTo, total]);

  const manualGoTo = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    goTo(i);
  };

  useEffect(() => {
    if (index > maxIndex) goTo(maxIndex);
  }, [maxIndex, index, goTo]);

  if (total === 0) {
    return (
      <section className={`section ${styles.events}`}>
        <div className="container">
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <p className="section-eyebrow">Upcoming Events</p>
              <h2 className={styles.title}>Learn, Grow, and Connect</h2>
              <p className={styles.sub}>
                Join our practical workshops, masterclasses, and webinars
                designed to help you succeed academically and professionally.
              </p>
            </div>
          </div>
          <p style={{ color: "#64748b", fontSize: "0.95rem", textAlign: "center", padding: "40px 0" }}>
            No upcoming events at this time. Check back soon.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`section ${styles.events}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <p className="section-eyebrow">Upcoming Events</p>
            <h2 className={styles.title}>Learn, Grow, and Connect</h2>
            <p className={styles.sub}>
              Join our practical workshops, masterclasses, and webinars
              designed to help you succeed academically and professionally.
            </p>
          </div>
          <div className={styles.headerRight}>
            <Link href="/events" className="btn-gold-outline">
              View All Events →
            </Link>
            <div className={styles.arrows}>
              <button
                className={styles.arrowBtn}
                onClick={() => manualGoTo(index - 1)}
                aria-label="Previous"
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                  <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                className={styles.arrowBtn}
                onClick={() => manualGoTo(index + 1)}
                aria-label="Next"
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                  <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.carouselOuter}>
          <button
            className={`${styles.arrowBtn} ${styles.arrowSideLeft}`}
            onClick={() => manualGoTo(index - 1)}
            aria-label="Previous"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
              <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className={styles.carouselViewport}>
            <div className={styles.carouselTrack} ref={trackRef}>
              {events.map((e) => (
                <div key={e.id} className={styles.card}>
                  <div className={styles.imgWrap}>
                    <img src={e.imageUrl} alt={e.title} className={styles.img} loading="lazy" />
                    <span className={styles.formatBadge}>{e.format}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{e.title}</h3>
                    <div className={styles.meta}>
                      <span className={styles.metaItem}>
                        {formatIcon} {e.format}
                      </span>
                      {e.duration && (
                        <span className={styles.metaItem}>
                          {calIcon} {e.duration}
                        </span>
                      )}
                      {e.price && (
                        <span className={`${styles.metaItem} ${styles.price}`}>
                          {priceIcon} {e.price}
                        </span>
                      )}
                    </div>
                    {e.date && (
                      <div className={styles.dateRow}>
                        <svg width="13" height="13" fill="none" viewBox="0 0 13 13">
                          <rect x="1.5" y="2.5" width="10" height="9" rx="1" stroke="#C9A227" strokeWidth="1.2"/>
                          <path d="M1.5 6h10M4.5 1v3M8.5 1v3" stroke="#C9A227" strokeWidth="1.2" strokeLinecap="round"/>
                        </svg>
                        <span>{e.date}</span>
                        {e.spots != null && e.spots > 0 && (
                          <span className={styles.time}>{e.spots} spots left</span>
                        )}
                      </div>
                    )}
                    <Link
                      href={{ pathname: "/book", query: { event: e.title } }}
                      className={styles.cardCta}
                    >
                      Book Now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className={`${styles.arrowBtn} ${styles.arrowSideRight}`}
            onClick={() => manualGoTo(index + 1)}
            aria-label="Next"
          >
            <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
              <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className={styles.dots}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              onClick={() => manualGoTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
