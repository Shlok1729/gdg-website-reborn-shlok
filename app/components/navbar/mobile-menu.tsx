"use client";

import Link from "next/link";

interface MobileMenuProps {
  items?: any[];
}

export function MobileMenu({ items }: MobileMenuProps) {
  return (
    <Link
      href="/menu"
      className="px-5 py-2 text-sm font-medium text-foreground border rounded-full hover:bg-accent transition-colors z-50 relative"
    >
      Menu
    </Link>
  );
}
