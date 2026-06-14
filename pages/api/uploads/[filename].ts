import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { filename } = req.query;
  if (!filename || typeof filename !== "string" || filename.includes("..")) {
    return res.status(400).end();
  }

  const filePath = path.join("/tmp", "uploads", filename);
  if (!fs.existsSync(filePath)) return res.status(404).end();

  const ext = path.extname(filename).slice(1).toLowerCase();
  const mimeMap: Record<string, string> = {
    jpg: "image/jpeg", jpeg: "image/jpeg",
    png: "image/png", gif: "image/gif",
    webp: "image/webp",
  };
  const contentType = mimeMap[ext] || "application/octet-stream";

  res.setHeader("Content-Type", contentType);
  res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  fs.createReadStream(filePath).pipe(res);
}
