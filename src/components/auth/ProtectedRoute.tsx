import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthV2 from "@/hooks/useAuthV2";
import { useGetMe } from "@/services/user/queries";
import { FullScreenSpinner } from "@/components/Spinner";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { tokens } = useAuthV2();
  const navigate = useNavigate();
  const { isPending, isError } = useGetMe();

  const shouldRedirect = !tokens || isError;

  useEffect(() => {
    if (!isPending && shouldRedirect) {
      // navigate("/sign-portal", { replace: true });
    }
  }, [shouldRedirect, isPending, navigate]);

  if (isPending) {
    return <FullScreenSpinner />;
  }

  if (shouldRedirect) {
    return null; // don't flash protected content
  }

  return <>{children}</>;
};

export default ProtectedRoute;
