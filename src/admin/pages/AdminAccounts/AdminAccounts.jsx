import { Link, useParams, useSearchParams } from 'react-router-dom'
import './AdminAccounts.scss'
import { SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { getAccounts, changeMultiAccounts } from '../../../services/Admin/Accounts.admin';
import { confirmation, toastError, toastSuccess } from '../../../utils/AlertFromSweetalert2';
import { renderpagination } from "../../../utils/Admin/paginaton";

function AdminAccounts() {
    const [accounts, setAccounts] = useState([]);
    const [selectIds, setSelectIds] = useState([])
    const [changeMulti, setChangeMulti] = useState("")
    const [reload, setReload] = useState(false)
    const [pagination, setPagination] = useState([])
    const [searchParams, setSearchParams] = useSearchParams();

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;

    useEffect(() => {
        getAccounts({page, limit})
            .then(res => {
                if (res.ok) {
                    setAccounts(res.result.accounts)
                    setPagination(res.result.pagination)
                }
            })
            .catch(console.error())
    }, [reload, limit, page]);
    
    const handleChnageMultiAccounts = async (e) => {
        e.preventDefault();
        if (changeMulti === "delete-all") {
            const result = await confirmation();

            if (!result.isConfirmed) {
                return; 
            }
        }
        try {
            const res = await changeMultiAccounts({changeMulti, selectIds});
            setReload(prev => !prev)
            if(res.ok){
                setSelectIds([])
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
            <div className="header-admin-accounts">

                <div className="header-admin-accounts_left create">
                    <Link to="/admin/accounts/create">Tạo Mới</Link>
                </div>

                <div style={{ marginBottom: 12 }} className="header-admin-accounts_right">

                    <div className="header-admin-accounts_right-search">
                        <input placeholder="Tìm kiếm sản phẩm" name="search" />
                        <button ><SearchOutlined /></button>
                    </div>

                    <div className="header-admin-accounts_right-multi">
                        <select
                            onChange={e => setChangeMulti(e.target.value)}
                            value={changeMulti}
                        >
                            <option value="">-- Chọn hành động --</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="delete-all">Xóa tài khoản</option>
                        </select>

                        <button
                        onClick={handleChnageMultiAccounts}
                        >
                            Áp dụng
                        </button>
                    </div>


                    {/* Sort */}
                    <div className="header-admin-accounts_right-sort">
                        <select
                        >
                            <option value=""> Sắp xếp theo </option>
                            <option value="title-asc">Sắp xếp theo tên A-Z</option>
                            <option value="title-desc">Sắp xếp theo tên Z-A</option>
                            <option value="price-asc">Sắp xếp theo giá thấp đến cao</option>
                            <option value="price-desc">Sắp xếp theo giá cao đến thấp</option>
                        </select>

                    </div>

                    <div className="header-admin-accounts_right-clear">
                        <button >Xóa lọc</button>
                    </div>


                </div>
            </div>
            <table className="admin-table admin-accounts">
                <thead>
                    <tr>
                        <th>
                            <input 
                                type="checkbox" 
                                checked={accounts.length > 0 &&
                                    accounts.length === selectIds.length
                                }
                                onChange={e=> {
                                    if(e.target.checked){
                                        setSelectIds(accounts.map(i => i._id))
                                    } else {
                                        setSelectIds([])
                                    }
                                }}
                            />
                        </th>
                        <th>Avatar</th>
                        <th>Họ và tên</th>
                        <th>Phân quyền</th>
                        <th>Email</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    {accounts.map(item => (
                        <tr key={item._id}>
                            <td>
                                <input 
                                    type="checkbox"
                                    checked={selectIds.includes(item._id)}
                                    onChange={e => {
                                        if(e.target.checked){
                                            setSelectIds(prev => [...prev, item._id])
                                        } else {
                                            setSelectIds(prev => prev.filter(id => id !== item._id));
                                        }
                                    }}
                                />
                            </td>

                            <td>
                                <img
                                    src={item.avatar ? item.avatar : "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                    className="avatar"
                                />
                            </td>

                            <td className="account-name">
                                <strong>{item.fullname}</strong>
                                <span>{item.role_title}</span>
                            </td>

                            <td>
                                <span className={`role ${item.role_slug}`}>{item.role_title}</span>
                            </td>

                            <td className="email">{item.email}</td>

                            <td>
                                <span className={`status ${item.status}`}>{item.status == "active" ? "Hoạt động" : "Không hoạt động"}</span>
                            </td>

                            <td className="actions">
                                <a className="view">👁</a>
                                <a className="edit">✏️</a>
                                <a className="delete">🗑</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {renderpagination(pagination, setSearchParams, limit)}

        </>
    )
}

export default AdminAccounts