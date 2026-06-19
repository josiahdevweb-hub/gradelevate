import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/admin.module.css";

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  );
}

const API = "https://gradeelevate-backend-production.up.railway.app";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (res.status === 429) {
        const data = await res.json();
        setError(data.error || "Too many attempts. Please wait before retrying.");
        return;
      }
      if (!res.ok) {
        setError("Invalid credentials. Please try again.");
        return;
      }
      const data = await res.json();
      localStorage.setItem("admin_token", data.accessToken);
      router.push("/admin");
    } catch {
      setError("Network error. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const dismiss = () => router.push("/");

  return (
    <>
      <Head>
        <title>Admin Login — GradElevate</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.loginPage} onClick={dismiss}>
        <div className={styles.loginCard} onClick={(e) => e.stopPropagation()}>
          <button className={styles.loginClose} onClick={dismiss} aria-label="Close">
            <CloseIcon />
          </button>
          <div className={styles.loginLogo}>
            <div className={styles.loginBrand}>GradElevate</div>
            <div className={styles.loginSub}>Admin Panel</div>
          </div>
          <p className={styles.loginTitle}>Sign in to continue</p>
          {error && <p className={styles.loginError}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className={styles.loginField}>
              <label className={styles.loginLabel}>Email</label>
              <input
                type="email"
                className={styles.loginInput}
                placeholder="admin@gradelevate.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                autoFocus
                required
              />
            </div>
            <div className={styles.loginField}>
              <label className={styles.loginLabel}>Password</label>
              <div className={styles.loginInputWrap}>
                <input
                  type={showPassword ? "text" : "password"}
                  className={styles.loginInput}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(""); }}
                  required
                />
                <button
                  type="button"
                  className={styles.loginEye}
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94"/>
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19"/>
                      <line x1="1" y1="1" x2="23" y2="23"/>
                    </svg>
                  ) : (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button type="submit" className={styles.loginBtn} disabled={submitting}>
              {submitting ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
