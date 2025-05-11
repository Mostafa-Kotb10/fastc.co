import { useSignOut } from "@/services/auth/mutations";
import CommandMenu from "./CommandMenu";
import { CiUser } from "react-icons/ci";
import { VscGear } from "react-icons/vsc";
import { PiSignOut } from "react-icons/pi";
import { Link } from "react-router-dom";

const DashbordBar = () => {
  const { signOut } = useSignOut();

  return (
    <div className="bg-slate-100/60">
      <div className="mx-auto max-w-7xl border-b border-slate-300 px-20 py-3 md:px-18">
        <div className="flex items-center justify-between py-2">
          <CommandMenu />

          <div className="flex items-center gap-6 divide-x-2 divide-slate-300">
            <div className="flex items-center gap-3 px-3">
              <Link to="/dashboard/settings">
                <VscGear className="text-muted-foreground size-5 cursor-pointer" />
              </Link>
              <PiSignOut
                className="text-muted-foreground size-5 cursor-pointer"
                onClick={signOut}
              />
            </div>
            <div className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full bg-orange-600">
              <CiUser className="size-6 shrink-0 font-bold text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashbordBar;
