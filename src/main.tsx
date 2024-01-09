import React from "react";
import ReactDOM from "react-dom/client";

// styles
import "~/static/globals.css";

// react router
import { RouterProvider } from "react-router-dom";

// router
import { router } from "~/router";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
