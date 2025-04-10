import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

const defaultFAQs: FAQ[] = [
  {
    id: '1',
    question: 'How does your distribution service work?',
    answer: 'We leverage our extensive network of tech communities across Reddit, WhatsApp, Telegram, and Discord to promote your Product Hunt launch. Our community members are active Product Hunt users who are genuinely interested in discovering and supporting new products.',
    order: 1
  },
  {
    id: '2',
    question: 'When should I contact you before my launch?',
    answer: 'We recommend reaching out at least 1-2 weeks before your planned Product Hunt launch date. This gives us enough time to prepare the distribution strategy and ensure maximum impact on launch day.',
    order: 2
  },
  {
    id: '3',
    question: 'Do you guarantee a top position?',
    answer: 'While we can\'t guarantee specific positions, our track record shows that 99% of our supported products reach Top 5, with over 90% reaching Top 3 positions. Success depends on various factors including product quality and market fit.',
    order: 3
  },
  {
    id: '4',
    question: 'What makes your service different from others?',
    answer: 'Our service stands out due to our authentic community approach. We focus on real engagement from genuine users rather than artificial methods. Our extensive network of 1.5M+ reach across various platforms ensures broad, organic visibility.',
    order: 4
  },
  {
    id: '5',
    question: 'What information do you need to get started?',
    answer: 'We need your product details, planned launch date, Product Hunt page URL (if already scheduled), and your preferred distribution scale. You can provide these through our contact form.',
    order: 5
  },
  {
    id: '6',
    question: 'Do you offer post-launch support?',
    answer: 'Yes, depending on your chosen plan. We provide post-launch momentum support to maintain visibility and engagement beyond the launch day, especially with our Pro and Elite packages.',
    order: 6
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-0">
      <div className="space-y-3 sm:space-y-4">
        {defaultFAQs.map((faq, index) => (
          <div
            key={faq.id}
            className="border border-gray-200 rounded-lg overflow-hidden transition-all duration-200 hover:border-gray-300"
          >
            <button
              className="w-full flex justify-between items-center p-4 sm:p-6 text-left focus:outline-none focus:bg-gray-50 transition-colors duration-200"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
            >
              <span className="font-semibold text-base sm:text-lg pr-8">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
              )}
            </button>
            <div 
              className={`
                overflow-hidden transition-all duration-200
                ${openIndex === index ? 'max-h-96' : 'max-h-0'}
              `}
            >
              <div className="p-4 sm:p-6 pt-0 sm:pt-0">
                <p className="text-gray-600 text-sm sm:text-base">{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;