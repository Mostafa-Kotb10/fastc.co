import { motion, MotionValue, useMotionValueEvent } from "motion/react";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { TimelineItem } from "@/constants/constants";

const variants = {
  initial: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
  hidden: {
    opacity: 0,
  },
};

interface TimeLineBlockProps {
  progress: MotionValue;
  item: TimelineItem;
}

const TimeLineBlock = ({ progress, item }: TimeLineBlockProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const targetRef = useRef<HTMLDivElement | null>(null);

  useMotionValueEvent(progress, "change", (latest) => {
    if (!targetRef.current || !targetRef.current.parentElement) return;

    const scrollProgress = parseInt(latest); // Convert scrollYProgress to a number
    const elementPosition =
      (targetRef.current.offsetTop /
        targetRef.current.parentElement.scrollHeight) *
      100;

    console.log("Scroll Progress:", scrollProgress);
    console.log("Element Position:", elementPosition);

    if (scrollProgress >= elementPosition) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  });

  const dir = item.direction === "rtl";

  return (
    <motion.div
      ref={targetRef}
      className="grid grid-cols-[1fr_auto_1fr]"
      variants={variants}
      animate={isVisible ? "visible" : "hidden"}
      transition={{
        duration: .1
      }}
    >
      <div
        className={cn(
          "space-y-2 place-content-center place-items-center",
          dir ? "order-0" : "order-2"
        )}
      >
        <div className=" w-fit space-y-5">
          <h2 className="text-3xl max-w-md  font-bold text-cyan-700">{item.title}</h2>
          <p className="text-gray-700 text-md font-medium place-items-center justfiy-center text-centr max-w-md">
            {item.description}
          </p>
        </div>
      </div>

      <div className={`p-2 z-10 ${item.Bgcolor}   shadow-2xl flex items-center justify-center size-15 rounded-full order-1`}>
        <item.icon className=" size-6 text-gray-700 " />
      </div>

      <div
        className={cn(
          "place-items-center justify-center",
          dir ? "order-2" : "order-0"
        )}
      >
        <img loading="lazy" src={item.src} className="size-[300px]" alt="" />
      </div>
    </motion.div>
  );
};

export default TimeLineBlock;
