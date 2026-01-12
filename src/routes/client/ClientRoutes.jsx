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

function ClientRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<IndexHome />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/otp" element={<RegisterOtp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/forgot-password/otp" element={<ForgotPasswordOtp />} />
        <Route path="/login" element={<Login />} />

        <Route element={<PrivateRoutes/>}>
          <Route path="/my-account" element={<MyAccount />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

          

        
        
      </Route>
    </Routes>
  );
}

export default ClientRoutes;
