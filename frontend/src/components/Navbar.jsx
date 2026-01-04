import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, LogOutIcon, Volleyball } from "lucide-react";
import ThemeSelector from "./ThemeSelector";
import useLogout from "../hooks/useLogout";

const Navbar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const isChatPage = location.pathname?.startsWith("/chat");

  const { logoutMutation } = useLogout();

  return (
    <nav className="sticky top-0 z-30 bg-base-100 border-b border-base-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* LEFT — LOGO */}
        <Link to="/" className="flex items-center gap-3">
          
          <span className="text-2xl font-extrabold tracking-tight text-primary">
           
          </span>
        </Link>

        {/* RIGHT — ACTIONS */}
        <div className="flex items-center gap-3 sm:gap-4">

          {/* Notifications */}
          <Link to="/notifications">
            <button className="btn btn-ghost btn-circle">
              <BellIcon className="h-5 w-5 text-base-content" />
            </button>
          </Link>

          {/* Theme Selector */}
          <ThemeSelector />

          {/* Avatar */}
          <div className="avatar">
            <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={authUser?.profilePic}
                alt="User Avatar"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Logout */}
          <button
            onClick={logoutMutation}
            className="btn btn-ghost btn-circle"
          >
            <LogOutIcon className="h-5 w-5 text-base-content" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
