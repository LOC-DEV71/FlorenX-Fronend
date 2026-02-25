import React, { useEffect, useState } from "react";
import { createProducts } from "../../../services/Admin/Products.service";
import { getCategorys } from "../../../services/Admin/Products.category";
import {
  toastSuccess,
  toastError
} from "../../../utils/AlertFromSweetalert2";
import "./CreateProducts.scss";
import "../../../styles/form-group.scss";
import TinyEditor from "../../../Tiny/TinyEditor";

function ProductCreate() {
  const [category, setCategory] = useState([]);
  const [preview, setPreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const [specs, setSpecs] = useState([
    { key: "", value: "" }
  ]);

  useEffect(() => {
    getCategorys()
      .then(res => setCategory(res.category))
      .catch(console.error);
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const renderOptions = (categories, level = 0) =>
    categories.map(cat => (
      <React.Fragment key={cat._id}>
        <option value={cat._id}>
          {`${"--".repeat(level)} ${cat.title}`}
        </option>
        {cat.children?.length > 0 &&
          renderOptions(cat.children, level + 1)}
      </React.Fragment>
    ));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      const formData = new FormData();
      Object.keys(form).forEach(key =>
        formData.append(key, form[key])
      );

      if (thumbnail) formData.append("thumbnail", thumbnail);
      images.forEach(file => formData.append("images", file));

      const specsObject = {};
      specs.forEach(item => {
        if (item.key && item.value) {
          specsObject[item.key] = item.value;
        }
      });
      formData.append("specs", JSON.stringify(specsObject));

      const res = await createProducts(formData);

      if (res.ok) {
        toastSuccess(res.data.message);

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
        setSpecs([{ key: "", value: "" }]);
      } else {
        toastError("Lỗi", res.data.message);
      }
    } catch (err) {
      console.error(err);
      toastError("Lỗi", "Không thể tạo sản phẩm");
    } finally {
      setLoading(false);
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
    price && discount ? price - (price * discount) / 100 : price;

  return (
    <div className="form-create-products">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <div className="spinner" />
            <p>Đang tạo sản phẩm, vui lòng chờ...</p>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="form-create-products_left form-section"
      >
        <h1>Thêm sản phẩm mới</h1>

        <div className="group">
          <label>Tên sản phẩm</label>
          <input name="title" value={form.title} onChange={handleChange} />
        </div>

        <div className="group">
          <label>Danh mục</label>
          <select
            name="product_category_id"
            value={form.product_category_id}
            onChange={handleChange}
          >
            <option value="">-- Chọn danh mục --</option>
            {renderOptions(category)}
          </select>
        </div>

        <div className="group">
          <label>Mô tả</label>
          <TinyEditor
            value={form.description}
            onChange={(content) =>
              setForm({ ...form, description: content })
            }
          />
        </div>

        <div className="group specs-group">
          <label>Specs</label>

          {specs.map((item, index) => (
            <div className="specs-row" key={index}>
              <input
                placeholder="Tên (vd: rtx)"
                value={item.key}
                onChange={(e) => {
                  const clone = [...specs];
                  clone[index].key = e.target.value;
                  setSpecs(clone);
                }}
              />

              <input
                placeholder="Giá trị (vd: 5090)"
                value={item.value}
                onChange={(e) => {
                  const clone = [...specs];
                  clone[index].value = e.target.value;
                  setSpecs(clone);
                }}
              />

              <button
                type="button"
                className="remove-spec"
                onClick={() =>
                  setSpecs(specs.filter((_, i) => i !== index))
                }
              >
                ×
              </button>
            </div>
          ))}

          <button
            type="button"
            className="add-spec"
            onClick={() => setSpecs([...specs, { key: "", value: "" }])}
          >
            + Thêm spec
          </button>
        </div>


        <div className="group">
          <label>Giá</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} />
        </div>

        <div className="group">
          <label>Giảm giá %</label>
          <input
            type="number"
            name="discountPercentage"
            value={form.discountPercentage}
            onChange={handleChange}
          />
        </div>

        <div className="group">
          <label>Số lượng</label>
          <input type="number" name="stock" value={form.stock} onChange={handleChange} />
        </div>

        <div className="group">
          <label>Trạng thái</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="group">
          <label>Nổi bật</label>
          <select name="featured" value={form.featured} onChange={handleChange}>
            <option value="no">Không</option>
            <option value="yes">Có</option>
          </select>
        </div>

        <div className="group">
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

        <div className="group">
          <label>Ảnh khác</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = Array.from(e.target.files);
              setImages(files);
              setImagePreviews(files.map(f => URL.createObjectURL(f)));
            }}
          />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Đang tạo..." : "Tạo sản phẩm"}
        </button>
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
            <p className="priceOld">
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

export default ProductCreate;
