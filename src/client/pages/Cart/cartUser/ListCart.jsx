import { useEffect, useState } from "react";
import "./ListCart.scss";
import {
  changeQuantity,
  deleteProductsInCart,
  getCart,
  addVoucher
} from "../../../../services/Client/AuthService/Cart.service";
import { Link, useNavigate } from "react-router-dom";
import {
  TruckOutlined,
  DeleteOutlined,
  SafetyCertificateOutlined
} from "@ant-design/icons";
import { getVoucher } from "../../../../services/Client/AuthService/voucher.service";

function ListCart() {
  const navigate = useNavigate();

  // ===== STATE =====
  const [cart, setCart] = useState([]);
  const [voucher, setVoucher] = useState([]);
  const [cartVoucherId, setCartVoucherId] = useState(null);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [refresh, setRefresh] = useState(false);

  // ===== FETCH CART =====
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await getCart();
        if (res.ok) {
          setCart(res.result.products || []);
          setCartVoucherId(res.result.voucher_id || null);
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchCart();
  }, [refresh]);

  // ===== FETCH VOUCHERS =====
  useEffect(() => {
    const fetchVoucher = async () => {
      try {
        const res = await getVoucher();
        if (res.ok) setVoucher(res.result.vouchers || []);
      } catch (e) {
        console.error(e);
      }
    };
    fetchVoucher();
  }, []);

  // ===== SYNC ACTIVE THEO cart.voucher_id =====
  useEffect(() => {
    if (!cartVoucherId) {
      setSelectedVoucher(null);
      return;
    }
    const found = voucher.find(v => v._id === cartVoucherId);
    setSelectedVoucher(found || null);
  }, [cartVoucherId, voucher]);

  // ===== TÍNH GIÁ =====
  const totalPrice = cart.reduce(
    (sum, item) =>
      sum +
      (item.price - (item.price * item.discountPercentage) / 100) *
        (item.quantity || 1),
    0
  );

  const getVoucherStatus = (item) => {
    const now = new Date();
    const start = new Date(item.start_date);
    const end = new Date(item.end_date);

    if (now < start) return "upcoming";
    if (now > end) return "expired";
    if (totalPrice < item.min_order_value) return "min_not_reached";
    return "valid";
  };

  const getDiscountAmount = (v) => {
    if (!v) return 0;
    let discount =
      v.type === "percent"
        ? totalPrice * (v.value / 100)
        : v.value;

    if (v.type === "percent" && v.max_discount) {
      discount = Math.min(discount, v.max_discount);
    }
    return Math.min(discount, totalPrice);
  };

  const discountAmount = selectedVoucher
    ? getDiscountAmount(selectedVoucher)
    : 0;

  const finalPrice = totalPrice - discountAmount;

  const handleChangeQuantity = async (productId, delta) => {
    const cur = cart.find(i => i.product_id === productId);
    if (!cur) return;
    const value = Math.max(1, cur.quantity + delta);

    setCart(prev =>
      prev.map(i =>
        i.product_id === productId ? { ...i, quantity: value } : i
      )
    );

    try {
      await changeQuantity({ productId, value });
    } catch (e) {
      console.error(e);
    }
  };

  const handleRemove = async (product_id) => {
    try {
      const res = await deleteProductsInCart(product_id);
      if (res.ok) setRefresh(p => !p);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChooseVoucher = async (item, status, active) => {
    if (status !== "valid") return;

    try {
      if (active) {
        await addVoucher(null);    
        setCartVoucherId(null);      
      } else {
        await addVoucher(item._id);  
        setCartVoucherId(item._id);  
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="cart">
      <div className="cart__container">
        {/* LEFT */}
        <div className="cart__left">
          <h2 className="cart__title">Giỏ hàng của bạn</h2>

          {cart.map(item => (
            <div className="cart-item" key={item.product_id}>
              <Link
                to={`/products/detail/${item.slug}`}
                className="cart-item__link"
              >
                <img
                  className="cart-item__thumb"
                  src={item.thumbnail}
                  alt={item.title}
                />
                <div className="cart-item__info">
                  <h3 className="cart-item__name">{item.title}</h3>
                  <p className="cart-item__meta">
                    <SafetyCertificateOutlined /> Hàng chính hãng
                  </p>
                  <span className="cart-item__price-old">
                    {item.price.toLocaleString("vi-VN")}₫
                  </span>
                  <span className="cart-item__price">
                    {(
                      item.price -
                      (item.price * item.discountPercentage) / 100
                    ).toLocaleString("vi-VN")}
                    ₫
                  </span>
                </div>
              </Link>

              <div className="cart-item__qty">
                <button onClick={() => handleChangeQuantity(item.product_id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => handleChangeQuantity(item.product_id, 1)}>+</button>
              </div>

              <button
                className="cart-item__remove"
                onClick={() => handleRemove(item.product_id)}
              >
                <DeleteOutlined />
              </button>
            </div>
          ))}

          <div className="cart__note">
            <span><TruckOutlined /> Miễn phí giao hàng nhanh</span>
            <Link to="/">Tiếp tục mua sắm</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="cart__right">
          <div className="summary">
            <h3 className="summary__title">TÓM TẮT ĐƠN HÀNG</h3>

            <div className="summary__row">
              <span>Tạm tính</span>
              <span>{totalPrice.toLocaleString("vi-VN")}₫</span>
            </div>

            <div className="summary__row">
              <span>Phí vận chuyển</span>
              <span className="free">MIỄN PHÍ</span>
            </div>

            <div className="summary__row total">
              <span>Tổng cộng</span>
              <span>{finalPrice.toLocaleString("vi-VN")}₫</span>
            </div>

            <div className="summary__promo">
              <h4 className="promo__title">Chọn mã giảm giá</h4>

              <div className="promo__list">
                {voucher.map(item => {
                  const status = getVoucherStatus(item);
                  const active = selectedVoucher?._id === item._id;

                  return (
                    <div
                      key={item._id}
                      className={`promo__item ${active ? "active" : ""} ${status !== "valid" ? "disabled" : ""}`}
                      onClick={() => handleChooseVoucher(item, status, active)}
                    >
                      <div className="promo__left">
                        <div className="promo__code">{item.code}</div>
                        <div className="promo__desc">
                          Giảm {item.type === "percent" ? `${item.value}%` : `${item.value.toLocaleString("vi-VN")}₫`}
                          {item.max_discount && (
                            <span> (tối đa {item.max_discount.toLocaleString("vi-VN")}₫)</span>
                          )}
                        </div>
                        {item.min_order_value && (
                          <div className="promo__time">
                            Đơn tối thiểu {item.min_order_value.toLocaleString("vi-VN")}₫
                          </div>
                        )}
                      </div>

                      <div className="promo__right">
                        {status === "expired" && <span className="promo__expired">Hết hạn</span>}
                        {status === "upcoming" && <span className="promo__upcoming">Chưa tới ngày</span>}
                        {status === "min_not_reached" && <span className="promo__min">Chưa đủ điều kiện</span>}
                        {status === "valid" && active && <span className="promo__chosen">Đã chọn</span>}
                        {status === "valid" && !active && <span className="promo__select">Chọn</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <button
              className="summary__checkout"
              onClick={() => navigate("/checkout")}
            >
              Tiến hành thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListCart;
