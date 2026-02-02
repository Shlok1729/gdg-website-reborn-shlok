import { LinkNavLinksType } from "@/app/components/navbar/resizable-navbar";

export const appConfig = {
  name: "Developer Student Clubs",
  shortName: "GDG NITH",
  tagline: "Where Logic Meets Creativity",
  description:
    "DSC is the official programming club focused on competitive programming, AI/ML, and development.",
  clubLogo: "/assets/gdsc_logo.gif",
  socialLinks: {
    github: "https://github.com/GDSC-NITH",
    twitter: "https://twitter.com/gdsc_nith",
    instagram: "https://instagram.com/nith_gdgl",
  },
  clubEmail: "gdscnith@gmail.com",
  githubUri: "GDSC-NITH/dsc-site",
  githubRepo: "https://github.com/GDSC-NITH/dsc-site",
  navLinks: [
    {
      title: "Home",
      href: "/",
      type: "link",
    },
    {
      title: "About",
      href: "/about",
      type: "link",
    },
    {
      title: "Events",
      href: "/events",
      type: "link",
    },
    {
      title: "Team",
      href: "/team",
      type: "link",
    },
    {
      title: "Projects",
      href: "/projects",
      type: "link",
    },
  ] as LinkNavLinksType[],
  members: [],
};

export const orgConfig = {
  name: "National Institute of Technology, Hamirpur",
  shortName: "NITH",
  domain: "nith.ac.in",
  website: "https://nith.ac.in",
  logo: "https://nith.ac.in/uploads/settings/15795036012617.png",
  logoSquare: "https://nith.ac.in/uploads/topics/nit-logo15954991401255.jpg",
  mailSuffix: "@nith.ac.in",
  socials: {
    twitter: {
      url: "https://twitter.com/nithamirpur",
      handle: "@nithamirpur",
      publisher: "@nithamirpur",
    },
    linkedin: "https://linkedin.com/company/nithamirpur",
    instagram: "https://instagram.com/nithamirpur",
    facebook: "https://facebook.com/NITHamirpur",
    youtube: "https://youtube.com/@NITHamirpur",
  },
  foundingDate: "1986-01-01",
  location: {
    address: {
      "@type": "PostalAddress",
      streetAddress: "NIT Hamirpur Campus, Anu",
      addressLocality: "Hamirpur",
      addressRegion: "Himachal Pradesh",
      postalCode: "177005",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "31.7087",
      longitude: "76.5270",
    },
  },
  contact: {
    email: "registrar@nith.ac.in",
    phone: "+91-1972-254001",
    fax: "+91-1972-223834",
  },
};
