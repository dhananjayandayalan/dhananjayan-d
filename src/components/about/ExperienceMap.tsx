import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../../data/portfolio';
import WorldMapBackground from './map/WorldMapBackground';
import ConnectionLine from './map/ConnectionLine';
import LocationPin from './map/LocationPin';
import ExperienceCard from './map/ExperienceCard';
import TimelineLegendItem from './map/TimelineLegendItem';
import Modal from '../common/Modal';
import ExperienceCardModal from './map/ExperienceCardModal';
import type { Experience } from '../../types';

const ExperienceMap = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  // Convert lat/lng to SVG coordinates using equirectangular projection
  const getPosition = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 50;
    return { x, y };
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Map Container */}
      <div className="relative bg-slate-800/30 rounded-2xl p-8 md:p-12 border border-slate-700 overflow-hidden">
        <WorldMapBackground />

        {/* Map SVG */}
        <svg
          className="relative z-20 w-full h-[400px] md:h-[500px]"
          viewBox="0 0 100 50"
          preserveAspectRatio="xMidYMid meet"
        >

          {/* Connecting Arrows */}
          {experiences.map((exp, index) => {
            if (index === experiences.length - 1) return null;
            const currentPos = getPosition(exp.location.coordinates.lat, exp.location.coordinates.lng);
            const nextPos = getPosition(experiences[index + 1].location.coordinates.lat, experiences[index + 1].location.coordinates.lng);

            return (
              <ConnectionLine
                key={`arrow-${exp.id}`}
                startX={currentPos.x}
                startY={currentPos.y}
                endX={nextPos.x}
                endY={nextPos.y}
                delay={index * 0.5}
              />
            );
          })}

          {/* Location Pins */}
          {experiences.map((exp, index) => {
            const pos = getPosition(exp.location.coordinates.lat, exp.location.coordinates.lng);
            return (
              <LocationPin
                key={exp.id}
                x={pos.x}
                y={pos.y}
                isHovered={hoveredId === exp.id}
                onMouseEnter={() => setHoveredId(exp.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => setSelectedExperience(exp)}
                delay={index * 0.5}
              />
            );
          })}
        </svg>

        {/* Experience Cards - Absolute positioned based on pins */}
        {experiences.map((exp) => {
          const pos = getPosition(exp.location.coordinates.lat, exp.location.coordinates.lng);
          return (
            <AnimatePresence key={exp.id}>
              {hoveredId === exp.id && (
                <ExperienceCard
                  company={exp.company}
                  position={exp.position}
                  posX={pos.x}
                  posY={pos.y}
                />
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
          <TimelineLegendItem
            key={exp.id}
            index={index}
            company={exp.company}
            city={exp.location.city}
            isHovered={hoveredId === exp.id}
            onMouseEnter={() => setHoveredId(exp.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => setSelectedExperience(exp)}
          />
        ))}
      </motion.div>

      {/* Modal for Experience Details */}
      <Modal
        isOpen={selectedExperience !== null}
        onClose={() => setSelectedExperience(null)}
      >
        {selectedExperience && (
          <ExperienceCardModal
            company={selectedExperience.company}
            position={selectedExperience.position}
            period={selectedExperience.period}
            city={selectedExperience.location.city}
            techStack={selectedExperience.techStack}
          />
        )}
      </Modal>
    </div>
  );
};

export default ExperienceMap;
