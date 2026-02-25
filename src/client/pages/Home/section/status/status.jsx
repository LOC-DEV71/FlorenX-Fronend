import { Link } from "react-router-dom"
import "./status.scss"
import { useState } from "react"
import { useEffect } from "react";
import { toastError } from "../../../../../utils/AlertFromSweetalert2";
import { getList } from "../../../../../services/Client/Aritcles/Articles.service";
function Status() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getList();
                if(res.ok){
                    
                    setArticles(res.result.articles)
                } else{
                    toastError(res.result.message)
                }

            } catch (error) {
                console.error(error)
            }
        }
        fetchApi();
    }, [])
    console.log(articles)
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
                        <Link className="sale-item">
                            <img src="/img/banner2.png" />
                        </Link>
                        <Link className="sale-item">
                            <img src="/img/banner2.png" />
                        </Link>
                        <Link className="sale-item">
                            <img src="/img/banner2.png" />
                        </Link>
                        <Link className="sale-item">
                            <img src="/img/banner2.png" />
                        </Link>
                    </div>
                </section>

                {/* TIN TỨC */}
                <section className="status-section">
                    <div className="status-header">
                        <h2>Tin tức công nghệ</h2>
                        <Link>Xem tất cả</Link>
                    </div>

                    <div className="status-news-grid">
                        {articles.map(item => (
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