import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CtaBanner from "@/components/home/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import s from "@/styles/service-detail.module.css";

const features = [
  {
    title: "CV & Cover Letter Writing",
    desc: "Expert coaching to create a compelling, tailored CV and cover letter that stands out to recruiters and hiring managers.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><rect x="3" y="2" width="16" height="18" rx="1.5" stroke="#C9A227" strokeWidth="1.4"/><path d="M7 7h8M7 11h8M7 15h5" stroke="#C9A227" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  },
  {
    title: "Interview Preparation",
    desc: "Structured mock interviews with expert feedback — covering competency questions, case studies, and presentation tasks.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="11" cy="7" r="4" stroke="#C9A227" strokeWidth="1.4"/><path d="M4 19c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  },
  {
    title: "LinkedIn Profile Optimisation",
    desc: "Transform your LinkedIn profile into a powerful professional brand — including headline, summary, and recruiter-ready keywords.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><rect x="2" y="2" width="18" height="18" rx="3" stroke="#C9A227" strokeWidth="1.4"/><path d="M6 9v7M6 6.5v.5" stroke="#C9A227" strokeWidth="1.6" strokeLinecap="round"/><path d="M10 16v-4a2 2 0 014 0v4M10 10v6" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  },
  {
    title: "Graduate Scheme Applications",
    desc: "End-to-end support for graduate scheme and competitive programme applications — from written submissions to assessment centres.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M11 2L3 7v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7l-8-5z" stroke="#C9A227" strokeWidth="1.4" strokeLinejoin="round"/><path d="M8 11l2 2 4-4" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
  {
    title: "Career Planning & Goal Setting",
    desc: "Structured coaching to clarify your career direction, identify target roles, and build a realistic action plan to get there.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M3 18h16" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/><path d="M5 18v-5M9 18v-8M13 18v-11M17 18v-14" stroke="#C9A227" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
  {
    title: "Professional Branding",
    desc: "Build a consistent, compelling personal brand across your CV, online presence, and professional communications.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="11" cy="11" r="3" stroke="#C9A227" strokeWidth="1.4"/><path d="M11 2v3M11 17v3M2 11h3M17 11h3M4.2 4.2l2.1 2.1M15.7 15.7l2.1 2.1M4.2 17.8l2.1-2.1M15.7 6.3l2.1-2.1" stroke="#C9A227" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  },
];

const audience = [
  "Final-year undergraduates preparing to enter the job market",
  "Recent graduates struggling to secure their first graduate role",
  "Postgraduate students transitioning into professional careers",
  "Professionals looking to change sector or advance their career",
  "International students navigating the UK job market",
  "Anyone seeking structure and confidence in their job search",
];

const process = [
  { title: "Career Audit", desc: "We review your CV, goals, and current job search strategy to identify gaps and opportunities." },
  { title: "Tailored Action Plan", desc: "We build a personalised roadmap covering applications, interviews, and networking." },
  { title: "Coaching Sessions", desc: "1-to-1 sessions covering CV refinement, interview practice, and application strategy." },
  { title: "Job Offer Ready", desc: "Continued support until you've secured the role — including offer negotiation guidance." },
];

export default function CareerDevelopment() {
  return (
    <>
      <Head>
        <title>Career Development — GradElevate Services</title>
        <meta name="description" content="CV coaching, interview preparation, and career planning support for graduates and early-career professionals." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main>
        <PageHero
          eyebrow="Service 02"
          title="Career Development"
          subtitle="CV coaching, interview preparation, and career planning support to help you land the role you deserve."
        />

        <section className={s.overviewSection}>
          <div className={`container ${s.overviewGrid}`}>
            <div className={s.overviewImage}>
              <img src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&q=80" alt="Career Development" />
            </div>
            <div className={s.overviewContent}>
              <p className="section-eyebrow">What We Do</p>
              <h2 className={s.sectionTitle}>Stand Out in a Competitive Graduate Job Market</h2>
              <p className={s.bodyText}>
                A great degree is only the beginning. In today's competitive job market, graduates
                need more than qualifications — they need a compelling story, the right materials,
                and the confidence to perform under pressure.
              </p>
              <p className={s.bodyText}>
                GradElevate's Career Development service provides the expert, personalised support
                you need to secure roles at leading organisations — from crafting a standout CV to
                performing confidently in interviews and assessment centres.
              </p>
              <div className={s.overviewActions}>
                <Link href={{ pathname: "/book", query: { service: "Career Development & CV Coaching" } }} className="btn-primary">Book a Free Consultation</Link>
                <Link href="/services" className="btn-gold-outline">All Services</Link>
              </div>
            </div>
          </div>
        </section>

        <section className={s.includedSection}>
          <div className="container">
            <div className={s.includedHeader}>
              <p className="section-eyebrow">What's Included</p>
              <h2 className={s.includedTitle}>Everything You Need to Launch Your Career</h2>
              <p className={s.includedDesc}>Comprehensive career support delivered through structured 1-to-1 coaching sessions.</p>
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
              <h2 className={s.audienceTitleWhite}>From Graduate to Professional</h2>
              <p className={s.audienceDesc}>Our Career Development service supports students and graduates at every transition point — from first job applications to career pivots.</p>
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
