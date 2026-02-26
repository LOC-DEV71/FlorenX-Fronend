import { Link } from "react-router-dom"
import "./status.scss"
import { useState } from "react"
import { useEffect } from "react";
import { toastError } from "../../../../../utils/AlertFromSweetalert2";
import { getList } from "../../../../../services/Client/Aritcles/Articles.service";
function Status() {
    const [articleNews, setArticleNew] = useState([]);
    const [articleVouchers, setArticleVouchers] = useState([]);
    useEffect(() => {
        const fetchApi = async () => {
            try {
            const [newsRes, voucherRes] = await Promise.all([
                getList("news"),
                getList("vouchers")
            ]);

            if (newsRes.ok) setArticleNew(newsRes.result.articles);
            else toastError(newsRes.result.message);

            if (voucherRes.ok) setArticleVouchers(voucherRes.result.articles);
            else toastError(voucherRes.result.message);

            } catch (error) {
            console.error(error);
            }
        };

        fetchApi();
    }, []);
    return (
        <>
            <div className="status-wrap">

                {/* KHUYẾN MÃI */}
                <section className="status-section">
                    <div className="status-header">
                        <h2>Chuyên trang khuyến mãi</h2>
                        <Link>Xem tất cả</Link>
                    </div>

                    <div className="status-sale-grid">
                        {articleVouchers.length > 0 ? articleVouchers.map(item => (
                            <Link className="sale-item" key={item._id} to={`/articles/detail/${item.slug}`}>
                                <img src={item.thumbnail} alt={item.title} />
                            </Link>
                        )) : "Chưa có tin tức"}
                    </div>
                </section>

                {/* TIN TỨC */}
                <section className="status-section">
                    <div className="status-header">
                        <h2>Tin tức công nghệ</h2>
                        <Link>Xem tất cả</Link>
                    </div>

                    <div className="status-news-grid">
                        {articleNews.map(item => (
                            <Link className="news-item" to={`/articles/detail/${item.slug}`} key={item._id}>
                                <img src={item.thumbnail} />
                                <p>{item.description}</p>
                            </Link>
                        ))}
                        
                    </div>
                </section>

            </div>

        </>
    )
}

export default Status