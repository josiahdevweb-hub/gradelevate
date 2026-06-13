import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "@/styles/admin.module.css";

const ADMIN_PASSWORD = "gradelevate2026";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      localStorage.setItem("admin_auth", "true");
      router.push("/admin");
    } else {
      setError("Incorrect password. Please try again.");
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
              <label className={styles.loginLabel}>Admin Password</label>
              <input
                type="password"
                className={styles.loginInput}
                placeholder="Enter password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                autoFocus
              />
            </div>
            <button type="submit" className={styles.loginBtn}>
              Sign In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
