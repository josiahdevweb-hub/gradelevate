import Head from "next/head";
import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import FileUpload from "@/components/admin/FileUpload";
import styles from "@/styles/admin.module.css";

interface Resource {
  id: string;
  category: string;
  title: string;
  description: string;
  tag: string;
  free: boolean;
  hidden: boolean;
  fileUrl: string;
}

const CATEGORIES = ["Guides", "Templates", "Checklists"];

const EMPTY: Omit<Resource, "id"> = {
  category: "Guides",
  title: "",
  description: "",
  tag: "PDF",
  free: true,
  hidden: false,
  fileUrl: "",
};

const DEFAULT_RESOURCES: Omit<Resource, "id">[] = [
  { category: "Guides", title: "Ultimate Dissertation Writing Guide", description: "Step-by-step breakdown of planning, structuring, and writing your dissertation.", tag: "PDF · 24 pages", free: true, hidden: false, fileUrl: "/privacy-policy" },
  { category: "Guides", title: "PhD Application Success Blueprint", description: "How to craft a compelling research proposal and personal statement.", tag: "PDF · 18 pages", free: false, hidden: false, fileUrl: "/privacy-policy" },
  { category: "Guides", title: "Academic Job Market Guide", description: "Navigating academic career paths, fellowships, and applications.", tag: "PDF · 16 pages", free: false, hidden: false, fileUrl: "/privacy-policy" },
  { category: "Guides", title: "Postgraduate Funding Guide", description: "Comprehensive list of UK and international funding sources for Masters and PhD.", tag: "PDF · 12 pages", free: true, hidden: false, fileUrl: "/privacy-policy" },
  { category: "Templates", title: "Academic CV Template", description: "Professional CV template designed for academic and research roles.", tag: "Word / PDF", free: true, hidden: false, fileUrl: "/privacy-policy" },
  { category: "Templates", title: "Research Proposal Template", description: "Structured template for Masters and PhD research proposals.", tag: "Word / PDF", free: false, hidden: false, fileUrl: "/privacy-policy" },
  { category: "Templates", title: "Literature Review Matrix", description: "Excel template for organising and synthesising research sources.", tag: "Excel", free: true, hidden: false, fileUrl: "/privacy-policy" },
  { category: "Templates", title: "SMART Goal Setting Planner", description: "Plan your academic semester with structured goal-setting and tracking.", tag: "PDF / Excel", free: false, hidden: false, fileUrl: "/privacy-policy" },
  { category: "Checklists", title: "Dissertation Submission Checklist", description: "Everything you need to verify before submitting your dissertation.", tag: "PDF · 2 pages", free: true, hidden: false, fileUrl: "/privacy-policy" },
  { category: "Checklists", title: "Job Application Checklist", description: "Make sure your applications are complete, compelling, and error-free.", tag: "PDF · 1 page", free: true, hidden: false, fileUrl: "/privacy-policy" },
  { category: "Checklists", title: "PhD Viva Preparation Checklist", description: "Step-by-step preparation guide for your doctoral viva examination.", tag: "PDF · 3 pages", free: false, hidden: false, fileUrl: "/privacy-policy" },
  { category: "Checklists", title: "Conference Presentation Checklist", description: "Preparation guide for presenting your research at academic conferences.", tag: "PDF · 2 pages", free: false, hidden: false, fileUrl: "/privacy-policy" },
];

export default function AdminResources() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [modal, setModal] = useState<"add" | "edit" | null>(null);
  const [form, setForm] = useState<Omit<Resource, "id"> & { id?: string }>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);

  const load = () =>
    fetch("/api/resources")
      .then((r) => r.json())
      .then((data: Resource[]) => { setResources(data); setLoading(false); })
      .catch(() => setLoading(false));

  useEffect(() => { load(); }, []);

  const seedDefaults = async () => {
    setSeeding(true);
    try {
      for (const r of DEFAULT_RESOURCES) {
        await fetch("/api/resources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(r),
        });
      }
      await load();
    } catch {}
    setSeeding(false);
  };

  const openAdd = () => { setForm(EMPTY); setModal("add"); };
  const openEdit = (r: Resource) => { setForm(r); setModal("edit"); };
  const closeModal = () => { setModal(null); setSaving(false); };

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    try {
      if (modal === "edit" && form.id) {
        await fetch(`/api/resources/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch("/api/resources", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }
      await load();
      closeModal();
    } catch {
      setSaving(false);
    }
  };

  const toggleHidden = async (r: Resource) => {
    await fetch(`/api/resources/${r.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...r, hidden: !r.hidden }),
    });
    await load();
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/resources/${deleteId}`, { method: "DELETE" });
    await load();
    setDeleteId(null);
  };

  const filtered = resources.filter((r) => {
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All" || r.category === catFilter;
    return matchSearch && matchCat;
  });

  const field = (
    key: keyof typeof form,
    label: string,
    opts?: { placeholder?: string; full?: boolean; rows?: number }
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
          type="text"
          placeholder={opts?.placeholder}
          value={String(form[key] ?? "")}
          onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        />
      )}
    </div>
  );

  return (
    <>
      <Head><title>Resources — GradElevate Admin</title></Head>
      <AdminLayout title="Resources">
        <div className={styles.pageHeader}>
          <div>
            <h1 className={styles.pageHeading}>Resources</h1>
            <p className={styles.pageSubheading}>{resources.length} downloadable resources</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {resources.length === 0 && !loading && (
              <button className={styles.btnOutline} onClick={seedDefaults} disabled={seeding}>
                {seeding ? "Seeding…" : "Load Default Resources"}
              </button>
            )}
            <button className={styles.btnPrimary} onClick={openAdd}>
              <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
                <path d="M7 2v10M2 7h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Add Resource
            </button>
          </div>
        </div>

        <div className={styles.filterRow}>
          <div className={styles.searchBox}>
            <svg width="14" height="14" fill="none" viewBox="0 0 14 14">
              <circle cx="6" cy="6" r="4.5" stroke="#9aaab8" strokeWidth="1.3"/>
              <path d="M10 10l2.5 2.5" stroke="#9aaab8" strokeWidth="1.3" strokeLinecap="round"/>
            </svg>
            <input
              placeholder="Search resources…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select
            className={styles.filterSelect}
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className={styles.tableCard}>
          <div className={styles.tableHeader}>
            <span className={styles.tableTitle}>All Resources ({filtered.length})</span>
          </div>
          {loading ? (
            <div className={styles.emptyState}>Loading…</div>
          ) : filtered.length === 0 ? (
            <div className={styles.emptyState}>
              <p>No resources yet.</p>
              <p style={{ marginTop: 8 }}>
                Click <strong>&quot;Load Default Resources&quot;</strong> to add all 12 guides, templates, and checklists, or <strong>&quot;Add Resource&quot;</strong> to create one manually.
              </p>
            </div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Format</th>
                  <th>Access</th>
                  <th>Visibility</th>
                  <th>File</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <div>
                        <span className={styles.tdBold}>{r.title}</span>
                        <br />
                        <span className={styles.tdMuted} style={{ fontSize: "0.75rem" }}>
                          {r.description.length > 60 ? r.description.slice(0, 60) + "…" : r.description}
                        </span>
                      </div>
                    </td>
                    <td className={styles.tdMuted}>{r.category}</td>
                    <td className={styles.tdMuted}>{r.tag}</td>
                    <td>
                      <span className={`${styles.badge} ${r.free ? styles.badgeCompleted : styles.badgeContacted}`}>
                        {r.free ? "Free" : "Premium"}
                      </span>
                    </td>
                    <td>
                      <button
                        className={styles.btnEdit}
                        style={{ fontSize: "0.72rem", opacity: r.hidden ? 0.5 : 1 }}
                        onClick={() => toggleHidden(r)}
                      >
                        {r.hidden ? "Hidden" : "Visible"}
                      </button>
                    </td>
                    <td>
                      {r.fileUrl ? (
                        <a
                          href={r.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: "0.78rem", color: "#C9A227" }}
                        >
                          View ↗
                        </a>
                      ) : (
                        <span className={styles.tdMuted}>—</span>
                      )}
                    </td>
                    <td>
                      <div className={styles.rowActions}>
                        <button className={styles.btnEdit} onClick={() => openEdit(r)}>Edit</button>
                        <button className={styles.btnDanger} onClick={() => setDeleteId(r.id)}>Delete</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Add / Edit Modal */}
        {modal && (
          <div className={styles.modalOverlay} onClick={(e) => e.target === e.currentTarget && closeModal()}>
            <div className={styles.modal}>
              <div className={styles.modalHeader}>
                <span className={styles.modalTitle}>{modal === "add" ? "Add New Resource" : "Edit Resource"}</span>
                <button className={styles.modalClose} onClick={closeModal}>✕</button>
              </div>
              <div className={styles.modalBody}>
                <div className={styles.formGrid}>
                  {field("title", "Title *", { full: true, placeholder: "e.g. Ultimate Dissertation Writing Guide" })}
                  {field("description", "Description *", { full: true, rows: 3, placeholder: "Short description of the resource…" })}
                  <div className={styles.formGroup}>
                    <label className={styles.formLabel}>Category</label>
                    <select
                      className={styles.formSelect}
                      value={form.category}
                      onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    >
                      {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  {field("tag", "Format Tag", { placeholder: "e.g. PDF · 24 pages" })}
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <div className={styles.toggleRow}>
                      <label className={styles.toggle}>
                        <input
                          type="checkbox"
                          checked={!!form.free}
                          onChange={(e) => setForm((f) => ({ ...f, free: e.target.checked }))}
                        />
                        <span className={styles.toggleSlider} />
                      </label>
                      <span className={styles.toggleLabel}>Free resource (available for download without premium access)</span>
                    </div>
                  </div>
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <div className={styles.toggleRow}>
                      <label className={styles.toggle}>
                        <input
                          type="checkbox"
                          checked={!!form.hidden}
                          onChange={(e) => setForm((f) => ({ ...f, hidden: e.target.checked }))}
                        />
                        <span className={styles.toggleSlider} />
                      </label>
                      <span className={styles.toggleLabel}>Hidden (hide this resource from the public resources page)</span>
                    </div>
                  </div>
                  <div className={`${styles.formGroup} ${styles.formGroupFull}`}>
                    <label className={styles.formLabel}>File *</label>
                    <FileUpload
                      value={form.fileUrl}
                      onChange={(url) => setForm((f) => ({ ...f, fileUrl: url }))}
                      folder="resources"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.btnOutline} onClick={closeModal}>Cancel</button>
                <button className={styles.btnPrimary} onClick={save} disabled={saving}>
                  {saving ? "Saving…" : modal === "add" ? "Add Resource" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete confirmation */}
        {deleteId && (
          <div className={styles.modalOverlay}>
            <div className={styles.modal} style={{ maxWidth: 400 }}>
              <div className={styles.modalHeader}>
                <span className={styles.modalTitle}>Delete Resource?</span>
                <button className={styles.modalClose} onClick={() => setDeleteId(null)}>✕</button>
              </div>
              <div className={styles.modalBody}>
                <p style={{ fontSize: "0.88rem", color: "#3a4a5a" }}>
                  This will permanently remove the resource. This action cannot be undone.
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
