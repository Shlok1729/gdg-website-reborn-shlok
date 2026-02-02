"use client";

import type React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useGlitch } from "react-powerglitch";
import localFont from "next/font/local";
import ProfileCard from "./ProfileCard";

const Hacked_KerX = localFont({
  src: "../../../public/fonts/Hacked-KerX.ttf",
  variable: "--custom-font",
});

interface TeamMember {
  image: string;
  name: string;
  position: string;
  category: string;
  year: string;
  github?: string;
  linkedin?: string;
}

const teamMembers: TeamMember[] = [
  {
    image: "https://via.placeholder.com/150",
    name: "Alice Johnson",
    position: "Web Team Lead",
    category: "Web Team",
    year: "Year 3",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Bob Smith",
    position: "AI/ML Team Lead",
    category: "AI/ML Team",
    year: "Year 4",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Charlie Brown",
    position: "UI/UX Team Lead",
    category: "UI/UX Team",
    year: "Year 2",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Daisy Lee",
    position: "Android Team Lead",
    category: "Android Team",
    year: "Year 3",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Evan Wright",
    position: "Web Developer",
    category: "Web Team",
    year: "Year 2",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Fayla Grey",
    position: "AI/ML Mentor",
    category: "AI/ML Team",
    year: "Year 4",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "George Miller",
    position: "UI/UX Designer",
    category: "UI/UX Team",
    year: "Year 3",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Henry Lang",
    position: "Android Developer",
    category: "Android Team",
    year: "Year 3",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Ivy White",
    position: "Web Developer",
    category: "Web Team",
    year: "Year 2",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Jack Black",
    position: "AI/ML Researcher",
    category: "AI/ML Team",
    year: "Year 4",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Kimberly Brown",
    position: "UI/UX Researcher",
    category: "UI/UX Team",
    year: "Year 3",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Liam Green",
    position: "Android Researcher",
    category: "Android Team",
    year: "Year 2",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Mona Blue",
    position: "Web Developer",
    category: "Web Team",
    year: "Year 3",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Nina Grey",
    position: "AI/ML Specialist",
    category: "AI/ML Team",
    year: "Year 2",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Oscar Green",
    position: "UI/UX Designer",
    category: "UI/UX Team",
    year: "Year 4",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Paul White",
    position: "Android Developer",
    category: "Android Team",
    year: "Year 4",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Quinn Yellow",
    position: "Web Developer",
    category: "Web Team",
    year: "Year 2",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Rita Black",
    position: "AI/ML Researcher",
    category: "AI/ML Team",
    year: "Year 4",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Sam Blue",
    position: "UI/UX Designer",
    category: "UI/UX Team",
    year: "Year 2",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Tom Red",
    position: "Android Team Lead",
    category: "Android Team",
    year: "Year 3",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Uma Green",
    position: "Web Developer",
    category: "Web Team",
    year: "Year 4",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Vicky Blue",
    position: "AI/ML Specialist",
    category: "AI/ML Team",
    year: "Year 3",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Will Brown",
    position: "UI/UX Researcher",
    category: "UI/UX Team",
    year: "Year 2",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Xander Red",
    position: "Android Developer",
    category: "Android Team",
    year: "Year 4",
  },
  {
    image: "https://via.placeholder.com/150",
    name: "Yara White",
    position: "Web Team Lead",
    category: "Web Team",
    year: "Year 3",
  },
  {
    image: "",
    name: "Zane Black",
    position: "AI/ML Team Lead",
    category: "AI/ML Team",
    year: "Year 1",
  },
];

const categories = [
  "All",
  "Year 1",
  "Year 2",
  "Year 3",
  "Year 4",
];

const TeamSelector: React.FC = () => {
  const glitch = useGlitch({
    timing: {
      duration: 3950,
    },
    shake: false,
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  // Year order for sorting
  const yearOrder = { "Year 4": 1, "Year 3": 2, "Year 2": 3, "Year 1": 4 };

  const filteredTeamMembers =
    selectedCategory === "All"
      ? [...teamMembers].sort((a, b) => (yearOrder[a.year as keyof typeof yearOrder] || 5) - (yearOrder[b.year as keyof typeof yearOrder] || 5))
      : teamMembers
          .filter((member) => member.year === selectedCategory)
          .sort((a, b) => (yearOrder[a.year as keyof typeof yearOrder] || 5) - (yearOrder[b.year as keyof typeof yearOrder] || 5));

  return (
    <div className="bg-neutral-100 dark:bg-neutral-900 min-h-screen p-8">
      <h1 className={`text-4xl sm:text-6xl font-extrabold text-center mb-6 animate-fadeInUp relative group ${Hacked_KerX.className}`}>
        <span className="text-neutral-800 dark:text-white">Meet Our</span>{" "}
        <span ref={glitch.ref} className="text-red-800 dark:text-red-700 inline-block">
          Team
        </span>
        <span className="absolute left-0 top-full w-full h-1 bg-gradient-to-r from-red-700 to-red-900 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      </h1>

      {/* Category Selector */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category);
            }}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? "bg-red-800 text-white"
                : "bg-white text-black border border-neutral-300 dark:bg-neutral-800 dark:text-white dark:border-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Team Members Display */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-full">
          {filteredTeamMembers.map((member, index) => (
            <div key={index} className="flex justify-center">
              <ProfileCard
                image={member.image}
                name={member.name}
                position={member.position}
                category={member.category}
                year={member.year}
              />
            </div>
          ))}
        </div>
      </div>

      {/* No Results Message */}
      {filteredTeamMembers.length === 0 && (
        <p className="text-center text-neutral-500 dark:text-neutral-400 text-lg mt-6">
          No team members found in this category.
        </p>
      )}
    </div>
  );
};

export default TeamSelector;
