import { motion } from 'framer-motion';

interface TimelineLegendItemProps {
  index: number;
  company: string;
  city: string;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}

const TimelineLegendItem = ({ index, company, city, isHovered, onMouseEnter, onMouseLeave, onClick }: TimelineLegendItemProps) => {
  return (
    <motion.div
      className={`flex items-center space-x-2 cursor-pointer ${
        isHovered ? 'opacity-100' : 'opacity-70'
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center space-x-2">
        <span className="text-2xl font-bold text-gray-600">{index + 1}</span>
        <div>
          <p className="text-sm font-medium text-white">{company}</p>
          <p className="text-xs text-gray-400">{city}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineLegendItem;
