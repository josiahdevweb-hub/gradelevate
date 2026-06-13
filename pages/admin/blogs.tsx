import Head from "next/head";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUpload from "@/components/admin/ImageUpload";
import styles from "@/styles/admin.module.css";

interface BlogPost {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured: boolean;
}

const CATEGORIES = ["Academic Success", "Graduate Employability", "Research Skills", "AI & Higher Education"];

const EMPTY: Omit<BlogPost, "id"> = {
  category: "Academic Success",
  title: "",
  excerpt: "",
  author: "GradElevate Team",
  date: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
  readTime: "5 min read",
  image: "",
  featured: false,
};

export default function AdminBlogs() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState<Omit<BlogPost, "id"> & { id?: string }>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const load = () =>
    fetch("/api/blogs").then((r) => r.json()).then((data) => { setPosts(data); setLoading(false); });

  useEffect(() => { load(); }, []);

  const openAdd = () => { setForm(EMPTY); setModal("add"); };
  const openEdit = (p: BlogPost) => { setForm(p); setModal("edit"); };
  const closeModal = () => { setModal(null); setSaving(false); };

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    const method = modal === "edit" ? "PUT" : "POST";
    await fetch("/api/blogs", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    await load();
    closeModal();
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/blogs?id=${deleteId}`, { method: "DELETE" });
    await load();
    setDeleteId(null);
  };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  const field = (
    key: keyof typeof form,
    label: string,
    opts?: { type?: string; placeholder?: string; hint?: string; full?: boolean; rows?: number }
  ) => (
    <div className={`${styles.formGroup} ${opts?.full ? styles.formGroupFull : ""}`}>
      <label className={styles.formLabel}>{label}</label>
      {opts?.rows ? (
        <textarea
          className={styles.formTextarea}
          rows={opts.rows}
          placeholder={opts?.placeholder}
          value={String(form[key] ?? "")}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        />
      ) : (
        <input
          className={styles.formInput}
          type={opts?.type || "text"}
          placeholder={opts?.placeholder}
          value={String(form[key] ?? "")}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        />
      )}
      {opts?.hint && <span className={styles.formHint}>{opts.hint}</span>}
    </div>
  );

  return (
    <>
      <Head><title>Blog Posts — GradElevate Admin</title></Head>
      <AdminLayout title="Blog Posts">
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageHeading}>Blog Posts</h1>
            <p className={styles.pageSubheading}>{posts.length} articles</p>
          </div>
          <button className={styles.btnPrimary} onClick={openAdd}>
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            Add Post
          </button>
        </div>

        <div className={styles.filterRow}>
          <div className={styles.searchBox}>
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <circle cx="6" cy="6" r="4.5" stroke="#9aaab8" strokeWidth="1.3"/>
              <path d="M10 10l2.5 2.5" stroke="#9aaab8" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input
              placeholder="Search posts…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span className={styles.tableTitle}>All Posts ({filtered.length})</span>
          </div>
          {loading ? (
            <div className={styles.emptyState}>Loading…</div>
          ) : filtered.length === 0 ? (
            <div className={styles.emptyState}>No posts found.</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Date</th>
                  <th>Read Time</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((p) => (
                  <tr key={p.id}>
                    <td>
                      {p.image ? (
                        <img src={p.image} alt={p.title} className={styles.thumb} />
                      ) : (
                        <div className={styles.thumb} style={{ background: "#f0f2f6" }} />
                      )}
                    </td>
                    <td className={styles.tdBold} style={{ maxWidth: 260 }}>{p.title}</td>
                    <td className={styles.tdMuted}>{p.category}</td>
                    <td className={styles.tdMuted}>{p.author}</td>
                    <td className={styles.tdMuted}>{p.date}</td>
                    <td className={styles.tdMuted}>{p.readTime}</td>
                    <td>
                      <span className={p.featured ? styles.featuredStar : styles.notFeatured}>★</span>
                    </td>
                    <td>
                      <div className={styles.rowActions}>
                        <button className={styles.btnEdit} onClick={() => openEdit(p)}>Edit</button>
                        <button className={styles.btnDanger} onClick={() => setDeleteId(p.id)}>Delete</button>
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
                <span className={styles.modalTitle}>{modal === "add" ? "Add New Post" : "Edit Post"}</span>
                <button className={styles.modalClose} onClick={closeModal}>✕</button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.formGrid}>
                  {field("title", "Title *", { full: true, placeholder: "Post title" })}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Category</label>
                    <select className={styles.formSelect} value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}>
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  {field("author", "Author", { placeholder: "GradElevate Team" })}
                  {field("date", "Date", { placeholder: "2 Jun 2026" })}
                  {field("readTime", "Read Time", { placeholder: "5 min read" })}
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.formLabel}>Image</label>
                    <ImageUpload value={form.image as string} onChange={(url) => setForm((f) => ({ ...f, image: url }))} />
                  </div>
                  {field("excerpt", "Excerpt", { full: true, rows: 3, placeholder: "Short description of the post…" })}
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <div className={styles.toggleRow}>
                      <label className={styles.toggle}>
                        <input
                          type="checkbox"
                          checked={!!form.featured}
                          onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))}
                        />
                        <span className={styles.toggleSlider} />
                      </label>
                      <span className={styles.toggleLabel}>Feature this post (shown prominently on blog page)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.btnOutline} onClick={closeModal}>Cancel</button>
                <button className={styles.btnPrimary} onClick={save} disabled={saving}>
                  {saving ? "Saving…" : modal === "add" ? "Add Post" : "Save Changes"}
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
                <span className={styles.modalTitle}>Delete Post?</span>
                <button className={styles.modalClose} onClick={() => setDeleteId(null)}>✕</button>
              </div>
              <div className={styles.modalBody}>
                <p style={{ fontSize: "0.88rem", color: "#3a4a5a" }}>
                  This will permanently remove the post from the blog. This action cannot be undone.
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
