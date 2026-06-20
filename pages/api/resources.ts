import { NextApiRequest, NextApiResponse } from "next";

const BACKEND = "https://gradeelevate-backend-production.up.railway.app";

function toFrontend(r: Record<string, unknown>) {
  return {
    ...r,
    tag: r.fileType ?? "",
    hidden: r.active === false,
  };
}

function toBackend(body: Record<string, unknown>) {
  return {
    title: body.title,
    description: body.description,
    category: body.category,
    fileType: body.tag ?? body.fileType ?? "",
    fileUrl: body.fileUrl ?? "",
    free: body.free ?? true,
    displayOrder: Number(body.displayOrder ?? 0),
    active: body.hidden ? false : true,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const token = req.headers.authorization?.replace("Bearer ", "") ?? "";
      const backendPath = token ? "/api/admin/resources" : "/api/resources";
      const upstream = await fetch(`${BACKEND}${backendPath}`, token
        ? { headers: { Authorization: `Bearer ${token}` } }
        : {});
      if (!upstream.ok) return res.status(upstream.status).json({ error: "Backend error" });
      const data = (await upstream.json()) as Record<string, unknown>[];
      return res.json(data.map(toFrontend));
    }

    if (req.method === "POST") {
      const token = req.headers.authorization?.replace("Bearer ", "") ?? "";
      const upstream = await fetch(`${BACKEND}/api/admin/resources`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(toBackend(req.body as Record<string, unknown>)),
      });
      if (!upstream.ok) {
        const err = await upstream.json().catch(() => ({})) as Record<string, string>;
        return res.status(upstream.status).json(err);
      }
      const data = await upstream.json() as Record<string, unknown>;
      return res.status(201).json(toFrontend(data));
    }

    res.status(405).end();
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}