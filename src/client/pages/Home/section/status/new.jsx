import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDetailArticles } from "../../../../../services/Client/Aritcles/Articles.service";
import { toastError } from "../../../../../utils/AlertFromSweetalert2";
import "./ArticlesDetail.scss";

function ArticlesDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApi = async () => {
      try {
        setLoading(true);
        const res = await getDetailArticles(slug);
        if (res.ok) {
          setArticle(res.result.article);
        } else {
          toastError(res.result.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, [slug]);

  if (loading) {
    return <div className="article-loading">Đang tải bài viết...</div>;
  }

  if (!article) return null;

  return (
    <div className="article-detail">
      <div className="article-top">
        <img alt="" src="/img/banner11.png" />
      </div>
      <div className="article-wrapper">

        <Link to="/news" className="article-back">
          ← Quay lại tin tức
        </Link>

        <h1 className="article-title">{article.title}</h1>

        <div className="article-meta">
          <span>
            {new Date(article.createdAt).toLocaleDateString("vi-VN")}
          </span>
        </div>

        {article.thumbnail && (
          <div className="article-thumbnail">
            <img src={article.thumbnail} alt={article.title} />
          </div>
        )}

        {article.description && (
          <p className="article-description">{article.description}</p>
        )}

        <div
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </div>
    </div>
  );
}

export default ArticlesDetail;