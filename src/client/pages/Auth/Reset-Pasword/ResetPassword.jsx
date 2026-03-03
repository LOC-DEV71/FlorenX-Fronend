import { Link } from "react-router-dom"
import './ResetPassword.scss'
import { useState } from "react"
import { resetPassword } from "../../../../services/Client/AuthService/Auth.service";
import { toastSuccess, toastError } from '../../../../utils/AlertFromSweetalert2';
import {LeftOutlined, EyeOutlined, EyeInvisibleOutlined  } from "@ant-design/icons"

function ResetPassword() {
    const [form, setFrom] = useState({
        password: "",
        repassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showRepassword, setShowRepassword] = useState(false)
    const handleSubmitResetPassword = async (e) => {
        e.preventDefault()
        try {
            const res = await resetPassword(form);

            if (res.ok) {
                toastSuccess(res.data)
            } else {
                toastError(res.data)
            }
        } catch (error) {
            console.error(error)
        }
    }
    const handleChangePassword = async (e) => {
        setFrom({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <div className="resetPassword">
                <div className="resetPassword_container">

                    {/* LEFT */}
                    <div className="resetPassword_container-left">
                        <Link to={"/"} className='back'><LeftOutlined /> Về trang chủ</Link>
                        <Link className='logo'>
                            <img src="/logo/florenx-dark.png" title="logo" alt="logo" />
                        </Link>
                    </div>

                    {/* RIGHT */}
                    <div className="resetPassword_container-right">
                        <form onSubmit={handleSubmitResetPassword}>
                            <Link to={"/"} className='back'><LeftOutlined /> Về trang chủ</Link>
                            <Link className='logo'>
                                <img src="/logo/florenx-dark.png" title="logo" alt="logo" />
                            </Link>
                            <div className="resetPassword_header">
                                <h2>Đổi mật khẩu</h2>
                            </div>

                            <div className="resetPassword_form">
                                <div className="password-field">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Mật khẩu"
                                        onChange={handleChangePassword}
                                    />

                                    <span
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                    </span>
                                </div>
                                <div className="password-field">
                                    <input
                                        type={showRepassword ? "text" : "password"}
                                        name="repassword"
                                        placeholder="Xác nhận mật khẩu"
                                        onChange={handleChangePassword}
                                    />


                                    <span
                                        className="toggle-password"
                                        onClick={() => setShowRepassword(!showRepassword)}
                                    >
                                        {showRepassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                    </span>
                                </div>
                                
                                <button type="submit" className="btn-dark">
                                    Đổi mật khẩu
                                </button>
                                <Link to="/login" className="back-login">← Quay lại đăng nhập</Link>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ResetPassword