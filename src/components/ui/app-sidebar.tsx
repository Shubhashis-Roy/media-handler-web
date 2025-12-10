"use client";

import Link from "next/link";
import {
  Home,
  ImageIcon,
  PlusCircle,
  Calendar,
  Settings,
  LogOut,
  LinkIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import "../../styles/app-sidebar.css";

export default function AppSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Collapse / Expand Button */}
      <button className="collapse-btn" onClick={onToggle}>
        {collapsed ? (
          <ChevronRight className="icon" />
        ) : (
          <ChevronLeft className="icon" />
        )}
      </button>

      {/* Menu */}
      <nav className="sidebar-menu">
        <Link href="/dashboard" className="sidebar-item">
          <Home className="icon" />
          {!collapsed && <span>Dashboard</span>}
        </Link>

        <Link href="/media" className="sidebar-item">
          <ImageIcon className="icon" />
          {!collapsed && <span>Media</span>}
        </Link>

        <Link href="/create-post" className="sidebar-item">
          <PlusCircle className="icon" />
          {!collapsed && <span>Create Post</span>}
        </Link>

        <Link href="/scheduled" className="sidebar-item">
          <Calendar className="icon" />
          {!collapsed && <span>Scheduled</span>}
        </Link>

        <Link href="/accounts" className="sidebar-item">
          <LinkIcon className="icon" />
          {!collapsed && <span>Accounts</span>}
        </Link>

        <Link href="/settings" className="sidebar-item">
          <Settings className="icon" />
          {!collapsed && <span>Settings</span>}
        </Link>

        <button className="sidebar-item logout">
          <LogOut className="icon" />
          {!collapsed && <span>Logout</span>}
        </button>
      </nav>
    </aside>
  );
}
