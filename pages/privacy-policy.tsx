import Head from "next/head";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import PageHero from "@/components/ui/PageHero";
import styles from "@/styles/privacy-policy.module.css";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Privacy Policy | GradElevate</title>
        <meta
          name="description"
          content="Terms & Conditions, Refund Policy, and Privacy Policy for GradElevate academic and career development consultancy."
        />
      </Head>

      <Navbar />
      <PageHero
        eyebrow="Legal"
        title="Terms & Conditions, Refund Policy, and Privacy Policy"
        subtitle="Effective Date: 20 June 2026. These policies govern the use of services, digital platforms, and consultancy offered by GradElevate."
        variant="dark"
      />

      <main className={styles.main}>
        <div className="container">
          <div className={styles.content}>
            <p className={styles.intro}>
              By booking a consultation, purchasing a service package, accessing
              our website, or engaging GradElevate for any academic or career
              support, you agree to the following policies.
            </p>

            {/* ── 1. Terms and Conditions ── */}
            <section className={styles.section} id="terms">
              <h2 className={styles.sectionTitle}>1. Terms and Conditions</h2>

              <h3 className={styles.heading}>1.1 About GradElevate</h3>
              <p className={styles.text}>
                GradElevate is a UK-based academic and career development
                consultancy providing personalised support to undergraduates,
                postgraduates, PhD researchers, graduates, and early-career
                professionals. Our services include academic tutoring, dissertation
                and research support, career coaching, CV and interview preparation,
                AI and digital skills training, and academic writing development.
              </p>

              <h3 className={styles.heading}>1.2 Acceptance of Terms</h3>
              <p className={styles.text}>By:</p>
              <ul className={styles.list}>
                <li>Booking a consultation or session</li>
                <li>Purchasing any service package</li>
                <li>Accessing learning materials or resources</li>
                <li>Using the GradElevate website</li>
                <li>Engaging GradElevate for coaching or consultancy</li>
              </ul>
              <p className={styles.text}>
                You acknowledge that you have read, understood, and agreed to these
                Terms and Conditions. GradElevate reserves the right to update
                these terms periodically.
              </p>

              <h3 className={styles.heading}>1.3 Service Delivery</h3>
              <p className={styles.text}>
                GradElevate services may be delivered through:
              </p>
              <ul className={styles.list}>
                <li>One-to-one online sessions</li>
                <li>Group workshops and webinars</li>
                <li>Self-paced digital resources</li>
                <li>In-person consultations (where available)</li>
                <li>Email and written feedback</li>
              </ul>
              <p className={styles.text}>
                GradElevate reserves the right to adjust delivery formats,
                session structures, or schedules where necessary.
              </p>

              <h3 className={styles.heading}>1.4 Client Responsibilities</h3>
              <p className={styles.text}>Clients must:</p>
              <ul className={styles.list}>
                <li>Provide accurate booking and contact information</li>
                <li>Attend scheduled sessions on time</li>
                <li>Maintain respectful and professional conduct</li>
                <li>Use materials and resources only for personal academic or career development</li>
              </ul>
              <p className={styles.text}>Clients must not:</p>
              <ul className={styles.list}>
                <li>Record sessions without prior written consent</li>
                <li>Share proprietary materials, templates, or resources</li>
                <li>Resell or redistribute any GradElevate content</li>
                <li>Use services for any form of academic dishonesty</li>
              </ul>

              <h3 className={styles.heading}>1.5 Academic Integrity</h3>
              <p className={styles.text}>
                GradElevate provides guidance, feedback, and skills development.
                We do not write, complete, or submit academic work on behalf of
                clients. All services are designed to help clients develop their
                own capabilities. Clients are solely responsible for the academic
                work they submit to their institutions.
              </p>

              <h3 className={styles.heading}>1.6 Payment Obligations</h3>
              <p className={styles.text}>
                Clients must ensure full payment of applicable fees before or at
                the time of booking. GradElevate reserves the right to cancel or
                reschedule sessions where payment has not been received.
              </p>

              <h3 className={styles.heading}>1.7 Limitation of Liability</h3>
              <p className={styles.text}>GradElevate shall not be liable for:</p>
              <ul className={styles.list}>
                <li>Specific academic grades or outcomes</li>
                <li>Career outcomes resulting from coaching or training</li>
                <li>Indirect or consequential damages</li>
                <li>Technical interruptions beyond our control</li>
              </ul>
              <p className={styles.text}>
                Under no circumstances shall GradElevate&apos;s liability exceed the
                total amount paid for the specific service.
              </p>

              <h3 className={styles.heading}>1.8 Termination</h3>
              <p className={styles.text}>
                GradElevate reserves the right to discontinue services to any
                client who violates these terms, engages in disruptive or
                disrespectful conduct, or misuses materials. No refund will be
                issued in such cases.
              </p>

              <h3 className={styles.heading}>1.9 Force Majeure</h3>
              <p className={styles.text}>
                GradElevate shall not be liable for delays or inability to
                deliver services due to circumstances beyond reasonable control,
                including natural disasters, internet outages, public health
                emergencies, or technical disruptions.
              </p>
            </section>

            {/* ── 2. Refund Policy ── */}
            <section className={styles.section} id="refund">
              <h2 className={styles.sectionTitle}>2. Refund Policy</h2>

              <h3 className={styles.heading}>2.1 General Policy</h3>
              <p className={styles.text}>
                Service fees are generally non-refundable once a session or
                package has commenced. Exceptions may be considered under the
                circumstances outlined below.
              </p>

              <h3 className={styles.heading}>2.2 Cancellation by Client</h3>
              <p className={styles.text}>Clients who cancel:</p>
              <ul className={styles.list}>
                <li>7+ days before the scheduled session: Eligible for a full refund or rescheduling</li>
                <li>3&ndash;6 days before: Eligible for 50% refund or rescheduling</li>
                <li>Less than 72 hours before: No refund</li>
              </ul>
              <p className={styles.text}>
                Clients may request to reschedule to a future date where
                availability permits.
              </p>

              <h3 className={styles.heading}>2.3 Cancellation by GradElevate</h3>
              <p className={styles.text}>
                If GradElevate cancels a session due to consultant
                unavailability, technical issues, or other operational reasons,
                clients will receive either a full refund or rescheduling to the
                next available slot.
              </p>

              <h3 className={styles.heading}>2.4 Missed Sessions</h3>
              <p className={styles.text}>
                GradElevate is not responsible for missed sessions due to client
                work commitments, personal circumstances, internet disruptions,
                or time zone confusion. No refund will be issued for no-shows.
              </p>

              <h3 className={styles.heading}>2.5 Refund Processing</h3>
              <p className={styles.text}>
                Approved refunds are processed within 14 business days via the
                original payment method. GradElevate is not responsible for
                delays caused by banks or payment providers.
              </p>
            </section>

            {/* ── 3. Privacy Policy ── */}
            <section className={styles.section} id="privacy">
              <h2 className={styles.sectionTitle}>3. Privacy Policy</h2>

              <h3 className={styles.heading}>3.1 Information We Collect</h3>
              <p className={styles.text}>GradElevate may collect:</p>
              <p className={styles.subheading}>Personal Information:</p>
              <ul className={styles.list}>
                <li>Full name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>University or institution</li>
                <li>Course or programme of study</li>
                <li>Payment details</li>
              </ul>
              <p className={styles.subheading}>Service Information:</p>
              <ul className={styles.list}>
                <li>Session bookings and history</li>
                <li>Service preferences</li>
                <li>Feedback and communications</li>
              </ul>
              <p className={styles.subheading}>Automatically Collected Data:</p>
              <ul className={styles.list}>
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Website usage data</li>
              </ul>

              <h3 className={styles.heading}>3.2 Use of Information</h3>
              <p className={styles.text}>GradElevate uses collected data to:</p>
              <ul className={styles.list}>
                <li>Schedule and deliver consultations and sessions</li>
                <li>Process payments</li>
                <li>Communicate session confirmations and updates</li>
                <li>Provide tailored academic and career support</li>
                <li>Improve service quality</li>
                <li>Send relevant resources and announcements (with consent)</li>
              </ul>

              <h3 className={styles.heading}>3.3 Data Sharing</h3>
              <p className={styles.text}>
                GradElevate does not sell personal data. Information may be shared
                with:
              </p>
              <ul className={styles.list}>
                <li>Payment processors (for secure transactions)</li>
                <li>Scheduling and communication platforms</li>
                <li>Analytics tools (for website improvement)</li>
              </ul>
              <p className={styles.text}>
                All third-party partners are required to maintain confidentiality
                and handle data in accordance with applicable data protection laws.
              </p>

              <h3 className={styles.heading}>3.4 Data Security</h3>
              <p className={styles.text}>
                GradElevate implements appropriate safeguards including secure
                storage, encrypted communications, and access controls. While
                strong measures are taken, no system guarantees absolute security.
              </p>

              <h3 className={styles.heading}>3.5 Data Retention</h3>
              <p className={styles.text}>Personal data is retained:</p>
              <ul className={styles.list}>
                <li>As long as required to provide services</li>
                <li>To maintain records of completed sessions</li>
                <li>To comply with legal obligations</li>
              </ul>
              <p className={styles.text}>
                Clients may request deletion of their data where legally
                permissible.
              </p>

              <h3 className={styles.heading}>3.6 Your Rights</h3>
              <p className={styles.text}>Clients may request:</p>
              <ul className={styles.list}>
                <li>Access to their personal data</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of personal data</li>
                <li>Withdrawal from marketing communications</li>
              </ul>

              <h3 className={styles.heading}>3.7 Cookies</h3>
              <p className={styles.text}>
                The GradElevate website may use cookies to improve functionality,
                track analytics, and enhance user experience. Users may disable
                cookies through their browser settings.
              </p>
            </section>

            {/* ── 4. Intellectual Property ── */}
            <section className={styles.section} id="ip">
              <h2 className={styles.sectionTitle}>4. Intellectual Property</h2>
              <p className={styles.text}>
                All materials provided by GradElevate remain our intellectual
                property, including templates, guides, frameworks, session
                recordings (where applicable), and digital resources. Clients may
                use materials for personal development only. Unauthorised
                redistribution, resale, or commercial use is prohibited.
              </p>
            </section>

            {/* ── 5. Governing Law ── */}
            <section className={styles.section} id="law">
              <h2 className={styles.sectionTitle}>5. Governing Law</h2>
              <p className={styles.text}>
                These policies shall be governed and interpreted in accordance
                with the laws of England and Wales.
              </p>
            </section>

            {/* ── 6. Dispute Resolution ── */}
            <section className={styles.section} id="disputes">
              <h2 className={styles.sectionTitle}>6. Dispute Resolution</h2>
              <p className={styles.text}>
                Any dispute arising from these policies shall first be addressed
                through good faith communication. If disputes cannot be resolved
                informally, they may be referred to mediation or the appropriate
                legal channels within England and Wales.
              </p>
            </section>

            {/* ── 7. Contact ── */}
            <section className={styles.section} id="contact">
              <h2 className={styles.sectionTitle}>7. Contact Information</h2>
              <div className={styles.contactCard}>
                <p className={styles.contactName}>GradElevate</p>
                <p className={styles.contactDetail}>
                  Email:{" "}
                  <a href="mailto:hello@gradelevate.com">hello@gradelevate.com</a>
                </p>
                <p className={styles.contactDetail}>Website: gradelevate.com</p>
              </div>
            </section>

            {/* ── 8. Policy Updates ── */}
            <section className={styles.section} id="updates">
              <h2 className={styles.sectionTitle}>8. Policy Updates</h2>
              <p className={styles.text}>
                GradElevate reserves the right to update these policies
                periodically. Updated policies will be published on this page.
                Continued use of our services after changes constitutes
                acceptance of the revised policies.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
