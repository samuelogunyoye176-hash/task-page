// ============================================================
// types.ts - THE SHAPE OF OUR DATA (shared by every page)
// ============================================================

// The tags a user can pick. Must match TASK_TAGS on the server.
export const TASK_TAGS = ["Urgent", "Important"];

// What the user types into the form (no _id yet - MongoDB creates that)
export interface TaskInput {
  title: string;
  description: string;
  tag: string;
}

// A task that came back from the server (it now has an _id)
export interface Task extends TaskInput {
  _id: string;
  createdAt: string;
  updatedAt: string;
}
