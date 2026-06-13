import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import ImageUpload from "@/components/admin/ImageUpload";
import styles from "@/styles/admin.module.css";

interface Announcement {
  active: boolean;
  title: string;
  body: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  updatedAt: string;
}

const EMPTY: Announcement = {
  active: false,
  title: "",
  body: "",
  ctaText: "",
  ctaLink: "",
  image: "",
  updatedAt: "",
};

export default function AnnouncementsAdmin() {
  const [data, setData] = useState<Announcement>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/announcements")
      .then((r) => r.json())
      .then(setData);
  }, []);

  const save = async () => {
    setSaving(true);
    const res = await fetch("/api/announcements", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const updated = await res.json();
    setData(updated);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AdminLayout title="Announcement Popup">
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageHeading}>Announcement Popup</h1>
          <p className={styles.pageSubheading}>
            Control the popup shown on the homepage. Saving with Active on will
            re-show the popup to all visitors.
          </p>
        </div>
      </div>

      <div className={styles.formCard}>
        {/* Active toggle */}
        <div className={styles.settingsRow}>
          <div className={styles.settingsRowInfo}>
            <p className={styles.settingsRowLabel}>Show popup</p>
            <p className={styles.settingsRowHint}>
              When enabled, the popup appears on the homepage after 1–2 seconds.
              Visitors who dismiss it won't see it again unless you save new changes.
            </p>
          </div>
          <label className={styles.toggle}>
            <input
              type="checkbox"
              checked={data.active}
              onChange={(e) => setData((d) => ({ ...d, active: e.target.checked }))}
            />
            <span className={styles.toggleSlider} />
          </label>
        </div>

        <div className={styles.formDivider} />

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Title</label>
          <input
            className={styles.formInput}
            value={data.title}
            onChange={(e) => setData((d) => ({ ...d, title: e.target.value }))}
            placeholder="e.g. New Workshop Available!"
          />
        </div>

        <div className={styles.formGroup} style={{ marginTop: 14 }}>
          <label className={styles.formLabel}>Message</label>
          <textarea
            className={styles.formInput}
            style={{ minHeight: 96, resize: "vertical" }}
            value={data.body}
            onChange={(e) => setData((d) => ({ ...d, body: e.target.value }))}
            placeholder="Short message shown in the popup…"
          />
        </div>

        <div className={styles.formGrid} style={{ marginTop: 14 }}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Button text <span className={styles.optionalLabel}>(optional)</span>
            </label>
            <input
              className={styles.formInput}
              value={data.ctaText}
              onChange={(e) => setData((d) => ({ ...d, ctaText: e.target.value }))}
              placeholder="e.g. Book Now"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>
              Button link <span className={styles.optionalLabel}>(optional)</span>
            </label>
            <input
              className={styles.formInput}
              value={data.ctaLink}
              onChange={(e) => setData((d) => ({ ...d, ctaLink: e.target.value }))}
              placeholder="e.g. /book or /events"
            />
          </div>
        </div>

        <div className={styles.formDivider} />

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>
            Image <span className={styles.optionalLabel}>(optional)</span>
          </label>
          <ImageUpload
            value={data.image}
            onChange={(url) => setData((d) => ({ ...d, image: url }))}
          />
        </div>

        <div className={styles.formDivider} />

        <div className={styles.formActions}>
          <button
            className={styles.btnPrimary}
            onClick={save}
            disabled={saving}
          >
            {saving ? "Saving…" : saved ? "Saved ✓" : "Save Changes"}
          </button>
          {data.updatedAt && (
            <p className={styles.lastUpdatedText}>
              Last saved: {new Date(data.updatedAt).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      {/* Preview */}
      <div className={styles.previewCard}>
        <p className={styles.previewLabel}>Preview</p>
        <div className={styles.previewPopup}>
          {data.image && (
            <img
              src={data.image}
              alt=""
              style={{ width: "100%", height: 120, objectFit: "cover", display: "block" }}
            />
          )}
          <div style={{ padding: "16px 16px 12px" }}>
          <p className={styles.previewEyebrow}>Update</p>
          <p className={styles.previewTitle}>{data.title || "Your popup title will appear here"}</p>
          <p className={styles.previewBody}>
            {data.body || "Your message will appear here. Keep it short and clear."}
          </p>
          {data.ctaText && (
            <div className={styles.previewCta}>{data.ctaText} →</div>
          )}
          <p className={styles.previewDismiss}>Dismiss</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
