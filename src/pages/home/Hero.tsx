import { FaAngleRight } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { BackgroundShapes } from "./design/design";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative">
      <div className="section-container">
        <BackgroundShapes />
        <div className="mt-40 space-y-4 text-center">
          <h1 className="mx-auto max-w-xl text-5xl font-bold text-cyan-700">
            Pharmacy Mangment Easier Than Before.
          </h1>
          <p className="mx-auto max-w-lg text-lg text-gray-600">
            FastAF simplifies pharmacy management, medicine tracking, and
            more—giving you the tools to run your pharmacy smarter and faster.
          </p>
        </div>

        <Button
          className="group relative mx-auto mt-6 flex w-fit cursor-pointer items-center gap-1 rounded-sm bg-cyan-700 px-6 py-1 shadow-xl hover:bg-cyan-800"
          onClick={() => navigate("/sign-portal")}
        >
          <div className="absolute -inset-0 -z-10 bg-gradient-to-r from-cyan-700 to-emerald-600 blur transition-all duration-150 group-hover:-inset-1" />
          <FaAngleRight className="size-4" />
          <span>Try now for free</span>
        </Button>

        <div className="mt-30 flex flex-col items-center space-y-3">
          <div className="size-5 animate-bounce rounded-full bg-cyan-700" />
          <hr className="w-10 border-1 border-black" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
