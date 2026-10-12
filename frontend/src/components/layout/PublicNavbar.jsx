import { NavLink } from "react-router-dom";

import Logo from "../ui/Logo";
import ThemeToggle from "../ui/ThemeToggle";

const PublicNavbar = () => {
  return (
    <header className="border-b border-base-300 bg-base-100">
      <div className="navbar mx-auto max-w-7xl px-6">
        <div className="navbar-start">
          <Logo />
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-2 px-1">
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            <li>
              <a href="#">About</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <ThemeToggle />

          <NavLink
            to="/login"
            className="btn btn-primary"
          >
            Login
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default PublicNavbar;