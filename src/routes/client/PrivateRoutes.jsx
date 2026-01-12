import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/client/AuthContext";

function PrivateRoutes() {
  const { isAuth, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) return null; 

  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoutes;
