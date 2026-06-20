import { useRef, useState } from "react";
import styles from "@/styles/admin.module.css";

const API = "https://gradeelevate-backend-production.up.railway.app";

interface Props {
  value: string;
  onChange: (url: string) => void;
  folder?: string;
}

export default function FileUpload({ value, onChange, folder = "resources" }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState("");

  const processFile = async (file: File) => {
    setError("");
    setUploading(true);
    setFileName(file.name);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);
      const token = typeof window !== "undefined" ? localStorage.getItem("admin_token") : null;
      const res = await fetch(`${API}/api/admin/upload/document`, {
        method: "POST",
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({})) as Record<string, string>;
        throw new Error(err.error || "Upload failed");
      }
      const data = await res.json() as Record<string, string>;
      onChange(data.url);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Upload failed. Please try again.");
    }
    setUploading(false);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  return (
    <div className={styles.imageUploadWrap}>
      <div
        className={`${styles.dropZone} ${dragging ? styles.dropZoneDragging : ""} ${uploading ? styles.dropZoneLoading : ""}`}
        onClick={() => !uploading && inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip"
          onChange={handleFile}
          style={{ display: "none" }}
        />

        {uploading ? (
          <div className={styles.dropZoneContent}>
            <div className={styles.uploadSpinner} />
            <span className={styles.dropZoneLabel}>Uploading {fileName}…</span>
          </div>
        ) : (
          <div className={styles.dropZoneContent}>
            <svg width="28" height="28" fill="none" viewBox="0 0 28 28" className={styles.dropZoneIcon}>
              <rect x="4" y="2" width="20" height="24" rx="2" stroke="#9aaab8" strokeWidth="1.4"/>
              <path d="M10 8h8M10 12h8M10 16h5" stroke="#9aaab8" strokeWidth="1.3" strokeLinecap="round"/>
              <path d="M14 19v5M11 22l3 3 3-3" stroke="#9aaab8" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={styles.dropZoneLabel}>Click to upload or drag &amp; drop</span>
            <span className={styles.dropZoneHint}>PDF, Word, Excel, PPT, ZIP</span>
          </div>
        )}
      </div>

      {error && <p className={styles.uploadError}>{error}</p>}

      <div className={styles.uploadOrDivider}>
        <span>or paste a file URL</span>
      </div>

      <input
        className={styles.formInput}
        type="url"
        placeholder="https://example.com/file.pdf"
        value={value.startsWith("http") ? value : ""}
        onChange={(e) => onChange(e.target.value)}
      />

      {value && (
        <div className={styles.uploadPreviewWrap} style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <svg width="24" height="24" fill="none" viewBox="0 0 28 28">
            <rect x="4" y="2" width="20" height="24" rx="2" stroke="#C9A227" strokeWidth="1.4"/>
            <path d="M10 8h8M10 12h8M10 16h5" stroke="#C9A227" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          <span style={{ fontSize: "0.8rem", color: "#3a4a5a", wordBreak: "break-all", flex: 1 }}>
            {value.split("/").pop() || value}
          </span>
          <button
            type="button"
            className={styles.uploadRemoveBtn}
            onClick={() => { onChange(""); setFileName(""); }}
          >
            ✕ Remove
          </button>
        </div>
      )}
    </div>
  );
}