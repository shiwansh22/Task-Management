"use client";

import { useState } from "react";
import api from "@/src/lib/api";
import "@/src/styles/dashboard.css";

export default function CreateTaskModal({
  onClose,
  onCreated,
}: {
  onClose: () => void;
  onCreated: () => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    await api.post("/tasks", { title, description });
    onCreated();
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-glass">
        <h2>Create Task</h2>

        <input
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description (optional)"
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={handleCreate}>Create</button>
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
