"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/app/lib/utils";

interface NavbarLeftProps {
  logo?: string | any;
  badgeText?: string;
  href?: string;
  className?: string;
}

export function NavbarLeft({
  logo,
  badgeText = "GDG NITH",
  href = "/",
  className,
}: NavbarLeftProps) {
  return (
    <Link
      href={href}
      aria-label="Logo"
      className={cn(
        "relative z-20 flex items-center space-x-2 px-2 py-1 rounded-2xl shrink-0 group hover:opacity-80 transition-opacity",
        className
      )}
    >
      {logo && (
        <Image
          height={40}
          width={280}
          className="h-10 w-auto"
          src={logo}
          alt="logo"
          loading="eager"
          priority
          unoptimized
        />
      )}
      <span className="px-3 py-1 text-sm font-medium border border-current rounded-full whitespace-nowrap">
        {badgeText}
      </span>
    </Link>
  );
}
