import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProducts, changeMulti } from "../../../services/Admin/Products.service";
import "./AdminProducts.scss";
import { toastSuccess, toastError } from '../../../utils/AlertFromSweetalert2';
import { SwapOutlined, SearchOutlined } from '@ant-design/icons';
import { Skeleton } from "antd";
import { renderpagination } from "../../../utils/Admin/paginaton";


function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [bulkAction, setBulkAction] = useState("");
    const [reload, setReload] = useState(false);
    const [sort, setSort] = useState("");
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);



    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;

    // products
    useEffect(() => {
        setLoading(true);
        getProducts({ page, limit, sort, search })
            .then(res => {
                if (res.ok) {
                    setProducts(res.data.products);
                    setPagination(res.data.pagination);
                    setSelectedIds([]);
                }
            })
            .catch(console.error)
            .finally(() => {
                setLoading(false);
            });
    }, [page, limit, reload, sort, search]);

    //search
    const handleSearch = (e) => {
        e.preventDefault()
        setReload(prev => !prev)
    }

    //clear
    const handleClear = (e) => {
        e.preventDefault();
        setSearch("");
        setSort("");
        setSearchParams({ page: 1, limit });

    }

    //change 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await changeMulti({ selectedIds, bulkAction });
            setReload(prev => !prev)
            if (res.ok) {
                toastSuccess(res.data.message)
            } else {
                toastError(res.data.message)
            }

        } catch (error) {
            console.error(error)
        }
    }



    const renderSkeletonRows = (rows = 5) => {
        return Array.from({ length: rows }).map((_, index) => (
            <tr key={index}>
                <td>
                    <Skeleton.Input size="small" style={{ width: 16 }} />
                </td>

                <td className="product">
                    <Skeleton.Avatar shape="square" size={40} />
                    <Skeleton.Input
                        active
                        size="small"
                        style={{ width: 180, marginLeft: 10 }}
                    />
                </td>

                <td>
                    <Skeleton.Input active size="small" style={{ width: 100 }} />
                </td>

                <td>
                    <Skeleton.Input active size="small" style={{ width: 80 }} />
                </td>

                <td>
                    <Skeleton.Input active size="small" style={{ width: 60 }} />
                </td>

                <td>
                    <Skeleton.Button active size="small" />
                </td>
            </tr>
        ));
    };


    return (
        <>
            <div className="header-admin-products">
                {/* Create */}


                <div className="header-admin-products_left create">
                    <Link to="/admin/products/create">Tạo Mới</Link>
                </div>

                <div style={{ marginBottom: 12 }} className="header-admin-products_right">

                    <div className="header-admin-products_right-search">
                        <input placeholder="Tìm kiếm sản phẩm" name="search" onChange={e => setSearch(e.target.value)} />
                        <button onClick={handleSearch}><SearchOutlined /></button>
                    </div>

                    {/* Change multi */}
                    <div className="header-admin-products_right-multi">
                        <select
                            value={bulkAction}
                            onChange={(e) => setBulkAction(e.target.value)}
                        >
                            <option value="">-- Chọn hành động --</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="delete-all">Xóa sản phẩm</option>
                        </select>

                        <button
                            // disabled={!bulkAction || selectedIds.length === 0}
                            onClick={handleSubmit}
                        >
                            Áp dụng
                        </button>
                    </div>


                    {/* Sort */}
                    <div className="header-admin-products_right-sort">
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value=""> Sắp xếp theo </option>
                            <option value="title-asc">Sắp xếp theo tên A-Z</option>
                            <option value="title-desc">Sắp xếp theo tên Z-A</option>
                            <option value="price-asc">Sắp xếp theo giá thấp đến cao</option>
                            <option value="price-desc">Sắp xếp theo giá cao đến thấp</option>
                            <option value="featured-yes">Sản phẩm nổi bậc</option>
                            <option value="featured-no">Sản phẩm không nổi bậc</option>
                        </select>

                    </div>

                    <div className="header-admin-products_right-clear">
                        <button onClick={handleClear}>Xóa lọc</button>
                    </div>


                </div>
            </div>


            <table className="admin-table">
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={
                                    products.length > 0 &&
                                    selectedIds.length === products.length
                                }
                                onChange={(e) => {
                                    if (e.target.checked) {
                                        setSelectedIds(products.map(p => p._id));
                                    } else {
                                        setSelectedIds([]);
                                    }
                                }}
                            />
                        </th>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Trạng thái</th>
                        <th>Vị trí</th>
                        <th>Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    {loading
                        ? renderSkeletonRows(limit)
                        : products.map(item => (
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

                                <td className="product">
                                    <img
                                        src={item.thumbnail || "/no-image.png"}
                                        alt={item.title}
                                    />
                                    <span>{item.title}</span>
                                </td>

                                <td>{item.price.toLocaleString()} đ</td>

                                <td>
                                    <span className={`status ${item.status}`}>
                                        {item.status}
                                    </span>
                                </td>

                                <td className="position">
                                    <input type="number" />
                                </td>

                                <td className="actions">
                                    <Link to={`/admin/products/detail/${item.slug}`} className="view">👁</Link>
                                    <Link to={`/admin/products/edit/${item.slug}`} className="edit">✏️</Link>
                                    <Link className="delete">🗑</Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>

            </table>

            {renderpagination(pagination, setSearchParams, limit)}

        </>
    );
}

export default AdminProducts;
