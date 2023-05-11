"use client";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import { usePathname } from "next/navigation";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();
  return (
    <AppProvider>
      <html lang="en">
        <head>
          <title>Tools Match</title>
        </head>
        <body className={inter.className}>
          {pathname !== "/" && <Header />}
          {children}
        </body>
      </html>
    </AppProvider>
  );
}
