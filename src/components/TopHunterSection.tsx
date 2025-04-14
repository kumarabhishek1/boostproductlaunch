import React, { useRef } from 'react';
import { Trophy, Star, TrendingUp, Target, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

const TopHunterSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Helper function to get hunter image path
  const getHunterImage = (imageName: string) => {
    // Extract the hunter's name without extension
    const nameWithoutExtension = imageName.split('.')[0];
    
    // Try different image extensions
    const extensions = ['.png', '.jpg', '.jpeg'];
    
    // Create an image element to check if the image loads
    const checkImageExists = (url: string) => {
      const img = new Image();
      img.src = url;
      return img.complete;
    };

    // Try each extension
    for (const ext of extensions) {
      const imageUrl = `/images/hunters/${nameWithoutExtension}${ext}`;
      if (checkImageExists(imageUrl)) {
        return imageUrl;
      }
    }
    
    // If no image is found, generate an avatar with initials
    const hunterName = topHunters.find(
      hunter => hunter.image.split('.')[0] === nameWithoutExtension
    )?.name || 'Unknown Hunter';
    
    // Get initials from the hunter's name
    const initials = hunterName
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
    
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=ff6154&color=fff&size=200&bold=true&font-size=0.5`;
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = 300; // Adjust scroll amount as needed
      const targetScroll = direction === 'left' 
        ? container.scrollLeft - scrollAmount 
        : container.scrollLeft + scrollAmount;
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });
    }
  };

  const topHunters = [
    {
      id: 1,
      name: "Kevin William David",
      image: "kevin-william.png",
      responseTime: "> 3 weeks",
      successRate: "72% in Top 3",
      featuredRate: "81.6% Featured"
    },
    {
      id: 2,
      name: "Rohan Chaubey",
      image: "rohan-chaubey.png",
      responseTime: "< 12 hours",
      successRate: "97.3% in Top 3",
      featuredRate: "99.1% Featured"
    },
    {
      id: 3,
      name: "Chris Messina",
      image: "chris-messina.png",
      responseTime: ">1 month",
      successRate: "89.3% in Top 3",
      featuredRate: "100% Featured"
    },
    {
      id: 4,
      name: "Kumar Abhishek",
      image: "kumar-abhishek.png",
      responseTime: "< 4 hours",
      successRate: "83% in Top 3",
      featuredRate: "91.9% Featured"
    },
    {
      id: 5,
      name: "Ben Lang",
      image: "ben-lang.png",
      responseTime: "> 36 hours",
      successRate: "67% in Top 3",
      featuredRate: "71% Featured"
    },
    {
      id: 6,
      name: "Adithya Shreshth",
      image: "adithya-shreshth.png",
      responseTime: "> 6 days",
      successRate: "71% in Top 3",
      featuredRate: "68.9% Featured"
    }
  ];

  const benefits = [
    {
      icon: Trophy,
      title: "Increased Visibility",
      description: "Products hunted by top hunters receive significantly more visibility on Product Hunt's platform."
    },
    {
      icon: Star,
      title: "Higher Credibility",
      description: "Top hunters are trusted by the Product Hunt community, lending instant credibility to your launch."
    },
    {
      icon: TrendingUp,
      title: "Better Feature Chances",
      description: "Products launched by established hunters have higher chances of getting featured on Product Hunt."
    },
    {
      icon: Target,
      title: "Strategic Launch Timing",
      description: "We coordinate with top hunters to launch your product at the optimal time for maximum impact."
    }
  ];

  return (
    <section id="top-hunter" className="py-16 sm:py-20 bg-white w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-[#fff4f2] text-[#ff6154] px-4 py-2 rounded-full">
            <Trophy className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base font-medium">Top Hunter Launch</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Get Your Product Hunted by Top Hunters
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto mb-12">
            Partner with elite Product Hunt hunters who consistently launch products to #1, #2, and #3 positions. Our network of top hunters has a proven track record of launching successful products that dominate Product Hunt's daily rankings.
          </p>

          {/* Enhanced Top Hunters Label */}
          <div className="relative mb-12">
            <div className="absolute left-0 right-0 h-[1px] bg-gray-200 top-1/2 transform -translate-y-1/2" />
            <div className="relative flex flex-col items-center">
              <div className="bg-white px-8 py-2 inline-block">
                <div className="flex items-center justify-center gap-3">
                  <Trophy className="h-8 w-8 text-[#ff6154]" />
                  <h3 className="text-2xl font-bold text-gray-900">Our Top Hunters</h3>
                </div>
              </div>
              <div className="text-gray-500 text-sm mt-2">Partner with elite hunters who consistently rank products in Top 3</div>
            </div>
          </div>

          {/* Top Hunters Scrollable Section with Navigation Buttons */}
          <div className="relative max-w-5xl mx-auto mb-16">
            {/* Scroll Buttons */}
            <button 
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-[#ff6154]"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            
            <button 
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 text-gray-600 hover:text-[#ff6154]"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Cards Container */}
            <div 
              ref={scrollContainerRef}
              className="flex overflow-x-auto pb-6 gap-6 hide-scrollbar snap-x snap-mandatory px-4"
            >
              {topHunters.map((hunter) => (
                <div
                  key={hunter.id}
                  className="flex-none w-[280px] bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl snap-center"
                >
                  <div className="flex flex-col items-center">
                    <img
                      src={getHunterImage(hunter.image)}
                      alt={hunter.name}
                      className="w-20 h-20 rounded-full mb-4 border-2 border-[#ff6154]"
                    />
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">{hunter.name}</h3>
                    
                    {/* Stats Grid */}
                    <div className="w-full grid grid-cols-1 gap-3">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Clock className="h-4 w-4 text-[#ff6154]" />
                          Response Time
                        </div>
                        <span className="font-medium">{hunter.responseTime}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Trophy className="h-4 w-4 text-[#ff6154]" />
                          Success Rate
                        </div>
                        <span className="font-medium">{hunter.successRate}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Star className="h-4 w-4 text-[#ff6154]" />
                          Featured Rate
                        </div>
                        <span className="font-medium">{hunter.featuredRate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Gradient Fade Effect */}
            <div className="absolute left-8 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute right-8 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mb-12">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="bg-[#fff4f2] p-3 rounded-xl">
                  <benefit.icon className="h-6 w-6 text-[#ff6154]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg sm:text-xl text-gray-900 mb-2">{benefit.title}</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-[#fff8f7] rounded-2xl p-6 sm:p-8 border border-[#ffe4e0] max-w-3xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
            Ready to Launch with a Top Hunter?
          </h3>
          <p className="text-gray-600 text-sm sm:text-base mb-6">
            Combined with our distribution service, launching with a top hunter significantly increases your chances of reaching the #1 position on Product Hunt.
          </p>
          <button 
            onClick={() => {
              const element = document.getElementById('contact');
              element?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center bg-[#ff6154] text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-[#e5574b] transition-colors text-sm sm:text-base gap-2"
          >
            Get Started
            <Trophy className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TopHunterSection; 