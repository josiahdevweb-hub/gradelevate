import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const FILE = path.join(process.cwd(), "data", "announcements.json");

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const data = JSON.parse(fs.readFileSync(FILE, "utf-8"));
    return res.json(data);
  }
  if (req.method === "PUT") {
    const existing = JSON.parse(fs.readFileSync(FILE, "utf-8"));
    const updated = { ...existing, ...req.body, updatedAt: new Date().toISOString() };
    fs.writeFileSync(FILE, JSON.stringify(updated, null, 2));
    return res.json(updated);
  }
  res.status(405).end();
}
