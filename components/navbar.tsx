"use client";
import { useCartStore } from "@/store/cartStore";
import {
  ShoppingCartIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
//create a navbar with appropriate links
export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const { items } = useCartStore();
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
<nav className="font-serif sticky top-0 z-50 bg-primaryUI shadow">
  <div className="container mx-auto flex items-center justify-between px-4 py-4">
    <Link href="/" className="hover:text-card">
      Busy Bee Farms
    </Link>

    <div className="flex items-center space-x-6 ml-auto">
      <div className="hidden md:flex space-x-6">
        {/* <Link href="/">Home</Link> */}
        <Link href="/products" className="hover:text-card">
          Products
        </Link>
        <Link href="/checkout" className="hover:text-card">
          Checkout
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <Link href="/checkout" className="relative">
          <ShoppingCartIcon className="h-6 w-6" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent1 text-xs text-white">
              {cartCount}
            </span>
          )}
        </Link>
        <Button
          variant="ghost"
          className="md:hidden hover:bg-card"
          onClick={() => setMobileOpen((prev) => !prev)}
        >
          {mobileOpen ? (
            <XMarkIcon className="h-6 w-6" />
          ) : (
            <Bars3Icon className="h-6 w-6" />
          )}
        </Button>
      </div>
    </div>
  </div>

  {mobileOpen && (
    <nav className="md:hidden bg-white shadow-md">
      <ul className="flex flex-col p-4 space-y-2">
        <li>
          <Link href="/" className="block hover:text-card">
            Home
          </Link>
        </li>
        <li>
          <Link href="/products" className="block hover:text-card">
            Products
          </Link>
        </li>
        <li>
          <Link href="/checkout" className="block hover:text-card">
            Checkout
          </Link>
        </li>
      </ul>
    </nav>
  )}
</nav>
  );
};
