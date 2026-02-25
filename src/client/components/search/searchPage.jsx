import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import "./SearchPage.scss"; 
import { Skeleton } from "antd";
import { searchClient } from "../../../services/Client/searchClient/search.client";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("search") || "";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!keyword.trim()) {
      setData([]);
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await searchClient(keyword);
        if (res.ok) {
          setData(res.result.data || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [keyword]);

  return (
    <div className="category-page">
      <div className="category-breadcrumb">
        <Link to="/">Trang chủ</Link>
        <span>/</span>
        <span className="active">Tìm kiếm: “{keyword}”</span>
      </div>

      <div className="category-layout">
        <aside className="category-sidebar">
          <h3>Bộ lọc</h3>

          <div className="filter-block">
            <h4>Khoảng giá</h4>
            <label><input type="checkbox" /> Dưới 10 triệu</label>
            <label><input type="checkbox" /> 10 – 15 triệu</label>
            <label><input type="checkbox" /> Trên 15 triệu</label>
          </div>

          <div className="filter-block">
            <h4>Thương hiệu</h4>
            <label><input type="checkbox" /> Dell</label>
            <label><input type="checkbox" /> HP</label>
            <label><input type="checkbox" /> Asus</label>
          </div>
        </aside>

        <main className="category-content">
          <div className="category-header">
            <h2>Kết quả cho “{keyword}”</h2>
            <select>
              <option>Mặc định</option>
              <option>Giá thấp → cao</option>
              <option>Giá cao → thấp</option>
            </select>
          </div>

          {loading ? (
            <div className="product-grid">
              {Array.from({ length: 8 }).map((_, i) => (
                <div className="product-card skeleton-card" key={i} />
              ))}
            </div>
          ) : data.length === 0 ? (
            <div className="category-empty">
              <img src="/img/no-data.png" alt="" />
              <p>Không tìm thấy sản phẩm phù hợp</p>
            </div>
          ) : (
            <div className="product-grid">
              {data.map((item) => (
                <Link
                  className="product-card"
                  key={item._id}
                  to={`/products/detail/${item.slug}`}
                >
                  {item.featured === "yes" && (
                    <div className="product-badge">Nổi bật</div>
                  )}

                  <div className="product-thumb">
                    <img
                      src={item.thumbnail || "/img/no-image.png"}
                      alt={item.title}
                    />
                  </div>

                  <div className="product-info">
                    <h3 className="product-title">{item.title}</h3>

                    <div className="product-price-wrap">
                      <div>
                        {item.discountPercentage > 0 && (
                          <div className="price-old">
                            {item.price.toLocaleString("vi-VN")}đ
                          </div>
                        )}
                        <div className="price-new">
                          {(item.price -
                            (item.price * item.discountPercentage) / 100
                          ).toLocaleString("vi-VN")}đ
                        </div>
                      </div>

                      {item.discountPercentage > 0 && (
                        <div className="price-discount">
                          -{item.discountPercentage}%
                        </div>
                      )}
                    </div>

                    <div className="product-evaluate">
                      {item.evaluate || 0} (0 đánh giá)
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default SearchPage;