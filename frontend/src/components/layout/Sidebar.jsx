import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import useUIStore from "../../store/uiStore";
import { FaGavel } from "react-icons/fa6";


import SidebarItem from "./SidebarItem";

import Logo from "../ui/Logo";
import sidebarLinks from "../../data/sidebarLinks";
import useAuthStore from "../../store/authStore";

const Sidebar = () => {
  const navigate = useNavigate();
  const { sidebarOpen, closeSidebar } = useUIStore();

  const { user, logout, isLoading } = useAuthStore();

  const initials =
    user?.fullName
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .toUpperCase() || "";

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const links = sidebarLinks.filter((link) =>
    link.roles.includes(user?.role)
  );

  return (
        <aside
         className={`
           fixed top-0 left-0 z-40
           h-screen w-64
           border-r border-base-300
           bg-base-100
           flex flex-col
           transition-transform duration-300

           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}

           lg:translate-x-0
      `}  >

      {/* Logo */}
      <div className="border-b border-base-300 p-5">
        <Logo />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-2">
          {links.map((link) => (
            <SidebarItem
              key={link.path}
              to={link.path}
              icon={link.icon}
              label={link.label}
            />
          ))}
        </div>
      </nav>

      {/* Logout  */}
      <div className="border-t border-base-300 p-4">
        <button
          onClick={handleLogout}
          disabled={isLoading}
          className="btn btn-error mt-3 w-full"
        >
          <FaSignOutAlt />

          {isLoading ? "Logging out..." : "Logout"}
        </button>

      </div>
    </aside>
  );
};

export default Sidebar;