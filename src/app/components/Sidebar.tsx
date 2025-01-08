// components/Sidebar.tsx
import React from "react";
import Link from "next/link";

interface SidebarProps {
  logoSrc: string;
  items: {
    href: string;
    imgSrc: string;
    alt: string;
  }[];
}

export default function Sidebar({ logoSrc, items } : SidebarProps) {
  return (
    <aside className="h-screen w-20 flex flex-col items-center py-6">
      {/* Logo */}
      <div className="mb-10">
        <img src={logoSrc} alt="Logo" className="w-12 h-12" />
      </div>

      {/* Navigation Items */}
      <nav className="flex flex-col gap-6">
        {items.map((item, index) => (
          <Link href={item.href} key={index}>
            <img
              src={item.imgSrc}
              alt={item.alt}
              className="w-10 h-10 cursor-pointer hover:opacity-75 transition-opacity"
            />
          </Link>
        ))}
      </nav>
    </aside>
  );
};