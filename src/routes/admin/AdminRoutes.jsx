import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../admin/layout/AdminLayout";
import AdminDashboard from "../../admin/pages/AdminDashboard/AdminDashboard";
import AdminProducts from "../../admin/pages/AdminProducts/AdminProducts";
import ProductCreate from "../../admin/pages/AdminProducts/CreateProducts";
import AdminCategory from "../../admin/pages/AdminCategory/AdminCategorys";
import EditProducts from "../../admin/pages/AdminProducts/AdmimEditProducts";
import AdminProductDetail from "../../admin/pages/AdminProducts/AdminDetailProducts";

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/edit/:slug" element={<EditProducts />} />
        <Route path="products/detail/:slug" element={<AdminProductDetail />} />
        <Route path="product-categorys" element={<AdminCategory />} />
        <Route path="products/create" element={<ProductCreate />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
