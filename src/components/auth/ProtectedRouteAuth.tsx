import { useAuth } from "@/store/authStore";
import { Navigate } from "react-router-dom";

const ProtectedRouteAuth = ({ children }: { children: React.ReactNode }) => {
  const { accessToken, loading } = useAuth();

  // Show loading spinner or some placeholder until authentication is resolved
  if (loading) return <div>Loading...</div>;

  // If no token, redirect to login page
  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRouteAuth;
