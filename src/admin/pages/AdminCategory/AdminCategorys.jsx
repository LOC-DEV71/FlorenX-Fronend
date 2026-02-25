import { Fragment, useEffect, useMemo, useState } from "react";
import "./AdminCategorys.scss";
import { getCategory, multiCategory } from "../../../services/Admin/Products.category";
import { SearchOutlined, SwapOutlined } from "@ant-design/icons";
import { toastError, toastSuccess } from "../../../utils/AlertFromSweetalert2";
import {Link} from 'react-router-dom'

function AdminCategory() {
    const [categories, setCategories] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [multi, setMulti] = useState("");
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("");
    const [reload, setReload] = useState(false)

    useEffect(() => {
        getCategory({search, sort })
            .then(res => setCategories(res.category || []))
            .then(() => setSelectedIds([]))
    }, [reload, sort, search]); 

    // flatten toàn bộ tree
    const flattenCategories = (data) => {
        let result = [];
        data.forEach(item => {
            result.push(item);
            if (item.children?.length) {
                result = result.concat(flattenCategories(item.children));
            }
        });
        return result;
    };

    const flatCategories = useMemo(
        () => flattenCategories(categories),
        [categories]
    );

    // lấy id của node + toàn bộ con
    const getAllChildIds = (item) => {
        let ids = [item._id];
        if (item.children?.length) {
            item.children.forEach(child => {
                ids = ids.concat(getAllChildIds(child));
            });
        }
        return ids;
    };

    const handleToggleCategory = (item, checked) => {
        const ids = getAllChildIds(item);

        if (checked) {
            setSelectedIds(prev =>
                Array.from(new Set([...prev, ...ids]))
            );
        } else {
            setSelectedIds(prev =>
                prev.filter(id => !ids.includes(id))
            );
        }
    };

    const handleSubmitChangeMulti = async (e) => {
        e.preventDefault();
        try {
            const res = await multiCategory({
                action: multi,
                selectedIds
            });
            if(res.ok){
                setReload(prev => !prev)
                toastSuccess(res.result.message)
            } else {
                toastError(res.result.message)
            }
            
            
        } catch (err) {
            console.error(err);
        }
    };


    const renderRows = (data, level = 0) => {
        return data.map(item => (
            <Fragment key={item._id}>
                <tr>
                    <td>
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(item._id)}
                            onChange={(e) =>
                                handleToggleCategory(item, e.target.checked)
                            }
                        />
                    </td>

                    <td className="category-name">
                        <span style={{ paddingLeft: level * 24 }}>
                            {level > 0 && "— "}
                            {item.title}
                        </span>
                    </td>

                    <td>
                        <span className={`status ${item.status}`}>
                            {item.status}
                        </span>
                    </td>
                    
                    <td>{item.slug}</td>

                    <td className="actions">
                        <a className="edit">✏️</a>
                        <a className="delete">🗑</a>
                    </td>
                </tr>

                {item.children?.length > 0 &&
                    renderRows(item.children, level + 1)}
            </Fragment>
        ));
    };


    return (
        <div>
            {/* HEADER */}
            <div className="header-admin-category">
                <div className="header-admin-category_left create">
                    <Link to="/admin/product-categorys/create">Tạo Mới</Link>
                </div>

                <div className="header-admin-category_right">
                    {/* SEARCH */}
                    <div className="header-admin-category_right-search">
                        <input
                            placeholder="Tìm kiếm danh mục"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <button >
                            <SearchOutlined />
                        </button>
                    </div>

                    {/* MULTI */}
                    <div className="header-admin-category_right-multi">
                        <select
                            value={multi}
                            onChange={e => setMulti(e.target.value)}
                        >
                            <option value="">-- Chọn hành động --</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="delete-all">Xóa danh mục</option>
                        </select>

                        <button onClick={handleSubmitChangeMulti}>
                            Áp dụng
                        </button>
                    </div>

                    {/* SORT */}
                    <div className="header-admin-category_right-sort">
                        <select
                            value={sort}
                            onChange={e => setSort(e.target.value)}
                        >
                            <option value="">Sắp xếp theo</option>
                            <option value="title-asc">Tên A-Z</option>
                            <option value="title-desc">Tên Z-A</option>
                        </select>
                    </div>

                    <div className="header-admin-category_right-clear">
                        <button
                            onClick={() => {
                                setSearch("");
                                setSort("");
                                fetchData();
                            }}
                        >
                            Xóa lọc
                        </button>
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
                                    flatCategories.length > 0 &&
                                    selectedIds.length === flatCategories.length
                                }
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedIds(
                                            flatCategories.map(c => c._id)
                                        );
                                    } else {
                                        setSelectedIds([]);
                                    }
                                }}
                            />
                        </th>
                        <th>Danh mục</th>
                        <th>Trạng thái</th>
                        <th>Slug</th>
                        <th>Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    {renderRows(categories)}
                </tbody>
            </table>
        </div>
    );
}

export default AdminCategory;
