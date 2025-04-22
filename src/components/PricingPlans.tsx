import React, { useState } from 'react';
import { Users, ArrowRight, MessageSquare, ThumbsUp, Clock, Shield, Calendar, ShoppingCart, X } from 'lucide-react';
// import PayPalButton from './PayPalButton';

interface CartItem {
  distribution: number;
  upvotes: number;
  price: number;
}

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  productHuntUrl: string;
  launchDate: string;
  selectedPackages: string;
  totalPrice: number;
  timestamp: string;
}

const PricingPlans = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  // const [showPayPal, setShowPayPal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    productHuntUrl: '',
    launchDate: '',
  });

  const distributionOptions = [
    { distribution: 5000, upvotes: 50, price: 50 },
    { distribution: 10000, upvotes: 100, price: 110 },
    { distribution: 40000, upvotes: 300, price: 400 },
  ];

  const addToCart = (item: CartItem) => {
    setCart([...cart, item]);
    submitLeadData({
      ...formData,
      selectedPackages: `${item.distribution} members`,
      totalPrice: item.price,
      timestamp: new Date().toISOString(),
    });
  };

  const removeFromCart = (index: number) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  const getTotalDistribution = () => {
    return cart.reduce((sum, item) => sum + item.distribution, 0);
  };

  const getTotalUpvotes = () => {
    return cart.reduce((sum, item) => sum + item.upvotes, 0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (value && (name === 'email' || name === 'productHuntUrl')) {
      submitLeadData({
        ...formData,
        [name]: value,
        selectedPackages: cart.map(item => `${item.distribution} members`).join(', '),
        totalPrice: getTotalPrice(),
        timestamp: new Date().toISOString(),
      });
    }
  };

  const submitLeadData = async (leadData: LeadData) => {
    try {
      await fetch(import.meta.env.VITE_CONTACT_FORM_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });
    } catch (error) {
      console.error('Error saving lead data:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const formDataToSend = {
        timestamp: new Date().toISOString(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        productHuntUrl: formData.productHuntUrl,
        launchDate: formData.launchDate,
        selectedPackages: cart.map(item => `${item.distribution} members`).join(', '),
        totalDistribution: getTotalDistribution(),
        expectedUpvotes: getTotalUpvotes(),
        totalPrice: getTotalPrice(),
      };

      console.log('Preparing to send data:', JSON.stringify(formDataToSend, null, 2));
      console.log('Sending to URL:', 'https://script.google.com/macros/s/AKfycbwH2ie35XNLKM5os741LxNjMxMCL2x1zgj1nkPAUtafx8zCItH8oPGMBDNFCik6LoQIhg/exec');

      const startTime = Date.now();
      console.log('Starting request at:', new Date(startTime).toISOString());

      const response = await fetch('https://script.google.com/macros/s/AKfycbwH2ie35XNLKM5os741LxNjMxMCL2x1zgj1nkPAUtafx8zCItH8oPGMBDNFCik6LoQIhg/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSend),
      });

      const endTime = Date.now();
      console.log('Request completed at:', new Date(endTime).toISOString());
      console.log('Request duration:', (endTime - startTime) / 1000, 'seconds');

      // Since we're using no-cors mode, we can't check response.ok
      // Instead, we'll assume success if we get here
      console.log('Request completed successfully');

      // Show success message
      alert('Thank you for placing your order, our team will reach out to you within 24 hours. In case of urgency, please reach out to us via the WhatsApp chat button on the website or email us at hello@boostproductlaunch.com');

      // Reset form
      setCart([]);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        productHuntUrl: '',
        launchDate: '',
      });
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error submitting your order. Please try again or contact us directly.');
    }
  };

  // const handlePayPalSuccess = async (details: any) => {
  //   try {
  //     console.log('Payment successful:', details);
      
  //     setCart([]);
  //     setFormData({
  //       firstName: '',
  //       lastName: '',
  //       email: '',
  //       productHuntUrl: '',
  //       launchDate: '',
  //     });
  //     setShowPayPal(false);

  //     alert('Thank you for your payment! We will contact you shortly to discuss your launch.');
  //   } catch (error) {
  //     console.error('Error processing payment:', error);
  //     alert('There was an error processing your payment. Please try again.');
  //   }
  // };

  // const handlePayPalError = (error: any) => {
  //   console.error('PayPal error:', error);
  //   alert('There was an error processing your payment. Please try again.');
  // };

  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6 sm:space-y-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {distributionOptions.map((option, index) => (
              <div
                key={option.distribution}
                className={`rounded-xl border ${
                  index === 1 ? 'border-[#ff6154] shadow-lg' : 'border-gray-200'
                } bg-white overflow-hidden transition-all duration-200 hover:shadow-lg`}
              >
                {index === 1 && (
                  <div className="bg-[#ff6154] text-white text-center py-1 text-xs sm:text-sm font-medium">
                    Most Popular
                  </div>
                )}
                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 sm:h-8 sm:w-8 text-[#ff6154]" />
                  </div>
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="text-2xl sm:text-3xl font-bold mb-1">${option.price}</div>
                    <div className="text-gray-600 text-xs sm:text-sm">one-time</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                    <div className="text-base sm:text-lg font-semibold text-[#ff6154]">
                      {(option.distribution / 1000)}k Community Members
                    </div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1 sm:mt-2">
                      ≈ {option.upvotes} Upvotes
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(option)}
                    className={`w-full py-2 sm:py-3 px-4 rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base ${
                      index === 1
                        ? 'bg-[#ff6154] text-white hover:bg-[#e5574b]'
                        : 'bg-white text-[#ff6154] border-2 border-[#ff6154] hover:bg-[#ff6154] hover:text-white'
                    }`}
                  >
                    Add to Cart
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-[#fff8f7] rounded-xl p-4 sm:p-6 border border-[#ffe4e0]">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="h-5 w-5 text-[#ff6154]" />
              Our Launch Guarantee
            </h3>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <ThumbsUp className="h-5 w-5 text-[#ff6154] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-medium text-sm sm:text-base">Minimum upvotes guaranteed</div>
                    <div className="text-xs sm:text-sm text-gray-600">Based on your selected package</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-[#ff6154] flex-shrink-0 mt-1" />
                  <div>
                    <div className="font-medium text-sm sm:text-base">24-hour launch support</div>
                    <div className="text-xs sm:text-sm text-gray-600">Dedicated team monitoring your launch</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 text-center">
                <div className="text-xl sm:text-2xl font-bold text-[#ff6154] mb-2">100% Risk-Free</div>
                <p className="text-xs sm:text-sm text-gray-600">
                  If we don't deliver the promised upvotes within 24 hours of your launch, get your money back - no questions asked.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 h-fit lg:sticky lg:top-24">
          <h3 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">Order Summary</h3>
          
          {cart.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm sm:text-base">
              Your cart is empty
            </div>
          ) : (
            <>
              <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                {cart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-sm sm:text-base">{(item.distribution / 1000)}k Distribution</div>
                      <div className="text-xs sm:text-sm text-gray-600">≈ {item.upvotes} upvotes</div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="font-semibold text-sm sm:text-base">${item.price}</div>
                      <button
                        onClick={() => removeFromCart(index)}
                        className="text-red-500 hover:text-red-600 text-xs sm:text-sm p-1"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4 mb-6">
                <div className="flex justify-between mb-2 text-sm sm:text-base">
                  <div className="text-gray-600">Total Distribution</div>
                  <div className="font-medium">{(getTotalDistribution() / 1000)}k members</div>
                </div>
                <div className="flex justify-between mb-2 text-sm sm:text-base">
                  <div className="text-gray-600">Expected Upvotes</div>
                  <div className="font-medium">≈ {getTotalUpvotes()}</div>
                </div>
                <div className="flex justify-between text-base sm:text-lg font-semibold">
                  <div>Total</div>
                  <div>${getTotalPrice()}</div>
                </div>
              </div>
            </>
          )}

          {/* {showPayPal ? (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white p-6 sm:p-8 rounded-xl max-w-md w-full">
                <h3 className="text-xl sm:text-2xl font-bold mb-4">Complete Payment</h3>
                <div className="mb-6">
                  <div className="text-gray-600 mb-2">Total Amount:</div>
                  <div className="text-2xl sm:text-3xl font-bold">${getTotalPrice()}</div>
                </div>
                <PayPalButton
                  amount={getTotalPrice()}
                  onSuccess={handlePayPalSuccess}
                  onError={handlePayPalError}
                />
                <button
                  onClick={() => setShowPayPal(false)}
                  className="w-full mt-4 py-2 text-gray-600 hover:text-gray-800 text-sm sm:text-base"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : ( */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6154] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6154] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6154] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Product Hunt URL</label>
                <input
                  type="url"
                  name="productHuntUrl"
                  value={formData.productHuntUrl}
                  onChange={handleInputChange}
                  placeholder="https://www.producthunt.com/posts/your-product"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6154] focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">Launch Date</label>
                <input
                  type="date"
                  name="launchDate"
                  value={formData.launchDate}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6154] focus:border-transparent"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={cart.length === 0}
                className="w-full bg-[#ff6154] text-white py-2 sm:py-3 px-4 rounded-lg font-semibold hover:bg-[#e5574b] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                Generate Invoice
              </button>

              {/* <div className="flex items-center justify-center gap-4 text-xs sm:text-sm text-gray-500 mt-4">
                <div className="flex items-center gap-1">
                  <Shield className="h-4 w-4" />
                  Secure Checkout
                </div>
              </div> */}
            </form>
          {/* )} */}
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;