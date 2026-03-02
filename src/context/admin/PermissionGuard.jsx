import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";
import { toastError } from "../../utils/AlertFromSweetalert2";

function PermissionGuard({ permission, children }) {
  const { admin, loading } = useAdminAuth();

  if (loading) return null;

  const hasPermission = admin?.role_permission?.includes(permission);

  useEffect(() => {
    if (!hasPermission) {
      toastError("Bạn không có quyền thực hiện hành động này");
    }
  }, [hasPermission]);

  if (!hasPermission) {
    return <Navigate to="/admin/accounts/me" replace />;
  }

  return children;
}

export default PermissionGuard;