import React, { useState, useEffect, useRef } from 'react';
import { FileDown, X } from 'lucide-react';

const LeadMagnetBanner = () => {
  const [isOpen, setIsOpen] = useState(true);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateHeaderPosition = () => {
      const bannerHeight = bannerRef.current?.offsetHeight || 0;
      document.documentElement.style.setProperty('--banner-height', `${bannerHeight}px`);
    };

    updateHeaderPosition();
    window.addEventListener('resize', updateHeaderPosition);
    return () => window.removeEventListener('resize', updateHeaderPosition);
  }, [isOpen]);

  const handleDownload = () => {
    // Replace with your Google Drive document URL
    const LEAD_MAGNET_URL = 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID';
    window.open(LEAD_MAGNET_URL, '_blank');
  };

  if (!isOpen) {
    document.documentElement.style.setProperty('--banner-height', '0px');
    return null;
  }

  return (
    <div className="bg-[#ff6154] bg-opacity-95 text-white w-full shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center relative">
          <div className="flex items-center gap-2">
            <FileDown className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm font-medium">
              Download our free guide: "Top 10 Strategies for a Successful Product Hunt Launch"
            </span>
          </div>
          <button
            onClick={handleDownload}
            className="bg-white text-[#ff6154] px-3 sm:px-4 py-1 rounded text-xs sm:text-sm font-medium hover:bg-gray-100 transition-colors"
          >
            Download Now
          </button>
          
          <button
            onClick={() => setIsOpen(false)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-white hover:text-gray-200 transition-colors p-1"
            aria-label="Close banner"
          >
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadMagnetBanner;