"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";
const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("token");
    if (stored) setToken(stored);
    setLoading(false);
  }, []);

  const login = (newToken) => {
    console.log("Login called with token:", newToken);
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.replace("/");
  };
  return (
    <AuthContext.Provider value={{ token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
export const useAuth = () => useContext(AuthContext);