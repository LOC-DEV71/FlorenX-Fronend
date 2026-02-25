import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.scss";
import { adminLogin } from "../../../services/Admin/Auth.service";
import { toastSuccess, toastError } from "../../../utils/AlertFromSweetalert2";

function AdminLogin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await adminLogin(form);

      if (!res.ok) {
        toastError(res.result.message);
        return;
      }

      toastSuccess(res.result.message);

      navigate("/admin");
    } catch (err) {
      toastError("Lỗi hệ thống");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login">
      <form className="admin-login__box" onSubmit={handleSubmit}>
        <h1>Admin Login</h1>
        <p>Đăng nhập trang quản trị</p>

        <input
          type="email"
          name="email"
          placeholder="Email quản trị"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
        />

        <button disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>
    </div>
  );
}

export default AdminLogin;
