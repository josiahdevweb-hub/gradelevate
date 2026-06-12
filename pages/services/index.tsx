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
    eyebrow: "Service 01",
    title: "Academic Success",
    desc: "Whether you're tackling your undergraduate dissertation, navigating postgraduate coursework, or struggling with academic writing, our expert tutors provide the structured, personalised support you need to perform at your best.",
    features: [
      "1-to-1 academic tutoring across all subjects",
      "Essay, dissertation and assignment support",
      "Academic writing and structuring skills",
      "Critical thinking and argumentation coaching",
      "Exam technique and revision strategy",
      "Referencing, citation and academic integrity",
    ],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
    href: "/services/academic-success",
    reverse: false,
  },
  {
    id: "career-development",
    eyebrow: "Service 02",
    title: "Career Development",
    desc: "Transitioning from academia to the professional world requires more than a degree. We help graduates and early-career professionals build the confidence, skills, and materials needed to secure roles that match their ambitions.",
    features: [
      "CV writing and personal statement coaching",
      "Interview preparation and mock interviews",
      "LinkedIn profile optimisation",
      "Graduate scheme application support",
      "Career planning and goal setting",
      "Professional branding and networking strategy",
    ],
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80",
    href: "/services/career-development",
    reverse: true,
  },
  {
    id: "research",
    eyebrow: "Service 03",
    title: "Research & Postgraduate Support",
    desc: "Research is a discipline in itself. Our postgraduate support service is designed specifically for Masters and PhD students navigating complex research processes, supervisory relationships, and academic publication.",
    features: [
      "Research design and methodology coaching",
      "Literature review guidance and structuring",
      "PhD proposal and thesis development",
      "Academic writing for publication",
      "Data analysis support and interpretation",
      "Supervisory relationship and progress coaching",
    ],
    image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&q=80",
    href: "/services/research",
    reverse: false,
  },
  {
    id: "ai-digital-skills",
    eyebrow: "Service 04",
    title: "AI & Digital Skills",
    desc: "Artificial intelligence is transforming academia and the workplace. We help students and professionals develop the AI literacy and digital skills needed to remain competitive, work responsibly, and embrace innovation.",
    features: [
      "Introduction to AI tools for academic research",
      "Responsible and ethical AI use in study",
      "Digital productivity and workflow optimisation",
      "AI-assisted literature review techniques",
      "Data literacy and visualisation basics",
      "Digital skills for career readiness",
    ],
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
    href: "/services/ai-digital-skills",
    reverse: true,
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
          eyebrow="What We Offer"
          title="Premium Support Across Every Stage of Your Journey"
          subtitle="From undergraduate study to PhD research and professional career development — our services are built around your specific goals."
        />

        {/* Services */}
        {services.map((svc) => (
          <section key={svc.id} className={`${styles.serviceSection} ${svc.reverse ? styles.reverse : ""}`}>
            <div className={`container ${styles.serviceGrid}`}>
              <div className={styles.serviceContent}>
                <p className="section-eyebrow">{svc.eyebrow}</p>
                <h2 className={styles.serviceTitle}>{svc.title}</h2>
                <p className={styles.serviceDesc}>{svc.desc}</p>
                <ul className={styles.featureList}>
                  {svc.features.map((f, i) => (
                    <li key={i} className={styles.featureItem}>
                      <svg width="16" height="16" fill="none" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="7" stroke="#C9A227" strokeWidth="1.2"/>
                        <path d="M5 8l2 2 4-4" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <div className={styles.serviceActions}>
                  <Link href="/book" className="btn-primary">Book a Consultation</Link>
                  <Link href={svc.href} className="btn-gold-outline">Learn More</Link>
                </div>
              </div>
              <div className={styles.serviceImage}>
                <img src={svc.image} alt={svc.title} />
              </div>
            </div>
          </section>
        ))}

        <CtaBanner />
      </main>

      <Footer />
    </>
  );
}
