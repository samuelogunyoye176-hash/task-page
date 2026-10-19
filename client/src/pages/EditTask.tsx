// ============================================================
// EditTask.tsx - PAGE FOR EDITING A TASK  (URL: /edit/:id)
// ------------------------------------------------------------
// Flow:
//   1. Read the task id from the URL
//   2. Load that task from the server (GET /api/tasks/:id)
//   3. Show the TaskForm filled with the task's values
//   4. When submitted, save the changes (PATCH /api/tasks/:id) and go back to the list
// ============================================================

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import TaskForm from "../components/TaskForm";
import PageHeader from "../components/PageHeader";
import { getTask, updateTask, getErrorMessage } from "../api";
import type { TaskInput } from "../types";

const EditTask = () => {
  const { id = "" } = useParams(); // Step 1
  const navigate = useNavigate();

  const [task, setTask] = useState<TaskInput | null>(null);
  const [error, setError] = useState("");

  // Step 2: runs when the page opens (and again if the id changes)
  useEffect(() => {
    getTask(id)
      .then((data) =>
        setTask({
          title: data.title,
          description: data.description,
          tag: data.tag,
        }),
      )
      .catch((err) => setError(getErrorMessage(err)));
  }, [id]);

  // Step 4: called by TaskForm when the user clicks "Update"
  const handleUpdate = async (values: TaskInput) => {
    await updateTask(id, values);
    navigate("/tasks");
  };

  // If loading failed, or is still happening, show a message instead of the form
  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-600 text-xl">{error}</p>
        <Link
          to="/tasks"
          className="text-[#974FD0] underline mt-4 inline-block"
        >
          Back to My Tasks
        </Link>
      </div>
    );
  }
  if (!task) return <p className="text-center py-20">Loading...</p>;

  // Step 3
  return (
    <main className="max-w-360 mx-auto px-5 md:px-42.5 py-10 md:py-16.25 flex flex-col items-start gap-10.75">
      <PageHeader title="Edit Task" />
      <TaskForm
        initialValues={task}
        submitLabel="Update"
        onSubmit={handleUpdate}
      />
    </main>
  );
};

export default EditTask;
