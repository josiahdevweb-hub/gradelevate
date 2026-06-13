import { useRef, useState } from "react";
import styles from "@/styles/admin.module.css";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [dragging, setDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file.");
      return;
    }
    setError("");
    setUploading(true);
    const reader = new FileReader();
    reader.onload = async () => {
      const base64 = (reader.result as string).split(",")[1];
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: file.name, data: base64, type: file.type }),
        });
        const json = await res.json();
        if (json.url) onChange(json.url);
        else setError("Upload failed.");
      } catch {
        setError("Upload failed. Please try again.");
      }
      setUploading(false);
    };
    reader.readAsDataURL(file);
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
      {/* Drop zone */}
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
          accept="image/png,image/jpeg,image/webp,image/gif"
          onChange={handleFile}
          style={{ display: "none" }}
        />
        {uploading ? (
          <div className={styles.dropZoneContent}>
            <div className={styles.uploadSpinner} />
            <span className={styles.dropZoneLabel}>Uploading…</span>
          </div>
        ) : (
          <div className={styles.dropZoneContent}>
            <svg width="28" height="28" fill="none" viewBox="0 0 28 28" className={styles.dropZoneIcon}>
              <rect x="2" y="2" width="24" height="24" rx="3" stroke="#9aaab8" strokeWidth="1.4"/>
              <circle cx="10" cy="10" r="2.5" stroke="#9aaab8" strokeWidth="1.3"/>
              <path d="M2 19l7-7 5 5 4-4 8 8" stroke="#9aaab8" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className={styles.dropZoneLabel}>Click to upload or drag & drop</span>
            <span className={styles.dropZoneHint}>PNG, JPG, WEBP — max 12 MB</span>
          </div>
        )}
      </div>

      {error && <p className={styles.uploadError}>{error}</p>}

      {/* URL fallback */}
      <div className={styles.uploadOrDivider}>
        <span>or paste an image URL</span>
      </div>
      <input
        className={styles.formInput}
        type="url"
        placeholder="https://images.unsplash.com/..."
        value={value.startsWith("/uploads/") ? "" : value}
        onChange={(e) => onChange(e.target.value)}
      />

      {/* Preview */}
      {value && (
        <div className={styles.uploadPreviewWrap}>
          <img src={value} alt="preview" className={styles.uploadPreview} />
          <button
            type="button"
            className={styles.uploadRemoveBtn}
            onClick={() => onChange("")}
          >
            ✕ Remove
          </button>
        </div>
      )}
    </div>
  );
}
