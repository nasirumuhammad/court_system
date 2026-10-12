import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Topbar from "../components/layout/Topbar";
import useUIStore from "../store/uiStore";

const DashboardLayout = () => {
  
  const { sidebarOpen, closeSidebar } = useUIStore();
  return (
    <div className="min-h-screen bg-base-200">

      <Sidebar />

            {sidebarOpen && (
                 <div
                   onClick={closeSidebar}
                   className="fixed inset-0 z-30 bg-black/40 lg:hidden"
                 />
              )}

      <div className="lg:ml-64">

        <Topbar />

        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default DashboardLayout;