"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Check, Info, AlertTriangle, X, Clock } from "lucide-react";
import { Button } from "../components/ui/button";
import { ScrollArea } from "../components/ui/scroll-area";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Notification = {
  id: string;
  title: string;
  description: string;
  time: string;
  type: "info" | "success" | "warning";
  read: boolean;
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Project Approved",
    description: "Your 'Summer Campaign' project has been approved by the admin.",
    time: "2 min ago",
    type: "success",
    read: false,
  },
  {
    id: "2",
    title: "System Update",
    description: "Scheduled maintenance will occur tonight at 2:00 AM.",
    time: "1 hour ago",
    type: "info",
    read: false,
  },
  {
    id: "3",
    title: "Storage Warning",
    description: "You have used 85% of your storage capacity.",
    time: "3 hours ago",
    type: "warning",
    read: true,
  },
  {
    id: "4",
    title: "New Comment",
    description: "Sarah left a comment on 'Header Design v2'.",
    time: "5 hours ago",
    type: "info",
    read: true,
  },
  {
    id: "5",
    title: "Export Complete",
    description: "Your video export finished successfully.",
    time: "1 day ago",
    type: "success",
    read: true,
  },
];

interface NotificationsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsModal({ isOpen, onClose }: NotificationsModalProps) {
  const router = useRouter();

  // ⭐ Local state (reactive)
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  // ⭐ Mark All as Read
  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read: true }))
    );
  };

  // ⭐ Navigate and close modal
  const handleNavigateToActivity = (id: string) => {
    router.push(`/activity?highlight=${id}`);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="absolute top-14 right-0 w-[380px] z-50"
    >
      <div className="bg-[var(--color-surface)]/95 backdrop-blur-xl border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden">

        {/* HEADER */}
        <div className="p-4 border-b border-[var(--color-border)] flex items-center justify-between bg-[var(--color-surface-muted)]/50">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-[var(--color-primary)]" />
            <h3 className="font-semibold text-[var(--color-text)]">Notifications</h3>

            {unreadCount > 0 && (
              <span className="bg-[var(--color-primary)] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                {unreadCount} New
              </span>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full hover:bg-[var(--color-border)]"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* LIST */}
        <ScrollArea className="h-[350px] w-full">
          <div className="flex flex-col">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => handleNavigateToActivity(notification.id)}
                className={`p-4 border-b border-[var(--color-border)] last:border-0 hover:bg-[var(--color-surface-muted)] transition-colors cursor-pointer relative ${!notification.read ? "bg-[var(--color-primary)]/5" : ""}`}
              >
                {!notification.read && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-primary)]" />
                )}

                <div className="flex gap-3 items-start">
                  <div
                    className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      notification.type === "success"
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                        : notification.type === "warning"
                        ? "bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400"
                        : "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                    }`}
                  >
                    {notification.type === "success" ? (
                      <Check size={14} />
                    ) : notification.type === "warning" ? (
                      <AlertTriangle size={14} />
                    ) : (
                      <Info size={14} />
                    )}
                  </div>

                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <p
                        className={`text-sm font-medium ${
                          !notification.read
                            ? "text-[var(--color-text)]"
                            : "text-[var(--color-text-muted)]"
                        }`}
                      >
                        {notification.title}
                      </p>

                      <span className="text-[10px] text-[var(--color-text-muted)] flex items-center gap-1 whitespace-nowrap">
                        <Clock size={10} /> {notification.time}
                      </span>
                    </div>

                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed">
                      {notification.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* FOOTER */}
        <div className="p-3 border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]/30 flex justify-between items-center gap-2">

          <Button
            variant="ghost"
            size="sm"
            className="text-xs w-full text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
            onClick={markAllAsRead}   // ⭐ WORKS NOW
          >
            Mark all as read
          </Button>

          <div className="h-4 w-px bg-[var(--color-border)]"></div>

          <Link href="/activity" className="w-full">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs w-full text-[var(--color-text-muted)] hover:text-[var(--color-primary)]"
              onClick={onClose}
            >
              View all activity
            </Button>
          </Link>

        </div>
      </div>
    </motion.div>
  );
}
