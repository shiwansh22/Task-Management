"use client";

import { useState } from "react";
import api from "@/src/lib/api";
import { useAuthStore } from "@/src/store/auth.store";
import { useRouter } from "next/navigation";
import "@/src/styles/auth.css";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });
    login(res.data.accessToken);
    router.push("/dashboard");
  };

  return (
    <div className="glass-card">
      <h1>Earnest Fintech</h1>
      <p>Task Management System</p>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <div className="auth-links">
        <Link href="/auth/register">Create an account</Link>
      </div>
    </div>
  );
}
