"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import MobileSidebar from "../ui/mobile-sidebar";

type NavbarLogoProps = {
  onOpenMobileMenu: () => void;
};

export function NavbarLogo({ onOpenMobileMenu }: NavbarLogoProps) {
  const pathname = usePathname();
  const isDashboard = pathname.startsWith("/dashboard") || 
                      pathname.startsWith("/media") || 
                      pathname.startsWith("/create-post") ||
                      pathname.startsWith("/scheduled") ||
                      pathname.startsWith("/accounts") ||
                      pathname.startsWith("/settings") ||
                      pathname.startsWith("/activity");

  return (
    <div className="flex items-center gap-4">
      {/* Dashboard Mobile Sidebar */}
      {isDashboard && <MobileSidebar />}

      {/* Hamburger (Mobile) - for main nav */}
      {!isDashboard && (
        <button
          className="hamburger-btn lg:hidden"
          onClick={onOpenMobileMenu}
        >
          <Menu size={28} />
        </button>
      )}

      <Link href="/" className="acc-logo font-pacifico text-3xl cursor-pointer">
        Media<span>Manager</span>
      </Link>
    </div>
  );
}
