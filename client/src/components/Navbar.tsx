// ============================================================
// Navbar.tsx - THE BAR AT THE TOP OF EVERY PAGE
// ------------------------------------------------------------
// The links change depending on the current page:
//   - Home page ("/")  -> "New Task" and "All Tasks"
//   - Any other page   -> just "All Tasks"
// ============================================================

import { Link, useLocation } from "react-router";
import logo from "../assets/Group 2.png";
import profile from "../assets/profile.png";

const linkClass = "font-medium text-[22px] text-[#292929]";

const Navbar = () => {
  const { pathname } = useLocation(); // the current URL path, e.g. "/tasks"
  const isHome = pathname === "/";

  return (
    <header className="bg-[#FAF9FB] border-[0.5px] border-[#B8B6B6]">
      <nav className="max-w-360 flex items-center justify-between px-5 md:px-42.5 mx-auto h-23.25">
        <Link to="/">
          <img src={logo} alt="TaskDuty logo" className="w-32 md:w-auto" />
        </Link>

        <div className="flex items-center gap-4 md:gap-6">
          {isHome && (
            <Link to="/new" className={linkClass}>
              New Task
            </Link>
          )}
          <Link to="/tasks" className={linkClass}>
            All Tasks
          </Link>
          <img src={profile} alt="profile" className="w-8 md:w-auto" />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
