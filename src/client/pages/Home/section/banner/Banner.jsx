import { Carousel, Skeleton } from 'antd';
import './Banner.scss';
import { getCategory } from '../../../../../services/Client/category';
import { useEffect, useState } from 'react';
import CategoryMenu from '../../../../../utils/client/buildTreeCategory';
import { useSliderNav } from "../../../../../context/client/sliderNavContext";

function Banner() {
  const [data, setData] = useState([]);
  const { navOpen, navRef } = useSliderNav();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const res = await getCategory();
        if (res.ok) {
          setData(res.result.category)
        } else {
          console.error(res.result.message)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchCategory();
  }, [])

  const renderSkeletonRows = (rows = 13) => {
  return Array.from({ length: rows }).map((_, index) => (
    <div key={index} style={{ marginBottom: 8 }}>
      <Skeleton.Input
        active
        block
        size="small"
        style={{ height: 36 }}
      />
    </div>
  ));
};


  return (
    <>
      <div className="slider">
        <div
          ref={navRef}
          className={`slider__nav ${navOpen ? "is-active" : ""}`}
        >
          {loading ? renderSkeletonRows() : CategoryMenu({ data })}
        </div>

        <div className="slider__content" >
          <div className="slider__main">
            <div className="slider__main-top">
              <Carousel
                autoplay={{ dotDuration: true }}
                autoplaySpeed={4000}
                arrows
                effect="fade"
              >
                <div className="banner-slide">
                  <img src="/img/banner2.png" alt="banner 2" />
                </div>
                <div className="banner-slide">
                  <img src="/img/banner12.png" alt="banner 4" />
                </div>
                <div className="banner-slide">
                  <img src="/img/banner3.avif" alt="banner 3" />
                </div>
                <div className="banner-slide">
                  <img src="/img/banner1.jpg" alt="banner 1" />
                </div>
              </Carousel>
            </div>

            <div className="slider__main-bottom">
              <div className="slider__banner">
                <img src="/img/banner7.png" alt="banner 2" />
              </div>
              <div className="slider__banner">
                <img src="/img/banner9.png" alt="banner 2" />
              </div>
            </div>
          </div>

          <div className="slider__side">
            <div className="slider__side-item">
              <img src="/img/banner5.jpg" alt="banner 2" />
            </div>
            <div className="slider__side-item">
              <img src="/img/banner6.jpg" alt="banner 2" />
            </div>
            <div className="slider__side-item">
              <img src="/img/banner8.jpg" alt="banner 2" />
            </div>
          </div>
        </div>
      </div>


    </>
  );
}

export default Banner;
