import { Link } from 'react-router-dom'
import './Login.scss'
import { useState } from 'react'
import {login} from "../../../../services/Client/AuthService/Auth.service";
import Swal from 'sweetalert2'


function Login(){
    const [form, setForm] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            const res = await login(form)
            if(res.ok){
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
                    title: "Đăng nhập thành công"
                });
                setTimeout(()=>{
                    window.location.href = "/"
                }, 1500)
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
    return(
        <>
            <div className="login">
                <div className="login_container">
                    <div className='login_container-left'>
                        <form onSubmit={handleSubmit}>
                            <div className='login_container-left-top'>
                                <img src='/logo/florenx.png' title='logo'/>
                                <h2 >Đăng nhập</h2>
                            </div>

                            <div className='login_container-left-bot'>
                                <input type="email" name='email' placeholder="Email" onChange={handleChange}/>
                                <input type="password" name='password' placeholder="Mật khẩu" onChange={handleChange}/>
                                <br />
                                <button type="submit">Đăng Nhập</button>
                                <Link to={"/forgot-password"}>Quên mật khẩu?</Link>
                            </div>
                        </form>
                    </div>
                    <div className='login_container-right'>
                        <img src="/img/nen-login.avif" alt="nền" />
                        <Link to={"/register"} className="register-link">Đăng ký</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login