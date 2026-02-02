"use client";

import React, { useRef } from "react";

import { galleryImages } from "@/src/settings";
import { CardCarousel } from "../../animation/card-carousel";
import { InView } from "../../animation/in-view";
import { Icon } from "../../icons";
import { Separator } from "../../ui/separator";
import { ButtonLink } from "../../utils/link";




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
            mt-[100px]
            mb-[100px]
  max-w-[1200px]
  mx-auto
  p-4 md:p-16
  flex flex-col items-start gap-5
  relative
  bg-card
  shadow-sm
  rounded-[20px]
  md:rounded-[40px]
"
  >
            <ButtonLink
                href="team"
                variant="outline"
                size="xs"
                className="absolute left-4 top-6 rounded-[14px] md:left-6 text-sm"
            >
                <Icon name="sparkles" className="fill-[#EEBDE0] stroke-1 text-neutral-800" />{" "}
                Explore More
                <Icon name="arrow-right" />
            </ButtonLink>
            <div className="flex flex-col justify-center pb-2 pl-4 pt-14 md:items-center">
                <div className="flex gap-2">
                    <div>
                        <h3 className="text-4xl opacity-85 font-bold tracking-tight">
                            Our Events
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