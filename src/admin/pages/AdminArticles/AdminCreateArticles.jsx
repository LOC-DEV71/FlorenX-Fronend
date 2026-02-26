import { useState } from "react";
import "./AdminCreateArticles.scss";
import TinyEditor from "../../../Tiny/TinyEditor";
import { createArticle } from "../../../services/Admin/Articles.admin";
import { toastError, toastSuccess } from "../../../utils/AlertFromSweetalert2";

function AdminCreateArticles() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    featured: "yes",
    articleCategory: "news"
  });
  const [loading, setLoading] = useState(false);
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreateArticles = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(form).forEach((key) =>
        formData.append(key, form[key])
      );
      if (thumbnail) formData.append("thumbnail", thumbnail);

      const res = await createArticle(formData);
      if (res.ok) {
        toastSuccess("Tạo bài viết thành công");
      } else {
        toastError("Không thể tạo bài viết");
      }
    } catch (err) {
      console.error(err);
      toastError("Không thể tạo bài viết");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="create-post">
        <div className="editor">
          <div className="editor-header">
            <h2>Tạo bài viết</h2>
            <button
              className="btn-primary"
              onClick={handleCreateArticles}
              disabled={loading}
            >
              {loading ? "Đang đăng..." : "Đăng bài"}
            </button>
          </div>

          <form 
            encType="multipart/form-data"
          >
            <input
              className="input title"
              placeholder="Tiêu đề bài viết"
              name="title"
              value={form.title}
              onChange={handleChange}
            />

          <input
            className="input description"
            placeholder="Mô tả ngắn"
            name="description"
            value={form.description}
            onChange={handleChange}
          />

          <TinyEditor
            value={form.content}
            onChange={(e) =>
              setForm({ ...form, content: e })
            }
            className="content"
          />

          <div className="group">
            <label htmlFor="featured">Nổi bậc</label>
            <select 
              name="featured" 
              id="featured"
              value={form.featured}
              onChange={e => setForm({...form, featured: e.target.value})}
            >
              <option value="yes">Nổi bậc</option>
              <option value="no">Không nổi bậc</option>
            </select>
          </div>
          <div className="group">
            <label htmlFor="articleCategory">Danh mục</label>
            <select 
              name="articleCategory" 
              id="articleCategory"
              value={form.articleCategory}
              onChange={e => setForm({...form, articleCategory: e.target.value})}
            >
              <option value="news">Tin tức công nghệ</option>
              <option value="vouchers">Chuyên trang khuyến mãi</option>
            </select>
          </div>
          

          <div className="file-thumbnail">
            <label htmlFor="thumbnail">Chọn ảnh</label>
            <input
              id="thumbnail"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  if (thumbnailPreview)
                    URL.revokeObjectURL(thumbnailPreview);
                  setThumbnail(file);
                  setThumbnailPreview(
                    URL.createObjectURL(file)
                  );
                }
              }}
            />
            <p
              onClick={() => {
                setThumbnail(null);
                setThumbnailPreview(null);
              }}
            >
              Xóa ảnh
            </p>
          </div>
          </form>
        </div>

        <div className="preview">
          <span className="preview-label">Xem trước</span>

          {thumbnailPreview && (
            <img src={thumbnailPreview} alt="preview" />
          )}

          <h1>{form.title || "Tiêu đề bài viết"}</h1>

          <p className="desc">
            {form.description ||
              "Mô tả ngắn của bài viết sẽ hiển thị ở đây"}
          </p>

          <div className="content">
            {form.content ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: form.content,
                }}
              />
            ) : (
              "Nội dung bài viết sẽ được preview tại đây..."
            )}
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}
    </>
  );
}

export default AdminCreateArticles;