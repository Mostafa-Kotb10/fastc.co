import { sidebarContext } from "@/context/SidebarContext";
import { useContext } from "react";

export const useSidebarContext = () => {
  const context = useContext(sidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
};
