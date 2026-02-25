import { useEffect, useState } from "react";
import "./AdminDetailOrder.scss";
import { Link, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../../utils/AlertFromSweetalert2";
import { getOrderDetail, changeStatus } from "../../../services/Admin/Orders.admin";

function AdminOrderDetail() {
  const { general } = useParams();
  const [orders, setOrders] = useState(null);
  const [reload, setReload] = useState(false)

  useEffect(() => {
    const fetchApi = async () => {
      const res = await getOrderDetail(general);
      if (res.ok) {
        setOrders(res.result.order);
      } else {
        toastError(res.result.message);
      }
    };
    fetchApi();
  }, [general, reload]);

  /* ===== MOCK GIỮ NGUYÊN ===== */
  const order = {
    history: [
      {
        title: "Đang giao hàng",
        desc: "Đang vận chuyển từ kho TP.HCM",
        time: "15/05/2024 - 10:20 SA"
      },
      {
        title: "Đã xác nhận",
        desc: "Nhân viên Admin xác nhận đơn hàng",
        time: "14/05/2024 - 11:30 SA"
      },
      {
        title: "Đã tạo đơn",
        desc: "Khách hàng đặt hàng thành công",
        time: "14/05/2024 - 09:42 SA"
      }
    ],
   
  };

  const totalPrice = orders?.items?.reduce(
    (sum, item) => sum + ((item.price - (item.price * item.discountPercentage / 100)) * item.quantity), 0
  )

  const handleChangeStatus = async (e, general) =>{
    const res = await changeStatus(e, general);
    if(res.ok){
      setReload(prev => !prev)
      toastSuccess(res.result.message)
    } else {
      toastError(res.result.message)
    }
  }
  return (
    <div className="order-detail">
      <div className="order-detail__header">
        <div>
          <p className="breadcrumb">
            Đơn hàng / <b>Chi tiết đơn hàng</b>
          </p>
          <h2>
            #{orders?.general ?? order.code}{" "}
            <span className="badge">
              {orders?.status ?? order.status}
            </span>
          </h2>
        </div>

        {orders?.status === "cancel" ? <div className="actions "><div className="btn danger">Đơn hàng đã bị hủy</div></div> : 
          <div className="actions ">
            <button className="btn outline">In hóa đơn</button>
            {orders?.status === "shipping" || orders?.status === "done" ? "" : <button className="btn danger" onClick={() => handleChangeStatus("cancel", orders?.general)}>Hủy đơn</button>}
            {orders?.status === "confirm" || orders?.status === "shipping" || orders?.status === "done"  ? "" : <button className="btn primary" onClick={()=>handleChangeStatus("confirm", orders?.general)}>Xác nhận đơn</button>}
          </div>
          }
      </div>

      <div className="order-detail__info">
        <div>
          <p>TỔNG TIỀN</p>
          <strong>
            {orders?.type === "percent" ? `${(totalPrice - (totalPrice * orders?.value / 100)).toLocaleString("vi-VN")}` : `${totalPrice - orders?.value}`}
            đ
          </strong>
        </div>
        <div>
          <p>PHƯƠNG THỨC THANH TOÁN</p>
          <strong>
            {orders?.payment_method
              ? orders.payment_method === "cod"
                ? "Thanh toán khi nhận hàng (COD)"
                : "Thanh toán chuyển khoản"
              : order.payment}
          </strong>
        </div>
        <div>
          <p>THỜI GIAN ĐẶT HÀNG</p>
          <strong>
            {orders?.createdAt
              ? new Date(orders.createdAt).toLocaleString("vi-VN")
              : order.createdAt}
          </strong>
        </div>
        <div>
          <p>TRẠNG THÁI VẬN CHUYỂN</p>
          {orders?.status === "cancel" && <strong className="link">Đơn hàng đã bị hủy</strong>}
          {orders?.status === "pending" && <strong className="link">Đơn hàng chưa xác nhận</strong>}
          {orders?.status === "confirm" && <strong className="link">Đơn hàng đã xác nhận</strong>}
          {orders?.status === "shipping" && <strong className="link">Đơn hàng đang được giao</strong>}
          {orders?.status === "done" && <strong className="link">Đơn hàng đã hoàn thành</strong>}
        </div>
      </div>

      <div className="order-detail__content">
        <div className="left">
          {/* CUSTOMER */}
          <div className="card">
            <h3>Thông tin khách hàng</h3>
            <div className="grid">
              <div>
                <label>Họ tên</label>
                <p>{orders?.fullName}</p>
              </div>
              <div>
                <label>Số điện thoại</label>
                <p>{orders?.phone}</p>
              </div>
              <div>
                <label>Email</label>
                <p>an.nguyen@example.com</p>
              </div>
              <div>
                <label>Địa chỉ</label>
                <p>{orders?.address}</p>
              </div>
            </div>

            <div className="note">
              <label>Ghi chú</label>
              <p>Giao hàng giờ hành chính, vui lòng gọi trước khi đến.</p>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="card">
            <h3>Danh sách sản phẩm</h3>
            <table>
              <thead>
                <tr>
                  <th>Sản phẩm</th>
                  <th>Đơn giá</th>
                  <th>Số lượng</th>
                  <th>Giảm giá sản phẩm</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {orders?.items.map(item => (
                  <tr key={item._id}>
                    <td className="product-cell">
                      <Link to={`/admin/products/detail/${item.slug}`}>
                        <img src={item.thumbnail} alt="" />
                      </Link>
                    </td>
                    <td>{item.price.toLocaleString("vi-VN")} đ</td>
                    <td>{item.quantity}</td>
                    <td className="discount">- {(item.price * item.discountPercentage / 100).toLocaleString("vi-VN")} đ</td>
                    <td>{(item.price - (item.price * item.discountPercentage / 100)).toLocaleString("vi-VN")} đ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="right">
          <div className="card">
            <h3>Lịch sử đơn hàng</h3>
            <ul className="timeline">
              {order.history.map((h, i) => (
                <li key={i}>
                  <b>{h.title}</b>
                  <span>{h.desc}</span>
                  <time>{h.time}</time>
                </li>
              ))}
            </ul>
          </div>

          <div className="card summary">
            <div>
              <span>Tạm tính</span>
              <span>
                {(totalPrice ? totalPrice : "").toLocaleString("vi-VN")}đ
              </span>
            </div>
            <div>
              <span>Giảm giá voucher</span>
              <span className="red">
                {orders?.type === "percent" ? `- ${orders?.value} %` : `- ${(orders?.value)}`}
              </span>
            </div>
            <div>
              <span>Phí vận chuyển</span>
              <span>
                35.000 đ
              </span>
            </div>
            <div>
              <span>Giảm phí vận chuyển</span>
              <span className="red">
                - 35.000 đ
              </span>
            </div>

            <div className="total">
              <span>TỔNG THANH TOÁN</span>
              <strong>
                {orders?.type === "percent" ? `${(totalPrice - (totalPrice * orders?.value / 100)).toLocaleString("vi-VN")}` : `${(totalPrice - orders?.value).toLocaleString("vi-VN")}`} đ
              </strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminOrderDetail;  