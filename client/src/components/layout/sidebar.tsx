import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  Tag,
  Settings,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { cn } from "./utils/utils";

type SidebarItem = {
  title: string;
  icon: any;
  path: string;
  active?: boolean;
};

export const Sidebar = () => {
  const location = useLocation();
  const [expanded, setExpanded] = useState(true);

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
      active: location.pathname === "/",
    },
    {
      title: "Blog Posts",
      icon: FileText,
      path: "/blog-posts",
      active: location.pathname.startsWith("/blog-posts"),
    },
    {
      title: "Categories",
      icon: Tag,
      path: "/categories",
      active: location.pathname.startsWith("/categories"),
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
      active: location.pathname.startsWith("/settings"),
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-300 shadow-lg transition-all duration-300",
        expanded ? "w-64" : "w-20"
      )}
    >
      <div className="flex items-center p-4 h-16 border-b border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
            M
          </div>
          {expanded && <span className="ml-3 text-lg font-semibold text-white">My Blogsite</span>}
        </div>
        <button
          className="ml-auto text-gray-400 hover:text-white"
          onClick={() => setExpanded(!expanded)}
        >
          <ChevronRight
            className={cn("h-5 w-5 transition-transform", expanded ? "rotate-180" : "")}
          />
        </button>
      </div>

      <nav className="flex-1 pt-5">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.title}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 rounded-md transition-all",
                  item.active
                    ? "bg-blue-600 text-white shadow-md"
                    : "hover:bg-gray-700 hover:text-white"
                )}
              >
                <item.icon
                  className={cn("h-5 w-5", item.active ? "text-white" : "text-gray-400")}
                />
                {expanded && <span className="ml-3">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-700">
        <Link
          to="/logout"
          className="flex items-center px-4 py-3 rounded-md transition-all hover:bg-gray-700 hover:text-white"
        >
          <LogOut className="h-5 w-5 text-gray-400" />
          {expanded && <span className="ml-3">Logout</span>}
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;