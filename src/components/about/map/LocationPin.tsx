import { motion } from 'framer-motion';

interface LocationPinProps {
  x: number;
  y: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
  delay: number;
}

const LocationPin = ({ x, y, isHovered, onMouseEnter, onMouseLeave, onClick, delay }: LocationPinProps) => {
  return (
    <g>
      {/* Pin Circle */}
      <motion.circle
        cx={x}
        cy={y}
        r="0.5"
        fill={isHovered ? "#FF1493" : "#00E5FF"}
        stroke="#000"
        strokeWidth="0.3"
        className="cursor-pointer"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.1, ease: 'linear' }}
        whileHover={{ scale: 1.5 }}
      />
      {/* Pulse Animation */}
      {isHovered && (
        <motion.circle
          cx={x}
          cy={y}
          r="1.2"
          fill="none"
          stroke="#FF1493"
          strokeWidth="0.3"
          initial={{ r: 1.2, opacity: 0.8 }}
          animate={{ r: 3, opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      )}
    </g>
  );
};

export default LocationPin;
