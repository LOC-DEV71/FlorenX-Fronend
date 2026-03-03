import './ForgotPassword.scss';
import { forgotPassword } from "../../../../services/Client/AuthService/Auth.service";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toastError } from '../../../../utils/AlertFromSweetalert2';
import {LeftOutlined} from "@ant-design/icons";

function ForgotPassword() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: ""
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await forgotPassword({ email: form.email });

            if (res.ok) {
                navigate(`/forgot-password/otp?email=${form.email}`);
            } else {
                toastError(res.data)
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleChange = (e) => {
        e.preventDefault();
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <div className="forgot">
                <div className="forgot_container">

                    {/* LEFT */}
                    <div className="forgot_container-left">
                        <Link to="/" className="back">← Trang chủ</Link>

                        <div className="logo">
                            <img src="/logo/florenx-dark.png" alt="logo" />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="forgot_container-right">
                        <form onSubmit={handleSubmit}>
                            <Link to={"/"} className='back'><LeftOutlined /> Về trang chủ</Link>
                            <Link className='logo'>
                                <img src="/logo/florenx-dark.png" title="logo" alt="logo" />
                            </Link>
                            <div className="forgot_header">
                                <h2>Quên mật khẩu</h2>
                                <p>Lấy lại mật khẩu</p>
                            </div>

                            <div className="forgot_form">
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Nhập email"
                                    onChange={handleChange}
                                />

                                <button type="submit" className="btn-dark">
                                    Gửi mã xác nhận
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

export default ForgotPassword