"use client";

import { useEffect } from "react";
import { useSelector } from "../../redux/store";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const root = document.documentElement;

    // Remove any old theme classes
    root.classList.remove("light", "dark");

    // Smooth transition
    root.style.transition = "background-color 300ms, color 300ms";

    // System theme logic
    const applySystemTheme = () => {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.add(isDark ? "dark" : "light");
    };

    if (theme === "system") {
      applySystemTheme();

      // Watch OS theme changes live
      const listener = (e: MediaQueryListEvent) => {
        root.classList.remove("light", "dark");
        root.classList.add(e.matches ? "dark" : "light");
      };

      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      mq.addEventListener("change", listener);

      return () => mq.removeEventListener("change", listener);
    }

    // Manual theme selection
    root.classList.add(theme);
  }, [theme]);

  return <>{children}</>;
}
