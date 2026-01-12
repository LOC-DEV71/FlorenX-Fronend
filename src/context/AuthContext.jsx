import { createContext, useEffect, useState } from "react";
import { getMe } from "../services/AuthService/Auth.service";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    getMe()
      .then((res) => setIsAuth(res.ok))
      .catch(() => setIsAuth(false))
      .finally(() => setLoadingAuth(false));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
