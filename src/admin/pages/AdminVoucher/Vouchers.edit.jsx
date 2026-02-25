import { Link, useParams } from "react-router-dom";
import "./Voucher.create.scss";
import { useEffect, useState } from "react";
import { getOneVoucher, updateVoucher } from "../../../services/Admin/Voucher.admin";
import { toastError, toastSuccess } from "../../../utils/AlertFromSweetalert2";

function AdminVoucherEdit() {
    const { id } = useParams();
    const [data, setData] = useState({
        code: "",
        type: "fixed",
        value: "",
        min_order_value: "",
        max_discount: "",
        quantity: "",
        start_date: "",
        end_date: "",
        status: ""
    });


    useEffect(() => {
        const fetchOneVouchers = async () => {
            const res = await getOneVoucher(id);
            if (res.ok) {
                setData(res.result.voucher)
            }else {
                toastError("Lỗi không lấy thành công")
                console.error(error)
            }   
        }

        fetchOneVouchers();
    }, [])

    const handleChange = (e) => {
        const {name, type, checked, value} = e.target;
        setData(prev => ({
            ...prev,
            [name]: type === "checkbox"
                ? (checked ? "active" : "inactive")
                : value
        }))
    }

    const handleSubmit = async () => {
        const res = await updateVoucher({id, data})
        if(res.ok){
            toastSuccess(res.result.message)
        } else {
            toastError(res.result.message)
            console.error(error)
        }
    }
    const toDateInput = (iso) => iso ? iso.slice(0, 10) : "";


    return (
        <>
            <div className="header-admin-create">
                <h2>Chỉnh sửa voucher</h2>
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
                                value={toDateInput(data.start_date)}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>Ngày kết thúc</label>
                            <input
                                type="date"
                                name="end_date"
                                value={toDateInput(data.end_date)}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="form-group checkbox">
                        <input
                            type="checkbox"
                            name="status"
                            checked={data.status === "active"}
                            onChange={handleChange}
                        />
                        <span>Kích hoạt voucher</span>
                    </div>

                    <div className="form-actions">
                        <button className="btn-primary" onClick={handleSubmit}>Cập nhật voucher</button>
                        <button className="btn-cancel">Hủy</button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AdminVoucherEdit;
