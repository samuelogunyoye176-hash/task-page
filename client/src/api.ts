// ============================================================
// api.ts - EVERY CALL TO THE BACKEND LIVES HERE
// ------------------------------------------------------------
// Pages never write URLs themselves. They call these functions.
// If the backend changes, we only update this one file.
//
// Where do requests go?
//   - Development: "/api" -> Vite forwards it to http://localhost:3010 (see vite.config.ts)
//   - Production:  set VITE_API_URL in .env (e.g. https://my-api.onrender.com/api)
// ============================================================

import axios from "axios";
import type { Task, TaskInput } from "./types";

// One axios "instance" with the base URL already set
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

// GET /api/tasks -> all tasks
export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get("/tasks");
  return response.data.tasks;
};

// GET /api/tasks/:id -> one task
export const getTask = async (id: string): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data.task;
};

// POST /api/tasks -> create a task
export const createTask = async (task: TaskInput): Promise<Task> => {
  const response = await api.post("/tasks", task);
  return response.data.task;
};

// PATCH /api/tasks/:id -> update a task
export const updateTask = async (id: string, task: TaskInput): Promise<Task> => {
  const response = await api.patch(`/tasks/${id}`, task);
  return response.data.task;
};

// DELETE /api/tasks/:id -> delete a task
export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

// Turns any error into a message we can show the user.
// Our server always sends errors as { message: "..." }.
export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || "Cannot reach the server. Is it running?";
  }
  return "Something went wrong";
};
