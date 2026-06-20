import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "resources.json");

function read() { return JSON.parse(fs.readFileSync(dataPath, "utf8")); }
function write(d: unknown) { fs.writeFileSync(dataPath, JSON.stringify(d, null, 2)); }

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  try {
    if (req.method === "PUT") {
      const resources = read();
      const idx = resources.findIndex((r: { id: string }) => r.id === id);
      if (idx === -1) return res.status(404).json({ error: "Not found" });
      resources[idx] = { ...resources[idx], ...req.body, id };
      write(resources);
      return res.json(resources[idx]);
    }
    if (req.method === "DELETE") {
      const resources = read();
      write(resources.filter((r: { id: string }) => r.id !== id));
      return res.json({ success: true });
    }
    res.status(405).end();
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
