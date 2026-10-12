import { NavLink } from "react-router-dom";
import useUIStore from "../../store/uiStore";

const SidebarItem = ({ to, icon: Icon, label }) => {

    const closeSidebar = useUIStore((state) => state.closeSidebar);
  return (
    <NavLink
      to={to}
      onClick={closeSidebar}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
          isActive
            ? "bg-primary text-primary-content"
            : "hover:bg-base-200"
        }`
      }
    >
      <Icon className="text-lg" />
      <span>{label}</span>
    </NavLink>
  );
};

export default SidebarItem;