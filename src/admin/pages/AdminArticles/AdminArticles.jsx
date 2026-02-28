import { Link, useSearchParams } from "react-router-dom";
import "./AdminArticles.scss";
import { SearchOutlined } from "@ant-design/icons"
import { useState } from "react";
import { useEffect } from "react";
import { changeMulti, getListArticle, deleteArticle } from "../../../services/Admin/Articles.admin";
import { confirmation, toastError, toastSuccess } from "../../../utils/AlertFromSweetalert2";
import { renderpagination } from "../../../utils/Admin/paginaton";

function AdminArticles() {
    const [articles, setArticles] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [pagination, setPagination] = useState({});
    const [selectIds, setSelectIds] = useState([]);
    const [reload, setReload] = useState(false)
    const [sort, setSort] = useState("");
    const [typeChange, setTypeChange] = useState("")
    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 5;
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getListArticle({ page, limit, sort });
                if (res.ok) {
                    setArticles(res.result.articles)
                    setPagination(res.result.pagination)
                } else {
                    toastError(res.result.message)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchApi();
    }, [page, limit, reload, sort])

    const handleChangeMulti = async (e) => {
        e.preventDefault();
        try {
            const res = await changeMulti({ selectIds, typeChange });
            setSelectIds([])
            if (res.ok) {
                setReload(prev => !prev)
                toastSuccess(res.result.message)
            } else {
                toastError(res.result.message)
            }
        } catch (error) {
            console.error();
        }
    }

    const handleDelete = async (e, id) => {
        e.preventDefault();
        const result = await confirmation();
        if(!result.isConfirmed){
            return;
        }
        try {
            const res = await deleteArticle(id);
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

            <div className="header-admin-articles">
                <div className="header-admin-articles_left create">
                    <Link to="/admin/articles/create">Tạo Mới</Link>
                </div>

                <div style={{ marginBottom: 12 }} className="header-admin-articles_right">

                    <div className="header-admin-articles_right-search">
                        <input placeholder="Tìm kiếm sản phẩm" name="search" />
                        <button ><SearchOutlined /></button>
                    </div>

                    {/* Change multi */}
                    <div className="header-admin-articles_right-multi">
                        <select
                            value={typeChange}
                            onChange={e => setTypeChange(e.target.value)}
                        >
                            <option value="">-- Chọn hành động --</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="delete-all">Xóa bài viết</option>
                        </select>

                        <button
                            onClick={handleChangeMulti}
                        >
                            Áp dụng
                        </button>
                    </div>


                    {/* Sort */}
                    <div className="header-admin-articles_right-sort">
                        <select
                            value={sort}
                            onChange={e => setSort(e.target.value)}

                        >
                            <option value=""> -- Sắp xếp theo -- </option>
                            <option value="title-asc">Sắp xếp theo tên A-Z</option>
                            <option value="title-desc">Sắp xếp theo tên Z-A</option>
                            <option value="articleCategory-vouchers">Tin tức về vouchers</option>
                            <option value="articleCategory-news">Tin tức về news</option>
                            <option value="featured-yes">Tin tức nổi bậc</option>
                            <option value="featured-no">Tin tức không nổi bậc</option>
                        </select>

                    </div>

                    <div className="header-admin-articles_right-clear">
                        <button>Xóa lọc</button>
                    </div>


                </div>



            </div>


            <table className="admin-table">

                <thead>

                    <tr>
                        <th>
                            <input type="checkbox"
                                checked={
                                    articles.length > 0 && selectIds.length === articles.length
                                }
                                onChange={e => {
                                    if (e.target.checked) {
                                        setSelectIds(articles.map(item => item._id))
                                    } else {
                                        setSelectIds([])
                                    }
                                }}
                            />
                        </th>
                        <th>Thumbnail</th>
                        <th>Tiêu đề</th>
                        <th>Danh mục</th>
                        <th>Trạng thái</th>
                        <th>Nổi bật</th>
                        <th>Hành động</th>
                    </tr>
                </thead>

                <tbody>
                    {articles?.map(item => (
                        <tr key={item._id}>
                            <td className="col-checkbox">
                                <input
                                    type="checkbox"
                                    checked={selectIds.includes(item._id)}
                                    onChange={e => {
                                        if (e.target.checked) {
                                            setSelectIds(prev => [...prev, item._id])
                                        } else {
                                            setSelectIds(prev =>
                                                prev.filter(id => id !== item._id)
                                            )
                                        }
                                    }}
                                />
                            </td>

                            <td className="col-thumbnail">
                                <img src={item.thumbnail} alt={item.title} />
                            </td>

                            <td className="col-title">
                                {item.title}
                            </td>

                            <td>{item.articleCategory}</td>

                            <td>
                                <span className={`status ${item.status}`}>
                                    {item.status === "active" ? "Hoạt động" : "Không hoạt động"}
                                </span>
                            </td>

                            <td>
                                {item.featured === "yes" ? "Nổi bật" : "Không nổi bật"}
                            </td>

                            <td className="actions">
                                <Link to={`/admin/articles/detail/${item.slug}`} className="view">👁</Link>
                                <Link to={`/admin/articles/update/${item.slug}`} className="edit">✏️</Link>
                                <button className="delete" onClick={e => handleDelete(e, item._id)}>🗑</button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </table>
            {renderpagination(pagination, setSearchParams, limit)}


        </>
    );
}

export default AdminArticles;