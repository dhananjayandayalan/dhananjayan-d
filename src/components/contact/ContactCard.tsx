import { motion } from 'framer-motion';
import { personalInfo } from '../../data/portfolio';

const ContactCard = () => {
  return (
    <motion.div
      className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 md:p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h3 className="text-2xl font-bold mb-6">Connect with me</h3>

      <div className="space-y-6">
        {/* Email */}
        <motion.a
          href={`mailto:${personalInfo.email}`}
          className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/80 transition-all duration-200 group"
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="bg-blue-600/20 p-3 rounded-lg group-hover:bg-blue-600/30 transition-colors">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-white font-medium">{personalInfo.email}</p>
          </div>
          <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          href={personalInfo.linkedIn}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-4 p-4 bg-slate-900/50 rounded-lg hover:bg-slate-900/80 transition-all duration-200 group"
          whileHover={{ scale: 1.02, x: 5 }}
          whileTap={{ scale: 0.98 }}
        >
          <div className="bg-blue-600/20 p-3 rounded-lg group-hover:bg-blue-600/30 transition-colors">
            <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </div>
          <div className="flex-1">
            <p className="text-sm text-gray-400">LinkedIn</p>
            <p className="text-white font-medium">Connect on LinkedIn</p>
          </div>
          <svg className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </motion.a>

        {/* Additional Info */}
        <div className="pt-6 border-t border-slate-700">
          <p className="text-gray-400 text-sm leading-relaxed">
            Feel free to reach out for collaborations, opportunities, or just to say hi! I'm always open to discussing new projects and ideas.
          </p>
        </div>

        {/* Response Time */}
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Usually responds within 24 hours</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactCard;
