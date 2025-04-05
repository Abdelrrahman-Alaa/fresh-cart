import "./App.css";
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout.jsx";
import Home from "./Components/Home/Home.jsx";
import Cart from "./Components/Cart/Cart.jsx";
import Categories from "./Components/Categories/Categories.jsx";
import Brands from "./Components/Brands/Brands.jsx";
import Products from "./Components/Products/Products.jsx";
import Login from "./Components/Login/Login.jsx";
import Register from "./Components/Register/Register.jsx";
import NotFound from "./Components/NotFound/NotFound.jsx";
import UserTokenContextProvider from "./Contexts/UserTokenContext/UserTokenContext.jsx";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute.jsx";
import ProductDetails from "./Components/ProductDetails/ProductDetails.jsx";
import CartContextProvider from "./Contexts/CartContext/CartContext.jsx";
import { Toaster } from "react-hot-toast";
import Checkout from "./Components/Checkout/Checkout.jsx";
import AllOrders from "./Components/AllOrders/AllOrders.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import WishlistContextProvider from "./Contexts/WishlistContext/WishlistContext.jsx";
import Wishlist from "./Components/Wishlist/Wishlist.jsx";
import ForgetPassword from "./Components/ForgetPassword/ForgetPasswors.jsx";
import VerifyCode from "./Components/VerifyResetCode/VerifyResetCode.jsx";
import ResetPassword from "./Components/ResetPassword/ResetPassword.jsx";

let routers = createHashRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "verify-code", element: <VerifyCode /> },
      { path: "reset-password", element: <ResetPassword /> },
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "wishlist",
        element: (
          <ProtectedRoute>
            <Wishlist />
          </ProtectedRoute>
        ),
      },
      {
        path: "brands",
        element: (
          <ProtectedRoute>
            <Brands />
          </ProtectedRoute>
        ),
      },
      {
        path: "categories",
        element: (
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: (
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        ),
      },
      {
        path: "productdetails/:id",
        element: (
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout",
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
      },
      {
        path: "allorders",
        element: (
          <ProtectedRoute>
            <AllOrders />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);

function App() {
  const query = new QueryClient();
  return (
    <>
      <QueryClientProvider client={query}>
        <ReactQueryDevtools />
        <UserTokenContextProvider>
          <WishlistContextProvider>
            <CartContextProvider>
              <RouterProvider router={routers}></RouterProvider>
              <Toaster />
            </CartContextProvider>
          </WishlistContextProvider>
        </UserTokenContextProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
