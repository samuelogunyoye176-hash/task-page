// ============================================================
// MyTask.tsx - PAGE THAT LISTS ALL TASKS  (URL: /tasks)
// ------------------------------------------------------------
// Flow:
//   1. When the page opens, load all tasks (GET /api/tasks)
//   2. While waiting show "Loading...", if it fails show the error
//   3. Show each task as a card with Edit and Delete buttons
//   4. Delete: ask to confirm, call the server, then remove the card from the screen
// ============================================================

import { useEffect, useState } from "react";
import { Link } from "react-router";
import { getTasks, deleteTask, getErrorMessage } from "../api";
import type { Task } from "../types";
import plus from "../assets/plus.png";
import editIcon from "../assets/edit.png";
import deleteIcon from "../assets/delete.png";

const MyTask = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Step 1: load the tasks once, when the page first appears
  useEffect(() => {
    getTasks()
      .then((data) => setTasks(data))
      .catch((err) => setError(getErrorMessage(err)))
      .finally(() => setLoading(false));
  }, []);

  // Step 4: delete one task
  const handleDelete = async (id: string) => {
    if (!confirm("Delete this task?")) return;

    try {
      await deleteTask(id);
      // Keep every task EXCEPT the deleted one (no need to reload from the server)
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      alert(getErrorMessage(err));
    }
  };

  // Step 2
  if (loading) return <p className="text-center py-20">Loading tasks...</p>;
  if (error) return <p className="text-center py-20 text-red-600 text-xl">{error}</p>;

  // Step 3
  return (
    <main className="max-w-360 mx-auto px-5 md:px-42.5 py-8 md:py-13.25 flex flex-col items-start gap-7.25">
      <div className="flex flex-col md:flex-row items-start md:items-center w-full justify-between gap-4">
        <h1 className="font-medium text-3xl md:text-[50px] text-[#292929]">My Tasks</h1>
        <Link to="/new" className="flex items-center gap-2">
          <img src={plus} alt="" className="w-5 md:w-auto" />
          <span className="text-lg md:text-[24px] font-medium text-[#974FD0]">
            Add New Task
          </span>
        </Link>
      </div>

      <div className="flex flex-col items-start gap-8 w-full">
        {tasks.length === 0 && <p className="text-gray-500">No tasks yet. Create one!</p>}

        {tasks.map((task) => (
          <div
            key={task._id}
            className="border-[0.5px] border-[#B8B6B6] rounded-[10px] flex flex-col pt-5 pb-10 px-3 items-start w-full text-start"
          >
            <div className="pb-5 flex flex-col md:flex-row md:items-end justify-between w-full gap-4 border-b-[0.5px] border-b-[#B8B6B6]">
              {/* Urgent tags are red, Important tags are green */}
              <p
                className={`font-normal text-xl md:text-[24px] ${
                  task.tag === "Urgent" ? "text-[#F38383]" : "text-[#73C3A6]"
                }`}
              >
                {task.tag}
              </p>

              <div className="flex flex-wrap gap-3">
                <Link
                  to={`/edit/${task._id}`}
                  className="w-31.5 h-12.5 flex justify-center items-center gap-2.5 bg-[#974FD0] rounded-lg"
                >
                  <img src={editIcon} alt="" />
                  <span className="text-[24px] font-medium text-[#FAF9FB]">Edit</span>
                </Link>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="border border-[#974FD0] w-37.75 h-12.5 flex justify-center items-center gap-2.5 rounded-lg"
                >
                  <img src={deleteIcon} alt="" />
                  <span className="text-[24px] font-medium text-[#974FD0]">Delete</span>
                </button>
              </div>
            </div>

            <div className="flex flex-col items-start mt-4">
              <h2 className="font-normal text-2xl md:text-[35px] text-[#292929]">{task.title}</h2>
              <p className="text-[#737171] font-normal text-base md:text-[24px] leading-tight">
                {task.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default MyTask;
