import { Link, useNavigate } from 'react-router-dom'
import './Register.scss'
import { useState } from 'react'
import { sendRegisterOtp } from "../../../../services/Client/AuthService/Auth.service";
import {toastError, toastSuccess} from '../../../../utils/AlertFromSweetalert2';


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
            const res = await sendRegisterOtp(form);
            if(res.ok){
                sessionStorage.setItem("registerInfo", JSON.stringify(form));
                toastSuccess(res.data)
                navigate(`/register/otp?email=${form.email}`);
            } else{
                toastError(res.data)
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
