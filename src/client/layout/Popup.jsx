import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Popup.scss";

function Popup() {

    const [show, setShow] = useState(false);

    useEffect(() => {
        const popupData = localStorage.getItem("popupClosed");

        if (popupData) {
            const { value, expire } = JSON.parse(popupData);

            if (value === true && Date.now() < expire) {
                return;
            }
        }

        setShow(true);
    }, []);

    const closePopup = () => {
        const expireTime = Date.now() + 5 * 60 * 60 * 1000;

        localStorage.setItem(
            "popupClosed",
            JSON.stringify({
                value: true,
                expire: expireTime
            })
        );

        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="popup" onClick={closePopup}>
            <div 
                className="popup_content"
                onClick={(e) => e.stopPropagation()}
            >

                <button className="popup_close" onClick={closePopup}>
                    X
                </button>

                <Link target="_blank" to={"/articles/detail/bo-may-tinh-pc-gaming-intel-core-i5-13400f-rtx-5080-12gb-hieu-nang-manh-me-giam-gia-toi-19percent"}>
                    <img src="/img/popup.png" alt="popup" />
                </Link>

            </div>
        </div>
    );
}

export default Popup;