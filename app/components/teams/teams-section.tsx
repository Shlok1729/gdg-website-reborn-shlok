import { InfiniteSlider } from "../ui/infinite-slider";
import Link from "next/link";

const TeamMemberCard = ({ imageUrl }: { imageUrl: string }) => (
  <div className="relative w-[3cm] h-[3cm] flex-shrink-0 overflow-hidden group">
    <img
      src={imageUrl}
      alt="Team member"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />
  </div>
);

const baseTeamMembers = [
  { name: "Satya Nadella", role: "CEO", imageUrl: "/assets/images.jpeg" },
  { name: "Elon Musk", role: "Tech King", imageUrl: "/assets/elon_musk_royal_society.jpg" },
  { name: "Sundar Pichai", role: "CEO", imageUrl: "/assets/sundar.jpeg" },
];

// Duplicate the array significantly to ensure seamless looping on large screens
const teamMembers = [...baseTeamMembers, ...baseTeamMembers, ...baseTeamMembers, ...baseTeamMembers, ...baseTeamMembers, ...baseTeamMembers];

export const TeamsSection = () => {
  return (
    <section className="py-12 md:py-24 bg-white dark:bg-zinc-900 overflow-hidden relative transition-colors duration-300">
      <div className="container mx-auto px-6 mb-12 flex flex-col items-center text-center gap-6">
        <Link
          href="/team"
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:border-neutral-400 dark:hover:border-neutral-700 transition-all group"
        >
          <img src="/assets/gemini-color.png" alt="Gemini" className="w-4 h-4" />
          <span className="text-sm font-medium">Our Team</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right w-4 h-4 transition-transform group-hover:translate-x-1">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>

        <div className="relative inline-block mt-4">
          <h2 className="text-3xl md:text-5xl font-black text-neutral-900 dark:text-neutral-200 tracking-tighter mb-2 relative z-10">
            Meet the Team
          </h2>
          {/* Yellow underline */}
          <div className="absolute -bottom-2 left-0 right-0 h-2 bg-[#FBBC05] rounded-sm opacity-80"></div>
        </div>

        <p className="text-neutral-600 dark:text-neutral-400 max-w-lg text-lg">
          The creative minds behind the GDG NITH-CHAPTER.
        </p>
      </div>

      <div className="space-y-8">
        {/* Row 1: Left Scroll */}
        <InfiniteSlider gap={24} speed={75} speedOnHover={50}>
          {teamMembers.map((member, idx) => (
            <TeamMemberCard key={idx} imageUrl={member.imageUrl} />
          ))}
        </InfiniteSlider>

        {/* Row 2: Right Scroll (Reverse) */}
        <InfiniteSlider gap={24} speed={75} speedOnHover={50} reverse>
          {teamMembers.map((member, idx) => (
            <TeamMemberCard key={idx + 10} imageUrl={member.imageUrl} />
          ))}
        </InfiniteSlider>
      </div>
    </section>
  );
};
