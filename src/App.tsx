import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./components/Layout/Footer/Footer";
import Home from "./components/Home/Home";
import ProductDetails from "./components/Product/ProductDetails";
import Search from "./components/Product/Search";
import LoginSignUp from "./components/User/LoginSignUp";
import { loadUser } from "./redux/actions/userActions";
import UserOptions from "./components/Layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./components/User/Profile";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/User/UpdateProfile";
import UpdatePassword from "./components/User/UpdatePassword";
import ForgotPassword from "./components/User/ForgotPassword";
import ResetPassword from "./components/User/ResetPassword";
import Cart from "./components/Cart/Cart";
import Shipping from "./components/Cart/Shipping";
import ConfirmOrder from "./components/Cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./components/Cart/OrderSuccess";
import MyOrders from "./components/Order/MyOrders";
import OrderDetails from "./components/Order/OrderDetails";
import Dashboard from "./components/Admin/Dashboard.js";
import ProductList from "./components/Admin/ProductList.js";
import NewProduct from "./components/Admin/NewProduct";
import UpdateProduct from "./components/Admin/UpdateProduct";
import OrderList from "./components/Admin/OrderList";
import ProcessOrder from "./components/Admin/ProcessOrder";
import UpdateUser from "./components/Admin/UpdateUser";
import ProductReviews from "./components/Admin/ProductReviews";
import Contact from "./components/Layout/Contact/Contact";
import About from "./components/Layout/About/About";
import store, { RootState } from "./redux/store";
import Header from "./components/Layout/Header";
import Products from "./components/Product/Products";
import UsersList from "./components/Admin/UserList";
import NotFound from "./components/Layout/NotFound/NotFound";
import { BASE_URL } from "./config";

function App() {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.user
  );

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${BASE_URL}/api/v1/stripeapikey`);

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />

      {isAuthenticated && <UserOptions user={user} />}

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:keyword" element={<Products />} />

            <Route path="/search" element={<Search />} />

            <Route path="/contact" element={<Contact />} />

            <Route path="/about" element={<About />} />

            <ProtectedRoute path="/account" element={<Profile />} />

            <ProtectedRoute path="/me/update" element={<UpdateProfile />} />

            <ProtectedRoute
              path="/password/update"
              element={<UpdatePassword />}
            />

            <Route path="/password/forgot" element={<ForgotPassword />} />

            <Route path="/password/reset/:token" element={<ResetPassword />} />

            <Route path="/login" element={<LoginSignUp />} />

            <Route path="/cart" element={<Cart />} />

            <ProtectedRoute path="/shipping" element={<Shipping />} />

            <ProtectedRoute path="/success" element={<OrderSuccess />} />

            <ProtectedRoute path="/orders" element={<MyOrders />} />

            <ProtectedRoute path="/order/confirm" element={<ConfirmOrder />} />

            <ProtectedRoute path="/order/:id" element={<OrderDetails />} />

            <ProtectedRoute path="/admin/dashboard" element={<Dashboard />} />
            <ProtectedRoute path="/admin/products" element={<ProductList />} />
            <ProtectedRoute path="/admin/product" element={<NewProduct />} />

            <ProtectedRoute
              path="/admin/product/:id"
              element={<UpdateProduct />}
            />
            <ProtectedRoute path="/admin/orders" element={<OrderList />} />

            <ProtectedRoute
              path="/admin/order/:id"
              element={<ProcessOrder />}
            />
            <ProtectedRoute path="/admin/users" element={<UsersList />} />

            <ProtectedRoute path="/admin/user/:id" element={<UpdateUser />} />

            <ProtectedRoute
              path="/admin/reviews"
              element={<ProductReviews />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Elements>
      )}

      <Footer />
    </Router>
  );
}

export default App;
