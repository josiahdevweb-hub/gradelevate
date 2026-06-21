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
  { category: "Guides", title: "Ultimate Dissertation Writing Guide", description: "Step-by-step breakdown of planning, structuring, and writing your dissertation.", tag: "PDF · 24 pages", free: true, hidden: false, fileUrl: "/terms-download" },
  { category: "Guides", title: "PhD Application Success Blueprint", description: "How to craft a compelling research proposal and personal statement.", tag: "PDF · 18 pages", free: false, hidden: false, fileUrl: "/terms-download" },
  { category: "Guides", title: "Academic Job Market Guide", description: "Navigating academic career paths, fellowships, and applications.", tag: "PDF · 16 pages", free: false, hidden: false, fileUrl: "/terms-download" },
  { category: "Guides", title: "Postgraduate Funding Guide", description: "Comprehensive list of UK and international funding sources for Masters and PhD.", tag: "PDF · 12 pages", free: true, hidden: false, fileUrl: "/terms-download" },
  { category: "Templates", title: "Academic CV Template", description: "Professional CV template designed for academic and research roles.", tag: "Word / PDF", free: true, hidden: false, fileUrl: "/terms-download" },
  { category: "Templates", title: "Research Proposal Template", description: "Structured template for Masters and PhD research proposals.", tag: "Word / PDF", free: false, hidden: false, fileUrl: "/terms-download" },
  { category: "Templates", title: "Literature Review Matrix", description: "Excel template for organising and synthesising research sources.", tag: "Excel", free: true, hidden: false, fileUrl: "/terms-download" },
  { category: "Templates", title: "SMART Goal Setting Planner", description: "Plan your academic semester with structured goal-setting and tracking.", tag: "PDF / Excel", free: false, hidden: false, fileUrl: "/terms-download" },
  { category: "Checklists", title: "Dissertation Submission Checklist", description: "Everything you need to verify before submitting your dissertation.", tag: "PDF · 2 pages", free: true, hidden: false, fileUrl: "/terms-download" },
  { category: "Checklists", title: "Job Application Checklist", description: "Make sure your applications are complete, compelling, and error-free.", tag: "PDF · 1 page", free: true, hidden: false, fileUrl: "/terms-download" },
  { category: "Checklists", title: "PhD Viva Preparation Checklist", description: "Step-by-step preparation guide for your doctoral viva examination.", tag: "PDF · 3 pages", free: false, hidden: false, fileUrl: "/terms-download" },
  { category: "Checklists", title: "Conference Presentation Checklist", description: "Preparation guide for presenting your research at academic conferences.", tag: "PDF · 2 pages", free: false, hidden: false, fileUrl: "/terms-download" },
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
  const [actionError, setActionError] = useState("");
  const [toggleError, setToggleError] = useState<string | null>(null);

  const authHeaders = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  const load = () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
    return fetch("/api/resources", token ? { headers: { Authorization: `Bearer ${token}` } } : {})
      .then((r) => r.json())
      .then((data: unknown) => { setResources(Array.isArray(data) ? (data as Resource[]) : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const seedDefaults = async () => {
    setSeeding(true);
    try {
      for (const r of DEFAULT_RESOURCES) {
        await fetch("/api/resources", {
          method: "POST",
          headers: authHeaders(),
          body: JSON.stringify(r),
        });
      }
      await load();
    } catch {}
    setSeeding(false);
  };

  const openAdd = () => { setForm(EMPTY); setModal("add"); setActionError(""); };
  const openEdit = (r: Resource) => { setForm(r); setModal("edit"); setActionError(""); };
  const openDelete = (id: string) => { setDeleteId(id); setActionError(""); };
  const closeModal = () => { setModal(null); setSaving(false); setActionError(""); };

  const save = async () => {
    if (!form.title.trim()) return;
    setSaving(true);
    setActionError("");
    try {
      const res = modal === "edit" && form.id
        ? await fetch(`/api/resources/${form.id}`, { method: "PUT", headers: authHeaders(), body: JSON.stringify(form) })
        : await fetch("/api/resources", { method: "POST", headers: authHeaders(), body: JSON.stringify(form) });
      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as Record<string, string>;
        throw new Error(err.error || err.message || `Request failed (${res.status})`);
      }
      await load();
      closeModal();
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : "Failed to save. Please try again.");
      setSaving(false);
    }
  };

  const toggleHidden = async (r: Resource) => {
    setToggleError(null);
    try {
      const res = await fetch(`/api/resources/${r.id}`, {
        method: "PUT",
        headers: authHeaders(),
        body: JSON.stringify({ ...r, hidden: !r.hidden }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as Record<string, string>;
        throw new Error(err.error || err.message || `Request failed (${res.status})`);
      }
      await load();
    } catch (err: unknown) {
      setToggleError(err instanceof Error ? err.message : "Failed to update. Please try again.");
      setTimeout(() => setToggleError(null), 4000);
    }
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    setActionError("");
    try {
      const res = await fetch(`/api/resources/${deleteId}`, { method: "DELETE", headers: authHeaders() });
      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as Record<string, string>;
        throw new Error(err.error || err.message || `Request failed (${res.status})`);
      }
      await load();
      setDeleteId(null);
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : "Failed to delete. Please try again.");
    }
  };

  const filtered = resources.filter((r) => {
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === "All" || r.category === catFilter;
    return matchSearch && matchCat;
  });

  const groupedCategories = CATEGORIES
    .map((cat) => ({ category: cat, items: filtered.filter((r) => r.category === cat) }))
    .filter((g) => g.items.length > 0);

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

        {toggleError && (
          <p style={{ fontSize: "0.82rem", color: "#dc2626", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 6, padding: "8px 12px", marginBottom: 12 }}>
            {toggleError}
          </p>
        )}

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
                  <th>Format</th>
                  <th>Access</th>
                  <th>Visibility</th>
                  <th>File</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {groupedCategories.map((group) => (
                  <>
                    <tr key={`cat-${group.category}`}>
                      <td
                        colSpan={6}
                        style={{
                          background: "#f0f4f8",
                          padding: "10px 16px",
                          fontWeight: 700,
                          fontSize: "0.82rem",
                          color: "#0F2744",
                          letterSpacing: "0.03em",
                          borderBottom: "2px solid #C9A227",
                        }}
                      >
                        {group.category === "Guides" && (
                          <svg width="16" height="16" fill="none" viewBox="0 0 28 28" style={{ verticalAlign: "middle", marginRight: 8 }}>
                            <rect x="4" y="3" width="20" height="22" rx="2" stroke="#C9A227" strokeWidth="1.4"/>
                            <path d="M9 9h10M9 13h10M9 17h6" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
                          </svg>
                        )}
                        {group.category === "Templates" && (
                          <svg width="16" height="16" fill="none" viewBox="0 0 28 28" style={{ verticalAlign: "middle", marginRight: 8 }}>
                            <rect x="3" y="3" width="10" height="10" rx="1" stroke="#C9A227" strokeWidth="1.4"/>
                            <rect x="15" y="3" width="10" height="10" rx="1" stroke="#C9A227" strokeWidth="1.4"/>
                            <rect x="3" y="15" width="10" height="10" rx="1" stroke="#C9A227" strokeWidth="1.4"/>
                            <rect x="15" y="15" width="10" height="10" rx="1" stroke="#C9A227" strokeWidth="1.4"/>
                          </svg>
                        )}
                        {group.category === "Checklists" && (
                          <svg width="16" height="16" fill="none" viewBox="0 0 28 28" style={{ verticalAlign: "middle", marginRight: 8 }}>
                            <path d="M6 8h16M6 14h16M6 20h10" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round"/>
                            <path d="M3 8l1.5 1.5L7 6" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M3 14l1.5 1.5L7 12" stroke="#C9A227" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                        {group.category}
                        <span style={{ fontWeight: 400, color: "#9aaab8", marginLeft: 8, fontSize: "0.75rem" }}>
                          ({group.items.length})
                        </span>
                      </td>
                    </tr>
                    {group.items.map((r) => (
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
                            <button className={styles.btnDanger} onClick={() => openDelete(r.id)}>Delete</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
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
                {actionError && <p style={{ fontSize: "0.82rem", color: "#dc2626", flex: "1 1 100%", marginBottom: 4 }}>{actionError}</p>}
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
                {actionError && <p style={{ fontSize: "0.82rem", color: "#dc2626", marginTop: 8 }}>{actionError}</p>}
              </div>
              <div className={styles.modalFooter}>
                <button className={styles.btnOutline} onClick={() => { setDeleteId(null); setActionError(""); }}>Cancel</button>
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