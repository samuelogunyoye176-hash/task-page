// ============================================================
// task.model.ts - WHAT A TASK LOOKS LIKE IN THE DATABASE
// ------------------------------------------------------------
// Flow:
//   1. Describe the task's shape with a TypeScript interface (for our code)
//   2. Describe the same shape with a Mongoose schema (for the database + validation)
//   3. Create the model - the object we use to create/find/update/delete tasks
// ============================================================

import { Schema, model } from "mongoose";

// The only tags a task is allowed to have
export const TASK_TAGS = ["Urgent", "Important"];

// Step 1: the TypeScript shape of a task
export interface ITask {
  title: string;
  description: string;
  tag: string; // "Urgent" or "Important"
}

// Step 2: the database rules for a task
const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true, // removes extra spaces at the start and end
      maxlength: [100, "Title cannot be longer than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    tag: {
      type: String,
      required: [true, "Tag is required"],
      enum: { values: TASK_TAGS, message: "Tag must be Urgent or Important" },
    },
  },
  { timestamps: true }, // automatically adds createdAt and updatedAt
);

// Step 3: the model. "Task" becomes the "tasks" collection in MongoDB.
const Task = model<ITask>("Task", taskSchema);

export default Task;
