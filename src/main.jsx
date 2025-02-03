import { StrictMode } from "react";

import { createRoot } from "react-dom/client";

import "./index.css";

import App from "./App.jsx";

import Home from "./router/Home.jsx";

import OurTeam from "./router/OurTeam.jsx";

import Register from "./router/Register.jsx";

import Login from "./router/Login.jsx";

import Expenses from "./router/Expenses.jsx";

import CreateExpense from "./router/CreateExpense.jsx";

import Adm from "./router/Adm.jsx";

import Edit from "./router/Edit.jsx";

import Accompany from "./router/Accompany.jsx";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { UserContextProvider } from "./context/userContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/ourTeam",
        element: <OurTeam />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/expenses/:id",
        element: <Expenses />,
      },
      {
        path: "/create",
        element: <CreateExpense />,
      },
      {
        path: "/adm",
        element: <Adm />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
      {
        path: "/accompany/:id",
        element: <Accompany />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </StrictMode>
);
