import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    getDetailProducts,
    updateProducts
} from "../../../services/Admin/Products.service";
import { getCategorys } from "../../../services/Admin/Products.Category";
import TinyEditor from "../../../Tiny/TinyEditor";
import { toastSuccess, toastError } from "../../../utils/AlertFromSweetalert2";
import "./AdmimEditProducts.scss";

function ProductEdit() {
    const { slug } = useParams();

    const [category, setCategory] = useState([]);
    const [categoryLoaded, setCategoryLoaded] = useState(false);

    const [preview, setPreview] = useState(null);
    const [imagePreviews, setImagePreviews] = useState([]);

    const [form, setForm] = useState({
        title: "",
        product_category_id: "",
        description: "",
        price: "",
        discountPercentage: "",
        stock: "",
        status: "active",
        featured: "no",
        position: ""
    });

    const [thumbnail, setThumbnail] = useState(null);
    const [images, setImages] = useState([]);

    // handle change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // get categories
    useEffect(() => {
        getCategorys()
            .then(res => {
                setCategory(res.category || []);
                setCategoryLoaded(true);
            })
            .catch(console.error);
    }, []);

    // get product detail (SAU KHI category load xong)
    useEffect(() => {
        if (!slug || !categoryLoaded) return;

        getDetailProducts(slug)
            .then(res => {
                const product = res.record;
                console.log(product)

                setForm({
                    title: product.title || "",
                    product_category_id: String(product.product_category_id || ""), 
                    description: product.description || "",
                    price: product.price || "",
                    discountPercentage: product.discountPercentage || "",
                    stock: product.stock || "",
                    status: product.status || "active",
                    featured: product.featured || "no",
                    position: product.position || ""
                });

                setPreview(product.thumbnail || null);

                setImagePreviews(
                    Array.isArray(product.images)
                        ? product.images.map(img =>
                              typeof img === "string" ? img : img.url
                          )
                        : []
                );
            })
            .catch(console.error);
    }, [slug, categoryLoaded]);

    // render category tree
    const renderOptions = (categories, level = 0) =>
        categories.map(cat => (
            <React.Fragment key={cat._id}>
                <option value={String(cat._id)}>
                    {`${"--".repeat(level)} ${cat.title}`}
                </option>
                {cat.children?.length > 0 &&
                    renderOptions(cat.children, level + 1)}
            </React.Fragment>
        ));

    // submit update
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (thumbnail) {
            formData.append("thumbnail", thumbnail);
        }

        images.forEach(file => {
            formData.append("images", file);
        });

        try {
            const res = await updateProducts(slug, formData);
            if (res.ok) {
                toastSuccess(res.message);
            } else {
                toastError(res.message);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const price = Number(form.price || 0);
    const discount = Number(form.discountPercentage || 0);
    const finalPrice =
        price && discount ? price - (price * discount) / 100 : price;

    return (
        <div className="form-edit-products">
            {/* LEFT */}
            <form
                className="form-edit-products_left"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <h1>Sửa sản phẩm</h1>

                <div className="form-edit-products_left-group">
                    <label>Tên sản phẩm</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-edit-products_left-group">
                    <label>Danh mục</label>
                    <select
                        name="product_category_id"
                        value={form.product_category_id}
                        onChange={handleChange}
                    >
                        <option value="">-- Chọn danh mục --</option>
                        {renderOptions(category)}
                    </select>
                </div>

                <div className="form-edit-products_left-group">
                    <label>Mô tả</label>
                    <TinyEditor
                        value={form.description}
                        onChange={(content) =>
                            setForm(prev => ({
                                ...prev,
                                description: content
                            }))
                        }
                    />
                </div>

                <div className="form-edit-products_left-group">
                    <label>Giá</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-edit-products_left-group">
                    <label>Giảm giá %</label>
                    <input
                        type="number"
                        name="discountPercentage"
                        value={form.discountPercentage}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-edit-products_left-group">
                    <label>Số lượng</label>
                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-edit-products_left-group">
                    <label>Vị trí</label>
                    <input
                        type="number"
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-edit-products_left-group">
                    <label>Trạng thái</label>
                    <select
                        name="status"
                        value={form.status}
                        onChange={handleChange}
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div className="form-edit-products_left-group">
                    <label>Nổi bật</label>
                    <select
                        name="featured"
                        value={form.featured}
                        onChange={handleChange}
                    >
                        <option value="no">Không nổi bật</option>
                        <option value="yes">Nổi bật</option>
                    </select>
                </div>

                <div className="form-edit-products_left-group">
                    <label>Thumbnail mới (nếu đổi)</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setThumbnail(file);
                                setPreview(URL.createObjectURL(file)); // 🔥 FIX
                            }
                        }}
                    />
                </div>

                <div className="form-edit-products_left-group">
                    <label>Hình ảnh mới</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                            const files = Array.from(e.target.files);
                            setImages(files);
                            setImagePreviews(
                                files.map(file =>
                                    URL.createObjectURL(file) // 🔥 FIX
                                )
                            );
                        }}
                    />
                </div>

                <button type="submit">Cập nhật sản phẩm</button>
            </form>

            {/* RIGHT */}
            <div className="form-edit-products_right">
                <div className="content">
                    <h4>{form.title}</h4>

                    <div className="form-edit-products_right-img">
                        <img
                            src={preview || "/img/no-img.png"}
                            className="preview"
                        />

                        <span className="featured">
                            {form.featured === "yes" ? "Nổi bật" : ""}
                        </span>

                        <span className="description">
                            {discount ? `${discount}%` : ""}
                        </span>
                    </div>

                    <div className="form-edit-products_right-imglist">
                        <div className="list_preview">
                            {imagePreviews.map((src, i) => (
                                <img
                                    key={i}
                                    src={src}
                                    className="list_preview-img"
                                    onClick={() => setPreview(src)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="form-edit-products_right-unit">
                        <p>
                            {price
                                ? `Giá: ${finalPrice.toLocaleString("vi-VN")} VNĐ`
                                : ""}
                        </p>
                        <p>
                            {price
                                ? `${price.toLocaleString("vi-VN")} VNĐ`
                                : ""}
                        </p>
                    </div>

                    <div
                        className="form-edit-products_right-description"
                        dangerouslySetInnerHTML={{
                            __html: form.description
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductEdit;
