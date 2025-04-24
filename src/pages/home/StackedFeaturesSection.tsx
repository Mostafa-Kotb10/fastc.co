import { featureCards } from "@/constants/constants";
import StackedFeatureCard from "./StackedFeatureCard";
import { useScroll } from "motion/react";
import { useRef } from "react";

const StackedFeaturesSection = () => {
  const container = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <section className="min-h-screen">
      <div ref={container}>
        {featureCards.map((feature, index) => (
          <StackedFeatureCard
            key={index}
            progress={scrollYProgress}
            feature={feature}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default StackedFeaturesSection;
