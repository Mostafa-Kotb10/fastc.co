import { motion, useMotionValueEvent, useScroll, Variants } from "motion/react";
import { Button } from "./ui/button";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import Logo from "./Logo";

const variants: Variants = {
  initial: {
    opacity: 0,
  },
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const Header = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 50) {
      setIsScrolled(false);
    } else {
      setIsScrolled(true);
    }
  });

  return (
    <motion.header
      className={cn(
        "fixed top-0 right-0 left-0 z-20 px-5 py-5 transition-all duration-300",
        isScrolled && "bg-transparent shadow-md backdrop-blur-lg",
      )}
      variants={variants}
    >
      <div className="m-auto grid max-w-6xl grid-cols-2 items-center px-3">
        {/* <div>
          <h2 className="font-bold text-2xl bg-gradient-to-r from-cyan-700 to-emerald-600 bg-clip-text text-transparent">
            FastAF
          </h2>
        </div> */}

        {isScrolled ? (
          <Logo  className="w-[90px]" />
        ) : (
          <Logo type="black" className="w-[90px]" />
        )}

        {/* <motion.nav
          className={`hidden place-content-center justify-items-center md:block`}
          variants={variants}
          initial="hidden"
          animate={isScrolled ? "visible" : "hidden"}
        >
          <ul className="flex items-center gap-5 text-[15px]">
            <li className="cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:text-cyan-700">
              Home
            </li>
            <li className="cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:text-cyan-700">
              About
            </li>
            <li className="cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:text-cyan-700">
              Solutions
            </li>
            <li className="cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:text-cyan-700">
              Features
            </li>
            <li className="cursor-pointer transition-transform duration-200 hover:-translate-y-1 hover:text-cyan-700">
              Pricing
            </li>
          </ul>
        </motion.nav> */}

        <div className="hidden md:block">
          <div className="flex justify-end space-x-2">
            <Button
              asChild
              className="rounded-sm border-2 border-cyan-700 bg-white text-black transition-all duration-300 hover:bg-cyan-800 hover:text-white"
            >
              <Link to="sign-portal?portal=sign-up">Sign Up</Link>
            </Button>
            <Button
              asChild
              className="rounded-sm bg-cyan-700 hover:bg-cyan-800"
            >
              <Link to="sign-portal?portal=sign-in">Login</Link>
            </Button>
          </div>
        </div>

        <div className="place-items-end hidden">
          <FaBars className="size-4 cursor-pointer" />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
