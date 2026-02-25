import "./Voucher.create.scss";
import { useState } from "react";
import { createVoucher } from "../../../services/Admin/Voucher.admin";
import { toastError, toastSuccess } from "../../../utils/AlertFromSweetalert2";

function AdminVoucherCreate() {
  const [data, setData] = useState({
    code: "",
    type: "fixed",
    value: "",
    min_order_value: 0,
    max_discount: "",
    quantity: "",
    start_date: "",
    end_date: "",
    status: "active"
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createVoucher(data);
      if(res.ok){
        toastSuccess(res.result.message)
        setData({
          code: "",
          type: "fixed",
          value: "",
          min_order_value: 0,
          max_discount: "",
          quantity: "",
          start_date: "",
          end_date: "",
          status: "active"
        })
      } else{
        toastError(res.result.message)
      }
    } catch (error) {
      console.error(error)
    }
  }

  console.log(data)
  

  return (
    <>
      <div className="header-admin-create">
        <h2>Tạo voucher mới</h2>
      </div>

      <div className="voucher-create">
        <div className="voucher-create-card">

          <div className="form-group">
            <label>Mã voucher</label>
            <input
              type="text"
              name="code"
              value={data.code}
              onChange={handleChange}
              placeholder="VD: FLX100K"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Loại giảm</label>
              <select
                name="type"
                value={data.type}
                onChange={handleChange}
              >
                <option value="fixed">Giảm tiền</option>
                <option value="percent">Giảm %</option>
              </select>
            </div>

            <div className="form-group">
              <label>Giá trị</label>
              <input
                type="number"
                name="value"
                value={data.value}
                onChange={handleChange}
                placeholder="VD: 100000 hoặc 20"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Đơn tối thiểu</label>
              <input
                type="number"
                name="min_order_value"
                value={data.min_order_value}
                onChange={handleChange}
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label>Giảm tối đa</label>
              <input
                type="number"
                name="max_discount"
                value={data.max_discount}
                onChange={handleChange}
                placeholder="Không bắt buộc"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Số lượng voucher</label>
            <input
              type="number"
              name="quantity"
              value={data.quantity}
              onChange={handleChange}
              placeholder="VD: 10"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Ngày bắt đầu</label>
              <input
                type="date"
                name="start_date"
                value={data.start_date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Ngày kết thúc</label>
              <input
                type="date"
                name="end_date"
                value={data.end_date}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group checkbox">
            <select name="status" value={data.status} onChange={handleChange}>
              <option value={""}>--Kích hoạt voucher--</option>
              <option value={"active"}>Hoạt động</option>
              <option value={"inactive"}>Không hoạt động</option>
            </select>
          </div>

          <div className="form-actions">
            <button className="btn-primary" onClick={handleSubmit}>Tạo voucher</button>
            <button className="btn-cancel">Hủy</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminVoucherCreate;
