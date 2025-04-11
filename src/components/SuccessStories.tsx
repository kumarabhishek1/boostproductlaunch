import React, { useRef, useState } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import type { SuccessStory } from '../types/successStory';

type Rank = '#1' | '#2' | '#3' | 'all';

interface Props {
  stories: SuccessStory[];
}

const SuccessStories: React.FC<Props> = ({ stories = [] }) => {
  const [selectedRank, setSelectedRank] = useState<Rank>('all');
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  // Use Unsplash images for logos
  const getLogoUrl = (index: number) => {
    const urls = [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=150',
      'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150',
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=150',
      'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=150',
      'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=150',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=150',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=150',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=150',
      'https://images.unsplash.com/photo-1555066932-d69dac093642?w=150',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=150'
    ];
    return urls[index % urls.length];
  };

  const scroll = (direction: 'left' | 'right') => {
    const scrollAmount = direction === 'left' ? -300 : 300;
    
    // Scroll both rows simultaneously
    if (row1Ref.current) {
      row1Ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
    if (row2Ref.current) {
      row2Ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const filterStories = (allStories: SuccessStory[]) => {
    const filteredStories = selectedRank === 'all' 
      ? allStories 
      : allStories.filter(story => story.rank === selectedRank);

    // Split into two rows
    const row1 = filteredStories.slice(0, 6);
    const row2 = filteredStories.slice(6);

    return [row1, row2];
  };

  const filteredStories = filterStories(stories);
  
  // Calculate if we need a second row and if it should be scrollable
  const firstRowCount = filteredStories[0].length;
  const secondRowCount = filteredStories[1].length;
  const showSecondRow = firstRowCount >= 6 && secondRowCount > 0;
  const row2Overflow = showSecondRow && secondRowCount > 6;

  const getRankColor = (rank: string) => {
    switch (rank) {
      case '#1': return 'bg-[#ff6154]';
      case '#2': return 'bg-[#aa6154]';
      case '#3': return 'bg-[#886154]';
      default: return 'bg-gray-200';
    }
  };

  return (
    <div className="relative space-y-6">
      {/* Rank Filter Tabs */}
      <div className="flex justify-center items-center mb-8">
        <div className="flex gap-1 sm:gap-2 px-1 sm:px-2 w-full max-w-[360px] sm:max-w-none">
          {(['all', '#1', '#2', '#3'] as const).map((rank) => (
            <button
              key={rank}
              onClick={() => setSelectedRank(rank)}
              className={`flex-1 px-2 sm:px-6 py-1.5 sm:py-2 rounded-lg text-xs sm:text-base font-medium transition-all duration-200 ${
                selectedRank === rank
                  ? 'bg-[#ff6154] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {rank === 'all' ? 'All Products' : `Ranked #${rank.replace('#', '')}`}
            </button>
          ))}
        </div>
      </div>

      {/* Products Section with Scroll Buttons */}
      <div className="relative">
        {/* Scroll Buttons */}
        <div className="flex justify-end gap-2 mb-4">
          <button
            onClick={() => {
              scroll('left');
            }}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
          </button>
          <button
            onClick={() => {
              scroll('right');
            }}
            className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow border border-gray-100"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600" />
          </button>
        </div>

        {/* First Row */}
        <div className="space-y-4">
          {filteredStories[0].length > 0 && (
            <div
              ref={row1Ref}
              className={`flex gap-3 sm:gap-4 pb-4 ${
                firstRowCount > 6 ? 'overflow-x-auto hide-scrollbar' : 'overflow-x-hidden'
              }`}
              style={{
                scrollSnapType: 'x mandatory',
                scrollBehavior: 'smooth'
              }}
            >
              {filteredStories[0].map((story, index) => (
                <a
                  key={story.id}
                  href={story.productHuntUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex-none w-[160px] sm:w-[200px] aspect-square bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden scroll-snap-align-start"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <div className="absolute -top-1 -left-1 z-10">
                    <div className={`
                      flex items-center justify-center w-12 h-12 
                      ${getRankColor(story.rank)}
                      text-white font-bold text-xl
                      transform rotate-[-15deg]
                      rounded-br-xl
                    `}>
                      {story.rank}
                    </div>
                  </div>
                  
                  <div className="h-full flex flex-col items-center justify-center text-center p-3">
                    <img
                      src={getLogoUrl(index)}
                      alt={story.name}
                      className="w-16 h-16 object-cover rounded-lg mb-2 group-hover:scale-105 transition-transform duration-300"
                    />
                    <h3 className="font-semibold text-gray-900 text-sm mb-1">{story.name}</h3>
                    <span className="text-xs text-gray-600">{story.upvotes}</span>
                  </div>

                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="h-4 w-4 text-[#ff6154]" />
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Second Row - Only shown when first row is full */}
        {showSecondRow && (
          <div
            ref={row2Ref}
            className={`flex gap-3 sm:gap-4 pb-4 ${
              row2Overflow ? 'overflow-x-auto hide-scrollbar' : 'overflow-x-hidden'
            }`}
            style={{
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth'
            }}
          >
            {filteredStories[1].map((story, index) => (
              <a
                key={story.id}
                href={story.productHuntUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex-none w-[160px] sm:w-[200px] aspect-square bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer group overflow-hidden scroll-snap-align-start"
                style={{ scrollSnapAlign: 'start' }}
              >
                <div className="absolute -top-1 -left-1 z-10">
                  <div className={`
                    flex items-center justify-center w-12 h-12 
                    ${getRankColor(story.rank)}
                    text-white font-bold text-xl
                    transform rotate-[-15deg]
                    rounded-br-xl
                  `}>
                    {story.rank}
                  </div>
                </div>
                
                <div className="h-full flex flex-col items-center justify-center text-center p-3">
                  <img
                    src={getLogoUrl(index + 6)}
                    alt={story.name}
                    className="w-16 h-16 object-cover rounded-lg mb-2 group-hover:scale-105 transition-transform duration-300"
                  />
                  <h3 className="font-semibold text-gray-900 text-sm mb-1">{story.name}</h3>
                  <span className="text-xs text-gray-600">{story.upvotes}</span>
                </div>

                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink className="h-4 w-4 text-[#ff6154]" />
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default SuccessStories;