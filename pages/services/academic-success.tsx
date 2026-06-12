import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CtaBanner from "@/components/home/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import s from "@/styles/service-detail.module.css";

const features = [
  {
    title: "1-to-1 Academic Tutoring",
    desc: "Personalised tutoring sessions across all undergraduate and postgraduate subject areas, tailored to your level and learning style.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="11" cy="7" r="4" stroke="#C9A227" strokeWidth="1.4"/><path d="M3 19c0-4 3.6-7 8-7s8 3 8 7" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  },
  {
    title: "Dissertation & Thesis Support",
    desc: "From proposal to final submission — expert guidance on structure, argumentation, research methodology, and academic writing conventions.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><rect x="3" y="2" width="16" height="18" rx="1.5" stroke="#C9A227" strokeWidth="1.4"/><path d="M7 7h8M7 11h8M7 15h5" stroke="#C9A227" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  },
  {
    title: "Essay & Assignment Writing",
    desc: "Coaching on how to interpret essay questions, build structured arguments, and write clearly at the level expected for your programme.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M4 17L8 13l3 3 7-7" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="2" width="18" height="18" rx="2" stroke="#C9A227" strokeWidth="1.4"/></svg>,
  },
  {
    title: "Academic Writing Skills",
    desc: "Develop the clarity, precision, and critical voice that examiners expect — including sentence structure, paragraph coherence, and academic style.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M3 5h16M3 9h12M3 13h14M3 17h9" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  },
  {
    title: "Exam Technique & Revision",
    desc: "Strategies for effective revision, past paper practice, time management under exam conditions, and answering questions to maximise marks.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><rect x="3" y="3" width="16" height="16" rx="1.5" stroke="#C9A227" strokeWidth="1.4"/><path d="M3 8h16" stroke="#C9A227" strokeWidth="1.3"/><path d="M8 3v5M14 3v5" stroke="#C9A227" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  },
  {
    title: "Referencing & Academic Integrity",
    desc: "Master APA, Harvard, Chicago, and other referencing styles — and understand how to use sources ethically and accurately in your work.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M9 11l2 2 4-4" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="11" cy="11" r="8" stroke="#C9A227" strokeWidth="1.4"/></svg>,
  },
];

const audience = [
  "Undergraduate students at any stage of their degree",
  "Postgraduate students (Masters level)",
  "Students struggling with academic writing or essay structure",
  "Students aiming for a first-class or distinction grade",
  "International students adapting to UK academic expectations",
  "Students returning to study after a gap",
];

const process = [
  { title: "Free Consultation", desc: "We discuss your current performance, goals, and areas of difficulty." },
  { title: "Personalised Plan", desc: "We design a structured support programme tailored to your needs and timeline." },
  { title: "Expert Sessions", desc: "Regular 1-to-1 sessions with an expert in your subject area." },
  { title: "Progress & Results", desc: "Ongoing feedback and adjustments to maximise your academic performance." },
];

export default function AcademicSuccess() {
  return (
    <>
      <Head>
        <title>Academic Success — GradElevate Services</title>
        <meta name="description" content="Expert 1-to-1 academic tutoring, dissertation support, and academic writing coaching for undergraduate and postgraduate students." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Service 01"
          title="Academic Success"
          subtitle="Expert tutoring, dissertation support, and academic writing coaching — personalised to help you perform at your very best."
        />

        {/* Overview */}
        <section className={s.overviewSection}>
          <div className={`container ${s.overviewGrid}`}>
            <div className={s.overviewImage}>
              <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80" alt="Academic Success" />
            </div>
            <div className={s.overviewContent}>
              <p className="section-eyebrow">What We Do</p>
              <h2 className={s.sectionTitle}>University-Level Academic Support, Personalised to You</h2>
              <p className={s.bodyText}>
                At GradElevate, we believe every student has the potential to achieve more. Our Academic
                Success service pairs you with an experienced academic who understands exactly what
                examiners and markers are looking for — and how to help you deliver it.
              </p>
              <p className={s.bodyText}>
                Whether you're looking to improve your essay writing, navigate a challenging dissertation,
                or simply build the study habits that lead to consistent high performance, we'll design a
                support plan built around your specific goals and timeline.
              </p>
              <div className={s.overviewActions}>
                <Link href={{ pathname: "/book", query: { service: "Academic Tutoring & Writing Support" } }} className="btn-primary">Book a Free Consultation</Link>
                <Link href="/services" className="btn-gold-outline">All Services</Link>
              </div>
            </div>
          </div>
        </section>

        {/* What's included */}
        <section className={s.includedSection}>
          <div className="container">
            <div className={s.includedHeader}>
              <p className="section-eyebrow">What's Included</p>
              <h2 className={s.includedTitle}>Everything You Need to Succeed Academically</h2>
              <p className={s.includedDesc}>All sessions are delivered 1-to-1 and tailored to your subject, level, and specific challenges.</p>
            </div>
            <div className={s.featuresGrid}>
              {features.map((f, i) => (
                <div key={i} className={s.featureCard}>
                  <div className={s.featureIcon}>{f.icon}</div>
                  <h3 className={s.featureTitle}>{f.title}</h3>
                  <p className={s.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for + Process */}
        <section className={s.audienceSection}>
          <div className={`container ${s.audienceGrid}`}>
            <div className={s.audienceContent}>
              <p className="section-eyebrow">Who It's For</p>
              <h2 className={s.audienceTitleWhite}>Built for Students Who Want More</h2>
              <p className={s.audienceDesc}>Our Academic Success service is designed for students at any stage who want to raise their performance, develop stronger study skills, or get targeted support for a specific challenge.</p>
              <ul className={s.audienceList}>
                {audience.map((a, i) => <li key={i} className={s.audienceItem}>{a}</li>)}
              </ul>
            </div>
            <div>
              <p className="section-eyebrow" style={{ marginBottom: 24 }}>How It Works</p>
              <div className={s.processSteps}>
                {process.map((p, i) => (
                  <div key={i} className={s.processStep}>
                    <div className={s.processNum}>0{i + 1}</div>
                    <div>
                      <p className={s.processTitle}>{p.title}</p>
                      <p className={s.processDesc}>{p.desc}</p>
                    </div>
                  </div>
                ))}
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
