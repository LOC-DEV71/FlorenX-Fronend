import { useEffect, useState } from "react";
import { getMyAccount, update } from "../../../../services/AuthService/Auth.service";
import './MyAccount.scss';
import { UserOutlined, SafetyCertificateOutlined } from '@ant-design/icons';
function MyAccount() {
    const [data, setData] = useState({});
    const [render, setRender] = useState(true);

    useEffect(() => {
        getMyAccount()
            .then(res => res.json())
            .then(data => setData(data.info))
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };
    const handleSubmit = async (e) => { 
        e.preventDefault();
        try {
            const res = await update(data);
            if(res.ok){
                window.location.href = "/my-account"
            }
        } catch (error) {
            console.error(error)
        }
    };


    const renderContent = () => {
        switch (render) {
            case true:
            return (
                <div className="profile_right-info">
                    <h2>Thông tin người dùng</h2>
                    <div className="profile_right-info-avatar">
                        <img src={`${data.avatar ? data.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}`} alt="" />
                    </div>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="fullname">Họ và tên</label>
                                <input
                                id="fullname"
                                type="text"
                                name="fullname"
                                value={data.fullname || ""}
                                onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input
                                id="email"
                                type="email"
                                name="email"
                                readonly
                                disabled
                                value={data.email || ""}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="phone">Số điện thoại</label>
                                <input
                                id="phone"
                                type="text"
                                name="phone"
                                value={data.phone || ""}
                                onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="address">Địa chỉ</label>
                                <input
                                id="address"
                                type="text"
                                name="address"
                                value={data.address || ""}
                                onChange={handleChange}
                                />
                            </div>
                            <button type="submit">Cập nhật tài khoản</button>
                    </form>

                </div>
            )

            case false:
            return <div>Email & Password</div>;

            default:
            return null;
        }
    };

    const handleRender = () => {
        setRender(!render)
    }

  console.log(data);

  return (
    <>
        <div className="profile">
            <div className="profile_left">
                <h2>
                    Quản lý hồ sơ người dùng
                </h2>
                <div onClick={handleRender} className={render ? "bold" : ""}>
                    <UserOutlined className={render ? "bold" : ""}/> Hồ sơ cá nhân
                </div>
                <div onClick={handleRender} className={render ? "" : "bold"}>
                    <SafetyCertificateOutlined className={render ? "bold" : ""}/> Email & Password
                </div>
            </div>
            <div className="profile_right">
                {renderContent()}
            </div>
        </div>
    </>
  )
}

export default MyAccount;
