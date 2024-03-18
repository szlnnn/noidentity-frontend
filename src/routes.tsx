import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import UserEditPage from "./pages/UserEditPage.tsx";
import PrivateRoutes from "./router/PrivateRoutes.tsx";
import ManageResourcePage from "./pages/ManageResourcePage.tsx";
import RolesGridPage from "./pages/RolesGridPage.tsx";
import ManageDepartmentsPage from "./pages/ManageDepartmentsPage.tsx";

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
        element: <UserEditPage />,
      },
      {
        path: "/resources",
        element: <ManageResourcePage />,
      },
      { path: "/resources/roles/:id", element: <RolesGridPage /> },
      {
        path: "/departments",
        element: <ManageDepartmentsPage />,
      },
    ],
  },
]);

export default router;
