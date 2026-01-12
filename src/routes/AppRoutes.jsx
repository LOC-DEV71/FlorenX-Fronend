import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./admin/AdminRoutes";
import ClientRoutes from "./client/ClientRoutes";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/*" element={<ClientRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
