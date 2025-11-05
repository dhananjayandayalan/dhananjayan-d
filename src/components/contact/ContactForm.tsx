import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import type { ContactFormData } from '../../types';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  mobile: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters')
});

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema)
  });

  const onSubmit = async (data: ContactFormData) => {
    // Simulate form submission
    console.log('Form data:', data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert('Thank you for your message! I will get back to you soon.');
    reset();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && e.target instanceof HTMLInputElement) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={handleKeyDown}
      className="space-y-6 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-2xl font-bold mb-6">Send me a message</h3>

      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          {...register('name')}
          type="text"
          id="name"
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
          placeholder="Your name"
        />
        {errors.name && (
          <motion.p
            className="mt-2 text-sm text-red-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors.name.message}
          </motion.p>
        )}
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          {...register('email')}
          type="email"
          id="email"
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <motion.p
            className="mt-2 text-sm text-red-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors.email.message}
          </motion.p>
        )}
      </div>

      {/* Mobile Field (Optional) */}
      <div>
        <label htmlFor="mobile" className="block text-sm font-medium text-gray-300 mb-2">
          Mobile <span className="text-gray-500 text-xs">(Optional)</span>
        </label>
        <input
          {...register('mobile')}
          type="tel"
          id="mobile"
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500"
          placeholder="+1 234 567 8900"
        />
        {errors.mobile && (
          <motion.p
            className="mt-2 text-sm text-red-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors.mobile.message}
          </motion.p>
        )}
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
          Message <span className="text-red-500">*</span>
        </label>
        <textarea
          {...register('message')}
          id="message"
          rows={5}
          className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all text-white placeholder-gray-500 resize-none"
          placeholder="Your message..."
        />
        {errors.message && (
          <motion.p
            className="mt-2 text-sm text-red-400"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {errors.message.message}
          </motion.p>
        )}
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
      >
        {isSubmitting ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </span>
        ) : (
          'Send Message'
        )}
      </motion.button>

      <p className="text-sm text-gray-500 text-center">
        Press Enter or click the button to submit
      </p>
    </motion.form>
  );
};

export default ContactForm;
