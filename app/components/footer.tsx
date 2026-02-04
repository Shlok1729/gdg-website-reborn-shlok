"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { Linkedin, Instagram, Twitter, Github } from "lucide-react";
import TapeSection from "./home/sections/TapeSection";
import { ApplicationInfo } from "./logo";


const lists = {
  "ABOUT US": [
    { title: "Our Story", link: "/about" },
    { title: "The Team", link: "/Team" },
    { title: "Events", link: "/events" },
    { title: "Guidelines", link: "/guidelines" },
  ],
  "GET INVOLVED": [
    { title: "Join Chapter", link: "/sign-up" },
    { title: "Our Projects", link: "/projects" },
    { title: "Sponsorships", link: "/contact" },
  ],
};

export default function Footer() {
  const { scrollYProgress } = useScroll();

  const footerScale = useTransform(scrollYProgress, [0.9, 1], [0.95, 1]);
  const footerOpacity = useTransform(scrollYProgress, [0.9, 0.98], [0, 1]);

  return (
    <>
      <div className="h-px md:h-screen -z-1" /> {/* Reduced spacer on mobile since footer is static */}

      <footer
        className="relative md:fixed z-0 bottom-0 left-0 w-full h-auto md:h-[400px] text-foreground flex flex-col justify-end"
      >
        <motion.div
          style={{ scale: footerScale, opacity: footerOpacity }}
          className="bg-neutral-50/50 dark:bg-black/40 border-t border-neutral-200 dark:border-white/5 pt-10 pb-8 px-6 md:pt-16 md:px-8"
        >
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10">

            {/* Branding Column */}
            <div className="md:col-span-5 flex flex-col gap-6">
              <Link href="/" className="group flex items-center gap-4 w-fit">
                <div className="relative w-10 h-8">

                </div>


                <div className="flex flex-col">
                  <ApplicationInfo />
                </div>
              </Link>

              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs font-light">
                Community of student developers at NIT Hamirpur. Affiliated with GDG Ludhiana.
              </p>

              {/* SOCIAL BUTTONS with Hover Effects */}
              <div className="flex gap-4">
                {[
                  { Icon: Linkedin, href: "https://linkedin.com" },
                  { Icon: Instagram, href: "https://instagram.com" },
                  { Icon: Twitter, href: "https://twitter.com" },
                  { Icon: Github, href: "https://github.com" }
                ].map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2 rounded-xl border border-neutral-200 dark:border-white/5 text-muted-foreground hover:text-[#4285F4] hover:border-[#4285F4]/30 hover:bg-white dark:hover:bg-neutral-800 transition-all shadow-sm"
                  >
                    <social.Icon size={18} />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Links Column */}
            <div className="md:col-span-7 grid grid-cols-2 gap-8 md:ml-auto">
              {Object.entries(lists).map(([key, value]) => (
                <div key={key} className="flex flex-col gap-4">
                  <span className="text-muted-foreground text-[10px] tracking-[0.4em] font-black uppercase opacity-50">{key}</span>
                  <ul className="flex flex-col gap-3">
                    {value.map((item) => (
                      <li key={item.title}>
                        <Link
                          href={item.link}
                          className="text-foreground/70 text-xs font-light hover:text-[#4285F4] transition-all hover:pl-1 inline-block"
                        >
                          {item.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Bar Links */}

          <TapeSection />
        </motion.div>
      </footer>
    </ >

  );
}