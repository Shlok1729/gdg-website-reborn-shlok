

import { SpinningLogosProps } from '@/app/components/animation/spinning-logos';
import { LinkNavLinksType } from "@/app/components/common/resizable-navbar";
import localFont from 'next/font/local';
import React from 'react';

export const productSans = localFont({
  src: [
    {
      path: "../app/assets/fonts/ProductSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../app/assets/fonts/ProductSans-Bold-Italic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "../app/assets/fonts/ProductSans-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    
    {
      path: "../app/assets/fonts/ProductSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
});


export const navLinks = [
    {
        title: "Projects",
        href: "projects",
        type: "link"
    },
    {
        title: "Team",
        href: "team",
        type: "link"
    },
    {
        title: "Workshops",
        href: "workshops",
        type: "link"
    }
] as LinkNavLinksType[]
export const logos = [
    { icon: "code", className: 'bg-purple-600 text-white', name: 'Programming' },
    { icon: "palette", className: 'bg-yellow-600 text-white', name: 'Design' },
    { icon: "camera", className: 'bg-emerald-600 text-white', name: 'Photography' },
    { icon: "zap", className: 'bg-blue-600 text-white', name: 'Finance' },
    { icon: "gamepad2", className: 'bg-fuchsia-600 text-white', name: 'Gaming' },
    { icon: "instagram", className: 'bg-blue-500 text-white', name: 'Instagram' },
    { icon: "youtube", className: 'bg-red-500 text-white', name: 'YouTube' },
] as SpinningLogosProps["logos"];


export const themeVariables = {
    // add google four colors
    '--primary': '#4285F4',
    '--secondary': '#DB4437',
    '--tertiary': '#F4B400',
    '--quaternary': '#0F9D58',
} as React.CSSProperties;

export const allTeamMembers = [
    {
        name: "Kanak Kholwal",
        position: "Mentor",
        picture: "https://github.com/kanakkholwal.png",
        socials: {
            github: "https://github.com/kanakkholwal",
            twitter: "https://twitter.com/kanakkholwal",
            linkedin: "https://linkedin.com/in/kanak-kholwal"
        },
        startYear: 2022,
        endYear: 2026
    },
    {
        name: "Lana Dal Rae",
        position: "Mentor 😶‍🌫️",
        picture: "https://i.scdn.co/image/ab67616d00001e021624590458126fc8b8c64c2f",
        startYear: 2022,
        endYear: 2026,
        socials: {
            github: "https://github.com/aaravsharma",
            twitter: "https://twitter.com/aaravsharma",
            linkedin: "https://linkedin.com/in/aaravsharma"
        }
    },
    {
        name: "Larry",
        position: "Mentor 😶",
        picture: "https://i.scdn.co/image/ab67616d00001e02ad24c5e36ddcd1957ad35677",
        startYear: 2022,
        endYear: 2024,
        socials: {
            github: "https://github.com/aaravsharma",
            twitter: "https://twitter.com/aaravsharma",
            linkedin: "https://linkedin.com/in/aaravsharma"
        }
    }

]
export const galleryImages = [
    "https://i.scdn.co/image/ab67616d00001e02ad24c5e36ddcd1957ad35677",
    "https://i.scdn.co/image/ab67616d00001e02af73f776b92d4614152fb141",
    "https://i.scdn.co/image/ab67616d00001e02ecdb8f824367a53468100faf",
    "https://i.scdn.co/image/ab67616d00001e021624590458126fc8b8c64c2f",
    "https://i.scdn.co/image/ab67616d00001e020dcf0f3680cff56fe5ff2288",
    "https://i.scdn.co/image/ab67616d00001e02bc1028b7e9cd2b17c770a520",
    "https://i.scdn.co/image/ab67616d00001e02ad24c5e36ddcd1957ad35677",
    "https://i.scdn.co/image/ab67616d00001e02ecdb8f824367a53468100faf",
    "https://i.scdn.co/image/ab67616d00001e021624590458126fc8b8c64c2f",
    "https://i.scdn.co/image/ab67616d00001e02ad24c5e36ddcd1957ad35677"
]
