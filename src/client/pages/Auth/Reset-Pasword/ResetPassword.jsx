import { Link, useNavigate } from "react-router-dom"
import './ResetPassword.scss'
import { useState } from "react"
import {resetPassword} from "../../../../services/Client/AuthService/Auth.service";
import Swal from 'sweetalert2';
function ResetPassword(){
    const navigate = useNavigate();
    const [form, setFrom] = useState({
        password: "",
        repassword: ""
    });
    const handleSubmitResetPassword = async (e) => {
        e.preventDefault()
        try {
            const res = await resetPassword(form);

            if(res.ok){
                // navigate("/")
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
            console.error(error)
        }
    }
    const handleChangePassword = async (e) => {
        setFrom({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    return(
    <>
        <div className="resetPassword">
            <div className="resetPassword_container">
                <div className='resetPassword_container-left'>
                    <form onSubmit={handleSubmitResetPassword}>
                        <div className='resetPassword_container-left-top'>
                            <img src='/logo/florenx.png' title='logo'/>
                            <h2 >Đổi mật khẩu</h2>
                        </div>

                        <div className='resetPassword_container-left-bot'>
                            <input type="password" name='password'placeholder="Nhập mật khẩu" onChange={handleChangePassword}/>
                            <input type="password" name='repassword' placeholder="Xác nhận mật khẩu" onChange={handleChangePassword}/>
                            <button type="submit">Click để đổi mật khẩu</button>
                            <Link to={"/forgot-password"}>Quay lại</Link>
                        </div>
                    </form>
                </div>
                <div className='resetPassword_container-right'>
                    <img src="/img/nen-login.avif" alt="nền" />
                </div>
            </div>
        </div>
    </>
)
}

export default ResetPassword