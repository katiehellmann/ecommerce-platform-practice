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
    <html lang="en" className="h-full">
      <body className="flex flex-col min-h-screen bg-bg font-serif">
        <Navbar />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <footer className="p-2 w-full bg-footer text-card">
          <p>Website created by Katie Hellmann. This web application is a simulation, purely for practice purposes.</p>
        </footer>
      </body>
    </html>
  );
}
