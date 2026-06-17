import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/admin.module.css";

const API = "https://gradeelevate-backend-production.up.railway.app";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

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

  return (
    <>
      <Head>
        <title>Admin Login — GradElevate</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.loginPage}>
        <div className={styles.loginCard}>
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
              <input
                type="password"
                className={styles.loginInput}
                placeholder="Enter password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                required
              />
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
