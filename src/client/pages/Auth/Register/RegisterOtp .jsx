import { Link, useSearchParams } from "react-router-dom";
import { useState } from "react";
import "./RegisterOtp.scss";
import { verifyRegisterOtp } from "../../../../services/AuthService/Auth.service";

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
                <div className='registerotp_container-right'>
                    <img src="/img/nen-login.avif" alt="nền" />
                    <Link to={"/register"} className="register-link">Đăng ký</Link>

                </div>
                <div className='registerotp_container-left'>
                    <form onSubmit={handleSubmit}>
                        <div className='registerotp_container-left-top'>
                            <img src='/logo/florenx.png' title='logo' />
                            <h2 >Mã OTP</h2>
                            <p>OTP đã gửi tới:</p>
                            <strong>{email}</strong>
                        </div>

                        <div className='registerotp_container-left-bot'>
                            <input
                                type="text"
                                placeholder="Nhập mã OTP"
                                value={otp}
                                onChange={e => setOtp(e.target.value)}
                            />

                            <button type="submit">Xác nhận</button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    )
}

export default RegisterOtp;
