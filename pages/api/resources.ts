import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "resources.json");

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
      const resources = read();
      const body = req.body;
      const newResource = {
        ...body,
        id: body.id || slugify(body.title || String(Date.now())),
      };
      resources.push(newResource);
      write(resources);
      return res.status(201).json(newResource);
    }
    res.status(405).end();
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
