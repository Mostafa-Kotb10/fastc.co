import { cn } from "@/lib/utils";
import React from "react";

const DashboardHeader = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <h1 className={cn("text-4xl font-bold", className)}>{children}</h1>;
};

export default DashboardHeader;
