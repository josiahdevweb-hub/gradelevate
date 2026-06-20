import Head from "next/head";
import Link from "next/link";
import { GetServerSideProps } from "next";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CtaBanner from "@/components/home/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import styles from "@/styles/serviceDetail.module.css";

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

export default function ServiceDetail({ service }: { service: Service }) {
  return (
    <>
      <Head>
        <title>{service.title} — GradElevate</title>
        <meta name="description" content={service.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main>
        <PageHero
          variant="dark"
          eyebrow={`Service ${service.num || ""}`}
          title={service.title}
          subtitle={service.description}
        />
        <section className={styles.body}>
          <div className="container">
            <div className={styles.layout}>
              {service.imageUrl && (
                <div className={styles.imageWrap}>
                  <img src={service.imageUrl} alt={service.title} className={styles.image} />
                </div>
              )}
              {service.features && service.features.length > 0 && (
                <div className={styles.featuresBlock}>
                  <h2 className={styles.featuresTitle}>What&apos;s Included</h2>
                  <ul className={styles.featuresList}>
                    {service.features.map((f) => (
                      <li key={f} className={styles.featureItem}>
                        <svg width="18" height="18" fill="none" viewBox="0 0 18 18">
                          <circle cx="9" cy="9" r="8" stroke="#C9A227" strokeWidth="1.3"/>
                          <path d="M6 9l2.5 2.5 4-4" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              <div className={styles.ctaBlock}>
                <Link href={`/book?service=${encodeURIComponent(service.title)}`} className={styles.ctaBtn}>
                  Book a Consultation
                </Link>
                <Link href="/services" className={styles.backLink}>
                  ← Back to all services
                </Link>
              </div>
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
    const res = await fetch(`${API}/api/services/research`);
    if (!res.ok) return { notFound: true };
    const service: Service = await res.json();
    return { props: { service } };
  } catch {
    return { notFound: true };
  }
};