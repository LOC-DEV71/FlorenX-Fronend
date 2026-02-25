import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getDetailProducts,
  updateProducts
} from "../../../services/Admin/Products.service";
import { getCategorys } from "../../../services/Admin/Products.category";
import TinyEditor from "../../../Tiny/TinyEditor";
import { toastSuccess, toastError } from "../../../utils/AlertFromSweetalert2";
import "./AdmimEditProducts.scss";
import "../../../styles/form-group.scss";

function ProductEdit() {
  const { slug } = useParams();

  const [category, setCategory] = useState([]);
  const [categoryLoaded, setCategoryLoaded] = useState(false);

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(null);
  const [imagePreviews, setImagePreviews] = useState([]);

  const [thumbnail, setThumbnail] = useState(null);
  const [images, setImages] = useState([]);         

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

  const [specs, setSpecs] = useState([{ key: "", value: "" }]);

  useEffect(() => {
    getCategorys()
      .then(res => {
        setCategory(res.category || []);
        setCategoryLoaded(true);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!slug || !categoryLoaded) return;

    getDetailProducts(slug)
      .then(res => {
        const product = res.record;

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

        if (product.specs && typeof product.specs === "object") {
          const arr = Object.entries(product.specs).map(
            ([key, value]) => ({ key, value })
          );
          setSpecs(arr.length ? arr : [{ key: "", value: "" }]);
        }
      })
      .catch(console.error);
  }, [slug, categoryLoaded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) =>
        formData.append(key, value)
      );

      if (thumbnail) {
        formData.append("thumbnail", thumbnail);
      }

      if (images.length > 0) {
        images.forEach(file => formData.append("images", file));
      }

      // specs
      const specsObject = {};
      specs.forEach(item => {
        if (item.key && item.value) {
          specsObject[item.key] = item.value;
        }
      });
      formData.append("specs", JSON.stringify(specsObject));

      const res = await updateProducts(slug, formData);

      if (res.ok) {
        toastSuccess(res.message || "Cập nhật thành công");
      } else {
        toastError("Lỗi", res.message);
      }
    } catch (err) {
      console.error(err);
      toastError("Lỗi", "Không thể cập nhật sản phẩm");
    } finally {
      setLoading(false);
    }
  };

  const price = Number(form.price || 0);
  const discount = Number(form.discountPercentage || 0);
  const finalPrice =
    price && discount ? price - (price * discount) / 100 : price;

  return (
    <div className="form-edit-products">
      {loading && (
        <div className="loading-overlay">
          <div className="loading-box">
            <div className="spinner" />
            <p>Đang cập nhật sản phẩm...</p>
          </div>
        </div>
      )}

      {/* LEFT */}
      <form
        className="form-edit-products_left"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h1>Sửa sản phẩm</h1>

        <div className="group">
          <label>Tên sản phẩm</label>
          <input name="title" value={form.title} onChange={handleChange} />
        </div>

        <div className="group">
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

        <div className="group">
          <label>Mô tả</label>
          <TinyEditor
            value={form.description}
            onChange={(content) =>
              setForm(prev => ({ ...prev, description: content }))
            }
          />
        </div>

        {/* SPECS */}
        <div className="group specs-group">
          <label>Specs</label>

          {specs.map((item, index) => (
            <div className="specs-row" key={index}>
              <input
                placeholder="Tên"
                value={item.key}
                onChange={(e) => {
                  const clone = [...specs];
                  clone[index].key = e.target.value;
                  setSpecs(clone);
                }}
              />
              <input
                placeholder="Giá trị"
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
          <label>Giá</label>
          <input type="number" name="price" value={form.price} onChange={handleChange} />
        </div>

        <div className="group">
          <label>Giảm giá %</label>
          <input
            type="number"
            name="discountPercentage"
            value={form.discountPercentage}
            onChange={handleChange}
          />
        </div>

        <div className="group">
          <label>Số lượng</label>
          <input type="number" name="stock" value={form.stock} onChange={handleChange} />
        </div>

        <div className="group">
          <label>Trạng thái</label>
          <select name="status" value={form.status} onChange={handleChange}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="group">
          <label>Nổi bật</label>
          <select name="featured" value={form.featured} onChange={handleChange}>
            <option value="no">Không</option>
            <option value="yes">Có</option>
          </select>
        </div>

        {/* THUMBNAIL */}
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

        {/* IMAGES */}
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

        <button type="submit" className="btn-success">
          Cập nhật sản phẩm
        </button>
      </form>

      {/* RIGHT */}
      <div className="form-edit-products_right">
        <div className="content">
          <h4>{form.title}</h4>

          <div className="form-edit-products_right-img">
            <img src={preview || "/img/no-img.png"} className="preview" />
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
              {price ? `Giá: ${finalPrice.toLocaleString("vi-VN")} VNĐ` : ""}
            </p>
            <p className="priceOld">
              {price ? `${price.toLocaleString("vi-VN")} VNĐ` : ""}
            </p>
          </div>

          <div
            className="form-edit-products_right-description"
            dangerouslySetInnerHTML={{ __html: form.description }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductEdit;
