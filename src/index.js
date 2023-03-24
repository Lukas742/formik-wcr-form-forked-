import "@ui5/webcomponents-react/dist/Assets";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import App2 from "./TestForm";

const root = createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
    <App2 />
  </>
);
