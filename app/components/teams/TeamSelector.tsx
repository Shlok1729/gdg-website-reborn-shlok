"use client";

import type React from "react";
import { useState, useEffect } from "react";
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
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Fetch team data from JSON file
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const response = await fetch('/assets/team-data.json');
        const data = await response.json();
        setTeamMembers(data.teamMembers);
      } catch (error) {
        console.error('Error fetching team data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamData();
  }, []);

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
        {isLoading ? (
          <p className="text-center text-neutral-500 dark:text-neutral-400 text-lg">
            Loading team members...
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-full">
            {filteredTeamMembers.map((member, index) => (
              <div key={index} className="flex justify-center">
                <ProfileCard
                  image={member.image}
                  name={member.name}
                  position={member.position}
                  category={member.category}
                  year={member.year}
                  github={member.github}
                  linkedin={member.linkedin}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* No Results Message */}
      {!isLoading && filteredTeamMembers.length === 0 && (
        <p className="text-center text-neutral-500 dark:text-neutral-400 text-lg mt-6">
          No team members found in this category.
        </p>
      )}
    </div>
  );
};

export default TeamSelector;
