"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ConnectButton from "../web3/ConnectButton";
import { Menu, X } from "lucide-react";
import { ConnectButton2 } from "../dynamic/cbutton";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Ensure the component is only rendered on the client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // Avoid rendering dynamic content on the server
    return null;
  }

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Web3 App
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="hover:text-blue-600">
              Dashboard
            </Link>
            <Link href="/portfolio" className="hover:text-blue-600">
              Portfolio
            </Link>
            <ConnectButton />
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/dashboard"
                className="hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                href="/portfolio"
                className="hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Portfolio
              </Link>
              <div className="py-2">{/* <ConnectButton /> */}</div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
