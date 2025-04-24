import { Button } from "@/components/ui/button";
import { motion } from "motion/react";

import { MoveRight, ChevronRight } from "lucide-react";
import Ball from "@/components/Ball";

const Hero = () => {
  return (
    <section>
      <div className="section-container py-0 ">
        <motion.div className="px-10 py-1.5 border-2 border-none rounded-s w-fit mx-auto relative bg-white mt-24 shadow-md rounded-sm flex items-center gap-1">
          <motion.div
            className="bg-gradient-to-r from-blue-900 to-blue-500 blur-sm absolute -inset-2 -z-10"
            initial={{
              rotateZ: 0.6,
            }}
            animate={{
              // rotateX: 40,
              rotateZ: -0.6,
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              duration: 1.5,
            }}
          />
          <ChevronRight className="size-4" />
          <span className="relative">dock version 1.9.0 is out.</span>
        </motion.div>

        <div className="mt-20">
          <motion.h1
            className="text-5xl max-w-xl text-center mx-auto font-bold bg-gradient-to-r from-blue-950 from-50% to-blue-500 bg-clip-text text-transparent
            "
          >
            Build robust websites with Dock AI
          </motion.h1>
          <motion.p className="text-gray-700 max-w-xl text-center mx-auto mt-5">
            Using Dock build high performance websites using a sit of tools to
            help to enhance your capabilities
          </motion.p>

          <motion.div className="flex items-center justify-center mt-6">
            <div className="space-x-3">
              <Button className="rounded-sm bg-white text-black border-2 border-blue-950 hover:bg-blue-950 hover:text-white transition-all duration-300">
                Join Us
              </Button>
              <Button className="bg-blue-800 rounded-sm hover:bg-blue-900 group inline-flex items-center">
                <span>Read The Docs</span>
                <MoveRight className="size-3 text-white group-hover:-rotate-[30deg] transition-transform duration-100" />
              </Button>
            </div>
          </motion.div>
        <Ball />
        </div>
      </div>
    </section>
  );
};

export default Hero;
