import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAdminProfile } from "../../services/Admin/Auth.service";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await getAdminProfile();

        if (res?.admin) {
          setAdmin(res.admin);
        } else {
          setAdmin(null);
          navigate("/admin/login");
        }
      } catch {
        setAdmin(null);
        navigate("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  return (
    <AdminAuthContext.Provider value={{ admin, loading }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth phải nằm trong AdminAuthProvider");
  }
  return context;
};
