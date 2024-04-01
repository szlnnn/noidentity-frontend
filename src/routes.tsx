import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import UserEditPage from "./pages/UserEditPage.tsx";
import PrivateRoutes from "./router/PrivateRoutes.tsx";
import ManageResourcePage from "./pages/ManageResourcePage.tsx";
import RolesGridPage from "./pages/RolesGridPage.tsx";
import ManageDepartmentsPage from "./pages/ManageDepartmentsPage.tsx";
import RequestPage from "./pages/RequestPage.tsx";
import RequestSearchUser from "./components/request/searchuser/RequestSearchUser.tsx";
import RequestResourceGrid from "./components/request/selectrights/RequestResourceGrid.tsx";
import RequestRoleGrid from "./components/request/selectrights/RequestRoleGrid.tsx";
import ConfirmRequest from "./components/request/confirm/ConfirmRequest.tsx";
import SuccessRequest from "./components/request/success-request/SuccessRequest.tsx";
import RequestSelectRolePage from "./pages/RequestSelectRolePage.tsx";
import RequestTasksPage from "./pages/RequestTasksPage.tsx";
import TaskInfo from "./components/request-task/TaskInfo.tsx";
import NoTaskSelected from "./components/request-task/NoTaskSelected.tsx";
import UserRolePage from "./pages/UserRolePage.tsx";
import UserRequestsPage from "./pages/UserRequestsPage.tsx";
import ReportPage from "./pages/ReportPage.tsx";
import ManageResourceAttributeValuesPage from "./pages/ManageResourceAttributeValuesPage.tsx";

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
      {
        path: "/request",
        element: <RequestPage />,
        children: [
          {
            index: true,
            element: <RequestSearchUser />,
          },
          {
            path: "/request/resource",
            element: <RequestSelectRolePage />,
            children: [
              {
                index: true,
                element: <RequestResourceGrid />,
              },
              {
                path: "/request/resource/:id/roles",
                element: <RequestRoleGrid />,
              },
            ],
          },
          {
            path: "/request/confirm",
            element: <ConfirmRequest />,
          },
          {
            path: "/request/success",
            element: <SuccessRequest navigateTo={"/"} />,
          },
        ],
      },
      {
        path: "/tasks",
        element: <RequestTasksPage />,
        children: [
          {
            index: true,
            element: <NoTaskSelected />,
          },
          {
            path: "/tasks/:id",
            element: <TaskInfo />,
          },
          {
            path: "/tasks/success",
            element: <SuccessRequest navigateTo={"/tasks"} />,
          },
        ],
      },
      {
        path: "/my-roles",
        element: <UserRolePage />,
      },
      {
        path: "/my-requests",
        element: <UserRequestsPage />,
      },
      {
        path: "/report",
        element: <ReportPage />,
      },
      {
        path: "/resource/values",
        element: <ManageResourceAttributeValuesPage />,
      },
    ],
  },
]);

export default router;
