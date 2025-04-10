import React, { useState } from 'react';
import { FileDown, X } from 'lucide-react';

const LeadMagnetBanner = () => {
  const [isOpen, setIsOpen] = useState(true);

  const handleDownload = () => {
    // Replace with your Google Drive document URL
    const LEAD_MAGNET_URL = 'https://drive.google.com/uc?export=download&id=YOUR_FILE_ID';
    window.open(LEAD_MAGNET_URL, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="bg-[#ff6154] text-white py-2 sm:py-3 fixed top-0 left-0 right-0 z-[60] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center relative">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center">
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
        </div>
        
        <button
          onClick={() => setIsOpen(false)}
          className="absolute right-2 sm:right-6 text-white hover:text-gray-200 transition-colors p-1"
          aria-label="Close banner"
        >
          <X className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
};

export default LeadMagnetBanner;