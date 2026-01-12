import { createContext, useEffect, useState } from "react";
import { getMe } from "../../services/Client/AuthService/Auth.service";
import { createCart } from "../../services/Client/AuthService/Cart.service";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    Promise.all([
      getMe()
        .then(res => setIsAuth(res.ok))
        .catch(() => setIsAuth(false)),

      createCart() 
    ])
    .finally(() => {
      setLoadingAuth(false);
    });
  }, []);


  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
