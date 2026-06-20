import Head from "next/head";
import { useEffect, useState } from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import CtaBanner from "@/components/home/CtaBanner";
import PageHero from "@/components/ui/PageHero";
import styles from "@/styles/resources.module.css";

const API = "https://gradeelevate-backend-production.up.railway.app";

interface ResourceItem {
  id?: string;
  category: string;
  title: string;
  description: string;
  tag: string;
  free: boolean;
  fileUrl: string;
  hidden?: boolean;
}

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  Guides: (
    <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
      <rect x="4" y="3" width="20" height="22" rx="2" stroke="#C9A227" strokeWidth="1.4"/>
      <path d="M9 9h10M9 13h10M9 17h6" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  ),
  Templates: (
    <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
      <rect x="3" y="3" width="10" height="10" rx="1" stroke="#C9A227" strokeWidth="1.4"/>
      <rect x="15" y="3" width="10" height="10" rx="1" stroke="#C9A227" strokeWidth="1.4"/>
      <rect x="3" y="15" width="10" height="10" rx="1" stroke="#C9A227" strokeWidth="1.4"/>
      <rect x="15" y="15" width="10" height="10" rx="1" stroke="#C9A227" strokeWidth="1.4"/>
    </svg>
  ),
  Checklists: (
    <svg width="28" height="28" fill="none" viewBox="0 0 28 28">
      <path d="M6 8h16M6 14h16M6 20h10" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M3 8l1.5 1.5L7 6" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 14l1.5 1.5L7 12" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
};

const DEFAULT_RESOURCES: ResourceItem[] = [
  { category: "Guides", title: "Ultimate Dissertation Writing Guide", description: "Step-by-step breakdown of planning, structuring, and writing your dissertation.", tag: "PDF · 24 pages", free: true, fileUrl: "/privacy-policy" },
  { category: "Guides", title: "PhD Application Success Blueprint", description: "How to craft a compelling research proposal and personal statement.", tag: "PDF · 18 pages", free: false, fileUrl: "/privacy-policy" },
  { category: "Guides", title: "Academic Job Market Guide", description: "Navigating academic career paths, fellowships, and applications.", tag: "PDF · 16 pages", free: false, fileUrl: "/privacy-policy" },
  { category: "Guides", title: "Postgraduate Funding Guide", description: "Comprehensive list of UK and international funding sources for Masters and PhD.", tag: "PDF · 12 pages", free: true, fileUrl: "/privacy-policy" },
  { category: "Templates", title: "Academic CV Template", description: "Professional CV template designed for academic and research roles.", tag: "Word / PDF", free: true, fileUrl: "/privacy-policy" },
  { category: "Templates", title: "Research Proposal Template", description: "Structured template for Masters and PhD research proposals.", tag: "Word / PDF", free: false, fileUrl: "/privacy-policy" },
  { category: "Templates", title: "Literature Review Matrix", description: "Excel template for organising and synthesising research sources.", tag: "Excel", free: true, fileUrl: "/privacy-policy" },
  { category: "Templates", title: "SMART Goal Setting Planner", description: "Plan your academic semester with structured goal-setting and tracking.", tag: "PDF / Excel", free: false, fileUrl: "/privacy-policy" },
  { category: "Checklists", title: "Dissertation Submission Checklist", description: "Everything you need to verify before submitting your dissertation.", tag: "PDF · 2 pages", free: true, fileUrl: "/privacy-policy" },
  { category: "Checklists", title: "Job Application Checklist", description: "Make sure your applications are complete, compelling, and error-free.", tag: "PDF · 1 page", free: true, fileUrl: "/privacy-policy" },
  { category: "Checklists", title: "PhD Viva Preparation Checklist", description: "Step-by-step preparation guide for your doctoral viva examination.", tag: "PDF · 3 pages", free: false, fileUrl: "/privacy-policy" },
  { category: "Checklists", title: "Conference Presentation Checklist", description: "Preparation guide for presenting your research at academic conferences.", tag: "PDF · 2 pages", free: false, fileUrl: "/privacy-policy" },
];

export default function Resources() {
  const [resources, setResources] = useState<ResourceItem[]>(DEFAULT_RESOURCES);
  const [formData, setFormData] = useState({ name: "", email: "", interest: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`${API}/api/resources`)
      .then((res) => (res.ok ? res.json() : Promise.reject()))
      .then((data: ResourceItem[]) => {
        if (data.length > 0) setResources(data);
      })
      .catch(() => {});
  }, []);

  const visible = resources.filter((r) => !r.hidden);
  const categories = Array.from(new Set(visible.map((r) => r.category)));
  const grouped = categories.map((cat) => ({
    category: cat,
    icon: CATEGORY_ICONS[cat] || CATEGORY_ICONS.Guides,
    items: visible.filter((r) => r.category === cat),
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Head>
        <title>Resources — GradElevate</title>
        <meta name="description" content="Free and premium guides, templates and checklists for students, researchers and graduates." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main>
        <PageHero
          variant="dark"
          eyebrow="Free & Premium Resources"
          title="Tools & Guides to Accelerate Your Success"
          subtitle="Download our expert-curated guides, templates and checklists practical resources designed to give you an edge at every stage of your academic and professional journey."
        />

        {grouped.map((group) => (
          <section key={group.category} className={styles.groupSection}>
            <div className="container">
              <div className={styles.groupHeader}>
                <div className={styles.groupIcon}>{group.icon}</div>
                <h2 className={styles.groupTitle}>{group.category}</h2>
              </div>
              <div className={styles.resourceGrid}>
                {group.items.map((item, i) => (
                  <div key={item.id || i} className={styles.resourceCard}>
                    <div className={styles.resourceTop}>
                      <div className={styles.resourceMeta}>
                        <span className={styles.resourceTag}>{item.tag}</span>
                        {item.free && <span className={styles.freeBadge}>Free</span>}
                      </div>
                      <h3 className={styles.resourceTitle}>{item.title}</h3>
                      <p className={styles.resourceDesc}>{item.description}</p>
                    </div>
                    {item.free ? (
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.downloadBtn}
                      >
                        <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                          <path d="M7 2v7M4 7l3 3 3-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M2 11h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                        </svg>
                        Download Free
                      </a>
                    ) : (
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.premiumBtn}
                      >
                        Get Premium Access
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Lead capture */}
        <section className={styles.captureSection}>
          <div className={`container ${styles.captureGrid}`}>
            <div className={styles.captureContent}>
              <p className="section-eyebrow">Stay Updated</p>
              <h2 className={styles.captureTitle}>Get New Resources Delivered to Your Inbox</h2>
              <p className={styles.captureDesc}>
                Join over 500 students and researchers who receive our latest guides, templates, and
                exclusive event invitations. No spam just high-value academic content.
              </p>
              <ul className={styles.capturePerks}>
                {["Early access to new resources", "Exclusive event invitations", "Academic tips and strategies", "Monthly career development digest"].map((p) => (
                  <li key={p} className={styles.capturePerk}>
                    <svg width="15" height="15" fill="none" viewBox="0 0 15 15">
                      <circle cx="7.5" cy="7.5" r="6.5" stroke="#C9A227" strokeWidth="1.2"/>
                      <path d="M5 7.5l2 2 3-3" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.captureForm}>
              {submitted ? (
                <div className={styles.successMsg}>
                  <svg width="40" height="40" fill="none" viewBox="0 0 40 40">
                    <circle cx="20" cy="20" r="18" stroke="#C9A227" strokeWidth="1.5"/>
                    <path d="M13 20l5 5 9-9" stroke="#C9A227" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3>You&apos;re on the list!</h3>
                  <p>Check your inbox for a welcome email with your first free resources.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h3 className={styles.formTitle}>Access Free Resources</h3>
                  <div className={styles.formField}>
                    <label className={styles.label}>Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Your name"
                      className={styles.input}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.label}>Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="your@email.com"
                      className={styles.input}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                  <div className={styles.formField}>
                    <label className={styles.label}>I am a...</label>
                    <select
                      className={styles.input}
                      value={formData.interest}
                      onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
                    >
                      <option value="">Select your stage</option>
                      <option>Undergraduate Student</option>
                      <option>Postgraduate Student</option>
                      <option>PhD Researcher</option>
                      <option>Recent Graduate</option>
                      <option>Early-Career Professional</option>
                    </select>
                  </div>
                  <button type="submit" className={styles.submitBtn}>
                    Get Free Resources
                  </button>
                  <p className={styles.formNote}>No spam. Unsubscribe at any time.</p>
                </form>
              )}
            </div>
          </div>
        </section>

        <CtaBanner />
      </main>

      <Footer />
    </>
  );
}
