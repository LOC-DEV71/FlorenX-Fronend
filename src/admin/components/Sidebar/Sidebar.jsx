import { Link, useLocation } from 'react-router-dom'
import './sidebar.scss'
import { BarChartOutlined, FolderOpenOutlined, SolutionOutlined, ContainerOutlined } from '@ant-design/icons';
function Sidebar(){
    const location = useLocation();
    return(
        <>
            <div className="sidebar-admin">
                <div className="sidebar-admin_logo">
                    <img src="/logo/florenx.png" title="logo"/>
                </div>
                <div className="sidebar-admin_menu">
                    <div className={`sidebar-admin_menu-item ${location.pathname === "/admin" ? "active" : ""}`} >
                        <BarChartOutlined /><Link to={"/admin"}>DashBoard</Link>
                    </div>
                    <div className={`sidebar-admin_menu-item ${location.pathname === "/admin/products" ? "active" : ""}`}>
                         <FolderOpenOutlined /><Link to={"/admin/products"}>Sản phẩm</Link>
                    </div>
                    <div className={`sidebar-admin_menu-item ${location.pathname === "/admin/product-categorys" ? "active" : ""}`}>
                         <ContainerOutlined /><Link to={"/admin/product-categorys"}>Danh mục</Link>
                    </div>
                    <div className={`sidebar-admin_menu-item ${location.pathname === "/admin/users" ? "active" : ""}`}>
                         <SolutionOutlined /><Link to={"/admin/users"}>Người dùng</Link>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Sidebar