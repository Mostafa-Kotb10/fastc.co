import { motion } from "motion/react";

import { techStack } from "@/constants/constants";

const Marquee = () => {
  return (
    <section className="section-container">
      <div className="flex overflow-hidden mask-carousel py-2">
        <motion.div
          className="flex gap-16 flex-none pr-16 "
          animate={{ x: "-50%" }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop",
          }}
        >
          <Stack />
          <Stack />
        </motion.div>
      </div>
    </section>
  );
};

const Stack = () => {
  return (
    <ul className="flex gap-16">
      {techStack.map((tech, index) => (
        <motion.li
          key={index}
          className="group flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-110"
          initial={{
            color: "gray",
          }}
          whileHover={{
            color: tech.color,
          }}
        >
          <tech.icon size={40} className="transition-colors duration-300" />
          <p className="mt-2 text-sm text-gray-700 group-hover:text-black">
            {tech.name}
          </p>
        </motion.li>
      ))}
    </ul>
  );
};

export default Marquee;
