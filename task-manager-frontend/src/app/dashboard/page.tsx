"use client";

import { useEffect, useState } from "react";
import api from "@/src/lib/api";
import TaskCard from "@/src/components/TaskCard";
import FilterBar from "@/src/components/FilterBar";
import CreateTaskModal from "@/src/components/CreateTaskModal";
import { useToast } from "@/src/hooks/useToast";
import Toast from "@/src/components/toast";
import "@/src/styles/dashboard.css";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [pagination, setPagination] = useState<any>(null);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const { message, showToast } = useToast();

  const fetchTasks = async () => {
    try {
      const res = await api.get("/tasks", {
        params: { search, status, page: 1, limit: 10 },
      });

      setTasks(res.data.data);
      setPagination(res.data.pagination);
    } catch {
      setTasks([]); // defensive fallback
      showToast("Failed to load tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [search, status]);

  return (
    <div className="dashboard-wrapper">
      <header className="dashboard-header">
        <h1>Your Tasks</h1>
        <button onClick={() => setShowModal(true)}>+ New Task</button>
      </header>

      <FilterBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <div className="task-grid">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} refresh={fetchTasks} />
        ))}
      </div>

      {showModal && (
        <CreateTaskModal
          onClose={() => setShowModal(false)}
          onCreated={fetchTasks}
        />
      )}

      {message && <Toast message={message} />}
    </div>
  );
}
