import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "events.json");

function read() { return JSON.parse(fs.readFileSync(dataPath, "utf8")); }
function write(d: unknown) { fs.writeFileSync(dataPath, JSON.stringify(d, null, 2)); }

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      return res.json(read());
    }
    if (req.method === "POST") {
      const events = read();
      const body = req.body;
      const newEvent = { ...body, id: body.id || slugify(body.title || String(Date.now())) };
      events.push(newEvent);
      write(events);
      return res.status(201).json(newEvent);
    }
    if (req.method === "PUT") {
      const events = read();
      const idx = events.findIndex((e: { id: string }) => e.id === req.body.id);
      if (idx === -1) return res.status(404).json({ error: "Not found" });
      events[idx] = { ...events[idx], ...req.body };
      write(events);
      return res.json(events[idx]);
    }
    if (req.method === "DELETE") {
      const events = read();
      write(events.filter((e: { id: string }) => e.id !== req.query.id));
      return res.json({ success: true });
    }
    res.status(405).end();
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
