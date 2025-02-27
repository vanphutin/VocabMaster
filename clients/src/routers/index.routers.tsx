import { createBrowserRouter, Outlet } from "react-router-dom";
import HeaderLayout from "../components/layouts/header/HeaderLayout";
import HomePage from "../pages/HomePage";
import { ToastContainer } from "react-toastify";
import { Bounce } from "react-toastify";

const AuthLayout = () => {
  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        element: <HeaderLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
        ],
      },
    ],
  },
]);
