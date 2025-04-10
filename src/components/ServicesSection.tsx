import React from 'react';
import { Users, Trophy, MessageSquare, Share2, Newspaper } from 'lucide-react';

const ServicesSection = () => {
  const stats = [
    { number: '100+', label: 'Active Communities' },
    { number: '1.2M+', label: 'Total Network Reach' },
    { number: '1000+', label: 'Successful Launches' },
    { number: '24/7', label: 'Distribution Coverage' },
  ];

  const channels = [
    {
      title: 'Tech Communities',
      icon: Users,
      members: '272K+',
      items: [
        'Active Developer Communities',
        'Tech Enthusiast Networks',
        'Startup Founders Groups',
      ],
    },
    {
      title: 'Social Media',
      icon: Share2,
      members: '980K+ Reach',
      items: [
        'Tech Twitter Influencers',
        'LinkedIn Tech Networks',
        'Tech Facebook Groups',
      ],
    },
    {
      title: 'Newsletter Network',
      icon: Newspaper,
      members: '47K+ Subscribers',
      items: [
        'Tech Newsletter Database',
        'Startup Digest Features',
        'Product Review Networks',
      ],
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-[#fafafa] w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Our Distribution Channels</h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            Strategic networks that amplify your Product Hunt launch visibility. Our distribution network spans across multiple channels.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-4 sm:p-6 text-center shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.08)] transition-shadow duration-300"
            >
              <div className="text-[#ff6154] text-2xl sm:text-4xl font-bold mb-2">{stat.number}</div>
              <div className="text-gray-600 text-xs sm:text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Channels Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {channels.map((channel, index) => (
            <div 
              key={index} 
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_25px_rgba(0,0,0,0.08)] transition-all duration-300"
            >
              <div className="flex items-start gap-4 mb-6 sm:mb-8">
                <div className="bg-[#fff4f2] p-3 rounded-xl">
                  <channel.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#ff6154]" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg sm:text-xl text-gray-900">{channel.title}</h3>
                  <span className="text-[#ff6154] text-sm sm:text-base font-medium">{channel.members}</span>
                </div>
              </div>
              <ul className="space-y-3 sm:space-y-4">
                {channel.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#f0fdf4] flex items-center justify-center">
                      <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm sm:text-base text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;