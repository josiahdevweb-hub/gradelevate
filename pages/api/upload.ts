import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

export const config = {
  api: { bodyParser: { sizeLimit: "12mb" } },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const { name, data, type } = req.body as { name: string; data: string; type: string };

    const ext = (type?.split("/")[1] || "jpg").replace("jpeg", "jpg");
    const base = name
      .replace(/\.[^.]+$/, "")
      .replace(/[^a-z0-9]/gi, "-")
      .toLowerCase()
      .slice(0, 40);
    const filename = `${Date.now()}-${base}.${ext}`;

    const uploadsDir = path.join(process.cwd(), "public", "uploads");
    if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

    fs.writeFileSync(path.join(uploadsDir, filename), Buffer.from(data, "base64"));

    res.json({ url: `/uploads/${filename}` });
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}
