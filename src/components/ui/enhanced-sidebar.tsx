"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  BarChart3,
  Activity,
} from "lucide-react";
import { cn } from "../../lib/utils";
import "../../styles/enhanced-sidebar.css";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

export default function EnhancedSidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href);
  };

  const mainSections: SidebarSection[] = [
    {
      title: "Main",
      items: [
        {
          label: "Dashboard",
          href: "/dashboard",
          icon: <Home className="h-5 w-5" />,
        },
        {
          label: "Media",
          href: "/media",
          icon: <ImageIcon className="h-5 w-5" />,
        },
        {
          label: "Create Post",
          href: "/create-post",
          icon: <PlusCircle className="h-5 w-5" />,
        },
      ],
    },
    {
      title: "Content",
      items: [
        {
          label: "Scheduled",
          href: "/scheduled",
          icon: <Calendar className="h-5 w-5" />,
        },
        {
          label: "Accounts",
          href: "/accounts",
          icon: <LinkIcon className="h-5 w-5" />,
        },
        {
          label: "Activity",
          href: "/activity",
          icon: <Activity className="h-5 w-5" />,
        },
      ],
    },
    {
      title: "Settings",
      items: [
        {
          label: "Settings",
          href: "/settings",
          icon: <Settings className="h-5 w-5" />,
        },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "enhanced-sidebar",
        collapsed && "enhanced-sidebar--collapsed"
      )}
    >
      {/* Header with Logo and Toggle */}
      <div className="sidebar-header">
        <div className="sidebar-logo">
          {!collapsed && (
            <span className="logo-text">Media Handler</span>
          )}
        </div>
        <button
          className="sidebar-toggle"
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <ChevronLeft className="h-5 w-5" />
          )}
        </button>
      </div>

      {/* Navigation Sections */}
      <nav className="sidebar-nav">
        {mainSections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="sidebar-section">
            {section.title && !collapsed && (
              <div className="sidebar-section-title">{section.title}</div>
            )}
            <div className="sidebar-items">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "sidebar-item",
                      active && "sidebar-item--active"
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className="sidebar-item-icon">{item.icon}</span>
                    {!collapsed && (
                      <>
                        <span className="sidebar-item-label">{item.label}</span>
                        {item.badge && (
                          <span className="sidebar-item-badge">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Divider */}
      <div className="sidebar-divider" />

      {/* Footer - Logout */}
      <div className="sidebar-footer">
        <button
          className="sidebar-item sidebar-item--logout"
          title={collapsed ? "Logout" : undefined}
        >
          <span className="sidebar-item-icon">
            <LogOut className="h-5 w-5" />
          </span>
          {!collapsed && <span className="sidebar-item-label">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
