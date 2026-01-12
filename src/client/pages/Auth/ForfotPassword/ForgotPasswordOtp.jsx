import { useNavigate, useSearchParams, Link } from "react-router-dom";
import './ForgotPasswordOtp.scss'
import { useState } from "react";
import { forgotPasswordOtp } from "../../../../services/AuthService/Auth.service";
import Swal from "sweetalert2";
function forgotOtpPasswordOtp() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email")
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: email,
        otp: ""
    })
    
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await forgotPasswordOtp(form);

            if(res.ok){

                navigate("/forgot-password/reset-password");
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                    });
                    Toast.fire({
                    icon: "error",
                    title: res.data
                });
            }
        } catch (error) {
            
        }

    }
    const handleChange = (e) =>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    return (
        <>
            <div className="forgotOtp">
                <div className="forgotOtp_container">
                    <div className='forgotOtp_container-left'>
                        <form onSubmit={handleSubmit}>
                            <div className='forgotOtp_container-left-top'>
                                <img src='/logo/florenx.png' title='logo'/>
                                <h2 >Xác nhận email</h2>
                            </div>

                            <div className='forgotOtp_container-left-bot'>
                                <input type="email" name='email' value={email} readOnly disabled/>
                                <input type="text" name='otp' placeholder="Nhập otp" onChange={handleChange}/>
                                <button type="submit">Click để xác nhận OTP</button>
                                <Link to={"/forgot-password"}>Quay lại</Link>
                            </div>
                        </form>
                    </div>
                    <div className='forgotOtp_container-right'>
                        <img src="/img/nen-login.avif" alt="nền" />
                    </div>
                </div>
            </div>
        </>
    )
}

export default forgotOtpPasswordOtp