import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import PromoBanner from "./components/PromoBanner";
import MainTitle from "./components/MainTitle";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Argument Defeater",
  description: "Analyze and counter arguments with AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <div className="home-layout">
          <Navbar />
          <PromoBanner />
          <MainTitle />
        </div>
        {children}
      </body>
    </html>
  );
}
