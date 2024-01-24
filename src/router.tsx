import { createBrowserRouter } from "react-router-dom";

// app-layout
import AppLayout from "~/components/Layout";

// routes
import Index from "~/pages/index";
import Block from "~/pages/$block";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Index />
      },
      {
        path: "/block/:block",
        element: <Block />
      }
    ]
  }
]);
