import nodemailer from "nodemailer";

export interface EmailLog {
  id: string;
  subject: string;
  type: "booking_confirmation" | "admin_notification";
  sentAt: string;
  status: "sent" | "failed";
  error?: string;
}

interface Booking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  stage?: string;
  message?: string;
}

function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

function confirmationHtml(b: Booking) {
  const firstName = b.name.split(" ")[0];
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Segoe UI',Arial,sans-serif;background:#f4f6fa;padding:32px 16px}
    .wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.1)}
    .header{background:#0F2744;padding:28px 36px;text-align:center}
    .logo{color:#C9A227;font-size:22px;font-weight:700;letter-spacing:1px}
    .tag{color:rgba(201,162,39,.7);font-size:9px;letter-spacing:3px;text-transform:uppercase;margin-top:4px}
    .body{padding:36px}
    h2{color:#0F2744;font-size:20px;margin-bottom:14px}
    p{color:#4a5568;line-height:1.7;font-size:14px;margin-bottom:14px}
    .card{background:#f9fafb;border-left:3px solid #C9A227;padding:16px 20px;margin:20px 0;border-radius:0 6px 6px 0}
    .row{display:flex;padding:6px 0;border-bottom:1px solid #e8ecf3}
    .row:last-child{border-bottom:none}
    .lbl{font-size:11px;font-weight:700;color:#7a8ea0;text-transform:uppercase;width:110px;flex-shrink:0;padding-top:1px}
    .val{font-size:13px;color:#0F2744}
    .cta{display:block;background:#C9A227;color:#0F2744;text-align:center;padding:13px 24px;text-decoration:none;font-weight:700;font-size:14px;border-radius:6px;margin:24px 0}
    .footer{background:#f4f6fa;padding:18px 36px;text-align:center}
    .footer p{font-size:11px;color:#9aaab8}
    a{color:#C9A227}
  </style></head><body>
  <div class="wrap">
    <div class="header">
      <div class="logo">GradElevate</div>
      <div class="tag">Elevate · Achieve · Succeed</div>
    </div>
    <div class="body">
      <h2>We've received your request, ${firstName}!</h2>
      <p>Thank you for reaching out to GradElevate. A member of our team will contact you within <strong>24 hours</strong> to schedule your free 30-minute consultation call.</p>
      <div class="card">
        <div class="row"><span class="lbl">Service</span><span class="val">${b.service || "—"}</span></div>
        <div class="row"><span class="lbl">Your Stage</span><span class="val">${b.stage || "—"}</span></div>
        ${b.message ? `<div class="row"><span class="lbl">Message</span><span class="val">${b.message}</span></div>` : ""}
      </div>
      <p>While you wait, feel free to explore our resources to get a head start on your journey.</p>
      <a class="cta" href="${process.env.NEXT_PUBLIC_SITE_URL || "https://gradelevate.com"}">Visit GradElevate →</a>
      <p style="font-size:12px;color:#9aaab8">Questions? Email us at <a href="mailto:hello@gradelevate.com">hello@gradelevate.com</a></p>
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} GradElevate. All rights reserved.</p>
      <p style="margin-top:4px">UK | Online — Flexible appointments to suit your schedule</p>
    </div>
  </div>
</body></html>`;
}

function adminNotificationHtml(b: Booking) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>
    *{margin:0;padding:0;box-sizing:border-box}
    body{font-family:'Segoe UI',Arial,sans-serif;background:#f4f6fa;padding:32px 16px}
    .wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:10px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.1)}
    .header{background:#0F2744;padding:20px 28px;display:flex;align-items:center;justify-content:space-between}
    .logo{color:#C9A227;font-size:18px;font-weight:700}
    .badge{background:#C9A227;color:#0F2744;font-size:11px;font-weight:700;padding:4px 12px;border-radius:20px}
    .body{padding:28px}
    h2{color:#0F2744;font-size:17px;margin-bottom:16px}
    .card{background:#f9fafb;border-left:3px solid #C9A227;padding:14px 18px;border-radius:0 6px 6px 0}
    .row{display:flex;padding:6px 0;border-bottom:1px solid #e8ecf3}
    .row:last-child{border-bottom:none}
    .lbl{font-size:11px;font-weight:700;color:#7a8ea0;text-transform:uppercase;width:100px;flex-shrink:0;padding-top:1px}
    .val{font-size:13px;color:#0F2744}
    .cta{display:block;background:#0F2744;color:#fff;text-align:center;padding:12px 24px;text-decoration:none;font-weight:700;font-size:13px;border-radius:6px;margin-top:20px}
    a{color:#C9A227}
  </style></head><body>
  <div class="wrap">
    <div class="header">
      <div class="logo">GradElevate Admin</div>
      <div class="badge">New Booking</div>
    </div>
    <div class="body">
      <h2>New consultation request from ${b.name}</h2>
      <div class="card">
        <div class="row"><span class="lbl">Name</span><span class="val">${b.name}</span></div>
        <div class="row"><span class="lbl">Email</span><span class="val"><a href="mailto:${b.email}">${b.email}</a></span></div>
        <div class="row"><span class="lbl">Phone</span><span class="val">${b.phone || "—"}</span></div>
        <div class="row"><span class="lbl">Service</span><span class="val">${b.service || "—"}</span></div>
        <div class="row"><span class="lbl">Stage</span><span class="val">${b.stage || "—"}</span></div>
        ${b.message ? `<div class="row"><span class="lbl">Message</span><span class="val">${b.message}</span></div>` : ""}
      </div>
      <a class="cta" href="${process.env.NEXT_PUBLIC_SITE_URL || "https://gradelevate.com"}/admin/bookings">View in Admin Panel →</a>
    </div>
  </div>
</body></html>`;
}

export async function sendBookingEmails(booking: Booking): Promise<EmailLog[]> {
  const logs: EmailLog[] = [];
  const transporter = createTransporter();
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || "hello@gradelevate.com";
  const adminEmail = process.env.ADMIN_EMAIL || "hello@gradelevate.com";

  if (!transporter) {
    console.log("[Email] SMTP not configured — skipping send (set SMTP_HOST, SMTP_USER, SMTP_PASS in .env.local)");
    return logs;
  }

  // Client confirmation
  const clientSubject = "Your Consultation Request — GradElevate";
  try {
    await transporter.sendMail({ from: `"GradElevate" <${from}>`, to: booking.email, subject: clientSubject, html: confirmationHtml(booking) });
    logs.push({ id: `em-${Date.now()}-c`, subject: clientSubject, type: "booking_confirmation", sentAt: new Date().toISOString(), status: "sent" });
  } catch (err) {
    logs.push({ id: `em-${Date.now()}-c`, subject: clientSubject, type: "booking_confirmation", sentAt: new Date().toISOString(), status: "failed", error: String(err) });
  }

  // Admin notification
  const adminSubject = `New Booking: ${booking.name} — ${booking.service || "General"}`;
  try {
    await transporter.sendMail({ from: `"GradElevate" <${from}>`, to: adminEmail, subject: adminSubject, html: adminNotificationHtml(booking) });
    logs.push({ id: `em-${Date.now()}-a`, subject: adminSubject, type: "admin_notification", sentAt: new Date().toISOString(), status: "sent" });
  } catch (err) {
    logs.push({ id: `em-${Date.now()}-a`, subject: adminSubject, type: "admin_notification", sentAt: new Date().toISOString(), status: "failed", error: String(err) });
  }

  return logs;
}
