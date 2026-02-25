import { Link } from "react-router-dom";
import "./Header.scss";
import {
  SearchOutlined,
  EnvironmentOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  FileSearchOutlined,
  BarcodeOutlined,
  GiftOutlined
} from "@ant-design/icons";
import ModalUser from "./user";
import { useSliderNav } from "../../../context/client/sliderNavContext";
import { useState } from "react";
import Search from "../search/search";

function Header() {
  const { toggleNav } = useSliderNav();
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <>
      <div className="header">
        <div className="left">
          <Link to="/" className="header_logo">
            <img src="/logo/florenx-dark.png" />
          </Link>

          <div className="header_category" onClick={toggleNav}>
            <MenuOutlined />
            <p>Danh Mục</p>
          </div>
        </div>

        <div className="header_page">
          <Link className="home" to="/">TRANG CHỦ</Link>
          <Link className="showroom">SHOWROOM</Link>
          <Link className="news">BÀI VIẾT</Link>
          <Link className="suport">HỖ TRỢ</Link>
        </div>

        <div className="header_function">
          <SearchOutlined onClick={() => setOpenSearch(true)} />
          <EnvironmentOutlined />
          <Link to="/cart">
            <ShoppingCartOutlined />
          </Link>
          <ModalUser />
        </div>
      </div>

      <div className="header_bot">
        <Link><FileSearchOutlined /> Tin tức công nghệ</Link>
        <Link><BarcodeOutlined /> Khuyến mãi</Link>
        <Link><FileSearchOutlined /> Bảo hành</Link>
        <Link><GiftOutlined /> PC tặng màn hình</Link>
      </div>

      {openSearch && <Search onClose={() => setOpenSearch(false)} />}
    </>
  );
}

export default Header;