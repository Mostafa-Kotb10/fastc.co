import { cn } from "@/lib/utils";
import { LoaderCircle } from "lucide-react";

interface SpinnerProps {
  size?: number;
  className?: string;
  containerStyles?: string;
}

export const FullScreenSpinner = ({ size }: SpinnerProps) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner size={size} />
    </div>
  );
};

export const Spinner = ({
  size = 16,
  className,
  containerStyles,
}: SpinnerProps) => {
  const classSize = size >= 24 ? "w-6 h-6" : "w-4 h-4";
  return (
    <div className={containerStyles}>
      <LoaderCircle
        className={cn(`animate-spin ${classSize}`, className)}
        role="status"
        aria-busy="true"
      />
    </div>
  );
};
