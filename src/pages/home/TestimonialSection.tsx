import { motion } from "motion/react";
import TestimonialList from "./TestimonialList";

const TestimonialSection = () => {
  return (
    <section>
      <div className="section-container ">
        <div className="space-y-4">
          <h3 className="text-4xl font-bold text-cyan-700 text-center">
            Why Pharmacies Trust FastAF
          </h3>
          <p className="max-w-lg text-gray-700 text-center mx-auto">
            At FastAF, we take pride in providing seamless pharmacy management
            solutions. Here’s what our customers have to say about their
            experience:
          </p>
        </div>

        <div className="flex items-center overflow-x-hidden mask-carousel mt-10">
          <motion.div
            className="py-10 flex flex-none items-center pr-16 gap-16"
            animate={{
              x: "-50%",
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 40,
              repeatType: "loop",
            }}
          >
            <TestimonialList />
            <TestimonialList />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
