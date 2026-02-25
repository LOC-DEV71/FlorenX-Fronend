import { useEffect, useState } from "react";
import "./search.scss";
import { Link, useNavigate } from "react-router-dom";
import { searchClient } from "../../../services/Client/searchClient/search.client";

function Search({ onClose }) {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // debounce search
  useEffect(() => {
    if (!search.trim()) {
      setData([]);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const res = await searchClient(search);
        if (res.ok) {
          setData(res.result.data || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const handleSubmit = () => {
    if (!search.trim()) return;
    navigate(`/search?search=${encodeURIComponent(search)}`);
    onClose();
  };

  return (
    <div className="search_modal">
      <div className="search_overlay" onClick={onClose} />

      <div className="search_box">
        <div className="search_form">
          <input
            autoFocus
            type="text"
            placeholder="Tìm laptop, PC, linh kiện..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          />

          {search && (
            <button
              className="clear_btn"
              type="button"
              onClick={() => setSearch("")}
              aria-label="Clear"
            >
              ×
            </button>
          )}

          <button
            className="submit_btn"
            type="button"
            onClick={handleSubmit}
          >
            Tìm
          </button>
        </div>

        <div className="search_result">
          {loading && <p className="title">Đang tìm kiếm…</p>}

          {!loading && data.length > 0 && (
            <>
              {data.map((item) => {
                const discount = item.discountPercentage || 0;
                const price = item.price || 0;
                const finalPrice = discount
                  ? price - (price * discount) / 100
                  : price;

                return (
                  <Link
                    key={item._id}
                    className="item_product"
                    to={`/products/detail/${item.slug}`}
                    onClick={onClose}
                  >
                    <img src={item.thumbnail} alt={item.title} />

                    <div className="info">
                      <p className="title">{item.title}</p>

                      <div className="price_box">
                        <span className="price_sale">
                          {finalPrice.toLocaleString("vi-VN")}đ
                        </span>

                        {discount > 0 && (
                          <>
                            <span className="price_origin">
                              {price.toLocaleString("vi-VN")}đ
                            </span>
                            <span className="discount_badge">
                              -{discount}%
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </>
          )}

          {!loading && search && data.length === 0 && (
            <p className="title">Không tìm thấy sản phẩm</p>
          )}

          {!search && (
            <>
              <p className="title">Gợi ý</p>
              <div className="item" onClick={() => setSearch("Laptop gaming")}>
                Laptop gaming
              </div>
              <div className="item" onClick={() => setSearch("PC gaming")}>
                PC gaming
              </div>
              <div className="item" onClick={() => setSearch("Màn hình Asus")}>
                Màn hình Asus
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;