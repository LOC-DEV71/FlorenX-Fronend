import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getProductsInSlugAll } from "../../../../services/Client/products/productsInSlug";
import "./ProductsForCategory.scss";
import { Skeleton } from "antd";

function ProductsForCategory() {
    const { slug } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {   
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const res = await getProductsInSlugAll(slug);
                if (res.ok) {
                    setData(res.result.products || []);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [slug]);

    const renderSkeletonRows = (count = 8) => {
  return (
    <div className="product-grid">
      {Array.from({ length: count }).map((_, index) => (
        <div className="product-card skeleton-card" key={index}>
          {/* BADGE */}
          <Skeleton.Button
            active
            size="small"
            style={{
              width: 60,
              height: 20,
              position: "absolute",
              top: 12,
              left: 12,
              borderRadius: 6,
            }}
          />

          {/* IMAGE */}
          <div className="product-thumb">
            <Skeleton.Image
              active
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          {/* INFO */}
          <div className="product-info">
            <Skeleton
              active
              title={{ width: "90%" }}
              paragraph={false}
            />

            <div className="product-price-wrap">
              <div>
                <Skeleton.Input
                  active
                  size="small"
                  style={{ width: 70, marginBottom: 6 }}
                />
                <Skeleton.Input
                  active
                  size="small"
                  style={{ width: 100 }}
                />
              </div>

              <Skeleton.Input
                active
                size="small"
                style={{ width: 40, height: 22 }}
              />
            </div>

            <Skeleton.Input
              active
              size="small"
              style={{ width: 120 }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};


    return (
        <div className="category-page">
            {/* BREADCRUMB */}
            <div className="category-breadcrumb">
                <Link to="/">Trang chủ</Link>
                <span>/</span>
                <span>products / </span>
                <span className="active">{slug}</span>
            </div>

            {/* LAYOUT */}
            <div className="category-layout">
                {/* SIDEBAR */}
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

                {/* CONTENT */}
                <main className="category-content">
                    <div className="category-header">
                        <h2>{slug}</h2>
                        <select>
                            <option>Mặc định</option>
                            <option>Giá thấp → cao</option>
                            <option>Giá cao → thấp</option>
                        </select>
                    </div>

                    {loading ? (
                        renderSkeletonRows()
                    ) : data.length === 0 ? (
                        <div className="category-empty">
                            <img src="/img/no-data.png" alt=""/>
                        </div>
                    ) : (
                        <div className="product-grid">
                            {data.map((item) => (
                                <Link className="product-card" key={item._id} to={`/products/detail/${item.slug}`}>
                                    {/* BADGE */}
                                    {item.featured === "yes" && (
                                        <div className="product-badge">Nổi bật</div>
                                    )}

                                    {/* IMAGE */}
                                    <div className="product-thumb">
                                        <img
                                            src={item.thumbnail || "/img/no-image.png"}
                                            alt={item.title}
                                        />
                                    </div>

                                    {/* INFO */}
                                    <div className="product-info">
                                        <h3 className="product-title">{item.title}</h3>

                                        {/* PRICE */}
                                        <div className="product-price-wrap">
                                            <div className="price-left">
                                                <div className="price-old">
                                                    {item.price.toLocaleString("vi-VN")}đ
                                                </div>
                                                
                                                <div className="price-new">
                                                    {(item.price - (item.price*item.discountPercentage/100)).toLocaleString("vi-VN")}đ
                                                </div>
                                            </div>

                                            {item.discountPercentage > 0 && (
                                                <div className="price-discount">
                                                    -{item.discountPercentage}%
                                                </div>
                                            )}
                                        </div>

                                        {/* RATING */}
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

export default ProductsForCategory;
