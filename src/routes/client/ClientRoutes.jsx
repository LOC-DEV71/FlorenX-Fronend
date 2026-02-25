import { Routes, Route } from "react-router-dom";
import IndexHome from "../../client/pages/Home/IndexHome";
import MainLayout from "../../client/layout/MainLayout";
import Register from "../../client/pages/Auth/Register/Register";
import Login from "../../client/pages/Auth/Login/Login";
import MyAccount from "../../client/pages/Auth/User/MyAccount";
import RegisterOtp from "../../client/pages/Auth/Register/RegisterOtp ";
import ForgotPassword from "../../client/pages/Auth/ForfotPassword/ForgotPassword";
import ForgotPasswordOtp from "../../client/pages/Auth/ForfotPassword/ForgotPasswordOtp";
import PrivateRoutes from "./PrivateRoutes";
import ResetPassword from "../../client/pages/Auth/Reset-Pasword/ResetPassword";
import ListCart from "../../client/pages/Cart/cartUser/ListCart";
import { AuthProvider } from "../../context/client/AuthContext";
import ProductsForCatgory from "../../client/pages/Home/productsForCategory/ProductsForCategory";
import ProductDetail from "../../client/pages/Home/productsDetail/ProductDetail";
import Checkout from "../../client/pages/Cart/checkout/checkout";
import SearchPage from "../../client/components/search/searchPage";
import ArticlesDetail from "../../client/pages/Home/section/status/new";

function ClientRoutes() {
  return (
    <AuthProvider>
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<IndexHome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/otp" element={<RegisterOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/otp" element={<ForgotPasswordOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchPage />} />


        <Route path="/cart" element={<ListCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/products/:slug" element={<ProductsForCatgory />} />
        <Route path="/products/detail/:slug" element={<ProductDetail />} />


        <Route path="/articles/detail/:slug" element={<ArticlesDetail/>}/>

        <Route element={<PrivateRoutes/>}>
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

          

      </Route>
    </Routes>
  </AuthProvider>
  );
}

export default ClientRoutes;
