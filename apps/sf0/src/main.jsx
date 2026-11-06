import React from "react";
import { createRoot } from "react-dom/client";
import { SessionBoundary } from "./SessionBoundary.jsx";
import "./styles.css";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionBoundary />
  </React.StrictMode>,
);
