import { BellOutlined } from "@ant-design/icons";
import { getNotifi } from "../../../services/Admin/Notifi.admin";
import { useEffect, useRef, useState } from "react";

function Notifications() {
    const [open, setOpen] = useState(false);
    const [tab, setTab] = useState("all");
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

    const wrapperRef = useRef(null);

    useEffect(() => {
        const fetchNotifi = async () => {
            setLoading(true);
            try {
                const res = await getNotifi(20);
                if (res.ok) {
                    setNotifications(res.result.notifications);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchNotifi();
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const filteredNotifications =
        tab === "unread"
            ? notifications.filter(n => !n.read)
            : notifications;

    return (
        <div className="notifi" ref={wrapperRef}>
            <div
                className="notifi-icon"
                onClick={() => setOpen(prev => !prev)}
            >
                <BellOutlined />
                {notifications.some(n => !n.read) && <span className="dot" />}
            </div>

            {/* DROPDOWN */}
            {open && (
                <div className="notifi-panel">
                    <div className="notifi-header">
                        <span>Thông báo</span>
                        <span className="more">⋯</span>
                    </div>

                    <div className="notifi-tabs">
                        <button
                            className={tab === "all" ? "active" : ""}
                            onClick={() => setTab("all")}
                        >
                            Tất cả
                        </button>
                        <button
                            className={tab === "unread" ? "active" : ""}
                            onClick={() => setTab("unread")}
                        >
                            Chưa đọc
                        </button>
                    </div>

                    <div className="notifi-list">
                        {loading && <div className="empty">Đang tải...</div>}

                        {!loading && filteredNotifications.length === 0 && (
                            <div className="empty">Không có thông báo</div>
                        )}

                        {filteredNotifications.map(item => (
                            <div
                                key={item._id}
                                className={`notifi-item ${!item.read ? "unread" : ""}`}
                            >
                                <div className="content">
                                    {item.message}
                                </div>
                                <div className="time">
                                    {new Date(item.createdAt).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Notifications;
