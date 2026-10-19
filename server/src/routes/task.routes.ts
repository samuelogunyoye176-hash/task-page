// ============================================================
// task.routes.ts - CONNECTS URLS TO CONTROLLER FUNCTIONS
// ------------------------------------------------------------
// All paths here start with /api/tasks (see app.ts).
// This follows REST: the URL names the thing (tasks), the HTTP method is the action.
//
//   Method  URL               What it does
//   ------  ----------------  ---------------------
//   GET     /api/tasks        get all tasks
//   POST    /api/tasks        create a task
//   GET     /api/tasks/:id    get one task
//   PATCH   /api/tasks/:id    update a task
//   DELETE  /api/tasks/:id    delete a task
// ============================================================

import { Router } from "express";
import {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";
import { validateId } from "../middleware/validateId";

const router = Router();

router.get("/", getAllTasks);
router.post("/", createTask);

// validateId runs first; the controller only runs if the id is valid
router.get("/:id", validateId, getTaskById);
router.patch("/:id", validateId, updateTask);
router.delete("/:id", validateId, deleteTask);

export default router;
