import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import PageHero from "@/components/ui/PageHero";
import styles from "@/styles/book.module.css";

const services = [
  "Academic Tutoring & Writing Support",
  "Dissertation / Thesis Support",
  "Research Design & Methodology",
  "PhD Application Support",
  "Career Development & CV Coaching",
  "Interview Preparation",
  "AI & Digital Skills Coaching",
  "Other / General Enquiry",
];

export default function Book() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", stage: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [context, setContext] = useState<{ type: "service" | "event"; label: string } | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    const { service, event } = router.query;
    if (event && typeof event === "string") {
      setContext({ type: "event", label: event });
    } else if (service && typeof service === "string") {
      const matched = services.find((s) => s === service) ?? "";
      if (matched) {
        setContext({ type: "service", label: matched });
        setFormData((f) => ({ ...f, service: matched }));
      }
    }
  }, [router.isReady]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError("");
    try {
      const API = "https://gradeelevate-backend-production.up.railway.app";
      const res = await fetch(`${API}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || `Server error (${res.status})`);
      }
      setSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Book a Consultation — GradElevate</title>
        <meta name="description" content="Book your free 30-minute consultation with GradElevate. Tell us about your goals and we'll design a personalised support plan." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main>
        <PageHero
          variant="dark"
          eyebrow="Get Started"
          title="Book Your Free Consultation"
          subtitle="Tell us about your goals and challenges. We'll match you with the right expert and design a personalised support plan."
        />

        <section className={styles.section}>
          <div className={`container ${styles.grid}`}>

            {/* Info side */}
            <div className={styles.infoSide}>
              <h2 className={styles.infoTitle}>What to Expect</h2>
              <p className={styles.infoDesc}>
                Your free 30-minute consultation is a no-obligation conversation to understand your
                specific situation, goals, and timeline. We'll recommend the right level of support
                and outline exactly how we can help.
              </p>

              <div className={styles.steps}>
                {[
                  { step: "01", title: "Submit Your Request", desc: "Complete the form with your details and tell us about your goals." },
                  { step: "02", title: "We'll Be in Touch", desc: "Our team will contact you within 24 hours to schedule your consultation." },
                  { step: "03", title: "Free 30-Minute Call", desc: "A focused conversation about your needs, with no obligation to proceed." },
                  { step: "04", title: "Personalised Plan", desc: "We design a bespoke support plan tailored to your goals and timeline." },
                ].map((s) => (
                  <div key={s.step} className={styles.step}>
                    <div className={styles.stepNum}>{s.step}</div>
                    <div>
                      <p className={styles.stepTitle}>{s.title}</p>
                      <p className={styles.stepDesc}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.trustRow}>
                {["Free consultation", "No obligation", "Response within 24hrs", "Expert matching"].map((t) => (
                  <div key={t} className={styles.trustItem}>
                    <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                      <circle cx="7" cy="7" r="6" stroke="#C9A227" strokeWidth="1.2"/>
                      <path d="M4.5 7l2 2 3-3" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Form side */}
            <div className={styles.formSide}>
              {submitted ? (
                <div className={styles.success}>
                  <svg width="52" height="52" fill="none" viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="24" stroke="#C9A227" strokeWidth="1.5"/>
                    <path d="M16 26l7 7 13-13" stroke="#C9A227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3 className={styles.successTitle}>Request Received!</h3>
                  <p className={styles.successDesc}>
                    Thank you for getting in touch. A member of our team will contact you within 24 hours to schedule your free consultation.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  {context && (
                    <div className={styles.bookingBanner}>
                      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                        <rect x="2" y="3" width="16" height="14" rx="1.5" stroke="#C9A227" strokeWidth="1.4"/>
                        <path d="M2 7h16" stroke="#C9A227" strokeWidth="1.4"/>
                        <path d="M6 2v2M14 2v2" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                      <div>
                        <p className={styles.bannerLabel}>
                          {context.type === "event" ? "Registering for Event" : "Selected Service"}
                        </p>
                        <p className={styles.bannerValue}>{context.label}</p>
                      </div>
                    </div>
                  )}
                  <h3 className={styles.formTitle}>
                    {context?.type === "event" ? "Event Registration Request" : "Consultation Request"}
                  </h3>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label className={styles.label}>Full Name *</label>
                      <input type="text" required placeholder="Your full name" className={styles.input}
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Email Address *</label>
                      <input type="email" required placeholder="your@email.com" className={styles.input}
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label className={styles.label}>Phone Number</label>
                      <input type="tel" placeholder="+44 7700 000000" className={styles.input}
                        value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Your Academic Stage *</label>
                      <select required className={styles.input}
                        value={formData.stage} onChange={(e) => setFormData({ ...formData, stage: e.target.value })}>
                        <option value="">Select your stage</option>
                        <option>Undergraduate Student</option>
                        <option>Postgraduate (Masters) Student</option>
                        <option>PhD Researcher</option>
                        <option>Recent Graduate</option>
                        <option>Early-Career Professional</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Area of Support Required *</label>
                    <select required className={styles.input}
                      value={formData.service} onChange={(e) => setFormData({ ...formData, service: e.target.value })}>
                      <option value="">Select a service area</option>
                      {services.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Tell Us About Your Goals</label>
                    <textarea placeholder="Briefly describe your current situation, goals, and any specific challenges you'd like help with..." className={styles.textarea} rows={5}
                      value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>

                  {submitError && (
                    <p style={{ color: "#dc2626", fontSize: "0.85rem", marginBottom: 12 }}>
                      {submitError}
                    </p>
                  )}
                  <button type="submit" className={styles.submitBtn} disabled={submitting}>
                    {submitting ? "Submitting…" : "Submit Consultation Request"}
                  </button>
                  <p className={styles.formNote}>
                    We'll respond within 24 hours. Your information is kept confidential.
                  </p>
                </form>
              )}
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
