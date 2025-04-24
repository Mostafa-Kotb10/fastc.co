import { useSignUpStore } from "@/store/signUpStore";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";

const RequireSignUp = ({ children }: { children: React.ReactNode }) => {
  // const { jwt, user } = useSignUpStore();
  // const navigate = useNavigate();

  // useLayoutEffect(() => {
  //   if (!jwt || !user) navigate("/sign-portal?portal=sign-up");
  // }, [jwt, user, navigate]);

  // if (!jwt || !user) {
  //   return null;
  // }

  return children;
};

export default RequireSignUp;
