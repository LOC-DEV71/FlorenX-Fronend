import { Link, useNavigate } from 'react-router-dom'
import './Register.scss'
import { useState } from 'react'
import { sendRegisterOtp } from '../../../../services/AuthService/Auth.service';
import Swal from 'sweetalert2'

function Register(){
    const navigate = useNavigate();

    const [form, setForm] = useState({
        fullname: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        try {
            const res = await sendRegisterOtp({ email: form.email });
            if(res.ok){
                sessionStorage.setItem("registerInfo", JSON.stringify(form));
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
                    icon: "success",
                    title: res.data
                });
                navigate(`/register/otp?email=${form.email}`);
            } else{
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
    };

    return(
        <>
            <div className="register">
                <div className="register_container">
                    <div className='register_container-right'>
                        <img src="/img/nen-login.avif" alt="nền" />
                        <Link to={"/login"} className="register-link">Đăng nhập</Link>
                    </div>
                    
                    <div className='register_container-left'>
                        <form onSubmit={handleSubmit}>
                            <div className='register_container-left-top'>
                                <img src='/logo/florenx.png' title='logo'/>
                                <h2>Tạo tài khoản</h2>
                            </div>

                            <div className='register_container-left-bot'>

                                <input
                                    type="text"
                                    name='fullname'
                                    placeholder="Họ và tên"
                                    onChange={handleChange}
                                />
                                <input
                                    type="email"
                                    name='email'
                                    placeholder="Email"
                                    onChange={handleChange}
                                />
                                <input
                                    type="password"
                                    name='password'
                                    placeholder="Mật khẩu"
                                    onChange={handleChange}
                                />

                                <button type="submit">Đăng ký</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register;
