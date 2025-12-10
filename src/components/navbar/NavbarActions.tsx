"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import {
  Bell,
  Globe,
  ChevronDown,
  User,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

import { ThemeToggle } from "../ui/theme-toggle";
import { NotificationsModal } from "../notifications-model";

type NavbarActionsProps = {
  langOpen: boolean;
  setLangOpen: (open: boolean) => void;
  profileOpen: boolean;
  setProfileOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
  language: string;
  setLanguage: (lang: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

export function NavbarActions({
  langOpen,
  setLangOpen,
  profileOpen,
  setProfileOpen,
  notificationsOpen,
  setNotificationsOpen,
  language,
  setLanguage,
  isLoggedIn,
  setIsLoggedIn,
}: NavbarActionsProps) {
  return (
    <div className="acc-actions">
      {/* Notifications */}
      <div className="relative hidden sm:flex">
        <button
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          className="acc-icon relative"
        >
          <Bell size={21} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        </button>

        <AnimatePresence>
          {notificationsOpen && (
            <NotificationsModal
              isOpen={notificationsOpen}
              onClose={() => setNotificationsOpen(false)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Language */}
      <div className="acc-lang-wrapper hidden sm:flex relative">
        <button
          className="acc-lang-btn"
          onClick={() => setLangOpen(!langOpen)}
        >
          <Globe size={19} />
          {language}
          <ChevronDown size={14} />
        </button>

        <AnimatePresence>
          {langOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="acc-lang-menu"
            >
              {["EN", "ES", "FR", "HI"].map((l) => (
                <p
                  key={l}
                  onClick={() => {
                    setLanguage(l);
                    setLangOpen(false);
                  }}
                >
                  {l}
                </p>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <ThemeToggle />

      {/* LOGIN / PROFILE */}
      {!isLoggedIn ? (
        <Link href="/login">
          <button className="acc-login-btn hidden sm:flex">Login</button>
        </Link>
      ) : (
        <div className="relative hidden sm:flex">
          <button onClick={() => setProfileOpen(!profileOpen)}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] text-white flex items-center justify-center font-bold shadow-lg ring-2 ring-white/20">
              JD
            </div>
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className="absolute-dropdown absolute right-0 top-14 w-64 origin-top-right"
              >
                <div className="p-5 border-b border-[var(--color-border)] bg-[var(--color-surface-muted)]/50">
                  <p className="font-semibold text-base">John Doe</p>
                  <p className="text-sm text-[var(--color-text-muted)]">
                    john@company.com
                  </p>
                </div>

                <div className="py-2">
                  <Link
                    href="/profile"
                    className="drop-item hover:pl-6 transition-all"
                  >
                    <User size={16} /> Profile
                  </Link>
                  <Link
                    href="/settings"
                    className="drop-item hover:pl-6 transition-all"
                  >
                    <Settings size={16} /> Settings
                  </Link>
                  <Link
                    href="/help"
                    className="drop-item hover:pl-6 transition-all"
                  >
                    <HelpCircle size={16} /> Help Center
                  </Link>
                </div>

                <div className="border-t border-[var(--color-border)] p-2">
                  <button
                    className="drop-item text-red-500 hover:bg-red-500/10 rounded-lg justify-center"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
