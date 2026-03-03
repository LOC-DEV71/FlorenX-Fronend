import { useSearchParams, Link, useNavigate } from "react-router-dom";
import './ForgotPasswordOtp.scss'
import { useState } from "react";
import { forgotPasswordOtp } from "../../../../services/Client/AuthService/Auth.service";
import { toastError } from '../../../../utils/AlertFromSweetalert2';
function forgotOtpPasswordOtp() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email")
    const [form, setForm] = useState({
        email: email,
        otp: ""
    })

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await forgotPasswordOtp(form);

            if (res.ok) {
                window.location.href = ("/reset-password");
            } else {
                toastError(res.data)
            }
        } catch (error) {

        }

    }
    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <div className="forgotOtp">
                <div className="forgotOtp_container">

                    {/* LEFT */}
                    <div className="forgotOtp_container-left">
                        <Link to="/forgot-password" className="back">← Về trang chủ</Link>

                        <div className="logo">
                            <img src="/logo/florenx-dark.png" alt="logo" />
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="forgotOtp_container-right">
                        <form onSubmit={handleSubmit}>

                            <div className="forgotOtp_header">
                                <h2>Xác nhận email</h2>
                            </div>

                            <div className="forgotOtp_form">
                                <input
                                    type="email"
                                    value={email}
                                    readOnly
                                    disabled
                                />

                                <input
                                    type="text"
                                    name="otp"
                                    placeholder="Nhập OTP"
                                    onChange={handleChange}
                                />

                                <button type="submit" className="btn-dark">
                                    Xác nhận OTP
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

export default forgotOtpPasswordOtp