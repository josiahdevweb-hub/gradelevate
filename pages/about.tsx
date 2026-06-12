import Head from "next/head";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CtaBanner from "@/components/home/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import styles from "@/styles/about.module.css";

const values = [
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <path d="M16 4L4 9.5l12 6 12-6L16 4z" stroke="#C9A227" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M4 9.5v9" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M8 20c0 3 3.6 5.5 8 5.5s8-2.5 8-5.5" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Academic Excellence",
    desc: "We hold ourselves and our clients to the highest academic standards, delivering research-informed, evidence-based support at every level.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <circle cx="16" cy="16" r="12" stroke="#C9A227" strokeWidth="1.5"/>
        <path d="M16 10v6l4 2" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Integrity & Trust",
    desc: "We operate with complete transparency. Every recommendation we make is in the genuine long-term interest of our clients.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <path d="M6 26h20" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M10 26V18M16 26V13M22 26V8" stroke="#C9A227" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: "Measurable Impact",
    desc: "Success is only meaningful when it's real. We focus on tangible outcomes: better grades, stronger research, and career progression.",
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" viewBox="0 0 32 32">
        <circle cx="12" cy="12" r="5" stroke="#C9A227" strokeWidth="1.5"/>
        <circle cx="22" cy="20" r="5" stroke="#C9A227" strokeWidth="1.5"/>
        <path d="M17 12c1.5 0 3 .5 4 1.5" stroke="#C9A227" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Personalised Support",
    desc: "No two journeys are alike. We design bespoke support plans tailored to each client's unique goals, challenges, and timeline.",
  },
];

const credentials = [
  { label: "Senior Academic Leadership", detail: "Extensive experience in higher education management and strategy" },
  { label: "Postgraduate Supervision", detail: "Supervised Masters and PhD researchers across multiple disciplines" },
  { label: "Research Leadership", detail: "Led international research projects and publication initiatives" },
  { label: "Curriculum Development", detail: "Designed academic programmes at leading UK universities" },
  { label: "International Engagement", detail: "Built academic partnerships across Europe, Asia, and North America" },
];

export default function About() {
  return (
    <>
      <Head>
        <title>About — GradElevate</title>
        <meta name="description" content="GradElevate is led by an experienced academic with senior leadership roles in higher education, research, and international engagement." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main>
        <PageHero
          eyebrow="Our Story"
          title="Built on Academic Excellence, Driven by Your Success"
          subtitle="GradElevate was founded to give every student, researcher, and graduate access to the kind of high-quality academic and career support that was once reserved for the privileged few."
        />

        {/* Mission */}
        <section className={styles.missionSection}>
          <div className={`container ${styles.missionGrid}`}>
            <div className={styles.missionContent}>
              <p className="section-eyebrow">Our Mission</p>
              <h2 className={styles.sectionTitle}>
                A Different Kind of<br />Academic Support
              </h2>
              <p className={styles.bodyText}>
                GradElevate exists to level the playing field in higher education and professional development.
                We believe that access to expert, personalised guidance should not be determined by your
                background, institution, or budget.
              </p>
              <p className={styles.bodyText}>
                Our mission is to provide university-level academic expertise, research-informed guidance,
                and career development support that empowers every client to achieve their full potential —
                whether they are studying for their first degree, completing a PhD, or launching their career.
              </p>
              <div className={styles.missionStats}>
                {[
                  { num: "500+", label: "Students Supported" },
                  { num: "95%", label: "Client Satisfaction" },
                  { num: "15+", label: "Years Academic Experience" },
                ].map((s) => (
                  <div key={s.label} className={styles.stat}>
                    <span className={styles.statNum}>{s.num}</span>
                    <span className={styles.statLabel}>{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.missionImage}>
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=700&q=80"
                alt="Academic professional"
              />
              <div className={styles.imageBadge}>
                <span className={styles.badgeIcon}>🎓</span>
                <div>
                  <p className={styles.badgeName}>GradElevate</p>
                  <p className={styles.badgeSub}>ELEVATE. ACHIEVE. SUCCEED.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder */}
        <section className={styles.founderSection}>
          <div className={`container ${styles.founderGrid}`}>
            <div className={styles.founderImage}>
              <img
                src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=700&q=80"
                alt="Founder"
              />
            </div>
            <div className={styles.founderContent}>
              <p className="section-eyebrow">Meet the Founder</p>
              <h2 className={styles.sectionTitle}>Learn From Experienced<br />Academic Leadership</h2>
              <p className={styles.bodyText}>
                GradElevate is led by an experienced academic with senior leadership roles in UK higher education,
                extensive postgraduate teaching and supervision experience, and a strong background in research,
                curriculum development, and international collaboration.
              </p>
              <p className={styles.bodyText}>
                Having worked within leading universities and supported hundreds of students and researchers
                at every stage of their academic journey, our founder brings real institutional knowledge and
                genuine passion for student success to every engagement.
              </p>
              <div className={styles.credentialList}>
                {credentials.map((c, i) => (
                  <div key={i} className={styles.credentialItem}>
                    <div className={styles.credDot} />
                    <div>
                      <p className={styles.credTitle}>{c.label}</p>
                      <p className={styles.credDetail}>{c.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className={`section ${styles.valuesSection}`}>
          <div className="container">
            <div className={styles.valuesHeader}>
              <p className="section-eyebrow">What We Stand For</p>
              <h2 className={styles.sectionTitleWhite}>Our Core Values</h2>
            </div>
            <div className={styles.valuesGrid}>
              {values.map((v, i) => (
                <div key={i} className={styles.valueCard}>
                  <div className={styles.valueIcon}>{v.icon}</div>
                  <h3 className={styles.valueTitle}>{v.title}</h3>
                  <p className={styles.valueDesc}>{v.desc}</p>
                </div>
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
