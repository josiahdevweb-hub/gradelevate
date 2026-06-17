import Head from "next/head";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUpload from "@/components/admin/ImageUpload";
import { api } from "@/lib/api";
import styles from "@/styles/admin.module.css";

interface Service {
  id: string;
  num: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  href: string;
  iconType: string;
}

const ICON_TYPES = ["academic", "career", "research", "ai", "coaching", "writing", "default"];

const EMPTY: Omit<Service, "id" | "num"> = {
  title: "",
  description: "",
  features: [],
  imageUrl: "",
  href: "",
  iconType: "default",
};

export default function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState<Omit<Service, "id" | "num"> & { id?: string; featuresStr?: string }>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () =>
    api.get<Service[]>("/api/services").then((data) => { setServices(data); setLoading(false); });

  useEffect(() => { load(); }, []);

  const openAdd = () => {
    setForm({ ...EMPTY, featuresStr: "" });
    setModal("add");
  };

  const openEdit = (s: Service) => {
    setForm({ ...s, featuresStr: s.features.join(", ") });
    setModal("edit");
  };

  const closeModal = () => { setModal(null); setSaving(false); };

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const features = (form.featuresStr ?? "").split(",").map((s) => s.trim()).filter(Boolean);
    const body = {
      title: form.title,
      description: form.description,
      features,
      imageUrl: form.imageUrl,
      href: form.href,
      iconType: form.iconType,
    };
    if (modal === "edit" && form.id) {
      await api.put<Service>(`/api/services/${form.id}`, body);
    } else {
      await api.post<Service>("/api/services", body);
    }
    await load();
    closeModal();
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await api.delete(`/api/services/${deleteId}`);
    await load();
    setDeleteId(null);
  };

  const set = (key: string, val: unknown) => setForm((f) => ({ ...f, [key]: val }));

  return (
    <>
      <Head><title>Services — GradElevate Admin</title></Head>
      <AdminLayout title="Services">
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageHeading}>Services</h1>
            <p className={styles.pageSubheading}>{services.length} services listed on the site</p>
          </div>
          <button className={styles.btnPrimary} onClick={openAdd}>
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Service
          </button>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span className={styles.tableTitle}>All Services ({services.length})</span>
          </div>
          {loading ? (
            <div className={styles.emptyState}>Loading…</div>
          ) : services.length === 0 ? (
            <div className={styles.emptyState}>No services found.</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Features</th>
                  <th>Icon</th>
                  <th>Link</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((s) => (
                  <tr key={s.id}>
                    <td className={styles.tdMuted}>{s.num}</td>
                    <td>
                      {s.imageUrl ? (
                        <img src={s.imageUrl} alt={s.title} className={styles.thumb} />
                      ) : (
                        <div className={styles.thumb} style={{ background: "#f0f2f6" }} />
                      )}
                    </td>
                    <td className={styles.tdBold}>{s.title}</td>
                    <td className={styles.tdMuted} style={{ maxWidth: 240 }}>
                      {s.description.length > 80 ? s.description.slice(0, 80) + "…" : s.description}
                    </td>
                    <td className={styles.tdMuted} style={{ maxWidth: 180 }}>
                      {Array.isArray(s.features) ? s.features.join(", ") : "—"}
                    </td>
                    <td className={styles.tdMuted}>{s.iconType}</td>
                    <td className={styles.tdMuted}>{s.href || "—"}</td>
                    <td>
                      <div className={styles.rowActions}>
                        <button className={styles.btnEdit} onClick={() => openEdit(s)}>Edit</button>
                        <button className={styles.btnDanger} onClick={() => setDeleteId(s.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {modal && (
          <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && closeModal()}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <span className={styles.modalTitle}>{modal === "add" ? "Add New Service" : "Edit Service"}</span>
                <button className={styles.modalClose} onClick={closeModal}>✕</button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.formGrid}>
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.formLabel}>Title *</label>
                    <input className={styles.formInput} placeholder="Service title" value={form.title}
                      onChange={(e) => set("title", e.target.value)} />
                  </div>
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.formLabel}>Description</label>
                    <textarea className={styles.formTextarea} rows={3}
                      placeholder="Brief description of this service…"
                      value={form.description ?? ""}
                      onChange={(e) => set("description", e.target.value)} />
                  </div>
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.formLabel}>Features</label>
                    <input className={styles.formInput} placeholder="1-to-1 tutoring, Dissertation support, Essay coaching"
                      value={form.featuresStr ?? ""}
                      onChange={(e) => set("featuresStr", e.target.value)} />
                    <span className={styles.formHint}>Separate with commas</span>
                  </div>
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.formLabel}>Image</label>
                    <ImageUpload
                      value={form.imageUrl as string ?? ""}
                      onChange={(url) => set("imageUrl", url)}
                      folder="services"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Icon Type</label>
                    <select className={styles.formSelect} value={form.iconType}
                      onChange={(e) => set("iconType", e.target.value)}>
                      {ICON_TYPES.map((t) => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Detail Page Link</label>
                    <input className={styles.formInput} placeholder="/services/my-service"
                      value={form.href ?? ""}
                      onChange={(e) => set("href", e.target.value)} />
                    <span className={styles.formHint}>Leave blank to link to booking page</span>
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.btnOutline} onClick={closeModal}>Cancel</button>
                <button className={styles.btnPrimary} onClick={save} disabled={saving}>
                  {saving ? "Saving…" : modal === "add" ? "Add Service" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}

        {deleteId && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal} style={{ maxWidth: 400 }}>
              <div className={styles.modalHeader}>
                <span className={styles.modalTitle}>Delete Service?</span>
                <button className={styles.modalClose} onClick={() => setDeleteId(null)}>✕</button>
              </div>
              <div className={styles.modalBody}>
                <p style={{ fontSize: "0.88rem", color: "#3a4a5a" }}>
                  This will remove the service from the public services page. This cannot be undone.
                </p>
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.btnOutline} onClick={() => setDeleteId(null)}>Cancel</button>
                <button className={styles.btnDanger} onClick={confirmDelete} style={{ padding: "9px 16px" }}>
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  );
}
