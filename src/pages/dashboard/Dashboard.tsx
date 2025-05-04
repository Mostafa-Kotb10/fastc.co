import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import DashbordBar from "./header/DashbordBar";

const Dashboard = () => {
  return (
    <div className="relative bg-emerald-50/15">
      <div className="pointer-events-none fixed top-0 left-0 z-10 h-screen w-64">
        <Sidebar />
      </div>
      <DashbordBar />
      <main className="mx-auto min-h-screen max-w-7xl px-20 pt-3 md:px-18 py-20">
        {/* <DebugTools /> */}
        <Outlet />
      </main>
    </div>
  );
};

// bg-emerald-50/15

export default Dashboard;
