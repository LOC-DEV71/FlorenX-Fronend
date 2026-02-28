import { useEffect, useState } from "react";
import {
  getMyAccount,
  update
} from "../../../../services/Client/AuthService/Auth.service";
import { getOrders } from "../../../../services/Client/AuthService/Checkout.service";
import "./MyAccount.scss";
import {
  UserOutlined,
  SafetyCertificateOutlined,
  ShoppingOutlined
} from "@ant-design/icons";
import { toastSuccess, toastError } from "../../../../utils/AlertFromSweetalert2";
import "../../../../styles/form-group.scss";
import "../../../../styles/scroll-overflow.scss";
import { Link } from "react-router-dom";

function MyAccount() {
  const [data, setData] = useState({});
  const [tab, setTab] = useState("profile");
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [orderId, setOrderId] = useState("")
  const [productId, setProductId] = useState("")

  useEffect(() => {
    getMyAccount()
      .then(res => setData(res.data.info))
      .catch(err => console.error(err));

    getOrders()
      .then(res => {
        if (res.ok) setOrders(res.result.orders || []);
      })
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await update(data);
      res.ok
        ? toastSuccess(res.data.message)
        : toastError(res.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const filteredOrders =
    statusFilter === "all"
      ? orders
      : orders.filter(o => o.status === statusFilter);

  const status = (status) => {
    switch (status) {
      case "pending":
        return <>Chưa xác nhận</>
      case "confirm":
        return <>Đã xác nhận</>
      case "shipping":
        return <>Đang giao</>
      case "done":
        return <>Đã giao</>
      case "cancel":
        return <>Đã hủy</>

      default:
        return;
    }
  }
  return (
    
    <div className="account">
      <div className="account_left">
        <h2>Tài khoản của {data.fullname}</h2>

        <div
          className={`account_item ${tab === "profile" && "active"}`}
          onClick={() => setTab("profile")}
        >
          <UserOutlined />
          Hồ sơ cá nhân
        </div>

        <div
          className={`account_item ${tab === "security" && "active"}`}
          onClick={() => setTab("security")}
        >
          <SafetyCertificateOutlined />
          Email & Password
        </div>

        <div
          className={`account_item ${tab === "orders" && "active"}`}
          onClick={() => setTab("orders")}
        >
          <ShoppingOutlined />
          Đơn hàng của tôi
        </div>
      </div>

      <div className="account_right scroll-overflow">
        {tab === "profile" && (
          <div className="card">
            <h3>Thông tin người dùng</h3>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Họ và tên</label>
                <input
                  name="fullname"
                  value={data.fullname || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Email</label>
                <input value={data.email || ""} disabled />
              </div>

              <div className="form-group">
                <label>SĐT</label>
                <input
                  name="phone"
                  value={data.phone || ""}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Địa chỉ</label>
                <input
                  name="address"
                  value={data.address || ""}
                  onChange={handleChange}
                />
              </div>

              <button className="btn-primary">Cập nhật</button>
            </form>
          </div>
        )}

        {tab === "security" && (
          <div className="card">
            <h3>Bảo mật tài khoản</h3>
            <div className="security-item">Thay đổi Email</div>
            <div className="security-item">Thay đổi Password</div>
          </div>
        )}

        {tab === "orders" && (
          <div className="card orders">
            <h3>Đơn hàng của tôi</h3>

            <div className="order_tabs">
              {["all", "pending", "confirm", "shipping", "done", "cancel"].map(s => (
                <span
                  key={s}
                  className={statusFilter === s ? "active" : ""}
                  onClick={() => setStatusFilter(s)}
                >
                  {s === "all"
                    ? "Tất cả"
                    : s === "pending"
                      ? "Chưa xác nhận"
                      : s === "confirm"
                        ? "Đã xác nhận"
                        : s === "shipping"
                          ? "Đang giao"
                          : s === "done"
                            ? "Đã giao"
                            : "Đã hủy"}
                </span>
              ))}
            </div>

            {filteredOrders.map(order => {
              const total = order.items.reduce((sum, item) => {
                const discount =
                  item.discountPercentage
                    ? (item.price * item.discountPercentage) / 100
                    : 0;
                return sum + (item.price - discount) * item.quantity;
              }, 0);

              return (
                <div key={order._id} className="order_card">
                  <div className="order_header">
                    <span>Mã đơn: #{order.general}</span>
                    <span className={`status ${order.status}`}>
                      {status(order.status)}
                    </span>
                  </div>

                  {order.items.map((item, i) => (
                    <>
                    <Link key={i} className="order_item" to={`/products/detail/${item.slug}`}>
                      <img src={item.thumbnail} alt="" />
                      <div className="info">
                        <div>{item.slug}</div>
                        <span>Số lượng: {item.quantity}</span>
                      </div>
                      <div className="price">
                        {item.price.toLocaleString()}₫
                      </div>
                    </Link>
                    <Link  to={`/products/detail/${item.slug}`}>Đánh giá sản phẩm</Link>
                    </>
                    
                  ))}

                  <div className="order_footer">
                    <span>
                      Ngày đặt:{" "}
                      {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                    <strong>{total.toLocaleString()}₫</strong>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyAccount;