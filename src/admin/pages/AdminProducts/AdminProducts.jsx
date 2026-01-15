import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProducts, changeMulti } from "../../../services/Admin/Products.service";
import "./AdminProducts.scss";
import {toastSuccess, toastError} from '../../../utils/AlertFromSweetalert2';
import { SwapOutlined, SearchOutlined } from '@ant-design/icons';
const MAX_PAGE = 5;

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]); 
    const [searchParams, setSearchParams] = useSearchParams();
    const [bulkAction, setBulkAction] = useState("");
    const [reload, setReload] = useState(false);
    const [sort, setSort] = useState("");
    const [search, setSearch] = useState("");


    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;

    // products
    useEffect(() => {
        getProducts({ page, limit, sort, search })
            .then(res => {
                if (res.ok) {
                    setProducts(res.data.products);
                    setPagination(res.data.pagination);
                    setSelectedIds([]); 
                }
            })
            .catch(console.error);
    }, [page, limit, reload, sort, search]);

    //search
    const handleSearch = (e) => {
        e.preventDefault()
        setReload(prev => !prev)
    }

    //clear
    const handleClear = (e) =>{
        e.preventDefault();
         setSearch("");
    setSort("");
    setSearchParams({ page: 1, limit });

    }

    //change 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await changeMulti({selectedIds, bulkAction});
            setReload(prev => !prev)
            if(res.ok){
                toastSuccess(res.data.message)
            } else{
                toastError(res.data.message)
            }
        
        } catch (error) {
            console.error(error)
        }
    }



    const renderPages = () => {
        if (!pagination) return null;

        const { currentPage, totalPage } = pagination;

        let startPage = Math.max(
            1,
            currentPage - Math.floor(MAX_PAGE / 2)
        );

        let endPage = startPage + MAX_PAGE - 1;

        if (endPage > totalPage) {
            endPage = totalPage;
            startPage = Math.max(1, endPage - MAX_PAGE + 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <button
                    key={i}
                    disabled={i === currentPage}
                    onClick={() =>
                        setSearchParams({ page: i, limit })
                    }
                >
                    {i}
                </button>
            );
        }

        return pages;
    };

    return (
        <>  
            <div style={{ marginBottom: 12 }} className="create">
                    <Link to="/admin/products/create">Tạo Mới</Link>
            </div>
            <div className="header-admin-products">
                 {/* Create */}
                

                <h2 className="header-admin-products_left">Danh sách sản phẩm</h2>
                <div style={{ marginBottom: 12 }} className="header-admin-products_right">

                    <div className="header-admin-products_right-search">
                        <input placeholder="Tìm kiếm sản phẩm" name="search" onChange={e => setSearch(e.target.value)}/>
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
                        <SwapOutlined/>
                        <select
                            value={sort}
                            onChange={(e) => setSort(e.target.value)}
                        >
                            <option value=""> Sắp xếp theo </option>
                            <option value="title-asc">Sắp xếp theo tên A-Z</option>
                            <option value="title-desc">Sắp xếp theo tên Z-A</option>
                            <option value="price-asc">Sắp xếp theo giá thấp đến cao</option>
                            <option value="price-desc">Sắp xếp theo giá cao đến thấp</option>
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
                    {products.map(item => (

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
                    ))}
                </tbody>
            </table>

            {pagination && (
            <div className="pagination">
                {pagination.currentPage > 1 && (
                <button onClick={() => setSearchParams({ page: 1, limit })}>
                    Trang đầu
                </button>
                )}

                <button
                disabled={pagination.currentPage === 1}
                onClick={() =>
                    setSearchParams({ page: pagination.currentPage - 1, limit })
                }
                >
                ‹ Trước
                </button>

                {renderPages()}

                {pagination.currentPage < pagination.totalPage && (
                <button
                    disabled={pagination.currentPage === pagination.totalPage}
                    onClick={() =>
                        setSearchParams({ page: pagination.currentPage + 1, limit })
                    }
                    >
                    Sau ›
                </button>
                )}

                <button
                disabled={pagination.currentPage === pagination.totalPage}
                onClick={() =>
                    setSearchParams({ page: pagination.totalPage, limit })
                }
                >
                    Trang cuối
                </button>

                <select
                className="pagination-limit"
                value={limit}
                onChange={e =>
                    setSearchParams({ page: 1, limit: Number(e.target.value) })
                }
                >
                <option value={5}>5 / trang</option>
                <option value={10}>10 / trang</option>
                <option value={20}>20 / trang</option>
                </select>
            </div>
            )}

        </>
    );
}

export default AdminProducts;
