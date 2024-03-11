import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import UserRegistrationPage from "./pages/UserRegistrationPage.tsx";
import PrivateRoutes from "./router/PrivateRoutes.tsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element: <PrivateRoutes />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/register",
        element: <UserRegistrationPage />,
      },
    ],
  },
]);

export default router;
