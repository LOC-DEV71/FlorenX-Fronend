import { Fragment } from "react";
import './AdminCategorys.scss'
import { useState } from "react";
import { useEffect } from "react";
import {getCategorys} from '../../../services/Admin/products.Category';
import {SearchOutlined, SwapOutlined} from '@ant-design/icons';
function AdminCategory() {
    const [categories, setCatogories] = useState([])

    useEffect(() => {
        getCategorys()
            .then(res => setCatogories(res.category))
            .catch(console.error)
    }, [])

    const renderRows = (data, level = 0) => {
        return data.map(item => (
            <Fragment key={item._id}>
                <tr>
                    {/* checkbox */}
                    <td>
                        <input type="checkbox" />
                    </td>

                    <td className="category-name">
                        <span
                            style={{ paddingLeft: level * 24 }}
                        >
                            {level > 0 && "- "}
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
            <div className="header-admin-category">
                <h2 className="header-admin-category_left">Danh mục sản phẩm</h2>
                <div style={{ marginBottom: 12 }} className="header-admin-category_right">

                    <div className="header-admin-category_right-search">
                        <input placeholder="Tìm kiếm danh mục" name="search"/>
                        <button ><SearchOutlined /></button>
                    </div>

                    {/* Change multi */}
                    <div className="header-admin-category_right-multi">
                        <select
                            
                            
                        >
                            <option value="">-- Chọn hành động --</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="delete-all">Xóa sản phẩm</option>
                        </select>

                        <button
                        >
                            Áp dụng
                        </button>
                    </div>


                    {/* Sort */}
                    <div className="header-admin-category_right-sort">
                        <SwapOutlined/>
                        <select
        
                        >
                            <option value=""> Sắp xếp theo </option>
                            <option value="title-asc">Sắp xếp theo tên A-Z</option>
                            <option value="title-desc">Sắp xếp theo tên Z-A</option>
                            <option value="price-asc">Sắp xếp theo giá thấp đến cao</option>
                            <option value="price-desc">Sắp xếp theo giá cao đến thấp</option>
                        </select>

                    </div>
                    
                    <div className="header-admin-category_right-clear">
                        <button >Xóa lọc</button>
                    </div>


                </div>
            </div>
            <table className="admin-table">
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" />
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
