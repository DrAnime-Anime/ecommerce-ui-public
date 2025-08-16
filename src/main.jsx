import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx"; // ✅ Now importing from separate file

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
