import { LoaderCircle } from "lucide-react";

interface SpinnerProps {
  size?: number;
}

export const FullScreenSpinner = ({ size }: SpinnerProps) => {
  return (
    <div className="flex h-screen items-center justify-center">
      <Spinner size={size} />
    </div>
  );
};

export const Spinner = ({ size = 16 }: SpinnerProps) => {
  const classSize = size >= 24 ? "w-6 h-6" : "w-4 h-4";
  return (
    <LoaderCircle
      className={`animate-spin ${classSize}`}
      role="status"
      aria-busy="true"
    />
  );
};
