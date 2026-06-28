import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/user/Homepage";
import Userlayout from "../layout/Userlayout";
import AboutPage from "../pages/user/AboutPage";
import Courses from "../pages/user/Courses";
import LoginPage from "../pages/shared/LoginPage";
import SignupPage from "../pages/user/SignupPage";
import CartPage from "../pages/CartPage";
import OrderSuccess from "../pages/user/OrderSuccess";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Userlayout />,
    errorElement:<h1>Error Page</h1>,
    children: [
      {
        path: "",
        element: <Homepage/>,
      },
      {
        path: "about",
        element: <AboutPage/>,
      },
      {
        path: "courses",
        element: <Courses/>,
      },
      {
        path: "cart",
        element: <CartPage/>,
      },
      {
        path: "payment/success",
        element: <OrderSuccess/>,
      },
      {
        path: "payment/success",
        element: <SignupPage/>,
      },
      {
        path: "login",
        element: <LoginPage/>,
      },
      {
        path: "signup",
        element: <SignupPage/>,
      },
    ],
  },
]);
