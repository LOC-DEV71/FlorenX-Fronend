import { useAdminAuth } from "../../../context/admin/AdminAuthContext";
import "./AdminAccountDetail.scss";

function AdminAccountDetail() {
  const {admin, loading} = useAdminAuth();
  const dateVN = new Date(admin?.loginAt).toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh"
  });
  const totalPermission = admin?.role_permission.reduce(
    (total) => total + 1,
    0
  );
  return (
    <div className="admin-detail">
      {/* HEADER */}
      <div className="admin-detail__header">
        <div className="admin-detail__profile">
          <div className="avatar">
            <img src={admin?.avatar} alt="avatar" />
            <span className="status-dot active"></span>
          </div>

          <div className="info">
            <h2>
              {admin?.fullname}
              <span className="role super-admin">{admin?.role_title}</span>
            </h2>
            <p>{admin?.email}</p>
            <span className="verified">Tài khoản đã xác thực</span>
          </div>
        </div>

        <div className="admin-detail__actions">
          <button className="btn edit">Chỉnh sửa</button>
          <button className="btn password">Đổi mật khẩu</button>
          <button className="btn danger">Vô hiệu hóa</button>
        </div>
      </div>

      <div className="admin-detail__content" >
        <div className="left">
          <div className="card">
            <h3>Thông tin tài khoản</h3>

            <div className="row">
              <span>Họ và tên</span>
              <strong>{admin?.fullname}</strong>
            </div>
            <div className="row">
              <span>Email</span>
              <strong>{admin?.email}</strong>
            </div>
            <div className="row">
              <span>Vai trò</span>
              <strong className="role-text">{admin?.role_title}</strong>
            </div>
            <div className="row">
              <span>Trạng thái</span>
              <strong className={`status ${admin?.status}`}>{admin?.status == "active" ? "Hoạt động" : "Bị khóa"}</strong>
            </div>
            <div className="row">
              <span>Đăng nhập gần nhất</span>
              <strong>{dateVN}</strong>
            </div>
          </div>

          <div className="note">
            <strong>Ghi chú bảo mật</strong>
            <p>
              Tài khoản này có quyền truy cập cao nhất. Tất cả hành động đều
              được ghi lại bởi hệ thống.
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="right">
          <div className="card">
            <h3>
              Quyền truy cập
              <span className="count">{totalPermission} quyền hạn</span>
            </h3>

            <div className="permissions">
              {admin?.role_permission.map(item => (
                  <span>{item}</span>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3>Hoạt động gần đây</h3>
              <a href="/">Xem tất cả</a>
            </div>

            <ul className="timeline">
              <li>
                <strong>Đăng nhập vào hệ thống</strong>
                <span>Chrome · Windows · 14:32</span>
              </li>
              <li>
                <strong>Cập nhật sản phẩm #PROD-9981</strong>
                <span>11:15 AM</span>
              </li>
              <li>
                <strong>Thay đổi vai trò người dùng “Minh Trần”</strong>
                <span>Hôm qua · 16:45</span>
              </li>
              <li>
                <strong>Thiết lập cấu hình thanh toán</strong>
                <span>2 ngày trước</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAccountDetail;
