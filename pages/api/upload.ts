import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export const config = {
  api: { bodyParser: false },
};

function readRawBody(req: NextApiRequest): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const rawName = decodeURIComponent(String(req.headers["x-filename"] || "upload"));
    const mime = String(req.headers["content-type"] || "image/jpeg");

    const extRaw = mime.split("/")[1] || "jpg";
    const ext = extRaw === "jpeg" ? "jpg" : extRaw;

    const base = rawName
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-z0-9]+/gi, "-")
      .toLowerCase()
      .slice(0, 40);

    const filename = `${Date.now()}-${base}.${ext}`;

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    const buffer = await readRawBody(req);
    fs.writeFileSync(path.join(uploadsDir, filename), buffer);

    res.json({ url: `/uploads/${filename}` });
  } catch (e) {
    console.error("Upload error:", e);
    res.status(500).json({ error: String(e) });
  }
}
