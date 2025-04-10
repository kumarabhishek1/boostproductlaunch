import React from 'react';
import { MessageSquare, Send, Globe, Link2, Phone, Mail, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const formSchema = z.object({
  fullName: z.string().min(2, 'Full name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Please enter a valid phone number'),
  websiteUrl: z.string().url('Please enter a valid website URL').optional().or(z.literal('')),
  productHuntUrl: z.string()
    .regex(/^https:\/\/www\.producthunt\.com\/.+/, 'Please enter a valid Product Hunt URL')
    .optional()
    .or(z.literal('')),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof formSchema>;

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  });

  const onSubmit = async (data: FormData) => {
    try {
      // Use the Vercel API route in production, local proxy in development
      const API_URL = import.meta.env.PROD 
        ? '/api/submit-form'
        : 'http://localhost:3001/submit-form';
      
      console.log('Submitting form data:', data);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      console.log('API response status:', response.status);
      const result = await response.json();
      console.log('API response data:', result);
      
      if (response.ok) {
        reset();
        alert('Thank you for your message! We will get back to you soon.');
      } else {
        throw new Error(result.error || result.message || 'Failed to submit form');
      }
      
    } catch (error: any) {
      console.error('Error submitting form:', error);
      console.error('Error details:', error?.message);
      console.error('Error stack:', error?.stack);
      alert('There was an error submitting the form. Please try again or contact us directly at support@boostproductlaunch.com');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-4 sm:px-8 py-6">
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-[#ff6154]" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Get in Touch</h2>
        </div>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
          <div>
            <label htmlFor="fullName" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span> Full Name
            </label>
            <input
              type="text"
              id="fullName"
              {...register('fullName')}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6154] focus:border-transparent transition duration-200"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.fullName.message}</p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Mail className="h-4 w-4 text-[#ff6154]" />
                <span className="text-red-500">*</span> Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6154] focus:border-transparent transition duration-200"
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Phone className="h-4 w-4 text-[#ff6154]" />
                <span className="text-red-500">*</span> Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                {...register('phone')}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6154] focus:border-transparent transition duration-200"
                placeholder="+1234567890"
              />
              {errors.phone && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="websiteUrl" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Globe className="h-4 w-4 text-[#ff6154]" />
              Website URL
            </label>
            <input
              type="url"
              id="websiteUrl"
              {...register('websiteUrl')}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6154] focus:border-transparent transition duration-200"
              placeholder="https://your-website.com"
            />
            {errors.websiteUrl && (
              <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.websiteUrl.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="productHuntUrl" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <Link2 className="h-4 w-4 text-[#ff6154]" />
              Product Hunt URL
            </label>
            <input
              type="url"
              id="productHuntUrl"
              {...register('productHuntUrl')}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6154] focus:border-transparent transition duration-200"
              placeholder="https://www.producthunt.com/posts/your-product"
            />
            {errors.productHuntUrl && (
              <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.productHuntUrl.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <span className="text-red-500">*</span> Message
            </label>
            <textarea
              id="message"
              {...register('message')}
              rows={4}
              className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#ff6154] focus:border-transparent transition duration-200 resize-none"
              placeholder="Tell us about your product and launch plans..."
            />
            {errors.message && (
              <p className="mt-1 text-xs sm:text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#ff6154] hover:bg-[#e5574b] text-white font-semibold py-2 sm:py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
                Send Message
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;