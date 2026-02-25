import { Link, useLocation } from "react-router-dom";
import './Header.scss'
import { useAdminAuth } from "../../../context/admin/AdminAuthContext";
import {LoadingOutlined, } from "@ant-design/icons"
import { useEffect, useState } from "react";
import Notifications from "./Notifications";
import { adminLogout } from "../../../services/Admin/Auth.service";
import { toastError, toastSuccess } from "../../../utils/AlertFromSweetalert2";
function Header(){
    const location = useLocation();
    const {admin, loading} = useAdminAuth();
    const render = () => {
        switch (location.pathname) {
            case "/admin/products":
                return (
                    <h2>
                        Danh sách sản phẩm
                    </h2>
                )
            case "/admin/products/create":
                return (
                    <h2>
                        Thêm sản phẩm mới
                    </h2>
                )
            case "/admin":
                return (
                    <h2>
                        DashBoard
                    </h2>
                )
            case "/admin/product-categorys":
                return (
                    <h2>
                        Danh mục sản phẩm
                    </h2>
                )
            case "/admin/product-categorys/create":
                return (
                    <h2>
                        Thêm danh mục
                    </h2>
                )
            case "/admin/orders":
                return (
                    <h2>
                        Danh sách đơn hàng
                    </h2>
                )
            case "/admin/vouchers":
                return (
                    <h2>
                        Danh sách mã giảm giá
                    </h2>
                )
            case "/admin/vouchers/create":
                return (
                    <h2>
                        Thêm mã giảm giá
                    </h2>
                )
            case "/admin/chat":
                return (
                    <h2>
                        Chăm sóc khách hàng
                    </h2>
                )
            case "/admin/accounts/create":
                return (
                    <h2>
                        Thêm tài khoản quản trị
                    </h2>
                )
            case "/admin/accounts":
                return (
                    <h2>
                        Danh sách tài khoản quản trị
                    </h2>
                )
            case "/admin/roles":
                return (
                    <h2>
                        Danh sách nhóm quyền
                    </h2>
                )
            case "/admin/permission":
                return (
                    <h2>
                        Phân quyền
                    </h2>
                )
        
            default:
                return (
                    <>
                    
                    </>
                )
        }
    }

    const handleLogout = async () => {
        const res = await adminLogout();
        if(res.ok){
            window.location.href = "/admin";
        } else {
            toastError(res.result.message)
        }
    }

    return(
        <>
            <div className="header-admin">
                <div className="header-admin_left">
                    {render()}
                </div>
                <div className="header-admin_right">
                    <Notifications/>
                    <button className="btn_danger" onClick={handleLogout}>Đăng xuất</button>
                    <Link to={`/admin/accounts/me`} >
                        {loading ? (
                            <LoadingOutlined />
                            ) : (
                            <>
                                <div className="header-admin_right-l">
                                    {admin.fullname} <br />
                                    <span>{admin?.role_slug}</span>
                                </div>
                                <div className="header-admin_right-r">
                                    <img src={admin.avatar} alt="avatar" />
                                </div>
                            </>
                        )}

                    </Link>
                </div>
                
            </div>
        </>
    )
}
export default Header