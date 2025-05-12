import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";
// import DashbordBar from "./header/DashbordBar";

const DashboardLayout = () => {
  return (
    <div className="relative bg-emerald-50/15">
        <Sidebar />
      {/* <DashbordBar /> */}
      <main className="mx-auto min-h-screen max-w-7xl px-20 pt-3 md:px-18 py-20">
        {/* <DebugTools /> */}
        <Outlet />
      </main>
    </div>
  );
};

// bg-emerald-50/15

export default DashboardLayout;
