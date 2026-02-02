"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { appConfig } from "@/app/project.config";
import { Icon, type IconType } from "@/app/components/icons/icon-component";

// Animation variants for the container (staggering the children)
const menuVars = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
};

// Animation for individual links (slide up effect)
const linkVars = {
  initial: {
    y: "30vh",
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
  },
};

const getHref = (item: { type?: string; href?: string }): string => {
  if (item.type === "link") {
    return item.href || "#";
  }
  return item.href || "#";
};

const getHoverColor = (index: number): string => {
  const colors = [
    "text-blue-500",    // Blue
    "text-red-500",     // Red
    "text-green-500",   // Green
    "text-yellow-500",  // Yellow
  ];
  return colors[index % colors.length];
};

export default function MenuPage() {
  // Only use nav links (no social links)
  const allItems = appConfig.navLinks;

  return (
    <div className="fixed inset-0 z-50 bg-background text-foreground w-screen h-screen overflow-hidden">
      <div className="flex flex-col h-full w-full p-4 md:p-6">
        {/* Header with Logo and Close Button */}
        <div className="flex justify-between items-center shrink-0">
          <Link
            href="/"
            aria-label="Logo"
            className="relative z-20 flex items-center space-x-2 px-2 py-1 rounded-2xl shrink-0"
          >
            <Image
              height={40}
              width={280}
              className="h-10 w-auto"
              src={appConfig.clubLogo}
              alt="logo"
              loading="eager"
              priority
              unoptimized
            />
            <span className="px-3 py-1 text-sm font-medium border rounded-full">
              {appConfig.shortName}
            </span>
          </Link>
          <Link
            href="/"
            className="px-5 py-2 text-sm font-medium text-foreground border rounded-full hover:bg-accent transition-colors"
          >
            Close
          </Link>
        </div>

        {/* Menu Links Container */}
        <motion.div
          variants={menuVars}
          initial="initial"
          animate="animate"
          className="flex flex-col justify-center flex-1 gap-2 md:gap-3"
        >
          {allItems.map((item, index) => {
            const href = getHref(item);
            const colorClass = getHoverColor(index);
            const isSocialLink = (item as any).isSocialLink;
            const socialKey = (item as any).socialKey;

            return (
              <div key={`${item.title}-${index}`} className="overflow-hidden group">
                <motion.div
                  variants={linkVars}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <Link
                    href={href}
                    target={isSocialLink ? "_blank" : undefined}
                    rel={isSocialLink ? "noopener noreferrer" : undefined}
                    className={`relative flex items-center gap-3 w-full py-1 ${
                      isSocialLink
                        ? "text-lg md:text-2xl"
                        : "text-5xl md:text-7xl lg:text-8xl"
                    } font-black tracking-tighter`}
                  >
                    <div className="relative whitespace-nowrap overflow-hidden flex items-center gap-3">
                      {/* Icon for social links */}
                      {isSocialLink && (
                        <Icon
                          name={socialKey as IconType}
                          className="h-6 w-6 md:h-8 md:w-8"
                        />
                      )}

                      {/* FIRST COPY (Normal State) */}
                      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:-translate-y-[110%]">
                        {item.title}
                      </span>

                      {/* SECOND COPY (Hover State - Slides up from below) */}
                      <span
                        className={`absolute inset-0 flex items-center gap-3 translate-y-[110%] transition-transform duration-300 ease-[cubic-bezier(0.33,1,0.68,1)] group-hover:translate-y-0 ${colorClass}`}
                      >
                        {isSocialLink && (
                          <Icon
                            name={socialKey as IconType}
                            className="h-6 w-6 md:h-8 md:w-8"
                          />
                        )}
                        {item.title}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
