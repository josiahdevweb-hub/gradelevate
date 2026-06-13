import Head from "next/head";
import Link from "next/link";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CtaBanner from "@/components/home/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import s from "@/styles/service-detail.module.css";

const features = [
  {
    title: "Research Design & Methodology",
    desc: "Expert coaching on choosing appropriate research methods, designing rigorous studies, and justifying your methodological approach.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><circle cx="10" cy="10" r="7" stroke="#C9A227" strokeWidth="1.4"/><path d="M15 15l4 4" stroke="#C9A227" strokeWidth="1.8" strokeLinecap="round"/><path d="M7 10h6M10 7v6" stroke="#C9A227" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  },
  {
    title: "Literature Review Guidance",
    desc: "Structured support for finding, evaluating, organising, and synthesising academic sources into a coherent and critical literature review.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><rect x="3" y="2" width="16" height="18" rx="1.5" stroke="#C9A227" strokeWidth="1.4"/><path d="M7 7h8M7 11h8M7 15h5" stroke="#C9A227" strokeWidth="1.3" strokeLinecap="round"/></svg>,
  },
  {
    title: "PhD Proposal Development",
    desc: "Expert guidance on writing a compelling, academically rigorous PhD research proposal that meets institutional and supervisor expectations.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M11 2L3 7v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7l-8-5z" stroke="#C9A227" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
  },
  {
    title: "Thesis & Dissertation Writing",
    desc: "Chapter-by-chapter coaching on structure, argumentation, academic writing style, and meeting the standards expected at Masters and PhD level.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M4 18L8 14l3 3 7-7" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/><rect x="2" y="2" width="18" height="18" rx="2" stroke="#C9A227" strokeWidth="1.4"/></svg>,
  },
  {
    title: "Academic Writing for Publication",
    desc: "Support for writing journal articles and conference papers — including structure, abstract writing, and responding to reviewer feedback.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M3 5h16M3 9h12M3 13h14M3 17h9" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/></svg>,
  },
  {
    title: "Data Analysis Support",
    desc: "Guidance on analysing and interpreting qualitative and quantitative data — including choosing the right approach for your research questions.",
    icon: <svg width="22" height="22" fill="none" viewBox="0 0 22 22"><path d="M3 18h16" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/><path d="M5 18v-5M9 18v-8M13 18v-11M17 18v-14" stroke="#C9A227" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  },
];

const audience = [
  "Masters students working on dissertations or research projects",
  "PhD researchers at any stage of their doctoral journey",
  "Researchers preparing academic journal submissions",
  "Students navigating complex supervisory relationships",
  "Academics re-entering research after a career break",
  "Professionals transitioning into academic research roles",
];

const process = [
  { title: "Research Needs Assessment", desc: "We review your research project, progress, and specific challenges in detail." },
  { title: "Research Support Plan", desc: "A structured programme matched to your stage, discipline, and submission deadlines." },
  { title: "Expert Coaching Sessions", desc: "Regular sessions with an academic experienced in your research area." },
  { title: "Submission Ready", desc: "Continued support through submission — including viva preparation for PhD students." },
];

export default function Research() {
  return (
    <>
      <Head>
        <title>Research & Postgraduate Support — GradElevate Services</title>
        <meta name="description" content="Specialist coaching for Masters and PhD researchers — from proposal development and literature reviews to thesis writing." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <main>
        <PageHero
          variant="dark"
          eyebrow="Service 03"
          title="Research & Postgraduate Support"
          subtitle="Specialist coaching for Masters and PhD researchers — from research design and literature reviews to thesis writing and academic publication."
        />

        <section className={s.overviewSection}>
          <div className={`container ${s.overviewGrid}`}>
            <div className={s.overviewImage}>
              <img src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=800&q=80" alt="Research Support" />
            </div>
            <div className={s.overviewContent}>
              <p className="section-eyebrow">What We Do</p>
              <h2 className={s.sectionTitle}>Expert Support for Every Stage of Your Research Journey</h2>
              <p className={s.bodyText}>
                Postgraduate research is intellectually demanding, often isolating, and filled with
                challenges that go well beyond the subject matter itself. Whether you're grappling with
                your research design, struggling with your literature review, or finding the thesis
                writing process overwhelming — we're here to help.
              </p>
              <p className={s.bodyText}>
                GradElevate's Research & Postgraduate Support service is led by academics with extensive
                experience of supervising Masters and PhD students across multiple disciplines. We understand
                what examiners expect — and how to help you deliver it.
              </p>
              <div className={s.overviewActions}>
                <Link href={{ pathname: "/book", query: { service: "Research Design & Methodology" } }} className="btn-primary">Book a Free Consultation</Link>
                <Link href="/services" className="btn-gold-outline">All Services</Link>
              </div>
            </div>
          </div>
        </section>

        <section className={s.includedSection}>
          <div className="container">
            <div className={s.includedHeader}>
              <p className="section-eyebrow">What's Included</p>
              <h2 className={s.includedTitle}>Comprehensive Postgraduate Research Support</h2>
              <p className={s.includedDesc}>All support is delivered by academics with direct experience in postgraduate research supervision.</p>
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
              <h2 className={s.audienceTitleWhite}>For Researchers Who Want Expert Guidance</h2>
              <p className={s.audienceDesc}>Our postgraduate support is designed for researchers who want more than their institutional supervision can provide — or who need specialist support at a critical point in their studies.</p>
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
