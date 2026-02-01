"use client";

import Link from "next/link";
import "@/src/styles/auth.css";

export default function HomePage() {
  return (
    <div className="glass-card">
      <h1>Earnest Fintech</h1>
      <p>Task Management System</p>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1.5rem" }}>
        <Link href="/auth/login" style={{ flex: 1 }}>
          <button style={{ width: "100%" }}>Login</button>
        </Link>

        <Link href="/auth/register" style={{ flex: 1 }}>
          <button
            style={{
              width: "100%",
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
            }}
          >
            Register
          </button>
        </Link>
      </div>
    </div>
  );
}
