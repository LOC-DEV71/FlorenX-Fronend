import "./AdminRoleCreate.scss";
import { createRoles } from "../../../services/Admin/Roles.serrvice";
import { useState } from "react";
import TinyEditor from "../../../Tiny/TinyEditor";
import { toastError, toastSuccess } from '../../../utils/AlertFromSweetalert2';
function AdminRoleCreate() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    status: "active",
  });
  const [isSlugTouched, setIsSlugTouched] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form)
    try {
      const res = await createRoles(form);
      if (res.ok) {
        setForm({
          title: "",
          slug: "",
          description: "",
          status: "active"
        })
        toastSuccess(res.result.message)
      } else {
        toastError(res.result.message)
      }
    } catch (error) {
      console.error()
    }
  }

  const handleChangeTitle = (e) => {
    const value = e.target.value;

    const autoSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .split(/\s+/)
      .join("-");

    setForm(prev => ({
      ...prev,
      title: value,
      slug: isSlugTouched ? prev.slug : autoSlug
    }));
  };




  return (
    <div className="role-create">
      <div className="role-create__header">
        <h1>Tạo vai trò mới</h1>
        <p>Thiết lập vai trò và phân quyền cho tài khoản quản trị</p>
      </div>

      <div className="role-create__body">
        <form className="role-create__left" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Tên vai trò *</label>
            <input
              name="title"
              type="text"
              placeholder="Ví dụ: Admin, Support..."
              value={form.title}
              onChange={handleChangeTitle}
            />
          </div>

          <div className="form-group">  
            <label>Slug</label>
            <input
              name="slug"
              type="text"
              value={form.slug}
              placeholder="admin, support..."
              onChange={e => {
                setIsSlugTouched(true);
                setForm({ ...form, slug: e.target.value });
              }}
            />

          </div>

          <div className="form-group">
            <label>Mô tả</label>
            <TinyEditor
              name="description"
              value={form.description}
              onChange={e => setForm({ ...form, description: e })}
            />
          </div>

          <div className="form-group">
            <label>Trạng thái</label>
            <select name="status" onChange={e => setForm({ ...form, status: e.target.value })}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button className="btn-submit" type="submit">Tạo vai trò</button>
        </form>

        <div className="role-create__right">
          <div className="preview-card">
            <h4>Preview</h4>

            <div className="preview-item">
              <span>Tên vai trò</span>
              <strong>Admin</strong>
            </div>

            <div className="preview-item">
              <span>Slug</span>
              <code>admin</code>
            </div>

            <div className="preview-item">
              <span>Trạng thái</span>
              <span className="status active">active</span>
            </div>

            <div className="preview-desc">
              Quản lý toàn bộ sản phẩm, danh mục, đơn hàng và tài khoản
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminRoleCreate;
