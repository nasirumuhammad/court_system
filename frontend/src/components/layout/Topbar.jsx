import { FaBars, FaBell, FaChevronDown } from "react-icons/fa";
import useUIStore from "../../store/uiStore";
import { Link, useLocation } from "react-router-dom";

import UserAvatar from "../common/UserAvatar";
import useAuthStore from "../../store/authStore";
import ThemeToggle from "../ui/ThemeToggle";

const Topbar = () => {

  const { user } = useAuthStore();
  const toggleSidebar = useUIStore((state) => state.toggleSidebar);
  const location = useLocation();

  const titles = {
  "/dashboard": "Dashboard",
  "/dashboard/cases": "Cases",
  "/dashboard/hearings": "Hearings",
  "/dashboard/documents": "Documents",
  "/dashboard/users": "Users",
  "/dashboard/reports": "Reports",
  "/dashboard/profile": "Profile",
    };


    const pageTitle = titles[location.pathname] || "Dashboard";

 const {  logout} = useAuthStore();

 const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };


  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-base-300 bg-base-100 px-6">

      {/* Left */}
      <div className="flex items-center gap-4">

               <button
                 onClick={toggleSidebar}
                    className="btn btn-ghost btn-square lg:hidden" >       
                 <FaBars />
                </button>

       <h1 className="text-2xl font-bold">
             {pageTitle}
        </h1>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <button className="btn btn-ghost btn-circle">
          <ThemeToggle />
        </button>

        <div className="dropdown dropdown-end">

          <label
            tabIndex={0}
            className="flex cursor-pointer items-center gap-3 rounded-xl p-2 hover:bg-base-200"
          >

            <UserAvatar
              fullName={user?.fullName}
            />

            <div className="hidden text-left md:block">

              <p className="font-medium">
                {user?.fullName}
              </p>

              <p className="text-xs text-base-content/60">
                {user?.role}
              </p>

            </div>

            <FaChevronDown className="text-xs" />

          </label>

          <ul
            tabIndex={0}
            className="menu dropdown-content z-100 mt-3 w-52 rounded-box border bg-base-100 p-2 shadow"
          >

            <li>
              <Link to={'/dashboard/profile'}>
              <a>My Profile</a>
              </Link>
            </li>

            <li onClick={handleLogout}>
              <a>Logout</a>
            </li>

          </ul>

        </div>

      </div>

    </header>
  );
};

export default Topbar;