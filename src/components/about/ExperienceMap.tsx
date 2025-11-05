import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../../data/portfolio';

const ExperienceMap = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Define positions for each location on the map (percentage-based for responsiveness)
  // This is a simplified representation - you can adjust these based on actual geography
  const locationPositions: Record<string, { x: number; y: number }> = {
    'Delhi': { x: 45, y: 30 },
    'Chennai': { x: 48, y: 65 },
    // Add more cities as needed
  };

  const getPosition = (city: string) => {
    return locationPositions[city] || { x: 50, y: 50 };
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Map Container */}
      <div className="relative bg-slate-800/30 rounded-2xl p-8 md:p-12 border border-slate-700 overflow-hidden">
        {/* Decorative Background Grid */}
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Map SVG */}
        <svg
          className="w-full h-[400px] md:h-[500px]"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Connecting Arrows */}
          {experiences.map((exp, index) => {
            if (index === experiences.length - 1) return null;
            const currentPos = getPosition(exp.location.city);
            const nextPos = getPosition(experiences[index + 1].location.city);

            return (
              <motion.g key={`arrow-${exp.id}`}>
                {/* Dotted Line */}
                <motion.line
                  x1={currentPos.x}
                  y1={currentPos.y}
                  x2={nextPos.x}
                  y2={nextPos.y}
                  stroke="#3b82f6"
                  strokeWidth="0.3"
                  strokeDasharray="1,1"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, delay: index * 0.5 }}
                />
                {/* Arrow Head */}
                <motion.path
                  d={`M ${nextPos.x - 1.5} ${nextPos.y - 1.5} L ${nextPos.x} ${nextPos.y} L ${nextPos.x - 1.5} ${nextPos.y + 1.5}`}
                  stroke="#3b82f6"
                  strokeWidth="0.4"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.5 + 1.5 }}
                />
              </motion.g>
            );
          })}

          {/* Location Pins */}
          {experiences.map((exp, index) => {
            const pos = getPosition(exp.location.city);
            return (
              <g key={exp.id}>
                {/* Pin Circle */}
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r="2"
                  fill={hoveredId === exp.id ? "#8b5cf6" : "#3b82f6"}
                  stroke="#fff"
                  strokeWidth="0.3"
                  className="cursor-pointer"
                  onMouseEnter={() => setHoveredId(exp.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.5, type: "spring", stiffness: 300 }}
                  whileHover={{ scale: 1.3 }}
                />
                {/* Pulse Animation */}
                {hoveredId === exp.id && (
                  <motion.circle
                    cx={pos.x}
                    cy={pos.y}
                    r="2"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="0.3"
                    initial={{ r: 2, opacity: 0.8 }}
                    animate={{ r: 4, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Experience Cards - Absolute positioned based on pins */}
        {experiences.map((exp) => {
          const pos = getPosition(exp.location.city);
          return (
            <AnimatePresence key={exp.id}>
              {hoveredId === exp.id && (
                <motion.div
                  className="absolute bg-slate-900/95 border border-slate-600 rounded-lg p-4 shadow-xl z-10 backdrop-blur-sm min-w-[280px]"
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    transform: 'translate(-50%, -120%)',
                  }}
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-blue-400">{exp.company}</h3>
                    <p className="text-sm text-gray-300">{exp.position}</p>
                    <div className="flex items-center text-sm text-gray-400">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {exp.period}
                    </div>
                    <div className="flex items-center text-sm text-gray-400">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {exp.location.city}
                    </div>
                    <div className="pt-2 border-t border-slate-700">
                      <p className="text-xs text-gray-500 mb-2">Tech Stack:</p>
                      <div className="flex flex-wrap gap-1">
                        {exp.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          );
        })}
      </div>

      {/* Timeline Legend */}
      <motion.div
        className="mt-8 flex flex-wrap justify-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {experiences.map((exp, index) => (
          <motion.div
            key={exp.id}
            className={`flex items-center space-x-2 cursor-pointer ${
              hoveredId === exp.id ? 'opacity-100' : 'opacity-70'
            }`}
            onMouseEnter={() => setHoveredId(exp.id)}
            onMouseLeave={() => setHoveredId(null)}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-600">{index + 1}</span>
              <div>
                <p className="text-sm font-medium text-white">{exp.company}</p>
                <p className="text-xs text-gray-400">{exp.location.city}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default ExperienceMap;
