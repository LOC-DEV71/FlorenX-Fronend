import React, { useEffect, useState } from "react";
import { createProducts } from "../../../services/Admin/Products.service";
import { getCategorys } from "../../../services/Admin/Products.Category";
import {toastSuccess, toastError} from '../../../utils/AlertFromSweetalert2';
import "./CreateProducts.scss";
import TinyEditor from "../../../Tiny/TinyEditor";

function ProductCreate() {
    const [category, setCategory] = useState([]);
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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    useEffect(() => {
        getCategorys()
            .then(res => setCategory(res.category))
            .catch(console.error);
    }, []);

    const renderOptions = (categories, level = 0) => {
        return categories.map(cat => (
            <React.Fragment key={cat._id}>
                <option value={cat._id}>
                    {`${level ? "--".repeat(level) : ""} ${cat.title}`}
                </option>
                {cat.children.length > 0 &&
                    renderOptions(cat.children, level + 1)}
            </React.Fragment>
        ));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();

            Object.keys(form).forEach(key => {
                formData.append(key, form[key]);
            });

            if (thumbnail) {
                formData.append("thumbnail", thumbnail);
            }

            images.forEach(file => {
                formData.append("images", file);
            });

            const res = await createProducts(formData);

            if (res.ok) {
               toastSuccess(res.data.message)

                setForm({
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

                setThumbnail(null);
                setImages([]);
                setPreview(null);
                setImagePreviews([]);
            } else {
                toastError("Lỗi: ", res.data.message, "error")
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        return () => {
            imagePreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [imagePreviews]);

    const price = Number(form.price || 0);
    const discount = Number(form.discountPercentage || 0);
    const finalPrice =
        price && discount
            ? price - (price * discount) / 100
            : price;

    return (
        <div className="form-create-products">
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="form-create-products_left">
                <h1>Thêm sản phẩm mới</h1>

                <div className="form-create-products_left-group">
                    <label>Tên sản phẩm*</label>
                    <input
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-create-products_left-group">
                    <label>Danh mục sản phẩm</label>
                    <select
                        name="product_category_id"
                        value={form.product_category_id}
                        onChange={handleChange}
                    >
                        <option value="">-- Chọn danh mục --</option>
                        {renderOptions(category)}
                    </select>
                </div>

                <div className="form-create-products_left-group">
                    <label>Mô tả sản phẩm</label>
                    <TinyEditor
                        value={form.description}
                        onChange={(content) =>
                            setForm({ ...form, description: content })
                        }
                    />
                </div>

                <div className="form-create-products_left-group">
                    <label>Giá sản phẩm*</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-create-products_left-group">
                    <label>Giảm giá %</label>
                    <input
                        type="number"
                        name="discountPercentage"
                        value={form.discountPercentage}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-create-products_left-group">
                    <label>Số lượng sản phẩm*</label>
                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-create-products_left-group">
                    <label>Vị trí sản phẩm</label>
                    <input
                        type="number"
                        name="position"
                        value={form.position}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-create-products_left-group">
                    <label>Trạng thái sản phẩm</label>
                    <select name="status" value={form.status} onChange={handleChange}>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>

                <div className="form-create-products_left-group">
                    <label>Nổi bật</label>
                    <select name="featured" value={form.featured} onChange={handleChange}>
                        <option value="no">Không nổi bật</option>
                        <option value="yes">Nổi bật</option>
                    </select>
                </div>

                <div className="form-create-products_left-group">
                    <label>Thumbnail</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setThumbnail(file);
                                setPreview(URL.createObjectURL(file));
                            }
                        }}
                    />
                </div>

                <div className="form-create-products_left-group">
                    <label>Hình ảnh khác</label>
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => {
                            const files = Array.from(e.target.files);
                            if (files.length) {
                                setImages(files);
                                setImagePreviews(files.map(file => URL.createObjectURL(file)));
                            }
                        }}
                    />
                </div>

                <button type="submit">Tạo sản phẩm</button>
            </form>

            <div className="form-create-products_right">
                <div className="content">
                    <h4>{form.title}</h4>

                    <div className="form-create-products_right-img">
                        {preview
                            ? <img src={preview} className="preview" />
                            : <img src="/img/no-img.png" className="preview" />
                        }

                        <span className="featured">
                            {form.featured === "yes" ? "Nổi bật" : ""}
                        </span>

                        <span className="description">
                            {discount ? `${discount}%` : ""}
                        </span>
                    </div>

                    <div className="form-create-products_right-imglist">
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

                    <div className="form-create-products_right-unit">
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
                        className="form-create-products_right-description"
                        dangerouslySetInnerHTML={{ __html: form.description }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ProductCreate;
