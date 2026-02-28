import { createContext, useEffect, useState } from "react";
import { getMe } from "../../services/Client/AuthService/Auth.service";
import { createCart } from "../../services/Client/AuthService/Cart.service";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);
  const [user, setUser] = useState([])
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [cart, setCart] = useState({})
  useEffect(() => {
    getMe()
      .then(res => {
        if (res.ok) {
          setIsAuth(true);
          setUser(res.data.user)
        } else {
          setIsAuth(false);
        }
      })
      .catch(() => setIsAuth(false))
      .finally(() => {
        createCart();
        setLoadingAuth(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth, loadingAuth, user }}>
      {children}
    </AuthContext.Provider>
  );
}
