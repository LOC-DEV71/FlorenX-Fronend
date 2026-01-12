import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../admin/layout/AdminLayout";
import AdminDashboard from "../../admin/pages/AdminDashboard/AdminDashboard";

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
