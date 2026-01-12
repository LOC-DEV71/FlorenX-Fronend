import { Carousel } from 'antd';
import './Banner.scss';

function Banner() {
  return (
    <Carousel
      autoplay={{ dotDuration: true }}
      autoplaySpeed={4000}
      arrows
      effect="fade"
    >
      <div className="banner-slide">
        <img src="/img/banner2.jpg" alt="banner 2" />
      </div>
      <div className="banner-slide">
        <img src="/img/banner4.webp" alt="banner 4" />
      </div>
      <div className="banner-slide">
        <img src="/img/banner3.avif" alt="banner 3" />
      </div>
      <div className="banner-slide">
        <img src="/img/banner1.jpg" alt="banner 1" />
      </div>
    </Carousel>
  );
}

export default Banner;
