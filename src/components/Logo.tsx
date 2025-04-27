import logo from "@/assets/images/logo.png";
import logoBlack from "@/assets/images/logo-black.png";
import { cn } from "@/lib/utils";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
  type?: "colored" | "black";
}

const Logo = ({ width, height, className, type = "colored" }: LogoProps) => {
  return (
    <div>
      <img
        src={type === "colored" ? logo : logoBlack}
        width={width}
        height={height}
        className={cn("w-full object-cover", className)}
      />
    </div>
  );
};

export default Logo;
