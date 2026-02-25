import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/client/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import "./user.scss";
import { logout } from "../../../services/Client/AuthService/Auth.service";

function ModalUser() {
  const [dislay, setDislay] = useState(false);
  const { isAuth } = useContext(AuthContext);
  const modalRef = useRef(null);

  const handleClick = () => {
    setDislay(prev => !prev);
  };

  const handleClickLogout = async () => {
    const res = await logout();
    if (res.ok) {
      window.location.href = "/";
    }
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        setDislay(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="paren_user" ref={modalRef}>
      {isAuth ? (
        <span className="paren_user-user" onClick={handleClick}>
          <UserOutlined />
        </span>
      ) : (
        <Link className="header_function-login" to="/login">
          Đăng nhập
        </Link>
      )}

      {dislay && (
        <div className="paren_user-block">
          <Link onClick={() => setDislay(false)} to="/my-account">
            Thông tin
          </Link>

          <span onClick={handleClickLogout}>Đăng xuất</span>
        </div>
      )}
    </div>
  );
}

export default ModalUser;