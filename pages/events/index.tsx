import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CtaBanner from "@/components/home/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import styles from "@/styles/events.module.css";

const allEvents = [
  {
    id: "dissertation-masterclass",
    title: "Dissertation Writing Masterclass",
    category: "Academic Writing",
    format: "Online Webinar",
    duration: "3 hours",
    price: "£49",
    date: "14 Jul 2026",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
    spots: 12,
  },
  {
    id: "phd-proposal-workshop",
    title: "PhD Proposal Development Workshop",
    category: "Research",
    format: "Online Workshop",
    duration: "4 hours",
    price: "£79",
    date: "21 Jul 2026",
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=600&q=80",
    spots: 8,
  },
  {
    id: "ai-research",
    title: "Using AI Responsibly in Research",
    category: "AI & Digital Skills",
    format: "Online Webinar",
    duration: "2 hours",
    price: "Free",
    date: "28 Jul 2026",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
    spots: 40,
  },
  {
    id: "academic-writing",
    title: "Academic Writing Intensive",
    category: "Academic Writing",
    format: "In-Person",
    duration: "Full Day",
    price: "£129",
    date: "4 Aug 2026",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&q=80",
    spots: 15,
  },
  {
    id: "literature-review",
    title: "Literature Review Masterclass",
    category: "Research",
    format: "Online Workshop",
    duration: "3 hours",
    price: "£49",
    date: "11 Aug 2026",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&q=80",
    spots: 20,
  },
  {
    id: "employability-bootcamp",
    title: "Graduate Employability Bootcamp",
    category: "Career Development",
    format: "Hybrid",
    duration: "Full Day",
    price: "£99",
    date: "18 Aug 2026",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&q=80",
    spots: 25,
  },
];

const categories = ["All", "Academic Writing", "Research", "Career Development", "AI & Digital Skills"];
const formats = ["All Formats", "Online Webinar", "Online Workshop", "In-Person", "Hybrid"];

export default function Events() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeFormat, setActiveFormat] = useState("All Formats");
  const [search, setSearch] = useState("");

  const filtered = allEvents.filter((e) => {
    const matchCat = activeCategory === "All" || e.category === activeCategory;
    const matchFmt = activeFormat === "All Formats" || e.format === activeFormat;
    const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchFmt && matchSearch;
  });

  return (
    <>
      <Head>
        <title>Events — GradElevate</title>
        <meta name="description" content="Join our practical workshops, masterclasses and webinars designed to help students, graduates and researchers succeed." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main>
        <PageHero
          eyebrow="Learn, Grow & Connect"
          title="Workshops, Masterclasses & Webinars"
          subtitle="Join our practical events designed to help students, graduates and researchers succeed academically and professionally."
        />

        {/* Filters */}
        <div className={styles.filterBar}>
          <div className="container">
            <div className={styles.filterInner}>
              <div className={styles.searchWrap}>
                <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                  <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.4"/>
                  <path d="M11 11l3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                </svg>
                <input
                  type="text"
                  placeholder="Search events..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
              <div className={styles.filterGroups}>
                <div className={styles.pills}>
                  {categories.map((c) => (
                    <button
                      key={c}
                      className={`${styles.pill} ${activeCategory === c ? styles.pillActive : ""}`}
                      onClick={() => setActiveCategory(c)}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <select
                  className={styles.select}
                  value={activeFormat}
                  onChange={(e) => setActiveFormat(e.target.value)}
                >
                  {formats.map((f) => <option key={f}>{f}</option>)}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Events grid */}
        <section className={styles.eventsSection}>
          <div className="container">
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <p>No events match your filters. Try adjusting your search.</p>
              </div>
            ) : (
              <div className={styles.grid}>
                {filtered.map((event) => (
                  <article key={event.id} className={styles.card}>
                    <div className={styles.cardImage}>
                      <img src={event.image} alt={event.title} />
                      <span className={styles.categoryTag}>{event.category}</span>
                    </div>
                    <div className={styles.cardBody}>
                      <h3 className={styles.cardTitle}>{event.title}</h3>
                      <div className={styles.cardMeta}>
                        <span className={styles.metaItem}>
                          <svg width="13" height="13" fill="none" viewBox="0 0 13 13">
                            <rect x="1" y="2" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                            <path d="M1 5h11M4.5 1v2M8.5 1v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                          </svg>
                          {event.date}
                        </span>
                        <span className={styles.metaItem}>
                          <svg width="13" height="13" fill="none" viewBox="0 0 13 13">
                            <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
                            <path d="M6.5 4v2.5l2 1" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          {event.duration}
                        </span>
                        <span className={styles.metaItem}>
                          <svg width="13" height="13" fill="none" viewBox="0 0 13 13">
                            <path d="M2 4.5h9M2 8.5h9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                            <rect x="1" y="1" width="11" height="11" rx="1" stroke="currentColor" strokeWidth="1.2"/>
                          </svg>
                          {event.format}
                        </span>
                      </div>
                      <div className={styles.cardFooter}>
                        <div>
                          <span className={styles.price}>{event.price}</span>
                          <span className={styles.spots}>{event.spots} spots left</span>
                        </div>
                        <Link href={`/events/${event.id}`} className={styles.cardBtn}>
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <CtaBanner />
      </main>

      <Footer />
    </>
  );
}
