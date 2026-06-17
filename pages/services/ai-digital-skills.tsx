import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CtaBanner from "@/components/home/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import s from "@/styles/service-detail.module.css";

const features = [
  {
    title: "AI Research Tools",
    desc: "Hands-on training in AI-powered research tools — from literature discovery to data synthesis — used effectively and responsibly.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><rect x="3" y="3" width="16" height="16" rx="2" stroke="#C9A227" strokeWidth="1.4"/><circle cx="11" cy="11" r="3.5" stroke="#C9A227" strokeWidth="1.3"/><path d="M11 3v2.5M11 16.5V19M3 11h2.5M16.5 11H19" stroke="#C9A227" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  },
  {
    title: "Ethical AI Use in Academia",
    desc: "Understand how to use AI tools within academic integrity policies — including when AI use is appropriate and how to disclose it correctly.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M11 2L3 7v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7l-8-5z" stroke="#C9A227" strokeWidth="1.4" strokeLinejoin="round"/><path d="M8 11l2 2 4-4" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    title: "AI Literacy for Academic Work",
    desc: "Develop critical understanding of how AI systems work, their limitations, and how to integrate them meaningfully into academic study and research.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="10" cy="10" r="7" stroke="#C9A227" strokeWidth="1.4"/><path d="M15 15l4 4" stroke="#C9A227" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
  {
    title: "Digital Skills for Career Readiness",
    desc: "Build the digital competencies modern employers expect — including AI tools, data interpretation, and professional digital communication.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><rect x="2" y="4" width="18" height="12" rx="2" stroke="#C9A227" strokeWidth="1.4"/><path d="M7 20h8M11 16v4" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  },
];

const audience = [
  "Students who want to use AI tools confidently and responsibly",
  "Researchers looking to accelerate their literature review process",
  "Graduates entering workplaces that expect AI and digital literacy",
  "Academics who want to integrate AI into their teaching or research",
  "Professionals upskilling for AI-facing roles",
  "Anyone who wants to future-proof their digital skill set",
];

const process = [
  { title: "Digital Skills Audit", desc: "We assess your current digital skill level and identify the highest-impact areas to develop." },
  { title: "Customised Learning Plan", desc: "A structured programme focused on the tools and skills most relevant to your goals." },
  { title: "Practical Coaching Sessions", desc: "Hands-on, applied sessions using real tools and real-world academic or professional tasks." },
  { title: "Confident & Future-Ready", desc: "You leave with practical skills, recommended tools, and a framework for continued learning." },
];

export default function AiDigitalSkills() {
  return (
    <>
      <Head>
        <title>AI & Digital Skills — GradElevate Services</title>
        <meta name="description" content="Develop the AI literacy and digital skills essential for modern academic study and professional success — used responsibly and strategically." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main>
        <PageHero
          variant="dark"
          eyebrow="Service 04"
          title="AI & Digital Skills"
          subtitle="Develop the AI literacy and digital skills essential for modern academic study and professional success — used responsibly and strategically."
        />

        <section className={s.overviewSection}>
          <div className={`container ${s.overviewGrid}`}>
            <div className={s.overviewImage}>
              <img src="https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80" alt="AI & Digital Skills" />
            </div>
            <div className={s.overviewContent}>
              <p className="section-eyebrow">What We Do</p>
              <h2 className={s.sectionTitle}>Navigate the AI Revolution with Confidence</h2>
              <p className={s.bodyText}>
                Artificial intelligence is fundamentally changing how we learn, research, and work.
                Students and professionals who understand how to use AI tools effectively and ethically
                will have a significant advantage — those who don't risk being left behind.
              </p>
              <p className={s.bodyText}>
                GradElevate's AI & Digital Skills service helps you develop genuine digital literacy —
                not just knowing which tools exist, but understanding how to use them strategically,
                responsibly, and in ways that enhance rather than undermine your academic and professional work.
              </p>
              <div className={s.overviewActions}>
                <Link href={{ pathname: "/book", query: { service: "AI & Digital Skills Coaching" } }} className="btn-primary">Book a Free Consultation</Link>
                <Link href="/services" className="btn-gold-outline">All Services</Link>
              </div>
            </div>
          </div>
        </section>

        <section className={s.includedSection}>
          <div className="container">
            <div className={s.includedHeader}>
              <p className="section-eyebrow">What's Included</p>
              <h2 className={s.includedTitle}>Practical AI & Digital Skills for the Modern World</h2>
              <p className={s.includedDesc}>All sessions are practical, hands-on, and focused on real tools and real-world application.</p>
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

        <section className={s.audienceSection}>
          <div className={`container ${s.audienceGrid}`}>
            <div className={s.audienceContent}>
              <p className="section-eyebrow">Who It's For</p>
              <h2 className={s.audienceTitleWhite}>For Anyone Ready to Embrace the Digital Future</h2>
              <p className={s.audienceDesc}>Our AI & Digital Skills service is for students, researchers, and professionals who want to stay ahead of the curve in an increasingly AI-driven world.</p>
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
