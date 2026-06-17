import Head from "next/head";
import { useState } from "react";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CtaBanner from "@/components/home/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import styles from "@/styles/events.module.css";

interface Event {
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

const categories = ["All", "Academic Writing", "Research", "Career Development", "AI & Digital Skills"];
const formats = ["All Formats", "Online Webinar", "Online Workshop", "In-Person", "Hybrid"];

export default function Events({ allEvents }: { allEvents: Event[] }) {
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
          variant="dark"
          eyebrow="Learn, Grow & Connect"
          title="Workshops, Masterclasses & Webinars"
          subtitle="Join our practical events designed to help students, graduates and researchers succeed academically and professionally."
        />

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

        <section className={styles.eventsSection}>
          <div className="container">
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                <p>{allEvents.length === 0 ? "No events scheduled yet. Check back soon." : "No events match your filters. Try adjusting your search."}</p>
              </div>
            ) : (
              <div className={styles.grid}>
                {filtered.map((event) => (
                  <article key={event.id} className={styles.card}>
                    <div className={styles.cardImage}>
                      <img src={event.imageUrl} alt={event.title} />
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
                        <Link href={{ pathname: "/book", query: { event: event.title } }} className={styles.cardBtn}>
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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const API = "https://gradeelevate-backend-production.up.railway.app";
    const res = await fetch(`${API}/api/events`);
    const allEvents: Event[] = res.ok ? await res.json() : [];
    return { props: { allEvents } };
  } catch {
    return { props: { allEvents: [] } };
  }
};
