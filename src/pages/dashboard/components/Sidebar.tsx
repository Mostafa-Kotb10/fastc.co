import Logo from "@/components/Logo";
import { sidebarLinks } from "@/constants/constants";
import { SidebarProvider } from "@/context/SidebarContext";
import { useSidebarContext } from "@/hooks/useSidebarContext";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { IconType } from "react-icons";
import { FiSidebar } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const Sidebar = () => {
  return (
    <SidebarProvider>
      <SidebarContainer />
    </SidebarProvider>
  );
};

const SidebarContainer = () => {
  const { isOpen, setIsOpen, setActive } = useSidebarContext();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname.split("/").pop() || "";
    const currentMenuItem = sidebarLinks.find(
      (link) => link.path === currentPath,
    );
    if (currentMenuItem) {
      setActive(currentMenuItem.title);
    }
  }, [location.pathname, setActive]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <motion.nav
      ref={sidebarRef}
      className="pointer-events-auto fixed left-0 z-10 h-screen shrink-0 border-r border-slate-300 bg-cyan-950 p-2"
      style={{
        width: isOpen ? "225px" : "fit-content",
        height: "100vh",
      }}
    >
      <TitleSection />
      <motion.div className="flex w-full flex-col gap-1">
        {sidebarLinks.map(({ title, path, icon: Icon }) => (
          <Option key={path} title={title} path={path} Icon={Icon} />
        ))}
      </motion.div>
    </motion.nav>
  );
};

type OptionProps = {
  title: string;
  path: string;
  Icon: IconType;
};

const Option = ({ title, path, Icon }: OptionProps) => {
  const { active, isOpen, setActive } = useSidebarContext();

  const isActive = active === title;

  return (
    <Link to={path}>
      <motion.button
        className={cn(
          "group relative flex h-10 w-full cursor-pointer items-center transition-colors hover:bg-white",
        )}
        onClick={() => setActive(title)}
      >
        <motion.div
          className={cn(
            "absolute inset-0 -z-10 h-full text-white",
            isActive && "bg-white",
          )}
        />
        <motion.div
          className={cn(
            "pointer-events-none grid h-full w-10 place-content-center text-lg text-white group-hover:text-black",
            isActive && "text-black",
          )}
        >
          <Icon />
        </motion.div>
        {isOpen && (
          <motion.span
            className={cn(
              "text-sm text-white group-hover:text-black",
              isActive && "text-black",
            )}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.1,
            }}
          >
            {title}
          </motion.span>
        )}
      </motion.button>
    </Link>
  );
};

const TitleSection = () => {
  const { isOpen, toggleSidebar } = useSidebarContext();

  return (
    <motion.div className="mb-3 border-b border-slate-300 pb-3">
      <div className="flex cursor-pointer items-center justify-between rounded-md transition-colors">
        {isOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.1,
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                delay: 0.1,
              }}
            >
              <Link to="/">
                <Logo className="h-10" />
              </Link>
            </motion.div>
          </motion.div>
        )}
        <motion.div
          className="grid size-10 place-content-center"
          onClick={toggleSidebar}
        >
          <FiSidebar className="size-5 text-white" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Sidebar;

