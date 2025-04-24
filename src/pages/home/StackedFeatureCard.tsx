import { FeatureCard, featureCards } from "@/constants/constants";
import { cn } from "@/lib/utils";
import { motion, MotionValue, useTransform } from "motion/react";
import React from "react";

interface StackedFeatureCardProps {
  feature: FeatureCard;
  index: number;
  progress: MotionValue;
}

const StackedFeatureCard: React.FC<StackedFeatureCardProps> = ({
  feature,
  index,
  progress,
}) => {
  const targetScale = 1 - (featureCards.length - index) * 0.05;
  const scale = useTransform(progress, [0, 1], [1, targetScale]);

  return (
    <div
      className="h-screen flex justify-center items-center sticky "
      style={{
        top: `${index * 2}vh`,
      }}
    >
      {index === 0 && (
        <div className="inset-0 absolute -z-10">
          <div className="absolute section-gradient top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[700px] -z-30"></div>
        </div>
      )}
      <motion.div
        className={cn(
          `max-w-3xl mx-auto p-8 rounded-xl shadow-lg bg-white border border-black/30 h-[500px] relative`
        )}
        style={{
          scale,
        }}
      >
        <div className="mb-4">
          <span className="inline-block text-xl px-3 py-1  font-semibold rounded-md bg-emerald-500 text-white">
            0{index + 1}
          </span>
        </div>

        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          {feature.title}
        </h2>

        <p className="text-lg text-gray-600 mb-6">{feature.description}</p>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <div className="w-full md:flex-1 flex flex-col justify-center ">
            <ul className="space-y-3">
              {feature.benefits.map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg
                    className="h-6 w-6 text-green-500 mr-2 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:w-1/2  justify-center items-center h-[230px] hidden md:flex">
            <img
              src={feature.src}
              alt={feature.title}
              className="size-full object-cover rounded-lg"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StackedFeatureCard;
