import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import TimeLineBlock from "./TimeLineBlock";
import { timelineItems } from "@/constants/constants";
import SectionHeading from "@/components/SectionHeading";

const VerticalTimeline = () => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end end"],
  });

  const progress = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ["0%", "20%", "50%", "100%"]
  );

  return (
    <section className="relative min-h-screen py-20">
      <SectionHeading
        title="Our Insights"
        text="Streamline operations with automated invoicing, inventory tracking, and secure access control. Gain insights with dashboards and manage stock efficiently. "
      />
      <div className="relative px-3">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bottom-0 w-1">
          <motion.div
            className="top-0 absolute bg-gradient-to-b from-cyan-700 from-50% to-emerald-400 z-10 left-1/2 -translate-x-1/2 w-1"
            style={{ height: progress }}
            transition={{ type: "spring", stiffness: 60, damping: 30 }}
          />
        </div>

        <div ref={targetRef} className="relative space-y-32 pt-40 mt-30">
          {timelineItems.map((item) => (
            <TimeLineBlock progress={progress} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VerticalTimeline;
