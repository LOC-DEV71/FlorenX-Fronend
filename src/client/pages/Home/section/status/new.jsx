import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getDetailArticles,
  getList
} from "../../../../../services/Client/Aritcles/Articles.service";
import { toastError } from "../../../../../utils/AlertFromSweetalert2";
import "./ArticlesDetail.scss";

function ArticlesDetail() {
  const { slug } = useParams();

  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await getDetailArticles(slug);
        if (res.ok) setArticle(res.result.article);
        else toastError(res.result.message);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [slug]);

  useEffect(() => {
    if (!article?.articleCategory) return;

    const fetchRelated = async () => {
      try {
        const res = await getList(article.articleCategory);
        if (res.ok) setRelatedArticles(res.result.articles);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRelated();
  }, [article]);

  if (loading) return <div className="article-loading">Đang tải...</div>;
  if (!article) return null;

  return (
    <div className="article-detail">

      {/* HERO */}
      <div className="article-hero">
  <img src="/img/banner11.png" alt="banner" className="hero-bg" />

  <div className="hero-overlay">
    <div className="hero-inner">
      <span className="hero-category">TIN TỨC</span>
      <h1>{article.title}</h1>
      <div className="hero-meta">
        {new Date(article.createdAt).toLocaleDateString("vi-VN")}
      </div>
    </div>
  </div>
</div>

      {/* BODY */}
      <div className="article-container">

        {/* LEFT */}
        <div className="article-content">
          {article.description && (
            <div className="article-description">
              {article.description}
            </div>
          )}

          {article.thumbnail && (
            <img
              className="article-main-img"
              src={article.thumbnail}
              alt={article.title}
            />
          )}

          <div
            className="article-html"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="article-sidebar">

          <div className="sidebar-box">
            <h3>Tin liên quan</h3>
            {relatedArticles.slice(0, 4).map(item => (
              <Link
                key={item._id}
                to={`/articles/detail/${item.slug}`}
                className="related-item"
              >
                <div className="thumb">
                  <img src={item.thumbnail} alt={item.title} />
                </div>
                <div className="info">
                  <p>{item.title}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="sidebar-newsletter">
            <h4>Đăng ký nhận tin</h4>
            <p>Nhận thông báo bài viết mới mỗi tuần.</p>
            <input type="email" placeholder="Email của bạn" />
            <button>Đăng ký ngay</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default ArticlesDetail;