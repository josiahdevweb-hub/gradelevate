import Head from "next/head";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import styles from "@/styles/admin.module.css";

interface Event {
  id: string;
  title: string;
  category: string;
  format: string;
  duration: string;
  price: string;
  date: string;
  image: string;
  spots: number;
}

const CATEGORIES = ["Academic Writing", "Research", "Career Development", "AI & Digital Skills"];
const FORMATS = ["Online Webinar", "Online Workshop", "In-Person", "Hybrid"];

const EMPTY: Omit<Event, "id"> = {
  title: "",
  category: "Academic Writing",
  format: "Online Webinar",
  duration: "",
  price: "",
  date: "",
  image: "",
  spots: 20,
};

export default function AdminEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState<Omit<Event, "id"> & { id?: string }>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () =>
    fetch("/api/events").then((r) => r.json()).then((data) => { setEvents(data); setLoading(false); });

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(EMPTY); setModal("add"); };
  const openEdit = (ev: Event) => { setForm(ev); setModal("edit"); };
  const closeModal = () => { setModal(null); setSaving(false); };

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const method = modal === "edit" ? "PUT" : "POST";
    await fetch("/api/events", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, spots: Number(form.spots) }),
    });
    await load();
    closeModal();
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/events?id=${deleteId}`, { method: "DELETE" });
    await load();
    setDeleteId(null);
  };

  const set = (key: keyof typeof form, val: unknown) =>
    setForm((f) => ({ ...f, [key]: val }));

  const filtered = events.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase()) ||
    e.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Head><title>Events — GradElevate Admin</title></Head>
      <AdminLayout title="Events">
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageHeading}>Events</h1>
            <p className={styles.pageSubheading}>{events.length} scheduled</p>
          </div>
          <button className={styles.btnPrimary} onClick={openAdd}>
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Event
          </button>
        </div>

        <div className={styles.filterRow}>
          <div className={styles.searchBox}>
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <circle cx="6" cy="6" r="4.5" stroke="#9aaab8" strokeWidth="1.3"/>
              <path d="M10 10l2.5 2.5" stroke="#9aaab8" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input placeholder="Search events…" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span className={styles.tableTitle}>All Events ({filtered.length})</span>
          </div>
          {loading ? (
            <div className={styles.emptyState}>Loading…</div>
          ) : filtered.length === 0 ? (
            <div className={styles.emptyState}>No events found.</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Format</th>
                  <th>Date</th>
                  <th>Duration</th>
                  <th>Price</th>
                  <th>Spots</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((ev) => (
                  <tr key={ev.id}>
                    <td>
                      {ev.image ? (
                        <img src={ev.image} alt={ev.title} className={styles.thumb} />
                      ) : (
                        <div className={styles.thumb} style={{ background: "#f0f2f6" }} />
                      )}
                    </td>
                    <td className={styles.tdBold} style={{ maxWidth: 220 }}>{ev.title}</td>
                    <td className={styles.tdMuted}>{ev.category}</td>
                    <td className={styles.tdMuted}>{ev.format}</td>
                    <td className={styles.tdMuted}>{ev.date}</td>
                    <td className={styles.tdMuted}>{ev.duration}</td>
                    <td style={{ fontWeight: 600, color: ev.price === "Free" ? "#16a34a" : "#0F2744" }}>{ev.price}</td>
                    <td className={styles.tdMuted}>{ev.spots}</td>
                    <td>
                      <div className={styles.rowActions}>
                        <button className={styles.btnEdit} onClick={() => openEdit(ev)}>Edit</button>
                        <button className={styles.btnDanger} onClick={() => setDeleteId(ev.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Add / Edit modal */}
        {modal && (
          <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && closeModal()}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <span className={styles.modalTitle}>{modal === "add" ? "Add New Event" : "Edit Event"}</span>
                <button className={styles.modalClose} onClick={closeModal}>✕</button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.formGrid}>
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.formLabel}>Title *</label>
                    <input className={styles.formInput} placeholder="Event title" value={form.title}
                      onChange={(e) => set("title", e.target.value)} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Category</label>
                    <select className={styles.formSelect} value={form.category}
                      onChange={(e) => set("category", e.target.value)}>
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Format</label>
                    <select className={styles.formSelect} value={form.format}
                      onChange={(e) => set("format", e.target.value)}>
                      {FORMATS.map((f) => <option key={f}>{f}</option>)}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Date</label>
                    <input className={styles.formInput} placeholder="14 Jul 2026" value={form.date}
                      onChange={(e) => set("date", e.target.value)} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Duration</label>
                    <input className={styles.formInput} placeholder="3 hours / Full Day" value={form.duration}
                      onChange={(e) => set("duration", e.target.value)} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Price</label>
                    <input className={styles.formInput} placeholder="£49 / Free" value={form.price}
                      onChange={(e) => set("price", e.target.value)} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Spots Available</label>
                    <input className={styles.formInput} type="number" min={0} value={form.spots}
                      onChange={(e) => set("spots", e.target.value)} />
                  </div>
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.formLabel}>Image URL</label>
                    <input className={styles.formInput} placeholder="https://images.unsplash.com/..." value={form.image}
                      onChange={(e) => set("image", e.target.value)} />
                  </div>
                  {form.image && (
                    <div className={styles.formGroupFull}>
                      <img src={form.image} alt="preview" className={styles.imgPreview} />
                    </div>
                  )}
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.btnOutline} onClick={closeModal}>Cancel</button>
                <button className={styles.btnPrimary} onClick={save} disabled={saving}>
                  {saving ? "Saving…" : modal === "add" ? "Add Event" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete confirm */}
        {deleteId && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal} style={{ maxWidth: 400 }}>
              <div className={styles.modalHeader}>
                <span className={styles.modalTitle}>Delete Event?</span>
                <button className={styles.modalClose} onClick={() => setDeleteId(null)}>✕</button>
              </div>
              <div className={styles.modalBody}>
                <p style={{ fontSize: "0.88rem", color: "#3a4a5a" }}>
                  This will permanently remove the event. This cannot be undone.
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
