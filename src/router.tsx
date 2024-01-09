import { createBrowserRouter } from "react-router-dom";

// app-layout
import AppLayout from "~/components/Layout";

// routes
import Index from "~/pages/index";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Index />
      }
    ]
  }
]);
