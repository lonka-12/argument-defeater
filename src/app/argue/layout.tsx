'use client';

import "../globals.css";
import { Inter } from "next/font/google";
import Navbar from "../components/Navbar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function ArgueLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} antialiased min-h-screen bg-white`}>
      <style jsx global>{`
        .home-layout {
          display: none;
        }
      `}</style>
      <Navbar />
      {children}
    </div>
  );
} 