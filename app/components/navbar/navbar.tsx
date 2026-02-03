"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react"; // Import X icon for Close button
import navlinks from "./navlinks";
import { cn } from "../../lib/utils";
// ThemeSwitcher import removed

// Social Icons - You can replace these with actual icons if available in your lib
import { IconBrandInstagram, IconBrandTwitter, IconBrandFacebook, IconBrandMedium, IconBrandGithub, IconBrandYoutube } from "@tabler/icons-react";
import { Button } from "../ui/button";
import { ThemeSwitcher } from "../common/theme-switcher";
import { ApplicationInfo } from "../logo";

const socialLinks = [
  {
    name: "Home",
    to: "/",
    icon: IconBrandInstagram,
  },
  {
    name: "About",
    to: "/about",
    icon: IconBrandTwitter,
  },
  {
    name: "Events",
    to: "/events",
    icon: IconBrandFacebook,
  },
  {
    name: "Contact",
    to: "/contact",
    icon: IconBrandMedium,
  },
]
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll detection with standard React hooks to avoid Turbopack issues
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <>
      {/* Top Navbar Strip */}
      <motion.div
        initial={{ y: -100 }}
        animate={{
          y: scrolled ? 20 : 0,
          width: scrolled ? "60%" : "100%",
          borderRadius: scrolled ? "50px" : "0px",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          border: scrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid transparent",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-12 mx-auto",
          scrolled && "shadow-lg bg-card/10" // Enhance visibility on scroll
        )}
        style={{ maxWidth: "1600px" }} // Ensure it doesn't get too wide on clear state
      >
        {/* Left Side: Logo + Brand Name */}
        <Link href="/" className="pointer-events-auto flex items-center gap-4 group">
          <div className="relative w-10 h-10">
            {/* Using the asset found in public/assets/gdg_logo.gif */}
            <Image
              src="/assets/gdgLogo.gif"
              alt="GDG Logo"
              fill
              className="object-contain" // Keep aspect ratio
            />
          </div>
          <div id="gdg-logo" className={cn(
            "border bg-card/50 backdrop-blur-md rounded-full px-4 py-1.5 transition-colors",
            scrolled && "bg-transparent border-transparent" // Hide capsule style when navbar itself is a capsule? Optional. Leaving as is for now feels safer.
          )}>
            <span className="text-foreground font-medium text-sm tracking-wide">
              GDG-NITH
            </span>
          </div>
        </Link>

        {/* Center: Social Icons (Hidden on mobile) */}
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="hidden md:flex absolute left-1/2 -translate-x-1/2 pointer-events-auto gap-4"
          id="social-links"
        >
          {socialLinks.map((link) => (
            <a href={link.to} key={link.name} className="text-foreground hover:text-primary transition-colors">
              <link.icon className="size-5" />
            </a>
          ))}
        </motion.div>

        {/* Right Side: Menu Button Only */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <ThemeSwitcher />
          <Button
            variant="ghost"
            onClick={() => setIsOpen(true)}
            className={cn(
              "rounded-full",
              scrolled && "border-transparent bg-transparent" // Minimalist button on scroll
            )}
          >
            Menu
          </Button>
        </div>
      </motion.div>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-60 bg-card/90 backdrop-blur-xl flex flex-col"
          >
            {/* Overlay Header (Logo + Close Button) */}
            <div className="flex items-center justify-between px-6 py-6 md:px-12">
              <div className="flex items-center gap-4">
                <div className="relative w-10 h-10">
                  <Image
                    src="/assets/gdgLogo.gif"
                    alt="GDG Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="border border-foreground rounded-full px-4 py-1.5">
                  <span className="text-foreground font-medium text-sm tracking-wide">
                    GDG-NITH
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setIsOpen(false)}
                  size="lg"
                  variant="secondary"
                  className="rounded-full"
                >
                  Close
                </Button>
              </div>
            </div>

            {/* Content Container */}
            <div className="flex-1 flex flex-col md:flex-row max-w-7xl mx-auto w-full p-6 md:p-12">

              {/* Left Column: Navigation Links */}
              <div className="flex-1 flex flex-col justify-center space-y-4 md:space-y-6">
                {navlinks.map((link, idx) => {
                  const googleColors = [
                    "#4285F4", // Blue
                    "#EA4335", // Red
                    "#FBBC05", // Yellow
                    "#34A853"  // Green
                  ];
                  const hoverColor = googleColors[idx % 4];

                  return (
                    <motion.div
                      key={link.text}
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -50, opacity: 0 }}
                      transition={{ delay: 0.1 + idx * 0.05, duration: 0.4 }}
                    >
                      <Link
                        href={link.to}
                        onClick={() => setIsOpen(false)}
                        className="text-4xl md:text-6xl font-bold text-muted-foreground hover:text-(--hover-color) transition-colors duration-300 block w-max"
                        style={{ "--hover-color": hoverColor } as React.CSSProperties}
                      >
                        {link.text}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Right Column: Info & Socials (Hidden on small mobile if needed, or stacked) */}
              <div className="flex-1 flex flex-col justify-center items-start md:items-end mt-12 md:mt-0 text-left md:text-right">

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-12"
                >
                  <div className="flex flex-col items-end text-3xl md:text-5xl text-right  text-foreground/75 mb-6 tracking-tighter uppercase leading-tight">
                    We Are <br />
                    <ApplicationInfo className="text-foreground ml-auto mt-2" />
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base max-w-md ml-auto leading-relaxed">
                    We think slightly out of the box, we believe that a club's resources must not only be channeled into conducting events but also to propagate learning and teaching, symbiotically.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex gap-4"
                >
                  {socialLinks.map((link) => (
                    <SocialLink href={link.to} icon={<link.icon className="w-6 h-6" />} key={link.name} />
                  ))}
                </motion.div>

              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => {
  return (
    <a
      href={href}
      className="size-10 rounded-full shadow bg-card border border-border flex items-center justify-center text-foreground hover:text-primary transition-all"
    >
      {icon}
    </a>
  );
};

// Exporting these as empty components to prevent breaking existing imports in other files if any
// But optimally we should remove their usage.
export const NavBody = ({ children }: { children: React.ReactNode }) => <>{children}</>;
export const NavItems = ({ items }: { items: any[] }) => <></>;
export const MobileNav = () => <></>; // Placeholder