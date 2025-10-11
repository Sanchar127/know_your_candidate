import type { Metadata } from "next";
import "./globals.css";
import RootLayoutClient from "./RootLayoutClient"; // Client component

export const metadata: Metadata = {
  title: "Know Your Candidate",
  description: "Explore candidates and make informed decisions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
