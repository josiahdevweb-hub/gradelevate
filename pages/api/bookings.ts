import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
import { sendBookingEmails } from "@/lib/email";

const dataPath = path.join(process.cwd(), "data", "bookings.json");

function read() { return JSON.parse(fs.readFileSync(dataPath, "utf8")); }
function write(d: unknown) { fs.writeFileSync(dataPath, JSON.stringify(d, null, 2)); }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      return res.json(read());
    }
    if (req.method === "POST") {
      const bookings = read();
      const newBooking = {
        ...req.body,
        id: Date.now().toString(),
        submittedAt: new Date().toISOString(),
        status: "New",
        emails: [] as unknown[],
      };

      // Send confirmation to client + notification to admin, log results
      const emailLogs = await sendBookingEmails(newBooking);
      newBooking.emails = emailLogs;

      bookings.unshift(newBooking);
      write(bookings);
      return res.status(201).json(newBooking);
    }
    if (req.method === "PATCH") {
      const bookings = read();
      const idx = bookings.findIndex((b: { id: string }) => b.id === req.body.id);
      if (idx === -1) return res.status(404).json({ error: "Not found" });
      bookings[idx] = { ...bookings[idx], ...req.body };
      write(bookings);
      return res.json(bookings[idx]);
    }
    res.status(405).end();
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
