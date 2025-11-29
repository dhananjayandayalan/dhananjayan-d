import { motion } from 'framer-motion';

interface ExperienceCardProps {
  company: string;
  position: string;
  posX: number;
  posY: number;
}

const ExperienceCard = ({ company, position, posX, posY }: ExperienceCardProps) => {
  return (
    <motion.div
      className="absolute bg-brutal-cyan border-4 border-brutal-black dark:border-brutal-white rounded-none p-3 shadow-brutal-md dark:shadow-brutal-md-light z-50 min-w-[220px] max-w-[280px]"
      style={{
        left: `${posX}%`,
        top: `${posY + 20}%`,
        transform: 'translate(-50%, -120%)',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.1, ease: 'linear' }}
    >
      <div className="space-y-1.5">
        <h3 className="text-sm font-black text-brutal-black">{company}</h3>
        <p className="text-xs text-brutal-black font-bold">{position}</p>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
