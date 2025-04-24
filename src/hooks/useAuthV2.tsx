import AuthContextV2 from "@/components/auth/AuthProviderV2";
import { useContext } from "react";

const useAuthV2 = () => {
  const context = useContext(AuthContextV2);

  if (!context) throw Error("Can only be used in an Auth child");
  return context;
};

export default useAuthV2;
