import { Link } from 'react-router-dom'
import './Login.scss'
import { useState } from 'react'
import { login } from "../../../../services/Client/AuthService/Auth.service";
import { toastError, toastSuccess } from '../../../../utils/AlertFromSweetalert2';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogin } from "../../../../services/Client/AuthService/Auth.service";
import {LeftOutlined, EyeOutlined, EyeInvisibleOutlined  } from "@ant-design/icons"


function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login(form)
            if (res.ok) {
                toastSuccess(res.data)
                setTimeout(() => {
                    window.location.href = "/"
                }, 500)

            } else {
                toastError(res.data)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const res = await googleLogin({
                token: credentialResponse.credential
            });

            if (res.ok) {
                toastSuccess("Đăng nhập Google thành công");
                setTimeout(() => {
                    window.location.href = "/";
                }, 500)
            } else {
                toastError(res.data);
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className="login">
                <div className="login_container">

                    {/* LEFT */}
                    <div className="login_container-left">
                        <Link to={"/"} className='back'><LeftOutlined /> Về trang chủ</Link>
                        <div className='logo'>
                            <Link><   img src="/logo/florenx-dark.png" title="logo" alt="logo" /></Link>
                        </div>
                    </div>


                    {/* RIGHT */}
                    <div className="login_container-right">
                        <form onSubmit={handleSubmit}>
                            <Link to={"/"} className='back'><LeftOutlined /> Về trang chủ</Link>
                            <Link className='logo'>
                                <img src="/logo/florenx-dark.png" title="logo" alt="logo" />
                            </Link>

                            <div className="login_header">
                                <h2>Đăng nhập</h2>
                                <p>Chào mừng trở lại</p>
                            </div>

                            <div className="login_form">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    onChange={handleChange}
                                />

                                <div className="password-field">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        placeholder="Mật khẩu"
                                        onChange={handleChange}
                                    />

                                    <span
                                        className="toggle-password"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />}
                                    </span>
                                </div>

                                <button type="submit" className="btn-dark">
                                    Đăng Nhập
                                </button>

                                <Link to="/forgot-password" className="forgot-link">
                                    Quên mật khẩu?
                                </Link>
                            </div>
                        </form>

                        <div className="google_login">
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => toastError("Google Login Failed")}
                            />
                        </div>
                        <div className="overlay">
                            Chưa có tài khoản?
                            <Link to="/register" className="register-link">
                                Đăng ký
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Login