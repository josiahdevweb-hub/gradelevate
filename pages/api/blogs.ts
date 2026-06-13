import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

const dataPath = path.join(process.cwd(), "data", "blogs.json");

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
      const blogs = read();
      const body = req.body;
      const newPost = { ...body, id: body.id || slugify(body.title || String(Date.now())) };
      blogs.push(newPost);
      write(blogs);
      return res.status(201).json(newPost);
    }
    if (req.method === "PUT") {
      const blogs = read();
      const idx = blogs.findIndex((b: { id: string }) => b.id === req.body.id);
      if (idx === -1) return res.status(404).json({ error: "Not found" });
      blogs[idx] = { ...blogs[idx], ...req.body };
      write(blogs);
      return res.json(blogs[idx]);
    }
    if (req.method === "DELETE") {
      const blogs = read();
      write(blogs.filter((b: { id: string }) => b.id !== req.query.id));
      return res.json({ success: true });
    }
    res.status(405).end();
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
