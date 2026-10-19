// ============================================================
// validateId.ts - CHECKS THAT :id IN THE URL IS A VALID MONGODB ID
// ------------------------------------------------------------
// Runs BEFORE the controller on routes like /api/tasks/:id.
//   - valid id   -> call next() so the controller runs
//   - invalid id -> stop here and send a 400 (Bad Request)
// ============================================================

import { Request, Response, NextFunction } from "express";
import { isValidObjectId } from "mongoose";

export const validateId = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (!isValidObjectId(id)) {
    res.status(400).json({ message: `Invalid task ID: ${id}` });
    return;
  }

  next(); // the id looks good - move on to the controller
};
