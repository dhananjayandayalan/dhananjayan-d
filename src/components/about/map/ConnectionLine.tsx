import { motion } from 'framer-motion';

interface ConnectionLineProps {
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay: number;
}

const ConnectionLine = ({ startX, startY, endX, endY, delay }: ConnectionLineProps) => {
  return (
    <motion.g>
      {/* Dotted Line */}
      <motion.line
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke="#3b82f6"
        strokeWidth="0.2"
        strokeDasharray="0.8,0.8"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay }}
      />
    </motion.g>
  );
};

export default ConnectionLine;
