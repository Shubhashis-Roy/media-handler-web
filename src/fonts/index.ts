import { Pacifico, Saira } from "next/font/google";

export const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
});

export const saira = Saira({
  weight: ["300", "400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-saira",
  display: "swap",
});
