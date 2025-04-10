import React from 'react';
import { Shield, AlertTriangle, TrendingUp, Users, Check, X } from 'lucide-react';

const AuthenticDistributionSection = () => {
  const authenticBenefits = [
    'Real engagement from genuine tech enthusiasts',
    'Long-term product visibility and credibility',
    'Authentic feedback and potential users',
    'Natural, sustained growth in upvotes',
    'Build lasting relationships in tech community'
  ];

  const fakeRisks = [
    'Risk of account suspension',
    'Temporary, artificial spike in numbers',
    'No real product feedback or users',
    'Damage to product credibility',
    'Waste of launch opportunity'
  ];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center justify-center gap-2 mb-4 bg-[#fff4f2] text-[#ff6154] px-4 py-2 rounded-full">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-sm sm:text-base font-medium">Why Choose Authentic Distribution?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Real Growth vs Fake Upvotes
          </h2>
          <p className="text-gray-600 text-base sm:text-lg max-w-3xl mx-auto">
            Don't risk your product's success with fake upvotes. Invest in real distribution that brings genuine users and sustainable growth.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Authentic Distribution */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-[#ff6154]">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-[#fff4f2] p-2 sm:p-3 rounded-xl">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-[#ff6154]" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Authentic Distribution</h3>
                <p className="text-[#ff6154] text-sm sm:text-base font-medium">The Right Way to Grow</p>
              </div>
            </div>
            
            <ul className="space-y-3 sm:space-y-4">
              {authenticBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#f0fdf4] flex items-center justify-center">
                    <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-green-500" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 sm:mt-8 p-4 bg-[#fff4f2] rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <Users className="h-4 w-4 sm:h-5 sm:w-5 text-[#ff6154]" />
                <span className="font-semibold text-gray-900 text-sm sm:text-base">Our Approach</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                We distribute your product to real tech communities, newsletters, and social networks where genuine users discover and engage with your launch.
              </p>
            </div>
          </div>

          {/* Fake Upvotes */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border-2 border-gray-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-red-50 p-2 sm:p-3 rounded-xl">
                <AlertTriangle className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900">Fake Upvotes</h3>
                <p className="text-red-500 text-sm sm:text-base font-medium">The Risk Not Worth Taking</p>
              </div>
            </div>
            
            <ul className="space-y-3 sm:space-y-4">
              {fakeRisks.map((risk, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-50 flex items-center justify-center">
                    <X className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-500" />
                  </div>
                  <span className="text-sm sm:text-base text-gray-700">{risk}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 sm:mt-8 p-4 bg-red-50 rounded-xl">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
                <span className="font-semibold text-gray-900 text-sm sm:text-base">Warning</span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600">
                Fake upvotes can lead to permanent account suspension and damage your product's reputation in the tech community. It's not worth the risk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthenticDistributionSection;