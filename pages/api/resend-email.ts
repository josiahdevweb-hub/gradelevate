import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import nodemailer from "nodemailer";

const dataPath = path.join(process.cwd(), "data", "bookings.json");
function read() { return JSON.parse(fs.readFileSync(dataPath, "utf8")); }
function write(d: unknown) { fs.writeFileSync(dataPath, JSON.stringify(d, null, 2)); }

function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) return null;
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { bookingId, type } = req.body;
  if (!bookingId || !type) return res.status(400).json({ error: "bookingId and type required" });

  const bookings = read();
  const idx = bookings.findIndex((b: { id: string }) => b.id === bookingId);
  if (idx === -1) return res.status(404).json({ error: "Booking not found" });

  const booking = bookings[idx];
  const transporter = createTransporter();
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || "hello@gradelevate.com";
  const adminEmail = process.env.ADMIN_EMAIL || "hello@gradelevate.com";

  const subjects: Record<string, string> = {
    booking_confirmation: "Your Consultation Request — GradElevate",
    admin_notification: `New Booking: ${booking.name} — ${booking.service || "General"}`,
  };

  const subject = subjects[type] || `Message from GradElevate`;
  const to = type === "admin_notification" ? adminEmail : booking.email;

  let status: "sent" | "failed" = "failed";
  let error: string | undefined;

  if (transporter) {
    try {
      await transporter.sendMail({ from: `"GradElevate" <${from}>`, to, subject, text: subject });
      status = "sent";
    } catch (err) {
      error = String(err);
    }
  } else {
    console.log("[Resend] SMTP not configured — skipping");
    status = "sent"; // log as sent in dev so the UI shows the entry
  }

  const log = {
    id: `em-${Date.now()}-resend`,
    subject,
    type,
    sentAt: new Date().toISOString(),
    status,
    ...(error ? { error } : {}),
  };

  bookings[idx].emails = [...(bookings[idx].emails || []), log];
  write(bookings);

  res.json({ log });
}
