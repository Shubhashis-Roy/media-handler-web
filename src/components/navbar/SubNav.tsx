"use client";

import Link from "next/link";
import { motion } from "framer-motion";

type NavLink = { name: string; href: string };

type SubNavProps = {
  pathname: string | null;
  subNavLinks: NavLink[];
};

export function SubNav({ pathname, subNavLinks }: SubNavProps) {
  return (
    <div className="acc-subnav mt-[72px]">
      <div className="acc-subnav-inner">
        {subNavLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            <span
              className={`cursor-pointer relative py-4 ${
                pathname === link.href ? "opacity-100" : "opacity-80"
              }`}
            >
              {link.name}

              {pathname === link.href && (
                <motion.div
                  layoutId="subnav-indicator"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-white rounded-t-md"
                />
              )}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
