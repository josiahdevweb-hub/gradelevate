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
                  <a href="https://www.linkedin.com/company/grad-elevate/" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} style={{ color: "#0A66C2" }} aria-label="LinkedIn">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  </a>
                  <a href="https://x.com/GradElevate" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} style={{ color: "#000" }} aria-label="X (Twitter)">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="https://www.instagram.com/gradelevate?utm_source=qr&igsh=MXVkMzlnYm4yZXB0aw==" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} style={{ color: "#E4405F" }} aria-label="Instagram">
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
                    </svg>
                  </a>
                  <a href="#" className={styles.socialIcon} style={{ color: "#07C160" }} aria-label="WeChat">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8.5 11a1 1 0 100-2 1 1 0 000 2zM5 11a1 1 0 100-2 1 1 0 000 2z"/>
                      <path d="M9 2C4.58 2 1 5.07 1 8.8c0 2.1 1.1 3.98 2.82 5.2L3 17l3.2-1.6c.9.27 1.83.4 2.8.4.33 0 .66-.02.98-.05A6.46 6.46 0 009.5 13.5C9.5 10.46 12.19 8 15.5 8c.52 0 1.03.06 1.52.16C16.23 4.64 12.96 2 9 2z" opacity="0.6"/>
                      <circle cx="13.5" cy="15" r="0.75"/>
                      <circle cx="17.5" cy="15" r="0.75"/>
                      <path d="M15.5 10c-3.04 0-5.5 2.24-5.5 5s2.46 5 5.5 5c.7 0 1.37-.12 2-.35L20 21l-.6-2.4C20.44 17.5 21 16.3 21 15c0-2.76-2.46-5-5.5-5z"/>
                    </svg>
                  </a>
                  <a href="https://wa.me/447732761855" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} style={{ color: "#25D366" }} aria-label="WhatsApp">
                    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </a>
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
