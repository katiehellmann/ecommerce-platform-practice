import type { Metadata } from "next";

import "./globals.css";
import { Navbar } from "@/components/navbar";


export const metadata: Metadata = {
  title: "Busy Bee Farms",
  description: "A Next.js Practice app integrated with Stripe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-full flex-col bg-pink-100">
        <Navbar/>
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
