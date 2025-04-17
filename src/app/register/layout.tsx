'use client';

import "../globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable}+ antialiased min-h-screen bg-white`}>
      <style jsx global>{`
        .home-layout {
          display: none;
        }
      `}</style>
      {children}
    </div>
  );
}
