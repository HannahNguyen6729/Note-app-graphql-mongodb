import { createBrowserRouter } from "react-router-dom";
import { Outlet } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";

const AuthLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};
const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default router;
