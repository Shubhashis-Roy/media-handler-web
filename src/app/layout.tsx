import type { Metadata } from "next";
import "../styles/globals.css"; // main theme + CSS variables
import "../styles/enhanced-sidebar.css"; // enhanced sidebar
import "../styles/dashboard-improvements.css"; // dashboard improvements

import { Geist, Geist_Mono, Pacifico, Saira } from "next/font/google";

import Navbar from "../components/navbar";
import { Toaster } from "../components/ui/toaster";
import { AppProviders } from "./Providers";

// ------------------------
// FONT CONFIG
// ------------------------
const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
});

const saira = Saira({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-saira",
  display: "swap",
});

// ------------------------
// METADATA
// ------------------------
export const metadata: Metadata = {
  title: "Media Manager",
  description: "Manage & schedule media effortlessly.",
};

// ------------------------
// ROOT LAYOUT
// ------------------------
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${pacifico.variable}
        ${saira.variable}
        font-saira
        bg-[--color-bg]
        text-[--color-text]
        transition-colors duration-300
      `}
    >
      <body className="antialiased min-h-screen">
        <AppProviders>
          <Navbar />
          {children}
          <Toaster />
        </AppProviders>
      </body>
    </html>
  );
}
