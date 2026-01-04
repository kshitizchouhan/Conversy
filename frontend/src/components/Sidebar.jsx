import { Link, useLocation } from "react-router";
import useAuthUser from "../hooks/useAuthUser";
import { BellIcon, HomeIcon, UsersIcon, Volleyball } from "lucide-react";

const Sidebar = () => {
  const { authUser } = useAuthUser();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="hidden lg:flex w-72 h-screen sticky top-0 flex-col bg-base-100 border-r border-base-300">

      {/* LOGO */}
      <div className="p-6 border-b border-base-300">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center">
            <Volleyball className="text-primary" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-primary">
            Conversy
          </span>
        </Link>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 p-4 space-y-2">
        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition
            ${
              currentPath === "/"
                ? "bg-primary text-primary-content"
                : "hover:bg-base-200 text-base-content"
            }`}
        >
          <HomeIcon className="size-5" />
          Home
        </Link>
        <Link
          to="/notifications"
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-medium transition
            ${
              currentPath === "/notifications"
                ? "bg-primary text-primary-content"
                : "hover:bg-base-200 text-base-content"
            }`}
        >
          <BellIcon className="size-5" />
          Notifications
        </Link>
      </nav>

      {/* USER PROFILE */}
      <div className="p-4 border-t border-base-300">
        <div className="flex items-center gap-3 bg-base-200 rounded-2xl p-3">
          <div className="avatar">
            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={authUser?.profilePic}
                alt="User Avatar"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          <div className="flex-1">
            <p className="font-semibold text-sm text-base-content">
              {authUser?.fullName}
            </p>
            <p className="text-xs text-success flex items-center gap-1">
              <span className="size-2 rounded-full bg-success inline-block" />
              Online
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
