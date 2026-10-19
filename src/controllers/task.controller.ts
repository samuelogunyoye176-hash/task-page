// ============================================================
// task.controller.ts - THE LOGIC FOR EACH TASK ENDPOINT
// ------------------------------------------------------------
// Each function follows the same simple flow:
//   1. Read what we need from the request (req.body / req.params)
//   2. Ask the database (through the Task model)
//   3. Send back a response with a status code + JSON
//
// Status codes used:
//   200 OK | 201 Created | 404 Not Found
// (Bad ids, validation errors and crashes are handled in the middleware folder)
// ============================================================

import { Request, Response } from "express";
import Task from "../models/task.model";

// POST /api/tasks  -> create a new task
export const createTask = async (req: Request, res: Response) => {
  // 1. Only take the fields we allow (never trust the whole req.body)
  const { title, description, tag } = req.body;

  // 2. Save it. If a field is missing/invalid, Mongoose throws a
  //    ValidationError and errorHandler sends a 400 for us.
  const task = await Task.create({ title, description, tag });

  // 3. 201 = "Created"
  res.status(201).json({ message: "Task created successfully", task });
};

// GET /api/tasks  -> get every task (newest first)
export const getAllTasks = async (_req: Request, res: Response) => {
  const tasks = await Task.find().sort({ createdAt: -1 });
  res.status(200).json({ tasks });
};

// GET /api/tasks/:id  -> get one task
export const getTaskById = async (req: Request, res: Response) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.status(200).json({ task });
};

// PATCH /api/tasks/:id  -> update a task
export const updateTask = async (req: Request, res: Response) => {
  const { title, description, tag } = req.body;

  const task = await Task.findByIdAndUpdate(
    req.params.id,
    { title, description, tag },
    {
      returnDocument: "after", // send back the task AFTER the update
      runValidators: true, // apply the schema rules on updates too
    },
  );

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.status(200).json({ message: "Task updated successfully", task });
};

// DELETE /api/tasks/:id  -> delete a task
export const deleteTask = async (req: Request, res: Response) => {
  const task = await Task.findByIdAndDelete(req.params.id);

  if (!task) {
    res.status(404).json({ message: "Task not found" });
    return;
  }

  res.status(200).json({ message: "Task deleted successfully" });
};
