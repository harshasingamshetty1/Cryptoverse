import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Crypto from "./pages/Crypto";
import Trending from "./pages/Trending";
import Saved from "./pages/Saved";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        //the tokens will be visible in home page itself
        path: "/",
        element: <Crypto />,
      },
      { path: "/trending", element: <Trending /> },
      { path: "/saved", element: <Saved /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
