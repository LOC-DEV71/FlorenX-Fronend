import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./checkout.scss";
import { SafetyCertificateOutlined } from "@ant-design/icons";

import { getCart } from "../../../../services/Client/AuthService/Cart.service";
import { getVoucher } from "../../../../services/Client/AuthService/voucher.service";
import { order } from "../../../../services/Client/AuthService/Checkout.service";
import { toastError, toastSuccess } from "../../../../utils/AlertFromSweetalert2";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [voucherList, setVoucherList] = useState([]);
  const [voucherId, setVoucherId] = useState(null);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ordering, setOrdering] = useState(false);

  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: ""
  });

  // ===== FETCH DATA =====
  useEffect(() => {
    const fetchData = async () => {
      try {
        const cartRes = await getCart();
        if (cartRes.ok) {
          setCart(cartRes.result.products || []);

          // ✅ FIX: chặn "null" string
          const vId = cartRes.result.voucher_id;
          setVoucherId(vId && vId !== "null" ? vId : null);
        }

        const voucherRes = await getVoucher();
        if (voucherRes.ok) {
          setVoucherList(voucherRes.result.vouchers || []);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ===== FIND SELECTED VOUCHER =====
  useEffect(() => {
    if (!voucherId) {
      setSelectedVoucher(null);
      return;
    }
    const found = voucherList.find(v => v._id === voucherId);
    setSelectedVoucher(found || null);
  }, [voucherId, voucherList]);

  if (loading) return <div className="checkout">Đang tải...</div>;
  if (!cart.length) return <div className="checkout">Giỏ hàng trống</div>;

  // ===== PRICE =====
  const totalPrice = cart.reduce(
    (sum, item) =>
      sum +
      (item.price - (item.price * item.discountPercentage) / 100) *
        item.quantity,
    0
  );

  const getDiscountAmount = (voucher) => {
    if (!voucher) return 0;
    let discount =
      voucher.type === "percent"
        ? totalPrice * (voucher.value / 100)
        : voucher.value;

    if (voucher.max_discount) {
      discount = Math.min(discount, voucher.max_discount);
    }
    return Math.min(discount, totalPrice);
  };

  const discountAmount = selectedVoucher
    ? getDiscountAmount(selectedVoucher)
    : 0;

  const finalPrice = totalPrice - discountAmount;

  const handleChangeShipping = (e) => {
    setShipping({ ...shipping, [e.target.name]: e.target.value });
  };

  const buildOrderItems = () =>
    cart.map(item => ({
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
      discountPercentage: item.discountPercentage,
      thumbnail: item.thumbnail,
      slug: item.slug
    }));

  // ===== ORDER =====
  const handleOrder = async () => {
    if (!shipping.fullName || !shipping.phone || !shipping.address) {
      toastError("Vui lòng nhập đầy đủ thông tin giao hàng");
      return;
    }

    try {
      setOrdering(true);

      const payload = {
        fullName: shipping.fullName,
        phone: shipping.phone,
        address: shipping.address,
        items: buildOrderItems(),
        payment_method: "cod"
      };

      // ✅ CHỈ GỬI voucher_id KHI CÓ
      if (voucherId) {
        payload.voucher_id = voucherId;
      }

      const res = await order(payload);

      if (res.ok) {
        setCart([]);
        setVoucherId(null);
        setSelectedVoucher(null);
        toastSuccess("Đặt hàng thành công");
      } else {
        toastError(res.result.message || "Đặt hàng thất bại");
      }
    } catch (err) {
      console.error(err);
      toastError("Có lỗi xảy ra");
    } finally {
      setOrdering(false);
    }
  };

  return (
    <div className="checkout">
      <div className="checkout__container">
        {/* LEFT */}
        <div className="checkout__left">
          <div className="card">
            <h2>Thông tin giao hàng</h2>
            <input name="fullName" placeholder="Họ và tên" value={shipping.fullName} onChange={handleChangeShipping} />
            <input name="phone" placeholder="Số điện thoại" value={shipping.phone} onChange={handleChangeShipping} />
            <input name="address" placeholder="Địa chỉ chi tiết" value={shipping.address} onChange={handleChangeShipping} />
          </div>

          <div className="card">
            <h2>Phương thức thanh toán</h2>
            <label className="radio">
              <input type="radio" defaultChecked />
              <span>Thanh toán khi nhận hàng (COD)</span>
            </label>
          </div>

          <div className="card">
            <h2>Sản phẩm</h2>
            {cart.map(item => (
              <div className="item" key={item.product_id}>
                <div className="item__left">
                  <img src={item.thumbnail} alt={item.title} />
                  <div className="item__info">
                    <div className="item__name">{item.title}</div>
                    <div className="item__meta">
                      <SafetyCertificateOutlined /> Hàng chính hãng
                    </div>
                    <div className="item__qty">SL: {item.quantity}</div>
                  </div>
                </div>
                <div className="item__price">
                  {(
                    (item.price -
                      (item.price * item.discountPercentage) / 100) *
                    item.quantity
                  ).toLocaleString("vi-VN")}₫
                </div>
              </div>
            ))}
            <Link to="/cart" className="back">← Quay lại giỏ hàng</Link>
          </div>
        </div>

        {/* RIGHT */}
        <div className="checkout__right">
          <div className="summary">
            <h3>Tóm tắt đơn hàng</h3>
            <div className="row"><span>Tạm tính</span><span>{totalPrice.toLocaleString("vi-VN")}₫</span></div>
            <div className="row"><span>Giảm giá</span><span>-{discountAmount.toLocaleString("vi-VN")}₫</span></div>

            {selectedVoucher && (
              <div className="voucher">Mã: <strong>{selectedVoucher.code}</strong></div>
            )}

            <div className="row total">
              <span>Tổng cộng</span>
              <span>{finalPrice.toLocaleString("vi-VN")}₫</span>
            </div>

            <button className="btn" onClick={handleOrder} disabled={ordering}>
              Đặt hàng
            </button>
          </div>
        </div>
      </div>

      {ordering && (
        <div className="order-loading">
          <div className="spinner"></div>
          <p>Đang đặt hàng…</p>
        </div>
      )}
    </div>
  );
}

export default Checkout;