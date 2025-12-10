"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";

import "../styles/navbar.css";

import { NavbarLogo } from "../components/navbar/NavbarLogo";
import { NavbarLinks } from "../components/navbar/NavbarLinks";
import { NavbarSearch } from "../components/navbar/NavbarSearch";
import { NavbarActions } from "../components/navbar/NavbarActions";
import { MobileMenu } from "../components/navbar/MobileMenu";
import { SubNav } from "../components/navbar/SubNav";
import MobileSidebar from "./ui/mobile-sidebar";

export default function Navbar() {
  const [langOpen, setLangOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const pathname = usePathname();

  const navLinks = [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Templates", href: "/templates" },
    { name: "Blog", href: "/blog" },
  ];

  const subNavLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Media Library", href: "/media-library" },
    { name: "Scheduler", href: "/scheduler" },
    { name: "Activity", href: "/activity" },
    { name: "Team", href: "/team" },
  ];

  return (
    <>
      {/* MAIN NAV */}
      <nav className="acc-nav">
        <div className="acc-inner">
          <NavbarLogo onOpenMobileMenu={() => setMobileMenuOpen(true)} />

          <NavbarLinks
            navLinks={navLinks}
            pathname={pathname}
            searchOpen={searchOpen}
          />

          <NavbarSearch
            searchOpen={searchOpen}
            setSearchOpen={setSearchOpen}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />

          <NavbarActions
            langOpen={langOpen}
            setLangOpen={setLangOpen}
            profileOpen={profileOpen}
            setProfileOpen={setProfileOpen}
            notificationsOpen={notificationsOpen}
            setNotificationsOpen={setNotificationsOpen}
            language={language}
            setLanguage={setLanguage}
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        </div>
      </nav>

      <MobileMenu
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        navLinks={navLinks}
        subNavLinks={subNavLinks}
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
      />

      {/* <SubNav pathname={pathname} subNavLinks={subNavLinks} /> */}
    </>
  );
}
