import { motion } from 'framer-motion';

interface LocationPinProps {
  x: number;
  y: number;
  isHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  delay: number;
}

const LocationPin = ({ x, y, isHovered, onMouseEnter, onMouseLeave, delay }: LocationPinProps) => {
  return (
    <g>
      {/* Pin Circle */}
      <motion.circle
        cx={x}
        cy={y}
        r="1.2"
        fill={isHovered ? "#ef4444" : "#3b82f6"}
        stroke="#fff"
        strokeWidth="0.2"
        className="cursor-pointer"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay, type: "spring", stiffness: 300 }}
        whileHover={{ scale: 1.5 }}
      />
      {/* Pulse Animation */}
      {isHovered && (
        <motion.circle
          cx={x}
          cy={y}
          r="1.2"
          fill="none"
          stroke="#ef4444"
          strokeWidth="0.2"
          initial={{ r: 1.2, opacity: 0.8 }}
          animate={{ r: 3, opacity: 0 }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </g>
  );
};

export default LocationPin;
