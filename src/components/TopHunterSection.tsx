import React from 'react';
import { Trophy, Star, TrendingUp, Target } from 'lucide-react';

const TopHunterSection = () => {
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
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            Maximize your launch potential with our top hunter network. Increase your chances of reaching #1 position and getting featured on Product Hunt.
          </p>
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