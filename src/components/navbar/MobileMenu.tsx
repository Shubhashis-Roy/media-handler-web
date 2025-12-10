"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

type NavLink = { name: string; href: string };

type MobileMenuProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  navLinks: NavLink[];
  subNavLinks: NavLink[];
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

export function MobileMenu({
  mobileMenuOpen,
  setMobileMenuOpen,
  navLinks,
  subNavLinks,
  isLoggedIn,
  setIsLoggedIn,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {mobileMenuOpen && (
        <>
          <motion.div
            className="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
          />

          <motion.div
            className="mobile-menu-panel"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="mobile-menu-header">
              <span className="font-pacifico text-2xl">MediaManager</span>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={26} />
              </button>
            </div>

            <div className="mobile-menu-links">
              {subNavLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="h-px bg-[var(--color-border)] my-2" />

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="mt-auto pb-8">
              {!isLoggedIn ? (
                <Link href="/login">
                  <button className="mobile-login-btn">Login</button>
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setIsLoggedIn(false);
                    setMobileMenuOpen(false);
                  }}
                  className="mobile-logout-btn"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
