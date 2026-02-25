import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import "./AdminLayout.scss";

function AdminLayout() {
  return (
    <div className="admin_layout">
      <Sidebar />
      <div className="admin_layout-content">
        <Header />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
