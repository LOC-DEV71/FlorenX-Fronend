import { Link } from "react-router-dom";
import "./Footer.scss";
import {
    FacebookOutlined
} from "@ant-design/icons"


function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top container">
        {/* Logo + desc */}
        <div className="footer__col">
          <h3 className="footer__logo">FlorenX</h3>
          <p className="footer__desc">
            Nền tảng thương mại điện tử công nghệ – laptop, PC & phụ kiện chính hãng.
          </p>
        </div>

        {/* Links */}
        <div className="footer__col">
          <h4 className="footer__title">Liên kết</h4>
          <ul>
            <li><Link to="/">Trang chủ</Link></li>
            <li><Link to="/products">Sản phẩm</Link></li>
            <li><Link to="/news">Tin tức</Link></li>
            <li><Link to="/contact">Liên hệ</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div className="footer__col">
          <h4 className="footer__title">Hỗ trợ</h4>
          <ul>
            <li>Chính sách bảo hành</li>
            <li>Hướng dẫn mua hàng</li>
            <li>Thanh toán & vận chuyển</li>
            <li>Điều khoản sử dụng</li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h4 className="footer__title">Liên hệ</h4>
          <p>Email: loclc8533@ut.edu.vn</p>
          <p>Hotline: 1900 9999</p>
          <div className="footer__social">
            <Link to={"https://www.facebook.com/MiyznKaori/"}>FB</Link>
            <Link to={"/"}>IG</Link>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        © {new Date().getFullYear()} FlorenX. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;