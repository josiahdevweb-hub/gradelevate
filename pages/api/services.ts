import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "services.json");

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
      const services = read();
      const body = req.body;
      const newService = {
        ...body,
        id: body.id || slugify(body.title || String(Date.now())),
        num: String(services.length + 1).padStart(2, "0"),
        features: typeof body.features === "string"
          ? body.features.split(",").map((f: string) => f.trim()).filter(Boolean)
          : body.features || [],
      };
      services.push(newService);
      write(services);
      return res.status(201).json(newService);
    }
    if (req.method === "PUT") {
      const services = read();
      const idx = services.findIndex((s: { id: string }) => s.id === req.body.id);
      if (idx === -1) return res.status(404).json({ error: "Not found" });
      const updated = {
        ...services[idx],
        ...req.body,
        features: typeof req.body.features === "string"
          ? req.body.features.split(",").map((f: string) => f.trim()).filter(Boolean)
          : req.body.features || services[idx].features,
      };
      services[idx] = updated;
      write(services);
      return res.json(services[idx]);
    }
    if (req.method === "DELETE") {
      const services = read();
      write(services.filter((s: { id: string }) => s.id !== req.query.id));
      return res.json({ success: true });
    }
    res.status(405).end();
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
