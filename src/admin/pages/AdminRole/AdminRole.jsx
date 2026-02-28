import { useEffect, useState, Fragment } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { SearchOutlined, SwapOutlined } from "@ant-design/icons";
import "./AdminRole.scss";
import { getRoles, deleteRole } from "../../../services/Admin/Roles.serrvice";
import { renderpagination } from "../../../utils/Admin/paginaton";
import { confirmation, toastError, toastSuccess } from "../../../utils/AlertFromSweetalert2";

function AdminRole() {
    const [roles, setRoles] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [pagination, setPagination] = useState([])
    const [reload, setReload] = useState(false)
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    useEffect(() => {
        getRoles({page, limit})
            .then(res => {
                if (res.ok) {
                    setRoles(res.result.roles)
                    setPagination(res.result.pagination)
                }
            })
            .catch(console.error);
    }, [page, limit, reload])

     const handleDelete = async (id) => {
        const result = await confirmation();
        
        if (!result.isConfirmed) {
            return; 
        }
        try {
            const res = await deleteRole(id); 
            if(res.ok){
                toastSuccess(res.result.message)
                setReload(prev => !prev)
            } else {
                toastError(res.result.message)
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <>
            <div className="header-admin-role">
                <div className="header-admin-role_left create">
                    <Link to="/admin/roles/create">Tạo mới</Link>
                </div>

                <div className="header-admin-role_right">
                    <div className="header-admin-role_right-search">
                        <input
                            placeholder="Tìm kiếm role"

                        />
                        <button >
                            <SearchOutlined />
                        </button>
                    </div>

                    <div className="header-admin-role_right-multi">
                        <select
                        >
                            <option value="">-- Chọn hành động --</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="delete-all">Xoá role</option>
                        </select>

                        <button>Áp dụng</button>
                    </div>

                    <div className="header-admin-role_right-sort">
                        <select >
                            <option value="">Sắp xếp theo</option>
                            <option value="title-asc">Tên A-Z</option>
                            <option value="title-desc">Tên Z-A</option>
                            <option value="slug-asc">Slug A-Z</option>
                            <option value="slug-desc">Slug Z-A</option>
                        </select>
                    </div>

                    <div className="header-admin-role_right-clear">
                        <button >Xoá lọc</button>
                    </div>
                </div>
            </div>

            <table className="admin-table admin-role-table">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                            />
                        </th>
                        <th>Role</th>
                        <th>Mô tả</th>
                        <th>Slug</th>
                        <th>Trạng thái</th>
                        <th>Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    {roles.map(item => (
                        <Fragment key={item._id}>
                            <tr >
                                <td>
                                    <input
                                        type="checkbox"
                                    />
                                </td>

                                <td className="role-name">
                                    <div className="role-name__title">{item.title}</div>
                                </td>

                                <td className="role-desc" dangerouslySetInnerHTML={{
                                    __html: item.description
                                }}/>

                                <td className="role-slug">{item.slug}</td>

                                <td>
                                    <span className={`status ${item.status}`}>{item.status}</span>
                                </td>

                                <td className="actions">
                                    <Link to={`/admin/roles/detail/`} className="view">
                                        👁
                                    </Link>
                                    <Link to={`/admin/roles/edit/`} className="edit">
                                        ✏️
                                    </Link>
                                    <button className="delete" type="button" title="Xoá" onClick={e => handleDelete(e, item._id)}>
                                        🗑
                                    </button>
                                </td>
                            </tr>
                        </Fragment>
                    ))}

                </tbody>
            </table>

            {renderpagination(pagination, setSearchParams, limit)}
        </>
    );
}

export default AdminRole;
