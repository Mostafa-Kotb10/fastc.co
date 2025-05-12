import { motion, AnimatePresence } from "motion/react";

import { cn } from "@/lib/utils";

import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Logo from "@/components/Logo";
import useSignPortalContext from "@/hooks/useSignPortalContext";
import { Link } from "react-router-dom";

import signInImageSrc from "@/assets/images/sign-image.png";
import signUpImageSrc from "@/assets/images/sginupimage.jpg";

const SignPortal = () => {
  const { portal } = useSignPortalContext();

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-gray-100">
      {portal === "sign-in" ? (
        <div>
          <img src={signUpImageSrc} />
        </div>
      ) : (
        <div>
          <img src={signInImageSrc} />
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={portal}
          initial={{ left: portal === "sign-in" ? 0 : "70%", width: "30%" }}
          animate={{ left: portal === "sign-in" ? 0 : "70%" }}
          exit={{ left: portal === "sign-in" ? "70%" : 0 }}
          transition={{ ease: "easeInOut", duration: 0.7 }}
          className={cn(
            "absolute flex h-full flex-col items-center gap-1  rounded-lg bg-white shadow-lg",
          )}
        >
          <Link to="/">
            <Logo className="mt-20 h-[120px]" />
          </Link>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
            className="w-full overflow-x-hidden overflow-y-auto px-14 "
          >
            {portal === "sign-in" ? <SignIn /> : <SignUp />}
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SignPortal;
