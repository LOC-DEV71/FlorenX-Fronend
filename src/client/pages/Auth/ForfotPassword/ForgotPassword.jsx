import './ForgotPassword.scss';
import {forgotPassword} from "../../../../services/Client/AuthService/Auth.service";
import { useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
function ForgotPassword(){
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: ""
    })
    const handleSubmit = async (e) => {
         e.preventDefault(); 
        try {
            const res = await forgotPassword({ email: form.email }); 

            if(res.ok){
                navigate(`/forgot-password/otp?email=${form.email}`);
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
                    <div className='forgot_container-left'>
                        <form onSubmit={handleSubmit}>
                            <div className='forgot_container-left-top'>
                                <img src='/logo/florenx.png' title='logo'/>
                                <h2 >Quên Mật Khẩu</h2>
                            </div>

                            <div className='forgot_container-left-bot'>
                                <input type="email" name='email' placeholder="Nhập email" onChange={handleChange}/>
                                <button type="submit">Click để nhận OTP</button>
                            </div>
                        </form>
                    </div>
                    <div className='forgot_container-right'>
                        <img src="/img/nen-login.avif" alt="nền" />
                        <Link to={"/login"} className='register-link'>Đăng nhập</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ForgotPassword