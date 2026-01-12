import { Link } from "react-router-dom"
import "./Header.scss"
import {
    SearchOutlined,
    EnvironmentOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons'
import ModalUser from "./user"

function Header(){
    return(
        <>
            <div className="header">
                <Link to={"/"} className="header_logo">
                    <img className="header_logo-img" src="/logo/florenx.png"/>
                </Link>
                <div className="header_page">
                    <Link>
                        <span>
                            TRANG CHỦ
                        </span>
                    </Link>
                    <Link>
                        <span>
                            DANH MỤC
                        </span>
                    </Link>
                    <Link>
                        <span>
                            SHOWROOM
                        </span>
                    </Link>
                    <Link>
                        <span>
                            BÀI VIẾT
                        </span>
                    </Link>
                    <Link>
                        <span>
                            HỔ TRỢ
                        </span>
                    </Link>
                </div>
                <div className="header_function">
                    <div >
                        <SearchOutlined />
                    </div>
                    <div>
                        <EnvironmentOutlined/>
                    </div>
                    <Link to={"/cart"}>
                        <ShoppingCartOutlined />
                    </Link>
                    <ModalUser/>
                </div>
            </div>
        </>
    )
}

export default Header