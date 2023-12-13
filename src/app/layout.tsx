"use client";

// import type { Metadata } from "next";
import { Provider } from "react-redux";
import { Inter } from "next/font/google";
import "./globals.css";
import { store } from "@/redux/store";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </Provider>
  );
}
