import { Link } from 'react-router-dom';
import { AuthContext } from '../../../context/AuthContext'; 
import { useContext } from 'react';
import {
    UserOutlined,
} from '@ant-design/icons'
import './user.scss'
import { useState } from 'react';
import { logout } from '../../../services/AuthService/Auth.service';
function ModalUser(){
    const [dislay, setDislay] = useState(false);
    const { isAuth } = useContext(AuthContext);
    const handleClick = () => {
        setDislay(!dislay)
    }
    const handleClickLogout = async () =>{
        const res = await logout();
        if(res.ok){
            window.location.href = "/"
        }
    }
    return(
        <>
            <div className='paren_user'>
                {isAuth ? <span className='paren_user-user' onClick={handleClick}><UserOutlined /></span> : <Link className="header_function-login" to={"/login"}>Đăng nhập</Link>}
                <div className={`${dislay ? 'paren_user-block' : 'paren_user-none'}`}>
                    <Link onClick={handleClick} to={"/my-account"}>Thông tin</Link>
                    <Link onClick={handleClickLogout}>Đang xuất</Link>
                </div>
            </div>
        </>
    )
}
export default ModalUser