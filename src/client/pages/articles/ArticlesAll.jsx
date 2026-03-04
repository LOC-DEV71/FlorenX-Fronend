import "./ArticlesAll.scss";
import { getByLocation, getAllArticles } from "../../../services/Client/Aritcles/Articles.service";
import { useEffect, useState } from "react";
import { toastError } from "../../../utils/AlertFromSweetalert2";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function ArticlesAll() {
    const [articles, setArticles] = useState([]);
    const [allArticles, setAllArticles] = useState([]);
    const [articleBot, setArticleBot] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
        getByLocation({ category: "news", limit: 2 }),
        getByLocation({ category: "news", limit: 3, skip: 2 })
    ])
    .then(([newsRes, highlightRes]) => {

        if (newsRes.ok) {
            setArticles(newsRes.result.articles);
        } else {
            toastError(newsRes.result.message);
        }

        if (highlightRes.ok) {
            setArticleBot(highlightRes.result.articles)
        } else {
            toastError(highlightRes.result.message);
        }

    })
    .catch((error) => {
        console.error(error);
    })
    .finally(() => {
        setLoading(false);
    });
    }, []);

    useEffect(() => {
        const fetchApi = async () => {
            try {
                const res = await getAllArticles({ category: "news", limit: 5});
                if(res.ok){
                    setAllArticles(res.result.allArticles)
                } else {
                    toastError(res.result.message)
                }
            } catch (error) {
                console.error(error)
            }
        }
        fetchApi();
    }, [])

    const featuredArticle = articles.find(item => item.position === 1);
    const secondaryArticle = articles.find(item => item.position === 2);

    console.log(articles)

    const formatDateVN = (date) => {
        const d = new Date(date);
        return (
            d.toLocaleDateString("vi-VN") +
            " - " +
            d.toLocaleTimeString("vi-VN", {
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Asia/Ho_Chi_Minh",
            })
        );
    };
    return (
        <div className="articles">
            <div className="articles__header">
                <div className="routes-news"><Link to="/"><HomeOutlined /> Trang chủ</Link> / Tất cả tin tức công nghệ</div>
                <div className="banner-news">
                    <img src="/img/banner-news.png" alt="banner" />
                </div>
            </div>

            <div className="articles__container">

                <div className="articles__content">

                    <div className="articles__top">
                        {featuredArticle && (
                            <Link className="articles__top-featured" to={`/articles/detail/${featuredArticle.slug}`} key={featuredArticle._id}>
                                <img src={featuredArticle.thumbnail} alt={featuredArticle.title} />
                                <h2>{featuredArticle.title}</h2>
                            </Link>
                        )}

                        <div className="articles__top-side">
                            {secondaryArticle && (
                                <>
                                <Link className="articles__card" to={`/articles/detail/${secondaryArticle.slug}`} key={secondaryArticle._id}>
                                    <img src={secondaryArticle.thumbnail} alt={secondaryArticle.title} />
                                    <h3>{secondaryArticle.title}</h3>
                                   
                                </Link> 
                                <p>{secondaryArticle.description}</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="articles__bot">
                        {articleBot.map(item => (
                            <Link className="articles__bot-featured" to={`/articles/detail/${item.slug}`} key={item._id}>
                                <img src={item.thumbnail} alt={item.title} />
                                <h4>{item.title}</h4>
                            </Link>
                        ))}
                    </div>

                    <hr />
                    <div className="articles__list">
                        {allArticles.map(item => (
                            <Link className="articles__item"  to={`/articles/detail/${item.slug}`}>
                                <img src={item.thumbnail} alt={item.title} />
                                <div className="articles__des">
                                    <h4>{item.title}</h4>
                                    <span>Tạo ra lúc: {formatDateVN(item.createdAt)} - <span>Lâm Chí Lộc</span></span>
                                </div>
                            </Link>
                        ))}
                    </div>

                </div>

                {/* SIDEBAR */}
                <div className="articles__sidebar">
                    <h3>Bài viết nổi bật</h3>
                </div>

            </div>
        </div>
    );
}

export default ArticlesAll;