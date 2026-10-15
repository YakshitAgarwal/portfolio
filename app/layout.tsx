import type { Metadata } from "next";
import { Instrument_Sans, Martian_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { profile } from "./profile";
import "./globals.css";

const sans = Instrument_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const mono = Martian_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: `${profile.name}, ${profile.role}`,
  description: profile.bio,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
