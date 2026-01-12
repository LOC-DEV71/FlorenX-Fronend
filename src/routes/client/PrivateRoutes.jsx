import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Navigate, Outlet } from "react-router-dom";

function PrivateRoutes(){
    const {isAuth} = useContext(AuthContext);
    
    return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
}

export default PrivateRoutes