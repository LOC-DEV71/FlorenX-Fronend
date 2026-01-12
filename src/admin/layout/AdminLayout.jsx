import { Outlet } from "react-router-dom"
import Sidebar from "../components/Sidebar/Sidebar"

function AdminRoutes(){
    return(
        <>
            <div className="admin-layout">
                <Sidebar />
                <Outlet />
            </div>
        </>
    )
}

export default AdminRoutes