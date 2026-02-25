import { Navigate } from "react-router-dom";
import { useAdminAuth } from "./AdminAuthContext";

function PermissionGuard({ permission, children }) {
  const { admin, loading } = useAdminAuth();

  if (loading) return null;

  const hasPermission = admin?.role_permission?.includes(permission);

  if (!hasPermission) {
    return <Navigate to="/admin/accounts/me" replace />;
  }

  return children;
}

export default PermissionGuard;
