// ============================================================
// TaskForm.tsx - ONE FORM USED BY BOTH "New Task" AND "Edit Task"
// ------------------------------------------------------------
// Flow:
//   1. Start with the values the parent page gives us (empty or an existing task)
//   2. Every keystroke updates the form state (a "controlled" form)
//   3. On submit, hand the values to the parent's onSubmit function
//   4. If that fails, show the error message under the form
// ============================================================

import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { TASK_TAGS } from "../types";
import type { TaskInput } from "../types";
import { getErrorMessage } from "../api";

// The "props" (inputs) this component expects from its parent
interface TaskFormProps {
  initialValues: TaskInput;
  submitLabel: string;
  onSubmit: (values: TaskInput) => Promise<void>;
}

// Tailwind classes shared by every label and field
const labelClass =
  "absolute text-[#9C9C9C] bg-[#FAF9FB] text-xl md:text-[30px] -top-4 left-5 px-1";
const fieldClass =
  "w-full px-5 py-4 border border-[#B8B6B6] rounded-[5px] text-lg bg-transparent";

const TaskForm = ({ initialValues, submitLabel, onSubmit }: TaskFormProps) => {
  // Step 1: the form's current values
  const [form, setForm] = useState<TaskInput>(initialValues);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Step 2: runs on every keystroke. The input's "name" tells us which field to update.
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Step 3: runs when the button is clicked
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // stop the browser from reloading the page
    setSubmitting(true);
    setError("");

    try {
      await onSubmit(form);
    } catch (err) {
      setError(getErrorMessage(err)); // Step 4
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="pt-10 flex flex-col items-start gap-8 w-full">
      <div className="relative w-full">
        <label htmlFor="title" className={labelClass}>
          Task Title
        </label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="E.g Project Defense, Assignment ..."
          maxLength={100}
          required
          className={fieldClass}
        />
      </div>

      <div className="relative w-full">
        <label htmlFor="description" className={labelClass}>
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Briefly describe your task ..."
          rows={6}
          required
          className={fieldClass}
        />
      </div>

      <div className="relative w-full">
        <label htmlFor="tag" className={labelClass}>
          Tag
        </label>
        <select
          id="tag"
          name="tag"
          value={form.tag}
          onChange={handleChange}
          required
          className={fieldClass}
        >
          <option value="" disabled>
            Choose a tag
          </option>
          {TASK_TAGS.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-600 text-lg">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#974FD0] py-4 text-[#FAF9FB] font-medium text-2xl md:text-[35px] rounded-lg disabled:opacity-60"
      >
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
};

export default TaskForm;
