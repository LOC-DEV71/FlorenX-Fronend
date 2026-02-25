import { Routes, Route } from "react-router-dom";
import AdminLayout from "../../admin/layout/AdminLayout";
import AdminDashboard from "../../admin/pages/AdminDashboard/AdminDashboard";
import AdminProducts from "../../admin/pages/AdminProducts/AdminProducts";
import ProductCreate from "../../admin/pages/AdminProducts/CreateProducts";
import AdminCategory from "../../admin/pages/AdminCategory/AdminCategorys";
import CreateCategory from "../../admin/pages/AdminCategory/CreateCategory";
import EditProducts from "../../admin/pages/AdminProducts/AdmimEditProducts";
import AdminProductDetail from "../../admin/pages/AdminProducts/AdminDetailProducts";
import AdminAccounts from "../../admin/pages/AdminAccounts/AdminAccounts";
import CreateAdminAccount from "../../admin/pages/AdminAccounts/CreateAdminAccount";
import AdminRole from "../../admin/pages/AdminRole/AdminRole";
import AdminRoleCreate from "../../admin/pages/AdminRole/AdminRoleCreate";
import RolePermission from "../../admin/pages/AdminPermission/Role.permission";
import { AdminAuthProvider } from "../../context/admin/AdminAuthContext";
import AdminAccountDetail from "../../admin/pages/AdminAccounts/AdminAccountsDetail";
import PermissionGuard from "../../context/admin/PermissionGuard";
import Chat from "../../admin/pages/chat/chatCSKH";
import AdminVouchers from "../../admin/pages/AdminVoucher/Voucher.index";
import AdminVoucherCreate from "../../admin/pages/AdminVoucher/Voucher.create";
import AdminVoucherEdit from "../../admin/pages/AdminVoucher/Vouchers.edit";
import AdminOrder from "../../admin/pages/AdminOrder/AdminOrder";
import AdminOrderDetail from "../../admin/pages/AdminOrder/AdminDetailOrder";
import AdminArticles from "../../admin/pages/AdminArticles/AdminArticles";
import AdminCreateArticles from "../../admin/pages/AdminArticles/AdminCreateArticles";
import AdminUpdateArticles from "../../admin/pages/AdminArticles/AdminUpdateArticles";

function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />

          {/* PRODUCTS */}
          <Route 
            path="products" 
            element={
            <PermissionGuard permission="view-products">
              <AdminProducts />
            </PermissionGuard>
          }/>
          <Route 
            path="products/create" 
            element={
            <PermissionGuard permission="create-products">
              <ProductCreate />
            </PermissionGuard> 
          }/>
          <Route 
            path="products/edit/:slug" 
            element={
              <PermissionGuard permission="update-products">
                <EditProducts />
              </PermissionGuard>
            } 
          />
          <Route 
            path="products/detail/:slug" 
            element={
              <PermissionGuard permission="view-products">
                <AdminProductDetail />
              </PermissionGuard>
            } 
          />

          {/* CATEGORY */}
          <Route 
            path="product-categorys" 
            element={
              <PermissionGuard permission="view-categories">
                <AdminCategory />
              </PermissionGuard>
            } 
          />
          <Route 
            path="product-categorys/create" 
            element={
              <PermissionGuard permission="create-categories">
                <CreateCategory />
              </PermissionGuard> 
            } 
          />

          {/* VOUCHERS */}
          <Route 
            path="vouchers" 
            element={
              <PermissionGuard permission={"view-vouchers"}>
                <AdminVouchers />
              </PermissionGuard>
              
            } 
          />
          <Route 
            path="vouchers/create" 
            element={
              <PermissionGuard permission={"create-vouchers"}>
                <AdminVoucherCreate />
              </PermissionGuard>
                
            } 
          />
          <Route 
            path="vouchers/edit/:id"
            element={
              <PermissionGuard permission={"update-vouchers"}>
                <AdminVoucherEdit />
              </PermissionGuard>
                
            } 
          />

          {/* ACCOUNTS */}
          <Route 
            path="accounts" 
            element={
              <PermissionGuard permission="view-accounts">
                <AdminAccounts />
              </PermissionGuard>
              
            } 
          />
          <Route 
            path="accounts/me" 
            element={<AdminAccountDetail />} 
          />
          <Route 
            path="accounts/create" 
            element={
              <PermissionGuard permission="create-accounts">
                <CreateAdminAccount />
              </PermissionGuard>
            } 
          />

          {/* ROLES */}

          <Route 
            path="roles" 
            element={
              <PermissionGuard permission="view-roles">
                <AdminRole />
              </PermissionGuard>
            } 
          />
          <Route 
            path="roles/create" 
            element={
              <PermissionGuard permission="create-roles">
                <AdminRoleCreate />
              </PermissionGuard>
            } 
          />

          {/* PERMISSION */}
          <Route 
            path="permission" 
            element={
              <PermissionGuard permission="view-permissions">
                <RolePermission />
              </PermissionGuard>
            } 
          />

          {/* CHAT */}
          <Route 
            path="chat" 
            element={
              <PermissionGuard permission={"access-cskh"}>
                <Chat/>
              </PermissionGuard>
            } 
          />


          {/* ORDER */}
          <Route 
            path="orders" 
            element={
              <PermissionGuard permission={"view-orders"}>
                <AdminOrder/>
              </PermissionGuard>
            } 
          />
          <Route 
            path="orders/detail/:general" 
            element={
              <PermissionGuard permission={"view-orders"}>
                <AdminOrderDetail/>
              </PermissionGuard>
            } 
          />


          <Route 
            path="articles" 
            element={
                <AdminArticles/>
            } 
          />
          <Route 
            path="articles/create" 
            element={
                <AdminCreateArticles/>
            } 
          />
          <Route 
            path="articles/update/:slug" 
            element={
                <AdminUpdateArticles/>
            } 
          />
        </Route>
      </Routes>
  </AdminAuthProvider>
  );
}





export default AdminRoutes;
