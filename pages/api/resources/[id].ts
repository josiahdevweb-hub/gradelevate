import { NextApiRequest, NextApiResponse } from "next";

const BACKEND = "https://gradeelevate-backend-production.up.railway.app";

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
  const { id } = req.query;
  const token = req.headers.authorization?.replace("Bearer ", "") ?? "";

  try {
    if (req.method === "PUT") {
      const upstream = await fetch(`${BACKEND}/api/admin/resources/${id}`, {
        method: "PUT",
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
      return res.json({ ...data, tag: data.fileType ?? "", hidden: data.active === false });
    }

    if (req.method === "DELETE") {
      const upstream = await fetch(`${BACKEND}/api/admin/resources/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!upstream.ok) return res.status(upstream.status).json({ error: "Delete failed" });
      return res.json({ success: true });
    }

    res.status(405).end();
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
}