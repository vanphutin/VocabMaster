import { createBrowserRouter, Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import HeaderLayout from "../components/layouts/header/HeaderLayout";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";

const RootLayout = () => {
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
const UserAuthentication = () => {
  return (
    <div
      className=""
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Outlet />
    </div>
  );
};
export const router = createBrowserRouter([
  {
    element: <RootLayout />,
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
      {
        element: <UserAuthentication />,
        children: [
          {
            path: "/register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
]);
