import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Skeleton } from "antd";
import "./ProductDetail.scss";
import { getProductDetail, getProductsInSlugSimilar } from "../../../../services/Client/products/productsInSlug";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { addToCart } from "../../../../services/Client/AuthService/Cart.service";
import { toastSuccess } from "../../../../utils/AlertFromSweetalert2";

function ProductDetail() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [currentThumbnail, setCurrentThumbnail] = useState("");
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        const res = await getProductDetail(slug);
        if (res.ok) {
          setProduct(res.result.product);
          setCurrentThumbnail(res.result.product.thumbnail);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [slug]);

  useEffect(() => {
    if (!product?.product_category_id) return;
    const fetchSimilar = async () => {
      try {
        const res = await getProductsInSlugSimilar(product?.product_category_id);
        if (res.ok) {
          setData(res.result.products);
        }
      } catch (err) {
        console.error(err);
      } 
    };

    fetchSimilar();
  }, [product?.product_category_id]);

  if (loading) {
    return (
      <div className="product-detail-page">
        <div className="breadcrumb">
          <Skeleton.Input active size="small" style={{ width: 200 }} />
        </div>

        <div className="product-main">
          <div className="product-gallery">
            <Skeleton.Image
              active
              style={{ width: 650, height: 420, borderRadius: 12 }}
            />

            <div className="thumbs">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton.Image
                  key={i}
                  active
                  style={{ width: 80, height: 80, borderRadius: 8 }}
                />
              ))}
            </div>
          </div>

          <div className="product-info">
            <Skeleton
              active
              title={{ width: "80%" }}
              paragraph={{ rows: 1 }}
            />

            <Skeleton.Input active size="small" style={{ width: 160 }} />

            <div style={{ margin: "20px 0" }}>
              <Skeleton.Input active size="small" style={{ width: 140 }} />
            </div>

            <Skeleton paragraph={{ rows: 5 }} active />

            <div className="actions">
              <Skeleton.Button active style={{ width: "100%", height: 48 }} />
              <Skeleton.Button active style={{ width: "100%", height: 48 }} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: false,

    responsive: [
      { breakpoint: 1400, settings: { slidesToShow: 4 } },
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 2 } },
    ],
  };

  if (!product) return null;

  const {
    title,
    description,
    price,
    discountPercentage,
    thumbnail,
    images = [],
    evaluate = [],
    featured,
    specs = []
  } = product;

  const priceOld =
    discountPercentage > 0
      ? Math.round(price / (1 - discountPercentage / 100))
      : null;


  const renderSkeletonRows = (rows = 5) => {
    return Array.from({ length: rows }).map((_, index) => (
      <div key={index}>
        <div className="products_main-item">

          <Skeleton.Button
            active
            size="small"
            style={{
              width: 70,
              height: 22,
              position: "absolute",
              top: 10,
              left: 10,
              borderRadius: 6
            }}
          />

          <div className="products_main-item-img">
            <Skeleton.Input
              active
              style={{ width: "100%", height: "100%" }}
            />
          </div>

          <div className="products_main-item-content">
            <Skeleton
              active
              title={{ width: "90%" }}
              paragraph={false}
            />

            <div className="products_main-item-content-price">
              <div>
                <Skeleton.Input active size="small" style={{ width: 80 }} />
                <br />
                <Skeleton.Input active size="small" style={{ width: 100 }} />
              </div>

              <Skeleton.Input
                active
                size="small"
                style={{ width: 42, height: 24 }}
              />
            </div>

            <Skeleton.Input active size="small" style={{ width: 120 }} />
          </div>
        </div>
      </div>
    ));
  };


  const handleAddToCart = async (e) => {
    e.preventDefault();
    try {
      const res = await addToCart(product._id);
      if(res.ok){
        toastSuccess(res.result.message)
      }
    } catch (error) {
      
    }
  }  


  return (
    <div className="product-detail-page">
      <div className="breadcrumb">
        <Link to="/">Trang chủ</Link> / <span>{title}</span>
      </div>

      <div className="product-main">
        {/* LEFT */}
        <div className="product-gallery">
          {featured === "yes" && <div className="badge">Nổi bật</div>}

          <div className="main-image">
            <img src={currentThumbnail} alt={title} />
          </div>

          <div className="thumbs">
            <img
              src={thumbnail}
              alt="thumb"
              className={currentThumbnail === thumbnail ? "active" : ""}
              onClick={() => setCurrentThumbnail(thumbnail)}
            />

            {images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                className={currentThumbnail === img ? "active" : ""}
                onClick={() => setCurrentThumbnail(img)}
              />
            ))}
          </div>
        </div>

        <div className="product-info">
          <h1>{title}</h1>

          <div className="rating">
            ⭐⭐⭐⭐⭐ <span>({evaluate.length} đánh giá)</span>
          </div>

          <div className="price">
            <span className="new">{(price - (price * discountPercentage / 100)).toLocaleString()}₫</span>

            {priceOld && (
              <span className="old">{price.toLocaleString()}₫</span>
            )}

            {discountPercentage > 0 && (
              <span className="discount">-{discountPercentage}%</span>
            )}
          </div>

          {product.specs && (
            <div className="specs">
              <h3>ĐIỂM NỔI BẬC</h3>

              <table className="specs-table">
                <tbody>
                  {Object.entries(product.specs).map(([key, value]) => (
                    <tr key={key}>
                      <th>{key}</th>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}



          <div className="actions">
            <button className="buy">Mua ngay</button>
            <button className="cart" onClick={handleAddToCart}>Thêm vào giỏ</button>
          </div>

          <div className="services">
            <span>🚚 Giao hàng miễn phí</span>
            <span>🛡 Bảo hành chính hãng</span>
            <span>↩ Đổi trả dễ dàng</span>
          </div>
        </div>
      </div>

      <div className="product-tabs">
        <div
          className={`tab ${activeTab === "description" ? "active" : ""}`}
          onClick={() => setActiveTab("description")}
        >
          Mô tả
        </div>

        <div
          className={`tab ${activeTab === "review" ? "active" : ""}`}
          onClick={() => setActiveTab("review")}
        >
          Đánh giá ({evaluate.length})
        </div>
      </div>

      <div className="product-tab-content">
        {activeTab === "description" && (
          <div
            className="tab-description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        )}

        {activeTab === "review" && (
          <div className="tab-review">
            {evaluate.length === 0 ? (
              <div>
                <h3>Đánh giá sản phẩm {title}</h3>
                <p className="empty-review">
                  Chưa có đánh giá nào cho sản phẩm này.
                </p>
              </div>
            ) : (
              evaluate.map((item, index) => (
                <div className="review-item" key={index}>
                  <strong>{item.user_name || "Người dùng"}</strong>
                  <div>⭐ {item.rating || 5}</div>
                  <p>{item.comment || "Không có nội dung"}</p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
      <div className="similar">
        <h3>SẢN PHẨM TƯƠNG TỰ</h3>
        <Slider {...settings} className="products_main">
          {loading
            ? renderSkeletonRows(5)
            : data.map(item => (
              <div key={item?._id}>
                <Link className="products_main-item" to={`/products/detail/${item?.slug}`}>

                  <span className="products_badge">Nổi bật</span>

                  <div className="products_main-item-img">
                    <img src={item?.thumbnail} alt={item?.title} />
                  </div>

                  <div className="products_main-item-content">
                    <div className="products_main-item-content-title">
                      <h3>{item?.title}</h3>
                    </div>

                    <div className="products_main-item-content-price">
                      <div className="products_main-item-content-price-left">
                        <span className="price-old">
                          {item?.price.toLocaleString("vi-VN")}₫
                        </span><br />
                        <span className="price-new">
                          {(item?.price - (item?.price * item?.discountPercentage / 100)).toLocaleString("vi-VN")}₫
                        </span>
                      </div>

                      <div className="products_main-item-content-price-right">
                        <span>-{item?.discountPercentage}%</span>
                      </div>
                    </div>

                    <div className="products_main-item-content-evaluate">
                      0.0 (0 đánh giá)
                    </div>
                  </div>
                </Link>
              </div>
            ))
          }
        </Slider>
      </div>
    </div>
  );
}

export default ProductDetail;
