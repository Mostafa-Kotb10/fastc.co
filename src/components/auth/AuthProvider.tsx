import { useAuth } from "@/store/authStore";
import React, {  useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, loading, refresh, fetchUser, setLoading } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Try to refresh the token and fetch the user on mount.
    const initializeAuth = async () => {
      setLoading(true);

      const token = await refresh();
      if (token) {
        await fetchUser();
      }
      setLoading(false);
    };

    initializeAuth();
  }, [fetchUser, refresh, setLoading]);

  useEffect(() => {
    if (!loading && !accessToken) {
      navigate("/sign-portal");
    }
  }, [accessToken, loading, navigate]);

  return <>{!loading && children}</>;
};

export default AuthProvider;
