// ============================================================
// errorHandler.ts - SENDS CLEAN ERROR RESPONSES
// ------------------------------------------------------------
// Express 5 automatically catches errors thrown inside async
// controllers and passes them here, so we don't need try/catch
// in every controller.
// ============================================================

import { Request, Response, NextFunction } from "express";
import { Error as MongooseError } from "mongoose";

// Runs when no route matched the URL -> 404 Not Found
export const notFound = (req: Request, res: Response) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

// Runs whenever an error is thrown anywhere in the app.
// Express knows this is an error handler because it has 4 parameters.
export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  // Mongoose validation failed (e.g. missing title, wrong tag) -> 400 Bad Request
  if (err instanceof MongooseError.ValidationError) {
    const messages = Object.values(err.errors).map((e) => e.message);
    res.status(400).json({ message: messages.join(", ") });
    return;
  }

  // Anything else is unexpected -> log it and send 500 Internal Server Error
  console.error("💥", err);
  res.status(500).json({ message: "Something went wrong on the server" });
};
