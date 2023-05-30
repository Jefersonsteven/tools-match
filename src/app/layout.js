"use client";
import { AppProvider } from "@/context/AppContext";
import "./globals.css";
import { Inter } from "next/font/google";
import Header from "@/components/Header/Header";
import { usePathname } from "next/navigation";
import Footer from "@/components/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <AppProvider>
      <html lang="en">
        <head>
          <title>Tools Match</title>
          <link rel="icon" href="/favicon.ico" />
        </head>
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </AppProvider>
  );
}
