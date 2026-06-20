import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CtaBanner from "@/components/home/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import styles from "@/styles/services.module.css";

const API = "https://gradeelevate-backend-production.up.railway.app";

interface Service {
  id: string;
  num: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  href: string;
  iconType: string;
}

const ICONS: Record<string, React.ReactNode> = {
  academic: (
    <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
      <path d="M18 4L4 11l14 7 14-7L18 4z" stroke="#C9A227" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M4 11v10" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M9 24c0 3.5 4 6.5 9 6.5s9-3 9-6.5" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  career: (
    <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
      <rect x="4" y="12" width="28" height="20" rx="2" stroke="#C9A227" strokeWidth="1.6"/>
      <path d="M12 12V9a6 6 0 0112 0v3" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M4 20h28" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
      <circle cx="18" cy="20" r="2.5" fill="#C9A227"/>
    </svg>
  ),
  research: (
    <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
      <circle cx="15" cy="15" r="9" stroke="#C9A227" strokeWidth="1.6"/>
      <path d="M22 22l8 8" stroke="#C9A227" strokeWidth="2" strokeLinecap="round"/>
      <path d="M11 15h8M15 11v8" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  ai: (
    <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
      <rect x="4" y="4" width="28" height="28" rx="3" stroke="#C9A227" strokeWidth="1.6"/>
      <circle cx="18" cy="18" r="5" stroke="#C9A227" strokeWidth="1.4"/>
      <path d="M18 4v5M18 27v5M4 18h5M27 18h5" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  coaching: (
    <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
      <circle cx="12" cy="12" r="6" stroke="#C9A227" strokeWidth="1.6"/>
      <circle cx="24" cy="12" r="6" stroke="#C9A227" strokeWidth="1.6"/>
      <path d="M2 30c0-6 4.5-10 10-10M34 30c0-6-4.5-10-10-10M18 20c-3 0-6 2-6 6h12c0-4-3-6-6-6z" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  writing: (
    <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
      <path d="M8 28l4-1 14-14a2.8 2.8 0 000-4 2.8 2.8 0 00-4 0L8 23l-1 5z" stroke="#C9A227" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M6 32h24" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  default: (
    <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
      <path d="M18 4l3.8 8 8.2 1.2-6 5.8 1.4 8.2L18 23l-7.4 4.2 1.4-8.2-6-5.8 8.2-1.2z" stroke="#C9A227" strokeWidth="1.6" strokeLinejoin="round"/>
    </svg>
  ),
};

export default function Services({ services }: { services: Service[] }) {
  return (
    <>
      <Head>
        <title>Services — GradElevate</title>
        <meta name="description" content="Expert academic, research, and career development services for students, graduates, and researchers." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main>
        <PageHero
          variant="dark"
          eyebrow="What We Offer"
          title="Premium Support Across Every Stage of Your Journey"
          subtitle="From undergraduate study to PhD research and professional career development — our services are built around your specific goals."
        />

        <section className={styles.cardsSection}>
          <div className="container">
            <div className={styles.grid}>
              {services.map((svc) => {
                const href = `/services/${svc.id}`;
                return (
                  <Link key={svc.id} href={href} className={styles.card}>
                    <div className={styles.cardImage}>
                      <img src={svc.imageUrl} alt={svc.title} />
                      <div className={styles.cardOverlay} />
                      <span className={styles.cardNum}>{svc.num}</span>
                    </div>
                    <div className={styles.cardBody}>
                      <div className={styles.cardIcon}>
                        {ICONS[svc.iconType] || ICONS.default}
                      </div>
                      <h2 className={styles.cardTitle}>{svc.title}</h2>
                      <p className={styles.cardDesc}>{svc.description}</p>
                      <ul className={styles.featurePills}>
                        {(Array.isArray(svc.features) ? svc.features : []).map((f) => (
                          <li key={f} className={styles.pill}>{f}</li>
                        ))}
                      </ul>
                      <div className={styles.cardCta}>
                        <span>Explore Service</span>
                        <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
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
    const res = await fetch(`${API}/api/services`);
    const services: Service[] = res.ok ? await res.json() : [];
    return { props: { services } };
  } catch {
    return { props: { services: [] } };
  }
};