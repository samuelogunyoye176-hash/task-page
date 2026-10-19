// ============================================================
// NewTask.tsx - PAGE FOR CREATING A TASK  (URL: /new)
// ------------------------------------------------------------
// Flow:
//   1. Show an empty TaskForm
//   2. When submitted, send the values to the server (POST /api/tasks)
//   3. Go back to the task list
// ============================================================

import { useNavigate } from "react-router";
import TaskForm from "../components/TaskForm";
import PageHeader from "../components/PageHeader";
import { createTask } from "../api";
import type { TaskInput } from "../types";

const emptyTask: TaskInput = { title: "", description: "", tag: "" };

const NewTask = () => {
  const navigate = useNavigate();

  // Called by TaskForm when the user clicks "Done"
  const handleCreate = async (values: TaskInput) => {
    await createTask(values); // Step 2 (if this fails, TaskForm shows the error)
    navigate("/tasks"); // Step 3
  };

  return (
    <main className="max-w-360 mx-auto px-5 md:px-42.5 py-10 md:py-16.25 flex flex-col items-start gap-10.75">
      <PageHeader title="New Task" />
      <TaskForm
        initialValues={emptyTask}
        submitLabel="Done"
        onSubmit={handleCreate}
      />
    </main>
  );
};

export default NewTask;
