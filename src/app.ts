// ============================================================
// app.ts - CREATES AND CONFIGURES THE EXPRESS APP
// ------------------------------------------------------------
// Every request passes through these steps IN ORDER (top to bottom):
//   1. cors()          -> allow the React app to call this API
//   2. express.json()  -> turn the JSON request body into req.body
//   3. routes          -> find the controller that handles the URL
//   4. notFound        -> no route matched? send a 404
//   5. errorHandler    -> something threw an error? send a clean error response
// ============================================================

import express from "express";
import cors from "cors";
import taskRouter from "./routes/task.routes";
import { notFound, errorHandler } from "./middleware/errorHandler";

const app = express();

// 1. CORS: only the React app's address may call this API
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));

// 2. Read JSON bodies (e.g. { "title": "Study" }) into req.body
app.use(express.json());

// 3. Routes
// A simple "is the server alive?" check - open http://localhost:3010 in the browser
app.get("/", (_req, res) => {
  res.json({ message: "TaskDuty API is running 🚀" });
});

// Every URL starting with /api/tasks is handled by the task router
app.use("/api/tasks", taskRouter);

// 4 & 5. These must come AFTER the routes
app.use(notFound);
app.use(errorHandler);

export default app;
