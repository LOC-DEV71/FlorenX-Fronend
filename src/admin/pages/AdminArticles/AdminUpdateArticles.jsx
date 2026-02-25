import { useEffect, useState } from "react";
import "./AdminCreateArticles.scss";
import TinyEditor from "../../../Tiny/TinyEditor";
import { useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../../utils/AlertFromSweetalert2";
import { getDetailArticles, updateAticles } from "../../../services/Admin/Articles.admin";

function AdminUpdateArticles() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    featured: "",
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await getDetailArticles(slug);
        if (res.ok) {
          const article = res.result.article;
          setForm({
            title: article.title || "",
            description: article.description || "",
            content: article.content || "",
            featured: article.featured ? "yes" : "no",
          });
          if (article.thumbnail) {
            setThumbnailPreview(article.thumbnail);
          }
        } else {
          toastError(res.result.message);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchApi();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    try {
      setLoading(true);
      const formData = new FormData();
      Object.keys(form).forEach((key) =>
        formData.append(key, form[key])
      );
      if (thumbnailFile) {
        formData.append("thumbnail", thumbnailFile);
      }

      const res = await updateAticles({formData, slug})
      if(res.ok){
        toastSuccess(res.result.message);
      } else{
        toastError(res.result.message);
      }
    } catch (error) {
      console.error(error);
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
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Đang cập nhật..." : "Lưu bài viết"}
            </button>
          </div>

          <form encType="multipart/form-data">
            <input
              className="input title"
              placeholder="Tiêu đề bài viết"
              name="title"
              value={form.title}
              onChange={(e) =>
                setForm({ ...form, title: e.target.value })
              }
            />

            <input
              className="input description"
              placeholder="Mô tả ngắn"
              name="description"
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
            />

            <TinyEditor
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e })
              }
            />

            <div className="group">
              <label htmlFor="featured">Nổi bật</label>
              <select
                name="featured"
                id="featured"
                value={form.featured}
                onChange={(e) =>
                  setForm({ ...form, featured: e.target.value })
                }
              >
                <option value="yes">Nổi bật</option>
                <option value="no">Không nổi bật</option>
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
                    setThumbnailFile(file);
                    setThumbnailPreview(
                      URL.createObjectURL(file)
                    );
                  }
                }}
              />
              <p onClick={() => setThumbnailPreview(null)}>
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

export default AdminUpdateArticles;