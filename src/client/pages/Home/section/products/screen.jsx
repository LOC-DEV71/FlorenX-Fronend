import Slider from "react-slick";
import { TruckOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import "./products.scss";
import { Skeleton } from "antd";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect, useState } from "react";
import { getProductsInSlug } from "../../../../../services/Client/products/productsInSlug";

function Screen() {
    const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await getProductsInSlug("man-hinh");
        if (res.ok) {
          setData(res.result.products);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);
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
  

  return (
    <div className="bg">
      <div className="products">
        {/* TOP */}
        <div className="products_top">
          <h3 className="products_top-title">
            MÀN HÌNH NỔI BẬC | <TruckOutlined /> GIAO HÀNG TẬN NƠI |  TRẢ GÓP 0%
          </h3>

          <ul className="products_top-category">
            <li><Link>PC I3</Link></li>
            <li><Link>PC I5</Link></li>
            <li><Link>PC I7</Link></li>
            <li><Link>PC AMD</Link></li>
            <Link className="products_top-all">Xem tất cả</Link>
          </ul>
        </div>

        {/* SLIDER */}
        <Slider {...settings} className="products_main">
          {loading ? 
            renderSkeletonRows(5) :
            [...data]
            .map((item) => (
              <div key={item._id}>
                <Link className="products_main-item" to={`/products/detail/${item.slug}`}>

                  <span className="products_badge">Nổi bật</span>


                  <div className="products_main-item-img">
                    <img src={item.thumbnail} alt={item.title} />
                  </div>

                  <div className="products_main-item-content">
                    <div className="products_main-item-content-title">
                      <h3>{item.title}</h3>
                    </div>

                    <div className="products_main-item-content-price">
                      <div className="products_main-item-content-price-left">
                        <span className="price-old">
                          {item.price.toLocaleString("vi-VN")}₫
                        </span><br />
                        <span className="price-new">
                          {(item.price - (item.price * item.discountPercentage / 100)).toLocaleString("vi-VN")}₫
                        </span>
                      </div>

                      <div className="products_main-item-content-price-right">
                        <span>-{item.discountPercentage}%</span>
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

export default Screen;
