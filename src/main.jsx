import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux"; // Redux
import { store } from "./app/store";

import Layout from "./Layout.jsx";
import HeroPage from "./pages/HeroPage.jsx";
import RegisterTeam from "./pages/RegisterTeam.jsx";
import RegisterUser from "./pages/RegisterUser.jsx";
import LoginUser from "./pages/LoginUser.jsx";

import ProtectedRoute from "./pages/ProtectedRoute.jsx";
import Leaderboard from "./pages/Leaderboard.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/home",
        element: <HeroPage />, // Public page
      },
      {
        path: "/register",
        element: <RegisterUser />, // Public page
      },
      {
        path: "/login",
        element: <LoginUser />, // Public page
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />, // Public page
      },
      {
        path: "/register-team",
        element: (
          <ProtectedRoute>
            <RegisterTeam /> {/* Protected page */}
          </ProtectedRoute>
        ),
      },
      {
        // path: "/dashboard",
        // element: (
        //   <ProtectedRoute>
        //     <Dashboard /> {/* Protected page */}
        //   </ProtectedRoute>
        // ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
