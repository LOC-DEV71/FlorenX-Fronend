import { useEffect, useState } from "react";
import "./RolePermission.scss";
import { getRolesPermission, updateRoles } from "../../../services/Admin/Roles.serrvice";
import { getPermissionGroup } from "../../../services/Admin/PermissionGroup";
import { SearchOutlined } from "@ant-design/icons";
import {toastError, toastSuccess} from "../../../utils/AlertFromSweetalert2";

function RolePermission() {
    const [roles, setRoles] = useState([]);
    const [permissionGroups, setPermissionGroups] = useState([]);
    const [activeRole, setActiveRole] = useState(null);

    useEffect(() => {
        getRolesPermission()
            .then(res => {
                if (res.ok && res.result.roles.length > 0) {
                    setRoles(res.result.roles);
                    setActiveRole(res.result.roles[0]);
                }
            })
            .catch(console.error);
    }, []);

    useEffect(() => {
        getPermissionGroup()
            .then(res => {
                if (res.ok) {
                    setPermissionGroups(res.result.permissionGroups);
                }
            })
            .catch(console.error);
    }, []);

    const togglePermission = (permissionValue) => {
        if (!activeRole) return;

        const hasPermission = activeRole.permissions.includes(permissionValue);

        const updatedPermissions = hasPermission
            ? activeRole.permissions.filter(p => p !== permissionValue)
            : [...activeRole.permissions, permissionValue];

        const updatedRole = {
            ...activeRole,
            permissions: updatedPermissions 
        };

        setActiveRole(updatedRole);

        setRoles(prev =>
            prev.map(role =>
                role._id === updatedRole._id ? updatedRole : role
            )
        );
    };

    const toggleGroup = (permissions, checked) => {
        if (!activeRole) return;

        const values = permissions.map(p => p.value);

        const updatedPermissions = checked
            ? Array.from(new Set([...activeRole.permissions, ...values]))
            : activeRole.permissions.filter(p => !values.includes(p));

        const updatedRole = {
            ...activeRole,
            permissions: updatedPermissions
        };

        setActiveRole(updatedRole);

        setRoles(prev =>
            prev.map(role =>
                role._id === updatedRole._id ? updatedRole : role
            )
        );
    };

    if (!activeRole) return null;


    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const res = await updateRoles(activeRole);
            if(res.ok){
                toastSuccess(res.result.message)
            } else{
                toastError(res.result.message)
            }
        } catch (error) {
            console.error();
        }
    }


    return (
        <div className="role-permission-page">
            {/* HEADER */}
            <div className="rp-header">
                <div className="rp-title">
                    <h2>Phân quyền vai trò</h2>
                    <p>Thiết lập quyền truy cập cho từng vai trò trong hệ thống</p>
                </div>

                <div className="rp-actions">
                    <button className="btn primary" onClick={handleUpdate}>
                        Lưu phân quyền
                    </button>
                </div>
            </div>

            <div className="rp-layout">
                {/* ROLE LIST */}
                <div className="rp-roles">
                    <div className="rp-roles-top">
                        <div className="search">
                            <span className="icon"><SearchOutlined /></span>
                            <input placeholder="Tìm kiếm vai trò..." />
                        </div>
                    </div>

                    <div className="rp-role-list">
                        {roles.map(role => (
                            <div
                                key={role._id}
                                className={`rp-role-item ${
                                    activeRole._id === role._id ? "active" : ""
                                }`}
                                onClick={() => setActiveRole(role)}
                            >
                                <div className="info">
                                    <div className="name">{role.title}</div>
                                    <div className="meta">
                                        <span className="badge">{role.slug}</span>
                                    </div>
                                </div>

                                <div className="right">
                                    <span className="count">
                                        {role.permissions.length}
                                    </span>
                                    <span className="chev">›</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* PERMISSIONS */}
                <div className="rp-perms">
                    <div className="rp-perms-head">
                        <div className="left">
                            <h3>{activeRole.title}</h3>
                            <p>Quản lý quyền truy cập của vai trò này</p>
                        </div>

                        <div className="tools">
                            <span className="pill">
                                {activeRole.permissions.length} quyền
                            </span>
                        </div>
                    </div>

                    <div className="rp-perms-body">
                        <div className="rp-groups">
                            {permissionGroups.map(group => {
                                const allChecked = group.permissions.every(p =>
                                    activeRole.permissions.includes(p.value)
                                );

                                return (
                                    <div className="rp-group" key={group._id}>
                                        <div className="rp-group-head">
                                            <div className="name">{group.title}</div>
                                            <div className="group-actions">
                                                <button
                                                    className="mini"
                                                    onClick={() =>
                                                        toggleGroup(group.permissions, true)
                                                    }
                                                >
                                                    Chọn tất cả
                                                </button>
                                                <button
                                                    className="mini"
                                                    onClick={() =>
                                                        toggleGroup(group.permissions, false)
                                                    }
                                                >
                                                    Bỏ chọn
                                                </button>
                                            </div>
                                        </div>

                                        <div className="rp-group-list">
                                            {group.permissions.map(per => (
                                                <div className="rp-item" key={per.value}>
                                                    <div className="left">
                                                        <span className="label">
                                                            {per.label}
                                                        </span>
                                                        <span className="code">
                                                            {per.value}
                                                        </span>
                                                    </div>

                                                    <label className="cb">
                                                        <input
                                                            type="checkbox"
                                                            checked={activeRole.permissions.includes(
                                                                per.value
                                                            )}
                                                            onChange={() =>
                                                                togglePermission(per.value)
                                                            }
                                                        />
                                                        <span className="box">
                                                            <span className="tick" />
                                                        </span>
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    );
}

export default RolePermission;
