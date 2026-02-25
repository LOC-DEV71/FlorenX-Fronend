import { Link, useSearchParams } from "react-router-dom";
import "./AdminOrder.scss";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getOrders, changeOrders } from "../../../services/Admin/Orders.admin";
import { renderpagination } from "../../../utils/Admin/paginaton";
import { toastError, toastSuccess } from "../../../utils/AlertFromSweetalert2";


function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pagination, setPagination] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [changeMulti, setChangeMulti] = useState("");
  const [reload, setReload] = useState(false);
  const [sort, setSort] = useState("");

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 5;
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getOrders({ page, limit, sort });
      if (res.ok) {
        setOrders(res.result.orders)
        setPagination(res.result.pagination)
      }
    }
    fetchApi()
  }, [reload, sort])

  const calcOrderTotal = (items = []) => {
    return items.reduce((sum, item) => {
      const priceAfterDiscount =
        item.price - (item.price * (item.discountPercentage || 0)) / 100;

      return sum + priceAfterDiscount * item.quantity;
    }, 0);
  };


  const handleChangeMulti = async (e) => {
    e.preventDefault();
    try {
      const res = await changeOrders({ ids: selectedIds, type: changeMulti });
      if (res.ok) {
        setReload(!reload)
        toastSuccess(res.result.message)
        setChangeMulti([])
      } else {
        toastError(res.result.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const statusUI = (status) => {
    switch (status) {
      case "pending":

        return "Chưa xác nhận"
      case "confirm":

        return "Đã xác nhận"
      case "shipping":

        return "Đang vận chuyển"
      case "done":

        return "Hoàn thành"
      case "cancel":

        return "Đã hủy"

      default:
        break;
    }
  }

  return (
    <>
      <div className="header-admin-orders">
        <div className="header-admin-orders_left create">
          <Link to="/admin/orders/create">Tạo đơn hàng</Link>
        </div>

        <div className="header-admin-orders_right">
          <div className="header-admin-orders_right-search">
            <input placeholder="Tìm kiếm đơn hàng" />
            <button>
              <SearchOutlined />
            </button>
          </div>

          <div className="header-admin-orders_right-multi">
            <select
              value={changeMulti}
              onChange={(e) => setChangeMulti(e.target.value)}
            >
              <option value="">-- Chọn hành động --</option>
              <option value="confirm">Xác nhận</option>
              <option value="shipping">Đang giao</option>
              <option value="done">Hoàn thành</option>
              <option value="cancel">Hủy đơn</option>
            </select>
            <button onClick={handleChangeMulti}>Áp dụng</button>
          </div>

          <div className="header-admin-orders_right-sort">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              <option value="" >-- Sắp xếp theo --</option>
              <option value="confirm">Xác nhận</option>
              <option value="shipping">Đang giao</option>
              <option value="done">Hoàn thành</option>
              <option value="cancel">Hủy đơn</option>
            </select>
          </div>

          <div className="header-admin-orders_right-clear">
            <button>Xóa lọc</button>
          </div>
        </div>
      </div>

      <div className="option">
        <p className="option_title">Sắp xếp theo</p>
        <div className="option_list">
          <button onClick={() => setSort("pending")}
            className={`${sort ? "" : "default"}`}>Chưa xác nhận</button>
          <button onClick={() => setSort("confirm")}
            className={`${sort === "confirm" ? "default" : ""}`}>Đã xác nhận</button>
          <button onClick={() => setSort("shipping")}
            className={`${sort === "shipping" ? "default" : ""}`}>Đang giao</button>
          <button onClick={() => setSort("done")}
            className={`${sort === "done" ? "default" : ""}`}>Hoàn thành</button>
          <button onClick={() => setSort("cancel")}
            className={`${sort === "cancel" ? "default" : ""}`}>Hủy đơn</button>
        </div>
      </div>

      <table className="admin-table admin-orders">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={
                  orders.length > 0 &&
                  selectedIds.length === orders.length
                }
                onChange={(e) => {
                  if (e.target.checked) {
                    setSelectedIds(orders.map(p => p._id));
                  } else {
                    setSelectedIds([]);
                  }
                }}
              />
            </th>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {orders.length > 0 ? (
            orders.map(item => (
              <tr key={item._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(item._id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedIds(prev => [...prev, item._id]);
                      } else {
                        setSelectedIds(prev =>
                          prev.filter(id => id !== item._id)
                        );
                      }
                    }}
                  />
                </td>

                <td>#{item.general}</td>

                <td>
                  <strong>{item.fullName}</strong>
                  <span className="sub">{item.phone}</span>
                </td>

                <td>
                  {new Date(item.createdAt).toLocaleString("vi-VN")}
                </td>

                <td className="price">
                  {calcOrderTotal(item.items).toLocaleString("vi-VN")} đ
                </td>

                <td>
                  <span className={`status ${item.status}`}>
                    {statusUI(item.status)}
                  </span>
                </td>

                <td className="actions">
                  <Link
                    className="view"
                    to={`/admin/orders/detail/${item.general}`}
                  >
                    👁
                  </Link>
                  <Link className="delete">🗑</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="no-data">
                Không có đơn hàng phù hợp
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {renderpagination(pagination, setSearchParams, limit)}
    </>
  );
}

export default AdminOrder;
