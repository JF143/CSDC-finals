"use client"

import type React from "react"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { LayoutDashboard, Building2, Users, Star, MessageSquare, User, LogOut, ChevronRight } from "lucide-react"
import { cn } from "@/utils/utils"

type SidebarItem = {
  title: string
  icon: React.ElementType
  path: string
  active?: boolean
}

export const Sidebar = () => {
  const location = useLocation()
  const [expanded, setExpanded] = useState(true)

  const sidebarItems: SidebarItem[] = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/",
      active: location.pathname === "/",
    },
    {
      title: "Properties",
      icon: Building2,
      path: "/properties",
      active: location.pathname.startsWith("/properties"),
    },
    {
      title: "Agents",
      icon: Users,
      path: "/agents",
      active: location.pathname.startsWith("/agents"),
    },
    {
      title: "Reviews",
      icon: Star,
      path: "/reviews",
      active: location.pathname.startsWith("/reviews"),
    },
    {
      title: "Messages",
      icon: MessageSquare,
      path: "/messages",
      active: location.pathname.startsWith("/messages"),
    },
    {
      title: "My Profile",
      icon: User,
      path: "/profile",
      active: location.pathname.startsWith("/profile"),
    },
  ]

  return (
    <div
      className={cn("flex flex-col h-screen bg-white border-r transition-all duration-300", expanded ? "w-64" : "w-20")}
    >
      {/* Logo */}
      <div className="flex items-center p-4 h-16">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold">
            Y
          </div>
          {expanded && <span className="ml-2 text-xl font-semibold">Yariga</span>}
        </div>
        <button className="ml-auto text-gray-500 hover:text-gray-700" onClick={() => setExpanded(!expanded)}>
          <ChevronRight className={cn("h-5 w-5 transition-transform", expanded ? "rotate-180" : "")} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 pt-5">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.title}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 transition-colors",
                  item.active && "bg-blue-50 text-blue-600 font-medium border-l-4 border-blue-600",
                )}
              >
                <item.icon className={cn("h-5 w-5", item.active ? "text-blue-600" : "text-gray-500")} />
                {expanded && <span className="ml-3">{item.title}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t">
        <Link
          to="/logout"
          className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
        >
          <LogOut className="h-5 w-5 text-gray-500" />
          {expanded && <span className="ml-3">Logout</span>}
        </Link>
      </div>
    </div>
  )
}

export default Sidebar
