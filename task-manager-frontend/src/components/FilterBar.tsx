"use client";

import "@/src/styles/dashboard.css";

export default function FilterBar({
  search,
  setSearch,
  status,
  setStatus,
}: any) {
  return (
    <div className="filter-bar">
      <input
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="">All</option>
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
      </select>
    </div>
  );
}
