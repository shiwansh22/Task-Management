"use client";

import { useState } from "react";
import api from "@/src/lib/api";
import "@/src/styles/dashboard.css";

export default function EditTaskModal({
  task,
  onClose,
  onUpdated,
}: {
  task: any;
  onClose: () => void;
  onUpdated: () => void;
}) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description || "");

  const handleUpdate = async () => {
    await api.patch(`/tasks/${task.id}`, {
      title,
      description,
    });
    onUpdated();
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-glass">
        <h2>Edit Task</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="modal-actions">
          <button onClick={handleUpdate}>Save</button>
          <button className="secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
