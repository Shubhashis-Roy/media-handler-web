"use client";

import Link from "next/link";

type NavLink = {
  name: string;
  href: string;
};

type NavbarLinksProps = {
  navLinks: NavLink[];
  pathname: string | null;
  searchOpen: boolean;
};

export function NavbarLinks({ navLinks, pathname, searchOpen }: NavbarLinksProps) {
  return (
    <div className={`acc-links ${searchOpen ? "hide-nav" : "hidden lg:flex"}`}>
      {navLinks.map((link) => (
        <Link key={link.name} href={link.href}>
          <div
            className={`acc-item ${
              pathname === link.href ? "text-[var(--color-primary)]" : ""
            }`}
          >
            {link.name}
          </div>
        </Link>
      ))}
    </div>
  );
}
