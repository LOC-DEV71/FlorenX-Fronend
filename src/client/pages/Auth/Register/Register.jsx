import { Link, useNavigate } from 'react-router-dom'
import './Register.scss'
import { useState } from 'react'
import { sendRegisterOtp } from "../../../../services/Client/AuthService/Auth.service";
import { toastError, toastSuccess } from '../../../../utils/AlertFromSweetalert2';
import {LeftOutlined, EyeOutlined, EyeInvisibleOutlined  } from "@ant-design/icons"


function Register() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await sendRegisterOtp(form);
            if (res.ok) {
                sessionStorage.setItem("registerInfo", JSON.stringify(form));
                toastSuccess(res.data)
                navigate(`/register/otp?email=${form.email}`);
            } else {
                toastError(res.data)
            }
        } catch (error) {

            console.error(error);
        }
    };

    return (
        <>
            <div className="register">
                <div className="register_container">

                    {/* LEFT */}
                    <div className="register_container-left">
                        <Link to="/" className="back"><LeftOutlined/> Về trang chủ</Link>

                        <div className="logo">
                            <img src="/logo/florenx-dark.png" alt="logo" />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="register_container-right">
                        <form onSubmit={handleSubmit}>
                            <Link to={"/"} className='back'><LeftOutlined /> Về trang chủ</Link>
                            <Link className='logo'>
                                <img src="/logo/florenx-dark.png" title="logo" alt="logo" />
                            </Link>
                            <div className="register_header">
                                <h2>Đăng ký</h2>
                                <p>Tạo tài khoản mới</p>
                            </div>

                            <div className="register_form">
                                <input
                                    type="text"
                                    name="fullname"
                                    placeholder="Họ và tên"
                                    onChange={handleChange}
                                />

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
                                    Đăng ký
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

export default Register;
