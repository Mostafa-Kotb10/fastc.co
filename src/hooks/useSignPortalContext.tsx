import { signPortalContext } from "@/context/SignPortalContext";
import { useContext } from "react";

const useSignPortalContext = () => {
  const context = useContext(signPortalContext);

  if (!context) throw Error("should ony be used in PortalProvider boundries");
  return context;
};

export default useSignPortalContext;
