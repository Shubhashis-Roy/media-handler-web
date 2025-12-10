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
  Activity,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { cn } from "../../lib/utils";

interface SidebarItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarSection {
  title: string;
  items: SidebarItem[];
}

export default function MobileSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href);
  };

  const sections: SidebarSection[] = [
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b">
            <span className="font-semibold text-lg">Media Handler</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-6">
            {sections.map((section) => (
              <div key={section.title} className="space-y-2">
                <h3 className="text-xs font-semibold text-gray-500 uppercase px-2">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const active = isActive(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2 rounded-lg transition",
                          active
                            ? "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        )}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* Footer - Logout */}
          <div className="border-t p-4">
            <button className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition">
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
