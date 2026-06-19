import Head from "next/head";
import { useEffect, useState, useRef } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUpload from "@/components/admin/ImageUpload";
import { api } from "@/lib/api";
import styles from "@/styles/admin.module.css";

interface Event {
  id: string;
  title: string;
  category: string;
  format: string;
  duration: string;
  price: string;
  date: string;
  imageUrl: string;
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
  imageUrl: "",
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
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [announceSaving, setAnnounceSaving] = useState(false);
  const [announceMsg, setAnnounceMsg] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const load = () =>
    api.get<Event[]>("/api/events").then((data) => { setEvents(data); setLoading(false); });

  useEffect(() => { load(); }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    };
    if (openMenu) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [openMenu]);

  const addAsAnnouncement = async (ev: Event) => {
    setOpenMenu(null);
    setAnnounceSaving(true);
    setAnnounceMsg(null);
    try {
      await api.put("/api/announcements", {
        active: true,
        title: ev.title,
        body: `${ev.category} · ${ev.format} · ${ev.date}${ev.price ? ` · ${ev.price}` : ""}`,
        ctaText: "Register Now",
        ctaLink: "/events",
        imageUrl: ev.imageUrl || "",
      });
      setAnnounceMsg(`"${ev.title}" added as announcement`);
      setTimeout(() => setAnnounceMsg(null), 3000);
    } catch {
      setAnnounceMsg("Failed to set announcement");
      setTimeout(() => setAnnounceMsg(null), 3000);
    } finally {
      setAnnounceSaving(false);
    }
  };

  const openAdd = () => { setForm(EMPTY); setModal("add"); };
  const openEdit = (ev: Event) => { setForm(ev); setModal("edit"); };
  const closeModal = () => { setModal(null); setSaving(false); };

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    if (modal === "edit" && form.id) {
      const { id, ...body } = form;
      await api.put<Event>(`/api/events/${id}`, { ...body, spots: Number(body.spots) });
    } else {
      await api.post<Event>("/api/events", { ...form, spots: Number(form.spots) });
    }
    await load();
    closeModal();
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await api.delete(`/api/events/${deleteId}`);
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
                      {ev.imageUrl ? (
                        <img src={ev.imageUrl} alt={ev.title} className={styles.thumb} />
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
                      <div className={styles.actionDropdownWrap} ref={openMenu === ev.id ? menuRef : undefined}>
                        <button
                          className={styles.btnActionToggle}
                          onClick={(e) => { e.stopPropagation(); setOpenMenu(openMenu === ev.id ? null : ev.id); }}
                        >
                          Actions
                          <svg width="10" height="10" fill="none" viewBox="0 0 14 14" style={{ marginLeft: 4 }}>
                            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        {openMenu === ev.id && (
                          <div className={styles.actionDropdown}>
                            <button className={styles.actionDropdownItem} onClick={() => { setOpenMenu(null); openEdit(ev); }}>
                              <svg width="13" height="13" fill="none" viewBox="0 0 14 14">
                                <path d="M10.5 1.5l2 2-7 7H3.5v-2l7-7z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                              </svg>
                              Edit
                            </button>
                            <button className={styles.actionDropdownItem} onClick={() => { setOpenMenu(null); setDeleteId(ev.id); }}>
                              <svg width="13" height="13" fill="none" viewBox="0 0 14 14">
                                <path d="M2 4h10M5 4V2.5h4V4M3 4v8.5h8V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                              </svg>
                              Delete
                            </button>
                            <div className={styles.actionDropdownDivider} />
                            <button
                              className={styles.actionDropdownItem}
                              onClick={() => addAsAnnouncement(ev)}
                              disabled={announceSaving}
                            >
                              <svg width="13" height="13" fill="none" viewBox="0 0 14 14">
                                <path d="M2 3h10v8H2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
                                <path d="M5 7h4M7 5v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                              </svg>
                              {announceSaving ? "Saving…" : "Add as Announcement"}
                            </button>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {announceMsg && (
          <div className={styles.toast}>
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <circle cx="7" cy="7" r="6" stroke={announceMsg.startsWith("Failed") ? "#ef4444" : "#10b981"} strokeWidth="1.4"/>
              <path d="M4 7l2 2 4-4.5" stroke={announceMsg.startsWith("Failed") ? "#ef4444" : "#10b981"} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {announceMsg}
          </div>
        )}

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
                    <label className={styles.formLabel}>Image</label>
                    <ImageUpload
                      value={form.imageUrl as string}
                      onChange={(url) => set("imageUrl", url)}
                      folder="events"
                    />
                  </div>
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
