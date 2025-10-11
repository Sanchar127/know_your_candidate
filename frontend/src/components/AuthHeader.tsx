"use client";

import Link from "next/link";
import Button from "./ui/Button";

interface AuthHeaderProps {
  vertical?: boolean; // for mobile dropdown, stack buttons vertically
  onClick?: () => void; // optional click handler for closing mobile menu
}

export default function AuthHeader({ vertical = false, onClick }: AuthHeaderProps) {
  return (
    <header className="bg-white-100 shadow-md w-full z-50 mt-2">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-3 flex justify-between items-center">
        <div className="text-lg font-semibold text-stone-800">
          Account
        </div>

        <div className={vertical ? "flex flex-col gap-2" : "flex gap-4"}>
          <Link
            href="/login"
            onClick={onClick}
            className="text-stone-800 font-semibold px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-all duration-300 text-center"
          >
            Login
          </Link>
          <Button
            href="/signup"
            onClick={onClick}
            className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600 transition-all duration-300 w-full text-center"
          >
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
