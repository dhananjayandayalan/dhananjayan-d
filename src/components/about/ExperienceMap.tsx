import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../../data/portfolio';

const ExperienceMap = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Convert lat/lng to SVG coordinates using equirectangular projection
  const getPosition = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 100;
    return { x, y };
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
          {/* World Map Background */}
          <g className="opacity-25 dark:opacity-35" fill="#3b82f6" stroke="#2563eb" strokeWidth="0.15">
            {/* North America */}
            <path d="M 5,20 L 8,15 L 12,12 L 15,13 L 18,15 L 20,18 L 22,20 L 24,22 L 26,25 L 28,28 L 29,32 L 28,36 L 26,40 L 24,42 L 22,43 L 20,42 L 18,40 L 16,38 L 14,36 L 12,34 L 10,30 L 8,26 L 6,22 Z" />

            {/* South America */}
            <path d="M 26,46 L 28,44 L 30,44 L 32,46 L 33,50 L 34,54 L 34,58 L 33,62 L 32,66 L 30,68 L 28,67 L 26,64 L 25,60 L 25,56 L 25,52 L 25,48 Z" />

            {/* Europe */}
            <path d="M 47,22 L 49,20 L 51,20 L 53,21 L 54,23 L 54,26 L 53,28 L 51,29 L 49,29 L 47,28 L 46,26 L 46,24 Z" />

            {/* Africa */}
            <path d="M 47,32 L 49,31 L 51,31 L 53,32 L 55,35 L 56,40 L 57,45 L 57,50 L 56,54 L 54,57 L 52,59 L 50,60 L 48,59 L 46,56 L 45,52 L 44,48 L 44,44 L 45,40 L 46,36 L 47,33 Z" />

            {/* Asia */}
            <path d="M 54,18 L 58,16 L 62,15 L 66,16 L 70,18 L 74,20 L 77,23 L 80,26 L 82,30 L 84,34 L 85,38 L 84,42 L 82,45 L 79,47 L 76,48 L 72,49 L 68,49 L 64,48 L 60,46 L 58,43 L 56,40 L 55,36 L 54,32 L 54,28 L 54,24 L 54,20 Z" />

            {/* India (Indian Subcontinent) */}
            <path d="M 66,36 L 68,34 L 70,33 L 72,34 L 73,36 L 74,40 L 74,44 L 73,47 L 71,49 L 69,50 L 67,49 L 66,46 L 65,42 L 65,38 Z" />

            {/* Australia */}
            <path d="M 76,56 L 78,54 L 81,54 L 84,56 L 86,59 L 87,62 L 86,65 L 84,67 L 81,68 L 78,67 L 76,64 L 75,61 L 75,58 Z" />

            {/* Greenland */}
            <path d="M 30,8 L 33,6 L 36,6 L 38,8 L 39,11 L 38,14 L 36,16 L 33,16 L 30,14 L 29,11 Z" />
          </g>

          {/* Connecting Arrows */}
          {experiences.map((exp, index) => {
            if (index === experiences.length - 1) return null;
            const currentPos = getPosition(exp.location.coordinates.lat, exp.location.coordinates.lng);
            const nextPos = getPosition(experiences[index + 1].location.coordinates.lat, experiences[index + 1].location.coordinates.lng);

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
            const pos = getPosition(exp.location.coordinates.lat, exp.location.coordinates.lng);
            return (
              <g key={exp.id}>
                {/* Pin Circle */}
                <motion.circle
                  cx={pos.x}
                  cy={pos.y}
                  r="2"
                  fill={hoveredId === exp.id ? "#ef4444" : "#3b82f6"}
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
                    stroke="#ef4444"
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
          const pos = getPosition(exp.location.coordinates.lat, exp.location.coordinates.lng);
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
