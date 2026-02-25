import { Link, useSearchParams } from "react-router-dom";
import "./Voucher.index.scss";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { changeMultiVouchers, getListVouchers } from "../../../services/Admin/Voucher.admin";
import { toastError, toastSuccess } from "../../../utils/AlertFromSweetalert2";
import { renderpagination } from "../../../utils/Admin/paginaton";

function AdminVouchers() {
    const [vouchers, setVouchers] = useState([]);
    const [pagination, setPagination] = useState([]);
    const [sort, setSort] = useState("")
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectedIds, setSelectedIds] = useState([]);
    const [reload, setReload] = useState(false)
    const [changeMulti, setChangeMulti] = useState("")

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;

    useEffect(() => {
        const fetchVouchers = async () => {
            const res = await getListVouchers({ page, limit, sort });
            if (res.ok) {
                setVouchers(res.result.vouchers)
                setPagination(res.result.pagination)
            } else {
                toastError(res.result.message)
            }
        }
        fetchVouchers();
    }, [page, limit, sort, reload])

    const formatDate = (iso) => {
        const d = new Date(iso);
        const f = (n) => String(n).padStart(2, "0");
        return `${f(d.getDate())}/${f(d.getMonth() + 1)}/${d.getFullYear()}`;
    };

    const changeMultiVoucher = async () => {
        try {
            const res = await changeMultiVouchers({selectedIds, changeMulti});
            setReload(prev => !prev)
            if(res.ok){
                setSelectedIds([])
                toastSuccess(res.result.message)
            } else {
                toastError(res.result.message)
            }
        } catch (error) {
            console.error(error)
        }
        
    }


    return (
        <>
            {/* HEADER */}
            <div className="header-admin-vouchers">
                <div className="header-admin-vouchers_left create">
                    <Link to="/admin/vouchers/create">Tạo Voucher</Link>
                </div>

                <div className="header-admin-vouchers_right">

                    {/* SEARCH */}
                    <div className="header-admin-vouchers_right-search">
                        <input placeholder="Tìm mã voucher..." />
                        <button>
                            <SearchOutlined />
                        </button>
                    </div>

                    {/* CHANGE MULTI */}
                    <div className="header-admin-vouchers_right-multi">
                        <select onChange={e => setChangeMulti(e.target.value)} value={changeMulti}>
                            <option value="">-- Chọn hành động --</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="delete-all">Xóa voucher</option>
                        </select>

                        <button onClick={changeMultiVoucher}>Áp dụng</button>
                    </div>

                    {/* FILTER */}
                    <div className="header-admin-vouchers_right-filter">
                        <select onChange={(e) => setSort(e.target.value)} value={sort}>
                            <option value="">Trạng thái</option>
                            <option value="active">Đang hoạt động</option>
                            <option value="inactive">Không hoạt động</option>
                            <option value="expired">Hết hạn</option>
                        </select>
                    </div>

                    {/* CLEAR */}
                    <div className="header-admin-vouchers_right-clear">
                        <button>Xóa lọc</button>
                    </div>
                </div>
            </div>

            {/* TABLE */}
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={
                                    vouchers.length > 0 &&
                                    selectedIds.length === vouchers.length
                                }
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedIds(vouchers.map(v => v._id));
                                    } else {
                                        setSelectedIds([]);
                                    }
                                }}
                            />

                        </th>
                        <th>Mã</th>
                        <th>Loại</th>
                        <th>Giá trị</th>
                        <th>Thời hạn</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    {vouchers.map(item => (
                        <tr key={item._id}>
                            <td>
                                <input
                                    type="checkbox"
                                    checked={selectedIds.includes(item._id)}
                                    onChange={(e) => {
                                        if (e.target.checked) {
                                            // thêm id vào chuỗi
                                            setSelectedIds(prev => [...prev, item._id]);
                                        } else {
                                            // bỏ id khỏi chuỗi
                                            setSelectedIds(prev => prev.filter(id => id !== item._id));
                                        }
                                    }}
                                />


                            </td>
                            <td className="voucher-code">{item.code}</td>
                            <td>{item.type === "percent" ? "Giảm phần trăm" : "Giảm tiền"}</td>
                            <td>{item.type === "percent" ? `${item.value} %` : `${item.value} đ`}</td>
                            <td>  {formatDate(item.start_date)} - {formatDate(item.end_date)}</td>
                            <td>
                                <span className={`status ${item.status}`}>{item.status}</span>
                            </td>
                            <td className="actions">
                                <Link className="view">👁</Link>
                                <Link to={`/admin/vouchers/edit/${item._id}`} className="edit">✏️</Link>
                                <Link className="delete">🗑</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* pagination util */}
            {renderpagination(pagination, setSearchParams, limit)}
        </>
    );
}

export default AdminVouchers;
