import React, { useState } from 'react';
import { MessageSquare, Send, Globe, Link2, Phone, Mail, Loader2, MessageCircle } from 'lucide-react';
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
      // Get the Google Script URL from environment variables
      const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;
      
      if (!GOOGLE_SCRIPT_URL) {
        throw new Error('Google Apps Script URL is not configured');
      }

      console.log('Submitting form data:', data);
      
      // Use fetch with no-cors mode for Google Apps Script
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          timestamp: new Date().toISOString()
        }),
      });

      // Since no-cors mode doesn't return response details, we assume success if no error
      console.log('Form submitted successfully');
      reset();
      alert('Thank you for your message! We will get back to you soon.');
      
    } catch (error: any) {
      console.error('Error submitting form:', error);
      console.error('Error details:', error?.message);
      console.error('Error stack:', error?.stack);
      alert('There was an error submitting the form. Please try again or contact us directly at hello@boostproductlaunch.com');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Contact Form */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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