"use client";

import { useState } from "react";
import api from "@/src/lib/api";
import EditTaskModal from "./EditTaskModal";
import "@/src/styles/dashboard.css";

export default function TaskCard({
  task,
  refresh,
}: {
  task: any;
  refresh: () => void;
}) {
  const [editing, setEditing] = useState(false);

  const toggle = async () => {
    await api.patch(`/tasks/${task.id}/toggle`);
    refresh();
  };

  const remove = async () => {
    await api.delete(`/tasks/${task.id}`);
    refresh();
  };

  return (
    <>
      <div className={`task-card ${task.completed ? "completed" : ""}`}>
        <h3>{task.title}</h3>

        {task.description && (
          <p className="task-desc">{task.description}</p>
        )}

        <div className="task-actions">
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={toggle}>
            {task.completed ? "Undo" : "Done"}
          </button>
          <button className="danger" onClick={remove}>
            Delete
          </button>
        </div>
      </div>

      {editing && (
        <EditTaskModal
          task={task}
          onUpdated={refresh}
          onClose={() => setEditing(false)}
        />
      )}
    </>
  );
}
