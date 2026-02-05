import type React from 'react';
import { useState } from 'react';
import { Linkedin, Github } from 'lucide-react';

interface ProfileCardProps {
  image: string;
  name: string;
  position: string;
  category: string;
  year: string;
  github?: string;
  linkedin?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  image,
  name,
  position,
  category,
  year,
  github,
  linkedin,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoverOrigin, setHoverOrigin] = useState<'left' | 'center' | 'right'>(
    'left'
  );

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsHovered(true);

    const rect = e.currentTarget.getBoundingClientRect();
    const cursorX = e.clientX - rect.left;
    const cardWidth = rect.width;

    const isFromCenter = Math.abs(cursorX - cardWidth / 2) < cardWidth * 0.2;
    setHoverOrigin(
      isFromCenter ? 'center' : cursorX < cardWidth / 2 ? 'left' : 'right'
    );
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className={`relative bg-white dark:bg-neutral-900 rounded-xl shadow-md overflow-hidden border border-gray-200 dark:border-neutral-700 transition-all duration-500 ${
        isHovered ? 'hover:shadow-2xl hover:scale-[1.02]' : ''
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Profile Image with Hover Animation */}
      <div className='relative h-48 overflow-hidden'>
        <img
          src={image || '/placeholder.svg'}
          alt={name}
          className='w-2/3 h-2/3 object-cover transform hover:scale-110 transition-transform duration-700'
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          } transition-opacity duration-500`}
        />
      </div>

      {/* Profile Details */}
      <div className='p-6 text-center relative'>
        <h2 className='text-lg font-semibold text-gray-800 dark:text-white transition-colors duration-300'>
          {name}
        </h2>
        <p className='text-sm text-gray-500 dark:text-gray-400 mt-2 mb-6'>
          {position}
        </p>

        {/* Social Links */}
        <div className='w-full flex justify-center items-center pt-2'>
          <div className='flex gap-4'>
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className='text-blue-500 hover:text-blue-700 transition duration-200'
                aria-label='LinkedIn'
              >
                <Linkedin size={24} />
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className='text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition duration-200'
                aria-label='GitHub'
              >
                <Github size={24} />
              </a>
            )}
          </div>
        </div>

        {/* Animated Bottom Line */}
        <div
          className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 to-orange-600 ${
            isHovered ? 'scale-x-100' : 'scale-x-0'
          } transition-transform duration-500`}
          style={{
            transformOrigin:
              hoverOrigin === 'center'
                ? 'center'
                : hoverOrigin === 'left'
                  ? 'left'
                  : 'right',
          }}
        />
      </div>
    </div>
  );
};

export default ProfileCard;
