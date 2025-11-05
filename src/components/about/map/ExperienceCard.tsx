import { motion } from 'framer-motion';

interface ExperienceCardProps {
  company: string;
  position: string;
  period: string;
  city: string;
  techStack: string[];
  posX: number;
  posY: number;
}

const ExperienceCard = ({ company, position, period, city, techStack, posX, posY }: ExperienceCardProps) => {
  return (
    <motion.div
      className="absolute bg-slate-900/95 border border-slate-600 rounded-lg p-2.5 shadow-xl z-50 backdrop-blur-sm min-w-[220px] max-w-[280px]"
      style={{
        left: `${posX}%`,
        top: `${posY}%`,
        transform: 'translate(-50%, -120%)',
      }}
      initial={{ opacity: 0, y: 10, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.9 }}
      transition={{ duration: 0.2 }}
    >
      <div className="space-y-1.5">
        <h3 className="text-sm font-bold text-blue-400">{company}</h3>
        <p className="text-xs text-gray-300">{position}</p>

        <div className="flex items-center text-xs text-gray-400">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {period}
        </div>

        <div className="flex items-center text-xs text-gray-400">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {city}
        </div>

        <div className="pt-1.5 border-t border-slate-700">
          <p className="text-[10px] text-gray-500 mb-1">Tech Stack:</p>
          <div className="flex flex-wrap gap-1">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="text-[10px] bg-blue-600/20 text-blue-300 px-1.5 py-0.5 rounded whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
