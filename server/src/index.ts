// ============================================================
// index.ts - THE STARTING POINT OF THE SERVER
// ------------------------------------------------------------
// Flow:
//   1. Load the secret values from the .env file
//   2. Connect to MongoDB
//   3. Only when the database is ready, start listening for requests
// ============================================================

import "dotenv/config"; // Step 1: reads .env into process.env (must be the FIRST import)
import mongoose from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 3010;
const MONGO_URI = process.env.MONGO_URI;

// Connects to the database, then starts the Express server.
const startServer = async () => {
  // Stop early with a clear message if the connection string is missing
  if (!MONGO_URI) {
    console.error("❌ MONGO_URI is missing. Copy .env.example to .env and fill it in.");
    process.exit(1);
  }

  try {
    // Step 2: connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✅ Database connected");

    // Step 3: start the server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1); // exit so we notice the problem instead of running a broken server
  }
};

startServer();
