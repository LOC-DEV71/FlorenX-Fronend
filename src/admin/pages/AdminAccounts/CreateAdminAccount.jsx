import { useState } from "react";
import "./CreateAdminAccount.scss";
import { createAccounts } from "../../../services/Admin/Accounts.admin";
import { getListRoles } from "../../../services/Admin/Roles.serrvice";
import { useEffect } from "react";
import {toastError, toastSuccess} from '../../../utils/AlertFromSweetalert2';

function CreateAdminAccount() {
    const [avatar, setAvatar] = useState(null)
    const [avatarPreview, setAvatarPreview] = useState(null)
    const [roles, setRoles] = useState([])
    const [form, setForm] = useState({
        fullname: "",
        email: "",
        role_slug: "",
        password:"",
        confirmpassword: "",
        status: "active",
    });

    useEffect(()=>{
        getListRoles()
            .then(res => {
                if(res.ok){
                    setRoles(res.result.roles)
                }
            })
            .catch(console.error)
    }, [])
    

    const handleSubitAccount = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            

            Object.keys(form).forEach(key => {
                formData.append(key, form[key])
            })
            if(avatar){
                formData.append("thumbnail", avatar)
            }

            const res = await createAccounts(formData)
            
            if(res.ok){
                toastSuccess(res.result.message)
            } else {
                toastError(res.result.message)
            }

        } catch (error) {
            console.error()
        }
    }

    const roleTitle = roles.find(
        item => item.slug === form.role_slug
    )?.title;

    console.log(roles)


    return (
        <div className="admin-create-account">
            <form className="admin-create-account_form" encType="multipart/form-data" onSubmit={handleSubitAccount}>
                <h2>Create New Admin Account</h2>
                <p className="sub">
                    Configure credentials and permissions for a new system administrator.
                </p>

                <div className="card">
                    <h4>Profile Information</h4>

                    <div className="upload">
                        <div className="upload-box">
                            <span className="icon">⬆</span>
                            <p>Upload Avatar</p>
                            <small>PNG, JPG up to 5MB</small>
                            <label htmlFor="avatar"></label>
                            <input 
                                id="avatar" 
                                type="file" 
                                accept="image/*" 
                                onChange={e => {
                                    const file = e.target.files[0];
                                    if(file){
                                        setAvatar(file)
                                        setAvatarPreview(URL.createObjectURL(file))
                                    }
                                }}
                            />
                        </div>
                    </div>

                    <div className="grid">
                        <div className="group">
                            <label>Full Name</label>
                            <input
                                value={form.fullname}
                                onChange={e =>
                                    setForm({ ...form, fullname: e.target.value })
                                }
                            />
                        </div>

                        <div className="group">
                            <label>Email Address</label>
                            <input
                                value={form.email}
                                onChange={e =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />
                        </div>

                        <div className="group">
                            <label>Password</label>
                            <input type="password" onChange={e => setForm({...form, password: e.target.value})}/>
                        </div>

                        <div className="group">
                            <label>Confirm Password</label>
                            <input type="password" onChange={e => setForm({...form, confirmpassword: e.target.value})}/>
                        </div>
                    </div>

                    <div className="grid">
                        <div className="group">
                            <label>Account Role</label>
                            <select
                                value={form.role_slug}
                                onChange={e =>
                                    setForm({ ...form, role_slug: e.target.value })
                                }
                            >
                                <option value="">-- Chọn quyền --</option>
                                {roles.map(item => (
                                    <option key={item._id} value={item.slug}>{item.title}</option>
                                ))}
                            </select>
                        </div>

                        <div className="group switch">
                            <label>Account Status</label>
                            <div className="toggle">
                                <span>Inactive</span>
                                <input
                                    type="checkbox"
                                    checked={form.status}
                                    onChange={() =>
                                        setForm({ ...form, status: "inactive" })
                                    }
                                />
                                <span>Active</span>
                            </div>
                        </div>
                    </div>

                    <button className="btn-create">Create Account</button>
                </div>
            </form>

            {/* RIGHT */}
            <div className="admin-create-account_preview">
                <div className="card">
                    <h4>Live Account Preview</h4>

                    <div className="avatar">
                        <img src={avatarPreview ? avatarPreview : "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="avatar" />
                        <span className="online"></span>
                    </div>

                    <h3>{form.fullname || "New User"}</h3>
                    <p>{form.email || "user@example.com"}</p>

                    <div className="info">
                        <div>
                            <span>Assigned Role</span>
                            <strong>{roleTitle}</strong>
                        </div>
                        <div>
                            <span>Status</span>
                            <strong className={form.status ? "active" : "inactive"}>
                                {form.status ? "Active" : "Inactive"}
                            </strong>
                        </div>
                        <div>
                            <span>Access Tier</span>
                            <strong className="full">Full Access</strong>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateAdminAccount;
