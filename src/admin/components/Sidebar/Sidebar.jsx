import { Link, useLocation } from 'react-router-dom'
import './sidebar.scss'
import {
    BarChartOutlined,
    FolderOpenOutlined,
    SolutionOutlined,
    ContainerOutlined,
    ApartmentOutlined,
    AppstoreAddOutlined,
    IdcardOutlined,
    CommentOutlined,
    BarcodeOutlined,
    SettingOutlined,
    GiftOutlined, 
    DeleteOutlined,
    FormOutlined
} from '@ant-design/icons';
import { useAdminAuth } from "../../../context/admin/AdminAuthContext";
import { Skeleton } from 'antd';

function Sidebar() {
    const location = useLocation();
    const { admin, loading } = useAdminAuth();
    const canViewProducts = admin?.role_permission?.includes("view-products");
    const canViewCategory = admin?.role_permission?.includes("view-categories");
    const canViewUsers = admin?.role_permission?.includes("view-users");
    const canViewAccounts = admin?.role_permission?.includes("view-accounts");
    const canViewRoles = admin?.role_permission?.includes("view-roles");
    const canViewPermissions = admin?.role_permission?.includes("view-permissions");
    const accessCskh = admin?.role_permission?.includes("access-cskh");
    const viewVouchers = admin?.role_permission?.includes("view-vouchers");
    const viewOrders = admin?.role_permission?.includes("view-orders");
    const renderSkeletonRows = (rows = 6) => {
        return Array.from({ length: rows }).map((_, index) => (
            <div key={index} className="sidebar-admin_menu-item">

                <Skeleton.Input
                    active
                    size="small"
                />

            </div>
        ));
    };

    return (
        <>
            <div className="sidebar-admin">
                <div className="sidebar-admin_logo">
                    <img src="/logo/florenx-dark.webp" title="logo" />
                </div>
                {loading ? <div className="sidebar-admin_menu">
                    {renderSkeletonRows()}
                </div> :

                    <div className="sidebar-admin_menu">
                        <div className={`sidebar-admin_menu-item ${location.pathname === "/admin" ? "active" : ""}`} >
                            <BarChartOutlined /><Link to={"/admin"}>DashBoard</Link>
                        </div>

                        {canViewProducts &&
                            <div className={`sidebar-admin_menu-item ${location.pathname === "/admin/products" ? "active" : ""}`}>
                                <FolderOpenOutlined /><Link to={"/admin/products"}>Sản phẩm</Link>
                            </div>
                        }

                        <div className={`sidebar-admin_menu-item ${location.pathname === "/admin/articles" ? "active" : ""}`}>
                            <FormOutlined /><Link to={"/admin/articles"}>Bài viết</Link>
                        </div>

                        {viewOrders && 
                            <div className={`sidebar-admin_menu-item ${location.pathname === "/admin/orders" ? "active" : ""}`}>
                                <BarcodeOutlined /><Link to={"/admin/orders"}>Đơn hàng</Link>
                            </div>
                        }

                        

                        {viewVouchers && 
                            <div className={`sidebar-admin_menu-item ${location.pathname === "/admin/vouchers" ? "active" : ""}`}>
                                <GiftOutlined /><Link to={"/admin/vouchers"}>Voucher</Link>
                            </div>
                        }
                        

                        {canViewCategory &&
                            <div className={`sidebar-admin_menu-item ${location.pathname === "/admin/product-categorys" ? "active" : ""}`}>
                                <ContainerOutlined /><Link to={"/admin/product-categorys"}>Danh mục</Link>
                            </div>
                        }

                        {canViewUsers &&
                            <div className={`sidebar-admin_menu-item ${location.pathname === "/admin/users" ? "active" : ""}`}>
                                <SolutionOutlined /><Link to={"/admin/users"}>Người dùng</Link>
                            </div>
                        }

                        {canViewAccounts &&
                            <div className={`sidebar-admin_menu-item ${location.pathname === "/admin/accounts" ? "active" : ""}`}>
                                <IdcardOutlined /><Link to={"/admin/accounts"}>TK Quản Trị</Link>
                            </div>
                        }

                        {canViewRoles &&
                            <div className={`sidebar-admin_menu-item ${location.pathname === "/admin/roles" ? "active" : ""}`}>
                                <AppstoreAddOutlined /><Link to={"/admin/roles"}>Nhóm quyền</Link>
                            </div>
                        }

                        {canViewPermissions &&
                            <div className={`sidebar-admin_menu-item ${location.pathname === "/admin/permission" ? "active" : ""}`}>
                                <ApartmentOutlined /><Link to={"/admin/permission"}>Phân quyền</Link>
                            </div>
                        }
                        {accessCskh &&
                            <div className={`sidebar-admin_menu-item ${location.pathname === "/admin/chat" ? "active" : ""}`}>
                                <CommentOutlined /><Link to={"/admin/chat"}>CSKH</Link>
                            </div>
                        }
                        <div className={`sidebar-admin_menu-item ${location.pathname === "/admin/deletd" ? "active" : ""}`}>
                            <DeleteOutlined /><Link to={"/admin/deleted"}>Thùng rác</Link>
                        </div>
                        
                        <div className={`sidebar-admin_menu-item ${location.pathname === "/admin/setting" ? "active" : ""}`}>
                            <SettingOutlined /><Link to={"/admin/setting"}>Cài đặt</Link>
                        </div>

                    </div>
                }
            </div>
        </>
    )
}
export default Sidebar