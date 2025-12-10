"use client";

import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import "../styles/footer.css";

export default function Footer() {
  return (
    <footer className="footer-wrapper mt-28">
      {/* Top Glow Divider */}
      <div className="footer-glow"></div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-3 gap-12">

        {/* Brand Column */}
        <div className="text-center md:text-left">
          <h3 className="text-3xl font-pacifico text-[--color-primary] premium-glow-soft">
            MediaManager
          </h3>
          <p className="text-[--color-text-muted] mt-3 max-w-sm">
            A beautifully crafted workspace for creators — where clarity,
            design, and automation meet.
          </p>
        </div>

        {/* Nav Links */}
        <div className="text-center">
          <h4 className="text-lg font-semibold mb-4 text-[--color-text]">
            Quick Links
          </h4>
          <div className="flex flex-col gap-2 text-[--color-text-muted]">
            <Link href="/features">Features</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/templates">Templates</Link>
            <Link href="/blog">Blog</Link>
          </div>
        </div>

        {/* Social Column */}
        <div className="text-center md:text-right">
          <h4 className="text-lg font-semibold mb-4 text-[--color-text]">
            Follow Us
          </h4>

          <div className="flex md:justify-end justify-center gap-4">
            <Link href="#">
              <Facebook className="footer-icon" />
            </Link>
            <Link href="#">
              <Twitter className="footer-icon" />
            </Link>
            <Link href="#">
              <Instagram className="footer-icon" />
            </Link>
            <Link href="#">
              <Linkedin className="footer-icon" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="pb-10 text-center text-sm text-[--color-text-muted]">
        © 2025 MediaManager — Designed with ❤️ for creators.
      </div>
    </footer>
  );
}
