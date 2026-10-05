import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";

import App from "./App.jsx";
import Dashboard from "./pages/Dashboard";
import Projets from "./pages/Projets";
import DetailsProjets from "./pages/DetailsProjets";
import Taches from "./pages/Taches";
import Connexion from "./pages/Connexion";
import Inscription from "./pages/Inscription";
import { AuthProvider } from "./context/AuthContext.jsx";
// import RouteProteger from "./components/RouteProteger";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Navigate to="/dashboard" replace/>
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "projets",
        element: <Projets />,
      },
      {
        path: "projets/:id",
        element: <DetailsProjets />,
      },
      {
        path: "taches",
        element: <Taches />,
      },
    ],
  },
  {
    path: "/connexion",
    element: <Connexion />,
  },
  {
    path: "/inscription",
    element: <Inscription />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);