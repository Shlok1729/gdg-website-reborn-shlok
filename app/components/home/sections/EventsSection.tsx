"use client";

import React, { useRef } from "react";

import { galleryImages } from "@/src/settings";
import { CardCarousel } from "../../animation/card-carousel";
import { InView } from "../../animation/in-view";
import { Icon } from "../../icons";
import { Separator } from "../../ui/separator";
import { ButtonLink } from "../../utils/link";
import Link from "next/link";




function EventsSection() {
  const containerRef = useRef(null);

  const variants = {
    hidden: { opacity: 0, y: 100, filter: 'blur(4px)' },
    visible: {
      opacity: 1, y: 0, filter: 'blur(0px)',
      transition: {
        staggerChildren: 0.09,
      },
    },
  };
  return (
    <InView
      as="section"
      variants={variants}
      viewOptions={{ margin: '0px 0px -200px 0px' }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      id="members"
      className="
            
            mb-50
  max-w-7xl
  mx-auto
  p-4 pt-10 md:p-16 md:pt-0
  flex flex-col items-start gap-5
  mt-10 md:-mt-60
  relative
  translate-y-45
  rounded-[20px]
  md:rounded-[40px]
"
    >
      <Link
        href="/events"
        className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-700 transition-all group"
      >
        <img src="/assets/gemini-color.png" alt="Gemini" className="w-4 h-4" />
        <span className="text-sm font-medium">Explore More</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 transition-transform group-hover:translate-x-1">
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </Link>
      <div className="flex flex-col justify-center pb-2 pl-4 pt-2 md:items-center ">
        <div className="flex gap-2">
          <div>
            <h3 className="text-4xl opacity-85 font-bold tracking-tight ">
              Our Events
              {/* <div className="absolute -bottom-2 left-0 right-0 h-2 bg-[#057cfb] rounded-sm opacity-80"></div> */}
            </h3>

            <Separator className="my-2 bg-(--primary) h-0.5 rounded-full max-w-[200px]" />

            <p className="text-muted-foreground">
              Meet our amazing members who are passionate about technology and innovation.
            </p>
          </div>
        </div>
      </div>
      <CardCarousel
        images={galleryImages.map(member => ({ src: member, alt: "Member" }))}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
        className="md:col-span-12"
      />
    </InView>
  );

}
export default EventsSection;