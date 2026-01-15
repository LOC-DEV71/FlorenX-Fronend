import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDetailProducts } from "../../../services/Admin/Products.service";
import "./AdminDetailProducts.scss";

function AdminProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        if (!slug) return;

        getDetailProducts(slug)
            .then(res => {
                setProduct(res.record);
            })
            .catch(console.error);
    }, [slug]);

    if (!product) {
        return <div className="product-detail__loading">Đang tải...</div>;
    }

    const price = Number(product.price || 0);
    const discount = Number(product.discountPercentage || 0);
    const finalPrice =
        price && discount ? price - (price * discount) / 100 : price;

    


    return (
        <div className="product-detail">
            <div className="product-detail__header">
                <h1 className="product-detail__title">{product.title}</h1>

                <Link
                    to={`/admin/products/edit/${product.slug}`}
                    className="product-detail__edit"
                >
                    Sửa sản phẩm
                </Link>
            </div>

            <div className="product-detail__body">
                <div className="product-detail__left">
                    <div className="product-detail__image">
                        <img
                            src={product.thumbnail || "/img/no-img.png"}
                            alt={product.title}
                        />

                        {product.featured === "yes" && (
                            <span className="product-detail__featured">
                                Nổi bật
                            </span>
                        )}

                        {discount > 0 && (
                            <span className="product-detail__discount">
                                -{discount}%
                            </span>
                        )}
                    </div>

                    {product.images?.length > 0 && (
                        <div className="product-detail__gallery">
                            {product.images.map((img, i) => (
                                <img
                                    key={i}
                                    src={typeof img === "string" ? img : img.url}
                                    alt=""
                                />
                            ))}
                        </div>
                    )}
                </div>

                <div className="product-detail__right">
                    <div className="product-detail__row">
                        <span>Danh mục</span>
                        <strong>
                            {product.title_category}
                        </strong>
                    </div>

                    <div className="product-detail__row">
                        <span>Giá</span>
                        <strong className="price">
                            {finalPrice.toLocaleString("vi-VN")} đ
                        </strong>
                    </div>

                    {discount > 0 && (
                        <div className="product-detail__row old-price">
                            <span>Giá gốc</span>
                            <strong>
                                {price.toLocaleString("vi-VN")} đ
                            </strong>
                        </div>
                    )}

                    <div className="product-detail__row">
                        <span>Số lượng</span>
                        <strong>{product.stock}</strong>
                    </div>

                    <div className="product-detail__row">
                        <span>Trạng thái</span>
                        <span
                            className={`status ${product.status}`}
                        >
                            {product.status}
                        </span>
                    </div>

                    <div className="product-detail__row">
                        <span>Vị trí</span>
                        <strong>{product.position || "—"}</strong>
                    </div>
                </div>
            </div>

            <div className="product-detail__description">
                <h3>Mô tả sản phẩm</h3>
                <div
                    className="content"
                    dangerouslySetInnerHTML={{
                        __html: product.description
                    }}
                />
            </div>
        </div>
    );
}

export default AdminProductDetail;
