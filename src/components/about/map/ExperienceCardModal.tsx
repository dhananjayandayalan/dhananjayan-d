import { motion } from 'framer-motion';
import Modal from '../../common/Modal';

interface ExperienceCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  company: string;
  position: string;
  period: string;
  city: string;
  techStack: string[];
}

const ExperienceCardModal = ({ isOpen, onClose, company, position, period, city, techStack }: ExperienceCardModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <motion.div
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Section */}
      <div className="space-y-3 pb-4 border-b border-card">
        <h2 className="text-3xl font-bold text-blue-500">{company}</h2>
        <p className="text-xl text-theme-primary font-medium">{position}</p>
      </div>

      {/* Details Section */}
      <div className="space-y-4">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-theme-secondary opacity-70">Duration</p>
            <p className="text-lg text-theme-primary">{period}</p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-600/20 rounded-lg">
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-theme-secondary opacity-70">Location</p>
            <p className="text-lg text-theme-primary">{city}</p>
          </div>
        </div>
      </div>

      {/* Tech Stack Section */}
      <div className="space-y-3 pt-4 border-t border-card">
        <div className="flex items-center space-x-2">
          <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
          <h3 className="text-lg font-semibold text-theme-primary">Tech Stack</h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech, index) => (
            <motion.span
              key={tech}
              className="text-sm bg-blue-600/20 text-blue-400 px-4 py-2 rounded-lg border border-blue-500/30 font-medium"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.05 }}
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Additional Info */}
      <div className="pt-4 border-t border-card">
        <p className="text-sm text-theme-secondary opacity-70">
          Click outside or press ESC to close
        </p>
      </div>
      </motion.div>
    </Modal>
  );
};

export default ExperienceCardModal;
