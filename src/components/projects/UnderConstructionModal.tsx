import { motion } from 'framer-motion';
import Modal from '../common/Modal';

interface UnderConstructionModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
}

const UnderConstructionModal = ({ isOpen, onClose, projectName }: UnderConstructionModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col items-center justify-center py-8 px-4">
        {/* Construction Icon */}
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 10 }}
          transition={{
            repeat: Infinity,
            repeatType: 'reverse',
            duration: 1,
            ease: 'easeInOut',
          }}
          className="mb-6"
        >
          <svg
            className="w-24 h-24 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 2L1 21h22L12 2zm0 3.99L19.53 19H4.47L12 5.99zM11 16h2v2h-2v-2zm0-6h2v4h-2v-4z" />
          </svg>
        </motion.div>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-bold mb-4 text-center"
        >
          <span className="text-gradient">Under Construction</span>
        </motion.h2>

        {/* Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center space-y-4 max-w-md"
        >
          <p className="text-gray-300 dark:text-gray-300 light:text-gray-700 text-lg">
            The live demo for <span className="text-blue-400 dark:text-blue-400 light:text-blue-600 font-semibold">{projectName}</span> is currently under construction.
          </p>
          <p className="text-gray-400 dark:text-gray-400 light:text-gray-600 text-sm">
            This project is being worked on and will be deployed soon. Check back later for the live version!
          </p>
        </motion.div>

        {/* Decorative construction barrier */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 w-full max-w-sm"
        >
          <div className="h-3 bg-linear-to-r from-yellow-500 via-black to-yellow-500 rounded-full"
               style={{
                 backgroundImage: 'repeating-linear-gradient(45deg, #eab308 0px, #eab308 20px, #000000 20px, #000000 40px)'
               }}
          />
        </motion.div>

        {/* Close Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          onClick={onClose}
          className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white! font-semibold rounded-lg transition-all duration-200 hover:scale-105"
        >
          Got it!
        </motion.button>
      </div>
    </Modal>
  );
};

export default UnderConstructionModal;
