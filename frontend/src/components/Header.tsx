"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Button from "./ui/Button";

import PeopleIcon from "@/layout/icons/PeopleIcon";
import CompareIcon from "@/layout/icons/CompareIcon";
import NewsIcon from "@/layout/icons/NewsIcon";

const navItems = [
  { name: "Candidates", href: "/candidates", icon: PeopleIcon },
  { name: "Compare", href: "/candidates/compare", icon: CompareIcon },
  { name: "News", href: "/news", icon: NewsIcon },
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check token after mount
    const checkLogin = () => setIsLoggedIn(!!localStorage.getItem("access_token"));
    checkLogin();

    window.addEventListener("storage", checkLogin);
    window.addEventListener("scroll", () => setIsScrolled(window.scrollY > 10));

    return () => {
      window.removeEventListener("storage", checkLogin);
      window.removeEventListener("scroll", () => setIsScrolled(window.scrollY > 10));
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLoggedIn(false);
    setMenuOpen(false);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-lg transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 shadow-2xl shadow-purple-500/10 py-3 border-b border-white/20"
          : "bg-gradient-to-b from-white/100 to-white/80 shadow-sm py-5"
      }`}
    >
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">
              Know Your
            </span>
            <span className="text-xs text-gray-500 -mt-1">Candidate</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.name;

            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative group"
                onMouseEnter={() => setActiveItem(item.name)}
                onMouseLeave={() => setActiveItem("")}
              >
                <div
                  className={`flex items-center gap-2 font-medium px-4 py-2.5 rounded-2xl transition-all duration-300 ${
                    isActive
                      ? "text-purple-700 bg-white shadow-lg shadow-purple-500/20"
                      : "text-gray-700 hover:text-purple-600 hover:bg-white/50"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.name}</span>
                </div>
              </Link>
            );
          })}

          <div className="ml-4 pl-4 border-l border-gray-200">
            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                className="relative overflow-hidden group bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
              >
                Logout
              </Button>
            ) : (
              <Link href="/login">
                <Button className="relative overflow-hidden group bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-800 mb-1"></span>
            <span className="block w-6 h-0.5 bg-gray-800"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden mt-2 px-6 pb-4 space-y-2 bg-white shadow-md border-t border-gray-200">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2 rounded-lg hover:bg-purple-100 text-gray-700 font-medium"
            >
              {item.name}
            </Link>
          ))}

          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              className="w-full mt-2 bg-red-500 hover:bg-red-600 text-white"
            >
              Logout
            </Button>
          ) : (
            <Link href="/login" onClick={() => setMenuOpen(false)}>
              <Button className="w-full mt-2 bg-purple-600 hover:bg-purple-700 text-white">
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
