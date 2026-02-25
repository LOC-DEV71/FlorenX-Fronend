import { Link } from 'react-router-dom'
import './Login.scss'
import { useState } from 'react'
import {login} from "../../../../services/Client/AuthService/Auth.service";
import {toastError, toastSuccess} from '../../../../utils/AlertFromSweetalert2';


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
                toastSuccess(res.data)
                setTimeout(()=>{
                    window.location.href = "/"
                }, 1500)
            } else {
                toastError(res.data)
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
                                <button type="submit" className='btn-dark'>Đăng Nhập</button>
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