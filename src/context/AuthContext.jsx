import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
import {getMe} from '../services/AuthService/Auth.service'

export function AuthProvider({ children }) {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    getMe()
    .then(res => setIsAuth(res.ok))
    .catch(() => setIsAuth(false));
    }, []);

  return (
    <AuthContext.Provider value={{ isAuth, setIsAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
