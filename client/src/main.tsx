// ============================================================
// main.tsx - WHERE REACT STARTS
// Finds <div id="root"> in index.html and draws our <App /> inside it.
// ============================================================

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
