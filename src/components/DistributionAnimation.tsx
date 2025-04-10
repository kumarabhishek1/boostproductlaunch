import React, { useEffect, useRef } from 'react';
import { Share2, Send, ThumbsUp, Users, Mail, Hand as BrandX, Linkedin as BrandLinkedin, GitBranch as BrandReddit } from 'lucide-react';

const DistributionAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const animate = () => {
      const elements = containerRef.current?.querySelectorAll('.animate-path');
      elements?.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('active');
        }, index * 1000);
      });
    };

    animate();
    const interval = setInterval(animate, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto overflow-hidden" ref={containerRef}>
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <Share2 className="h-5 w-5 text-[#ff6154]" />
        <span className="font-semibold text-gray-900">Distribution Network</span>
      </div>

      {/* Central Product Hunt Logo */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-lg z-10">
        <img 
          src="https://ph-static.imgix.net/ph-logo-1.png" 
          alt="Product Hunt" 
          className="h-16 w-16 object-contain"
        />
      </div>

      {/* Distribution Channels */}
      <div className="grid grid-cols-3 gap-8 h-[500px]">
        {/* Left Column - Communities */}
        <div className="space-y-6">
          <div className="animate-path opacity-0 transform translate-x-8 transition-all duration-500 bg-white rounded-lg p-4 shadow-md">
            <Users className="h-6 w-6 text-[#ff6154] mb-2" />
            <h3 className="font-semibold">Tech Communities</h3>
            <p className="text-sm text-gray-600">20K+ Active Members</p>
          </div>
          
          <div className="animate-path opacity-0 transform translate-x-8 transition-all duration-500 bg-white rounded-lg p-4 shadow-md">
            <Mail className="h-6 w-6 text-[#ff6154] mb-2" />
            <h3 className="font-semibold">Newsletter Network</h3>
            <p className="text-sm text-gray-600">30K+ Subscribers</p>
          </div>
        </div>

        {/* Center Column - Animation Space */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-path opacity-0 scale-0 transition-all duration-500 transform">
              <div className="relative">
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg">
                  <ThumbsUp className="h-8 w-8 text-[#ff6154] animate-bounce" />
                </div>
                <div className="text-2xl font-bold text-[#ff6154] animate-ping">
                  +1
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Social Media */}
        <div className="space-y-6">
          <div className="animate-path opacity-0 transform -translate-x-8 transition-all duration-500 bg-white rounded-lg p-4 shadow-md">
            <div className="flex gap-2 mb-2">
              <BrandX className="h-6 w-6 text-[#ff6154]" />
              <BrandLinkedin className="h-6 w-6 text-[#ff6154]" />
            </div>
            <h3 className="font-semibold">Social Media</h3>
            <p className="text-sm text-gray-600">50K+ Reach</p>
          </div>
          
          <div className="animate-path opacity-0 transform -translate-x-8 transition-all duration-500 bg-white rounded-lg p-4 shadow-md">
            <BrandReddit className="h-6 w-6 text-[#ff6154] mb-2" />
            <h3 className="font-semibold">Reddit Communities</h3>
            <p className="text-sm text-gray-600">100K+ Members</p>
          </div>
        </div>
      </div>

      {/* Animated Connection Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#ff6154" />
          </marker>
        </defs>
        
        {/* Connection lines with gradient and animation */}
        <g className="animate-path opacity-0 transition-all duration-1000">
          <path 
            d="M 200,150 L 400,250" 
            stroke="url(#gradient)" 
            strokeWidth="2" 
            fill="none"
            markerEnd="url(#arrowhead)"
            className="animate-dash"
          />
          <path 
            d="M 200,350 L 400,250" 
            stroke="url(#gradient)" 
            strokeWidth="2" 
            fill="none"
            markerEnd="url(#arrowhead)"
            className="animate-dash"
          />
          <path 
            d="M 600,150 L 400,250" 
            stroke="url(#gradient)" 
            strokeWidth="2" 
            fill="none"
            markerEnd="url(#arrowhead)"
            className="animate-dash"
          />
          <path 
            d="M 600,350 L 400,250" 
            stroke="url(#gradient)" 
            strokeWidth="2" 
            fill="none"
            markerEnd="url(#arrowhead)"
            className="animate-dash"
          />
        </g>
      </svg>

      <style jsx>{`
        .animate-path.active {
          opacity: 1;
          transform: translate(0, 0) scale(1);
        }

        .animate-dash {
          stroke-dasharray: 1000;
          stroke-dashoffset: 1000;
          animation: dash 2s linear forwards;
        }

        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }

        @keyframes ping {
          75%, 100% {
            transform: scale(2);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default DistributionAnimation;