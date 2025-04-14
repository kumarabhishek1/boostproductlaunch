import React, { useEffect, useState } from 'react';
import { Rocket, Users, Trophy, MessageSquare, ChevronRight, Menu, X, Mail, Phone, MessageCircle } from 'lucide-react';
import './styles/scrollbar.css';
import ContactForm from './components/ContactForm';
import PricingPlans from './components/PricingPlans';
import SuccessStories from './components/SuccessStories';
import FAQ from './components/FAQ';
import ServicesSection from './components/ServicesSection';
import LeadMagnetBanner from './components/LeadMagnetBanner';
import UpvoteAnimation from './components/UpvoteAnimation';
import AuthenticDistributionSection from './components/AuthenticDistributionSection';
import TopHunterSection from './components/TopHunterSection';
import WhatsAppButton from './components/WhatsAppButton';
import { fetchSuccessStories } from './utils/googleSheets';
import type { SuccessStory } from './types/successStory';

function App() {
  const [successStories, setSuccessStories] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const loadStories = async () => {
      try {
        setLoading(true);
        const stories = await fetchSuccessStories();
        setSuccessStories(stories);
        setError(null);
      } catch (err) {
        setError('Failed to load success stories');
        console.error('Error loading success stories:', err);
      } finally {
        setLoading(false);
      }
    };

    loadStories();

    // Refresh data every 5 minutes
    const interval = setInterval(loadStories, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden w-full">
      {/* Header - Fixed at top */}
      <header className="bg-white border-b border-gray-200 w-full shadow-sm fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
              <img src="https://ph-static.imgix.net/ph-logo-1.png" alt="Product Hunt" className="h-8 sm:h-12" />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <button 
                onClick={() => scrollToSection('top-hunter')} 
                className="text-[#ff6154] hover:text-[#e5574b] border-2 border-[#ff6154] px-4 py-1.5 rounded-md hover:bg-[#fff8f7] transition-colors font-medium inline-flex items-center gap-2"
              >
                <Trophy className="h-5 w-5" />
                Get Hunted by a Top Hunter
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="text-gray-600 hover:text-gray-900"
              >
                Packages
              </button>
              <button 
                onClick={() => scrollToSection('success-stories')} 
                className="text-gray-600 hover:text-gray-900"
              >
                Success Stories
              </button>
              <button 
                onClick={() => scrollToSection('faqs')} 
                className="text-gray-600 hover:text-gray-900"
              >
                FAQs
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="bg-[#ff6154] text-white px-4 py-2 rounded-md hover:bg-[#e5574b] transition-colors"
              >
                Get Started
              </button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden py-4 space-y-4">
              <button 
                onClick={() => scrollToSection('top-hunter')} 
                className="block w-full text-left px-4 py-3 text-[#ff6154] hover:bg-[#fff8f7] border-l-4 border-[#ff6154] font-medium inline-flex items-center gap-2"
              >
                <Trophy className="h-5 w-5 flex-shrink-0" />
                Get Hunted by a Top Hunter
              </button>
              <button 
                onClick={() => scrollToSection('pricing')} 
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50"
              >
                Packages
              </button>
              <button 
                onClick={() => scrollToSection('success-stories')} 
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50"
              >
                Success Stories
              </button>
              <button 
                onClick={() => scrollToSection('faqs')} 
                className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-50"
              >
                FAQs
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left px-4 py-2 bg-[#ff6154] text-white rounded-md hover:bg-[#e5574b] transition-colors"
              >
                Get Started
              </button>
            </nav>
          )}
        </div>
      </header>

      {/* Lead Magnet Banner - Fixed below header */}
      <div className="fixed top-[68px] sm:top-[84px] left-0 right-0 z-40 bg-gradient-to-b from-gray-50 to-white">
        <LeadMagnetBanner />
      </div>

      {/* Main content with padding-top to account for fixed header AND banner */}
      <main className="pt-[128px] sm:pt-[148px]">
        {/* Hero Section with padding-top */}
        <section className="relative overflow-hidden w-full pb-12 sm:pb-16">
          {/* Grid Background */}
          <div className="absolute inset-0">
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255, 97, 84, 0.05) 1px, transparent 1px),
                  linear-gradient(to bottom, rgba(255, 97, 84, 0.05) 1px, transparent 1px)
                `,
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 30%, transparent 80%)'
              }}
            />
            
            <div 
              className="absolute inset-0"
              style={{
                background: 'radial-gradient(circle at center, rgba(255, 97, 84, 0.08) 0%, transparent 50%)',
                opacity: 0.8
              }}
            />
            
            <div 
              className="absolute inset-0"
              style={{
                backgroundImage: `
                  linear-gradient(to right, rgba(255, 97, 84, 0.02) 2px, transparent 2px),
                  linear-gradient(to bottom, rgba(255, 97, 84, 0.02) 2px, transparent 2px)
                `,
                backgroundSize: '120px 120px',
                maskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)',
                WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 70%)'
              }}
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="max-w-4xl mx-auto text-center pt-8 sm:pt-0">
              <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-bold text-gray-900 leading-tight mb-6">
                Boost Your Product Hunt Launch
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Amplify your product's visibility with our targeted distribution channels. Get more upvotes, more eyes, and more success on Product Hunt.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                <button 
                  onClick={() => scrollToSection('pricing')}
                  className="bg-[#ff6154] text-white px-6 py-3 rounded-md font-medium hover:bg-[#e5574b] transition-colors w-full sm:w-auto"
                >
                  Boost my Product Launch
                </button>
                <button 
                  onClick={() => scrollToSection('success-stories')}
                  className="border border-[#ff6154] text-[#ff6154] px-6 py-3 rounded-md font-medium hover:bg-[#fff8f7] transition-colors w-full sm:w-auto"
                >
                  View Success Stories
                </button>
              </div>
            </div>

            {/* Upvote Animation */}
            <div className="mt-8">
              <UpvoteAnimation />
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section id="success-stories" className="py-16 sm:py-20 bg-gray-50 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Trusted by Successful Product Launchers</h2>
            <p className="text-gray-600 text-center text-base sm:text-lg mb-12 sm:mb-16 max-w-3xl mx-auto">
              See how other products achieved remarkable success with our distribution network. Real experiences from founders who boosted their Product Hunt success.
            </p>
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff6154] mx-auto"></div>
                <p className="text-gray-600 mt-4">Loading success stories...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : (
              <SuccessStories stories={successStories} />
            )}
            <div className="mt-12 text-center">
              <button 
                onClick={() => scrollToSection('pricing')}
                className="inline-flex items-center bg-[#ff6154] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-[#e5574b] transition-colors text-base sm:text-lg gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Boost my Product Launch
                <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <ServicesSection />

        {/* Authentic Distribution Section */}
        <AuthenticDistributionSection />

        {/* Top Hunter Section */}
        <TopHunterSection />

        {/* Pricing Section */}
        <section id="pricing" className="py-16 sm:py-20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">Choose Your Launch Scale</h2>
            <PricingPlans />
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-16 sm:py-20 bg-gray-50 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">Have questions? Reach out to us.</h2>
            <p className="text-gray-600 text-center text-base sm:text-lg mb-12 sm:mb-16 max-w-2xl mx-auto">
              Expect no sales, just a lot of support.
            </p>
            <ContactForm />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faqs" className="py-16 sm:py-20 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12 sm:mb-16">Frequently Asked Questions</h2>
            <FAQ />
          </div>
        </section>

        <WhatsAppButton phoneNumber="447897026609" />

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 sm:py-12 w-full">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center space-x-2">
                <Rocket className="h-6 w-6" />
                <span className="text-xl font-bold">BoostProductLaunch</span>
              </div>
              
              {/* Contact Information */}
              <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-sm">
                <a href="mailto:hello@boostproductlaunch.com" 
                   className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  <Mail className="h-4 w-4" />
                  hello@boostproductlaunch.com
                </a>
                <span className="hidden sm:block text-gray-600">|</span>
                <a href="tel:+14162775284" 
                   className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  <Phone className="h-4 w-4" />
                  +1 416 277 5284
                </a>
                <span className="hidden sm:block text-gray-600">|</span>
                <a href="https://wa.me/17867853256" 
                   target="_blank"
                   rel="noopener noreferrer"
                   className="flex items-center gap-1.5 text-gray-400 hover:text-white transition-colors whitespace-nowrap">
                  <MessageCircle className="h-4 w-4" />
                  +1 786 785 3256
                </a>
              </div>

              <div className="text-gray-400 text-sm">
                © {new Date().getFullYear()} BoostProductLaunch. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

export default App;