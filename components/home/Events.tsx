import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import styles from "./Events.module.css";

const events = [
  {
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&q=70",
    title: "MA Dissertation Writing Masterclass",
    format: "Online Live Workshop",
    duration: "3 hours",
    price: "£49",
    date: "Sat, 15 Jun 2024",
    time: "10:00 AM – 1:00 PM",
    cta: "Reserve Your Place",
    ctaStyle: "outline",
  },
  {
    img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&q=70",
    title: "PhD Proposal Development Workshop",
    format: "Hybrid",
    duration: "Half Day",
    price: "£99",
    date: "Sat, 22 Jun 2024",
    time: "10:00 AM – 2:30 PM",
    cta: "Book Now",
    ctaStyle: "primary",
  },
  {
    img: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&q=70",
    title: "Using AI Responsibly in Research",
    format: "In-Person",
    duration: "3 hours",
    price: "£38",
    date: "Thu, 27 Jun 2024",
    time: "7:00 PM – 9:00 PM",
    cta: "Register",
    ctaStyle: "outline",
  },
  {
    img: "https://images.unsplash.com/photo-1455849318743-b2233052fcff?w=400&q=70",
    title: "Academic Writing Excellence",
    format: "In-Person",
    duration: "Full Day",
    price: "£104",
    date: "Sat, 8 Jul 2024",
    time: "9:00 AM – 4:30 PM",
    cta: "Reserve Your Place",
    ctaStyle: "outline",
  },
  {
    img: "https://images.unsplash.com/photo-1507537297725-24a1c029d3ca?w=400&q=70",
    title: "Graduate Employability Bootcamp",
    format: "Hybrid",
    duration: "Full Day",
    price: "£89",
    date: "Sat, 13 Jul 2024",
    time: "10:00 AM – 4:00 PM",
    cta: "Register",
    ctaStyle: "outline",
  },
  {
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=70",
    title: "Literature Review Masterclass",
    format: "Online Workshop",
    duration: "3 hours",
    price: "£45",
    date: "Thu, 18 Jul 2024",
    time: "6:00 PM – 9:00 PM",
    cta: "Book Now",
    ctaStyle: "primary",
  },
];

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

export default function Events() {
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
    const next = maxIndex === 0 ? 0 : ((i % (maxIndex + 1)) + (maxIndex + 1)) % (maxIndex + 1);
    setIndex(next);
    if (trackRef.current) {
      const card = trackRef.current.children[next] as HTMLElement;
      if (card) {
        trackRef.current.style.transform = `translateX(-${card.offsetLeft}px)`;
      }
    }
  }, [maxIndex]);

  // Auto-play: advance every AUTOPLAY_INTERVAL ms, wraps around
  useEffect(() => {
    if (paused) return;
    timerRef.current = setTimeout(() => goTo(index + 1), AUTOPLAY_INTERVAL);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [index, paused, goTo]);

  // Manual navigation: reset timer by briefly pausing then resuming
  const manualGoTo = (i: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    goTo(i);
  };

  // Clamp index when perView changes (e.g. on resize)
  useEffect(() => {
    if (index > maxIndex) goTo(maxIndex);
  }, [maxIndex, index, goTo]);

  return (
    <section
      className={`section ${styles.events}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container">
        {/* Header */}
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

        {/* Carousel */}
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
            {events.map((e, i) => (
              <div key={i} className={styles.card}>
                <div className={styles.imgWrap}>
                  <img src={e.img} alt={e.title} className={styles.img} loading="lazy" />
                  <span className={styles.formatBadge}>{e.format}</span>
                </div>
                <div className={styles.cardBody}>
                  <h3 className={styles.cardTitle}>{e.title}</h3>
                  <div className={styles.meta}>
                    <span className={styles.metaItem}>
                      {formatIcon} {e.format}
                    </span>
                    <span className={styles.metaItem}>
                      {calIcon} {e.duration}
                    </span>
                    <span className={`${styles.metaItem} ${styles.price}`}>
                      {priceIcon} {e.price}
                    </span>
                  </div>
                  <div className={styles.dateRow}>
                    <svg width="13" height="13" fill="none" viewBox="0 0 13 13">
                      <rect x="1.5" y="2.5" width="10" height="9" rx="1" stroke="#C9A227" strokeWidth="1.2"/>
                      <path d="M1.5 6h10M4.5 1v3M8.5 1v3" stroke="#C9A227" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span>{e.date}</span>
                    <span className={styles.time}>{e.time}</span>
                  </div>
                  <Link
                    href={{ pathname: "/book", query: { event: e.title } }}
                    className={e.ctaStyle === "primary" ? "btn-primary" : styles.cardCta}
                  >
                    {e.cta}
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

        {/* Dots */}
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
