// src/auth/AuthProvider.tsx
import { useEffect, useState, PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "@/types/user.types";
import { getUser, refreshSession } from "@/services/auth/auth";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { AuthContext } from "@/hooks/useAuth"; // Import context
import { AuthTokens } from "@/types/auth.types";

const AuthProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setTokenState] = useState<AuthTokens | null>(null);
  const { getItem, setItem, removeItem } = useLocalStorage<AuthTokens | null>("tokens", null);
  const navigate = useNavigate();

  // Load tokens from localStorage and fetch user
  const silentRefresh = async (refreshToken: string) => {
    try {
      const res = await refreshSession( refreshToken );
      setToken(res.data);

      const userRes = await getUser();
      setUser(userRes.data);
    } catch {
      logout();
    }
  };

  useEffect(() => {
    const stored = getItem();
    if (stored?.refreshToken) {
      silentRefresh(stored.refreshToken);
    }
  }, []);

  const setToken = (newToken: AuthTokens | null) => {
    setTokenState(newToken);
    if (newToken) {
      setItem(newToken);
    } else {
      removeItem();
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate("/sign-portal");
  };

  return (
    <AuthContext.Provider value={{ user, token, setUser, setToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider


