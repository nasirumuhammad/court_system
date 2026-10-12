import {
  FaHome,
  FaBalanceScale,
  FaCalendarAlt,
  FaFileAlt,
  FaUsers,
  FaChartBar,
  FaUserCircle,
} from "react-icons/fa";

const sidebarLinks = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: FaHome,
    roles: ["Admin", "Clerk", "Judge", "Lawyer"],
  },

  {
    label: "Cases",
    path: "/dashboard/cases",
    icon: FaBalanceScale,
    roles: ["Admin", "Clerk", "Judge", "Lawyer"],
  },

  {
    label: "Hearings",
    path: "/dashboard/hearings",
    icon: FaCalendarAlt,
    roles: ["Admin", "Clerk", "Judge", "Lawyer"],
  },

  {
    label: "Documents",
    path: "/dashboard/documents",
    icon: FaFileAlt,
    roles: ["Admin", "Clerk", "Judge", "Lawyer"],
  },

  {
    label: "Users",
    path: "/dashboard/users",
    icon: FaUsers,
    roles: ["Admin"],
  },

  {
    label: "Reports",
    path: "/dashboard/reports",
    icon: FaChartBar,
    roles: ["Admin", "Clerk"],
  },

  {
    label: "Profile",
    path: "/dashboard/profile",
    icon: FaUserCircle,
    roles: ["Admin", "Clerk", "Judge", "Lawyer"],
  },
];

export default sidebarLinks;