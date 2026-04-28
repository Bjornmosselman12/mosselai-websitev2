"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const hasError = params.get("error") === "1";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      router.push("/admin/onderzoek");
    } else {
      router.push("/admin/login?error=1");
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F5F1E8", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
      <div style={{ backgroundColor: "#ffffff", border: "1px solid #E8E4DB", borderRadius: "16px", padding: "40px 36px", width: "100%", maxWidth: "380px", boxShadow: "0 8px 32px rgba(30,58,95,0.08)" }}>
        <p style={{ color: "#4A7FC4", fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "8px" }}>MosselAI Admin</p>
        <h1 style={{ color: "#1E3A5F", fontSize: "22px", fontWeight: 500, marginBottom: "28px", letterSpacing: "-0.02em" }}>Inloggen</h1>
        {(hasError) && (
          <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px", padding: "10px 14px", marginBottom: "20px", color: "#DC2626", fontSize: "14px" }}>
            Onjuist wachtwoord.
          </div>
        )}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label htmlFor="pw" style={{ display: "block", color: "#2C2C2E", fontSize: "14px", fontWeight: 500, marginBottom: "6px" }}>Wachtwoord</label>
            <input id="pw" type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              autoFocus required
              style={{ width: "100%", backgroundColor: "#F8F7F3", border: "1px solid #E8E4DB", borderRadius: "8px", padding: "12px 14px", fontSize: "15px", color: "#2C2C2E", fontFamily: "inherit", boxSizing: "border-box", outline: "none" }} />
          </div>
          <button type="submit" disabled={loading}
            style={{ backgroundColor: "#1E3A5F", color: "#F5F1E8", borderRadius: "10px", fontSize: "15px", fontWeight: 500, padding: "13px 24px", border: "none", cursor: loading ? "wait" : "pointer", fontFamily: "inherit", opacity: loading ? 0.7 : 1 }}>
            {loading ? "Even geduld…" : "Inloggen"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
