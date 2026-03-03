import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import "./RegisterOtp.scss";
import { verifyRegisterOtp } from "../../../../services/Client/AuthService/Auth.service";
import {LeftOutlined} from "@ant-design/icons"

function RegisterOtp() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");

    const [otp, setOtp] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const info = JSON.parse(sessionStorage.getItem("registerInfo"));

        if (!info) {
            alert("Phiên đăng ký đã hết hạn");
            return;
        }

        const res = await verifyRegisterOtp({
            email,
            otp,
            fullname: info.fullname,
            password: info.password
        });

        if (res.ok) {
            sessionStorage.removeItem("registerInfo");
            window.location.href = ("/");
        }
    };

    return (
        <div className="registerotp">
            <div className="registerotp_container">

                {/* RIGHT - IMAGE */}
                <div className="registerotp_container-right">
                    <Link to="/" className="back"><LeftOutlined/> Về trang chủ</Link>

                    <div className="logo">
                        <img src="/logo/florenx-dark.png" alt="logo" />
                    </div>
                </div>

                {/* LEFT - FORM */}
                <div className="registerotp_container-left">
                    <form onSubmit={handleSubmit}>

                        <div className="registerotp_header">
                            <img src="/logo/florenx-dark.png" alt="logo" />
                            <h2>Mã OTP</h2>
                            <p>OTP đã gửi tới:</p>
                            <strong>{email}</strong>
                        </div>

                        <div className="registerotp_form">
                            <input
                                type="text"
                                placeholder="Nhập mã OTP"
                                value={otp}
                                onChange={e => setOtp(e.target.value)}
                            />

                            <button type="submit" className="btn-dark">
                                Xác nhận
                            </button>
                        </div>

                    </form>
                </div>

            </div>
        </div>
    )
}

export default RegisterOtp;
