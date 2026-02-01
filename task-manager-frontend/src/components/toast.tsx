"use client";

import "@/src/styles/dashboard.css";

export default function Toast({ message }: { message: string }) {
  return <div className="toast">{message}</div>;
}
