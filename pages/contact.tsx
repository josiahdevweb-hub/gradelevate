import Head from "next/head";
import { useState } from "react";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import PageHero from "@/components/ui/PageHero";
import styles from "@/styles/contact.module.css";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitting(true);
    try {
      const API = "https://gradeelevate-backend-production.up.railway.app";
      const res = await fetch(`${API}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as Record<string, string>;
        throw new Error(err.error || `Error (${res.status})`);
      }
      setSubmitted(true);
    } catch (err: unknown) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact — GradElevate</title>
        <meta name="description" content="Get in touch with GradElevate. We're here to help with any questions about our academic and career development services." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <main>
        <PageHero
          variant="dark"
          eyebrow="Get in Touch"
          title="We'd Love to Hear From You"
          subtitle="Whether you have a question about our services, want to discuss your goals, or are ready to book — we're here to help."
        />

        <section className={styles.section}>
          <div className={`container ${styles.grid}`}>

            {/* Contact details */}
            <div className={styles.details}>
              <div className={styles.detailGroup}>
                <h2 className={styles.detailTitle}>Contact Information</h2>
                <p className={styles.detailDesc}>
                  Our team is available Monday to Friday, 9am–6pm (GMT). We aim to respond to all enquiries within 24 hours.
                </p>
              </div>

              <div className={styles.contactItems}>
                {[
                  {
                    icon: (
                      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                        <path d="M3 4h14a1 1 0 011 1v10a1 1 0 01-1 1H3a1 1 0 01-1-1V5a1 1 0 011-1z" stroke="#C9A227" strokeWidth="1.4"/>
                        <path d="M2 5l8 6 8-6" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                    ),
                    label: "Email",
                    value: "info@gradelevate.co.uk",
                    href: "mailto:info@gradelevate.co.uk",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                        <path d="M5 3h3l2 4-2.5 1.5A11 11 0 0011.5 12.5L13 10l4 2v3a2 2 0 01-2 2A14 14 0 013 5a2 2 0 012-2z" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ),
                    label: "Phone",
                    value: "+44 7957 982810",
                    href: "tel:+447957982810",
                  },
                  {
                    icon: (
                      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                        <circle cx="10" cy="10" r="8" stroke="#C9A227" strokeWidth="1.4"/>
                        <ellipse cx="10" cy="10" rx="3" ry="8" stroke="#C9A227" strokeWidth="1.2"/>
                        <path d="M2 10h16" stroke="#C9A227" strokeWidth="1.2" strokeLinecap="round"/>
                        <path d="M3.5 6.5h13M3.5 13.5h13" stroke="#C9A227" strokeWidth="1" strokeLinecap="round"/>
                      </svg>
                    ),
                    label: "Location",
                    value: "United Kingdom — Online & In-Person",
                    href: null,
                  },
                  {
                    icon: (
                      <svg width="20" height="20" fill="none" viewBox="0 0 20 20">
                        <circle cx="10" cy="10" r="8" stroke="#C9A227" strokeWidth="1.4"/>
                        <path d="M10 6v4l3 2" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ),
                    label: "Hours",
                    value: "Monday – Friday, 9:00am – 6:00pm GMT",
                    href: null,
                  },
                ].map((item) => (
                  <div key={item.label} className={styles.contactItem}>
                    <div className={styles.contactIcon}>{item.icon}</div>
                    <div>
                      <p className={styles.contactLabel}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className={styles.contactValue}>{item.value}</a>
                      ) : (
                        <p className={styles.contactValue}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.socials}>
                <p className={styles.socialsTitle}>Follow Us</p>
                <div className={styles.socialsRow}>
                  {[
                    { label: "LinkedIn", href: "https://www.linkedin.com/company/grad-elevate/" },
                    { label: "X (Twitter)", href: "https://x.com/GradElevate" },
                    { label: "Instagram", href: "https://www.instagram.com/gradelevate?utm_source=qr&igsh=MXVkMzlnYm4yZXB0aw==" },
                    { label: "WeChat", href: "#" },
                    { label: "WhatsApp", href: "https://wa.me/447732761855" },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>{s.label}</a>
                  ))}
                </div>
              </div>

              <div className={styles.quickBook}>
                <p className={styles.quickBookText}>
                  Ready to get started? Book your free consultation directly.
                </p>
                <a href="/book" className="btn-primary">Book a Free Consultation</a>
              </div>
            </div>

            {/* Form */}
            <div className={styles.formWrap}>
              {submitted ? (
                <div className={styles.success}>
                  <svg width="52" height="52" fill="none" viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="24" stroke="#C9A227" strokeWidth="1.5"/>
                    <path d="M16 26l7 7 13-13" stroke="#C9A227" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <h3 className={styles.successTitle}>Message Sent!</h3>
                  <p className={styles.successDesc}>Thank you for reaching out. We'll be in touch within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h3 className={styles.formTitle}>Send Us a Message</h3>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label className={styles.label}>Full Name *</label>
                      <input type="text" required placeholder="Your name" className={styles.input}
                        value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                    </div>
                    <div className={styles.field}>
                      <label className={styles.label}>Email Address *</label>
                      <input type="email" required placeholder="your@email.com" className={styles.input}
                        value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Subject *</label>
                    <select required className={styles.input}
                      value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}>
                      <option value="">Select a subject</option>
                      <option>General Enquiry</option>
                      <option>Services & Pricing</option>
                      <option>Events & Workshops</option>
                      <option>Resources</option>
                      <option>Partnership or Media</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div className={styles.field}>
                    <label className={styles.label}>Message *</label>
                    <textarea required rows={6} placeholder="How can we help you?" className={styles.textarea}
                      value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} />
                  </div>

                  {submitError && <p style={{ color: "#ef4444", fontSize: "0.84rem", marginBottom: 8 }}>{submitError}</p>}
                  <button type="submit" className={styles.submitBtn} disabled={submitting}>
                    {submitting ? "Sending…" : "Send Message"}
                  </button>
                  <p className={styles.formNote}>We respond to all enquiries within 24 hours.</p>
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
