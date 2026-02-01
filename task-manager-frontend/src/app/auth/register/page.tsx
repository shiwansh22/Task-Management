"use client";

import { useState } from "react";
import api from "@/src/lib/api";
import { useRouter } from "next/navigation";
import "@/src/styles/auth.css";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/auth/register", { email, password });
    router.push("/auth/login");
  };

  return (
    <div className="glass-card">
      <h1>Create Account</h1>
      <p>Join Earnest Fintech</p>

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

        <button type="submit">Register</button>
      </form>

      <div className="auth-links">
        <Link href="/auth/login">Already have an account?</Link>
      </div>
    </div>
  );
}
