import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./admin/AdminRoutes";
import ClientRoutes from "./client/ClientRoutes";
import AdminLogin from "../admin/pages/Auth-admin/Admin.login";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={<AdminRoutes />} />
      <Route path="/*" element={<ClientRoutes />} />
    </Routes>
  );
}

export default AppRoutes; 
