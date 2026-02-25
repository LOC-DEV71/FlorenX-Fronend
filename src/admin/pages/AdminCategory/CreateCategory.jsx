import "../../../styles/form-group.scss"
import React, { Fragment, useEffect, useMemo, useState } from "react";
import { getCategorys, createCategory } from "../../../services/Admin/Products.category";
import { toastError, toastSuccess } from "../../../utils/AlertFromSweetalert2";

function CreateCategory(){
    const [category, setCategory] = useState([]);
    const [form, setForm] = useState({
        title: "",
        parent_id: "",
        description: "",
        status: "active"
    })
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

    const handleChangeMulti = (e) => {
        e.preventDefault()
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await createCategory(form);
            if(res.ok){
                window.location.href = ("/admin/product-categorys")
            } else{
                toastError(res.result.message)
            }
        } catch (error) {
            
        }
    }

    return(
        <>
            <div className="form-admin-category">
                <div className="form-admin-categorty_top">
                    <h1>Tạo danh mục mới</h1>
                </div>
                <div className="form-admin-categorty_bot">
                    <form onSubmit={handleSubmit}>
                        <div  className="form-admin-categorty_bot group">
                            <label>Tên danh mục*</label>
                    <input name="title" type="text" placeholder="Nhập tên danh mục" onChange={handleChangeMulti}/>
                        </div>
                        <div className="form-admin-categorty_bot group">
                            <label>Danh mục</label>
                            <select name="parent_id" onChange={handleChangeMulti}>
                                <option value="">-- Danh mục --</option>
                                {renderOptions(category)}
                            </select>
                        </div>
                        
                        <div  className="form-admin-categorty_bot group">
                            <label>Mô tả danh mục</label>
                            <input name="description" type="text" placeholder="Nhập mô tả" onChange={handleChangeMulti}/>
                        </div>
                        <div  className="form-admin-categorty_bot group">
                            <label>Trạng thái hoạt động*</label>
                            <select name="status" onChange={handleChangeMulti}>
                                <option value="active">Hoạt động</option>
                                <option value="inactive">Không hoạt động</option>
                            </select>
                        </div>
                        <button className="btn-success">
                            Tạo danh mục
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateCategory