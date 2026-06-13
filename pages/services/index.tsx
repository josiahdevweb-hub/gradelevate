import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CtaBanner from "@/components/home/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import styles from "@/styles/services.module.css";

const services = [
  {
    id: "academic-success",
    num: "01",
    title: "Academic Success",
    desc: "Expert tutoring, essay support, and academic writing coaching for undergraduate and postgraduate students who want to perform at their very best.",
    features: ["1-to-1 tutoring", "Dissertation support", "Academic writing", "Exam technique"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&q=80",
    href: "/services/academic-success",
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
        <path d="M18 4L4 11l14 7 14-7L18 4z" stroke="#C9A227" strokeWidth="1.6" strokeLinejoin="round"/>
        <path d="M4 11v10" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M9 24c0 3.5 4 6.5 9 6.5s9-3 9-6.5" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "career-development",
    num: "02",
    title: "Career Development",
    desc: "CV coaching, interview preparation, and career planning support to help graduates and early-career professionals land the roles they deserve.",
    features: ["CV & cover letter writing", "Interview coaching", "LinkedIn optimisation", "Graduate schemes"],
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=700&q=80",
    href: "/services/career-development",
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
        <rect x="4" y="12" width="28" height="20" rx="2" stroke="#C9A227" strokeWidth="1.6"/>
        <path d="M12 12V9a6 6 0 0112 0v3" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round"/>
        <path d="M4 20h28" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
        <circle cx="18" cy="20" r="2.5" fill="#C9A227"/>
      </svg>
    ),
  },
  {
    id: "research",
    num: "03",
    title: "Research & Postgraduate Support",
    desc: "Specialist coaching for Masters and PhD researchers — from proposal development and literature reviews to thesis writing and academic publication.",
    features: ["Research design", "PhD proposal writing", "Literature review", "Thesis development"],
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=700&q=80",
    href: "/services/research",
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
        <circle cx="15" cy="15" r="9" stroke="#C9A227" strokeWidth="1.6"/>
        <path d="M22 22l8 8" stroke="#C9A227" strokeWidth="2" strokeLinecap="round"/>
        <path d="M11 15h8M15 11v8" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "ai-digital-skills",
    num: "04",
    title: "AI & Digital Skills",
    desc: "Develop the AI literacy and digital skills essential for modern academic study and professional success — used responsibly and strategically.",
    features: ["AI research tools", "Ethical AI use", "Digital productivity", "Data literacy"],
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=700&q=80",
    href: "/services/ai-digital-skills",
    icon: (
      <svg width="36" height="36" fill="none" viewBox="0 0 36 36">
        <rect x="4" y="4" width="28" height="28" rx="3" stroke="#C9A227" strokeWidth="1.6"/>
        <circle cx="18" cy="18" r="5" stroke="#C9A227" strokeWidth="1.4"/>
        <path d="M18 4v5M18 27v5M4 18h5M27 18h5" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
      </svg>
    ),
  },
];

export default function Services() {
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
              {services.map((svc) => (
                <Link key={svc.id} href={svc.href} className={styles.card}>
                  <div className={styles.cardImage}>
                    <img src={svc.image} alt={svc.title} />
                    <div className={styles.cardOverlay} />
                    <span className={styles.cardNum}>{svc.num}</span>
                  </div>
                  <div className={styles.cardBody}>
                    <div className={styles.cardIcon}>{svc.icon}</div>
                    <h2 className={styles.cardTitle}>{svc.title}</h2>
                    <p className={styles.cardDesc}>{svc.desc}</p>
                    <ul className={styles.featurePills}>
                      {svc.features.map((f) => (
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
              ))}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      <Footer />
    </>
  );
}
