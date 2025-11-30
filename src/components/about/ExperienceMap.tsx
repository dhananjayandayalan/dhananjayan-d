import { useState, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { experiences } from '../../data/portfolio';
import { useTheme } from '../../context/ThemeContext';
import ConnectionLine from './map/ConnectionLine';
import LocationPin from './map/LocationPin';
import ExperienceCard from './map/ExperienceCard';
import TimelineLegendItem from './map/TimelineLegendItem';
import ExperienceCardModal from './map/ExperienceCardModal';
import type { Experience } from '../../types';

interface ViewBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ExperienceMap = () => {
  const { theme } = useTheme();
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  // Map interaction state
  const [viewBox, setViewBox] = useState<ViewBox>({ x: 0, y: 0, width: 100, height: 50 });
  const [isPanning, setIsPanning] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [initialViewBox, setInitialViewBox] = useState<ViewBox>({ x: 0, y: 0, width: 100, height: 50 });

  // Touch gesture state
  const [initialDistance, setInitialDistance] = useState<number | null>(null);
  const [initialViewBoxForPinch, setInitialViewBoxForPinch] = useState<ViewBox | null>(null);

  const svgRef = useRef<SVGSVGElement>(null);
  const defaultViewBox = { x: 0, y: 0, width: 100, height: 50 };

  // Convert lat/lng to SVG coordinates using equirectangular projection
  const getPosition = (lat: number, lng: number) => {
    const x = ((lng + 180) / 360) * 100;
    const y = ((90 - lat) / 180) * 50;
    return { x, y };
  };

  // Zoom functionality
  const handleZoom = (delta: number) => {
    setViewBox((prev) => {
      // Swap the logic: delta > 0 should zoom out (larger viewBox), delta < 0 should zoom in (smaller viewBox)
      const zoomFactor = delta > 0 ? 1.25 : 0.8;
      const newWidth = prev.width * zoomFactor;
      const newHeight = prev.height * zoomFactor;

      // Limit zoom levels
      if (newWidth < 20 || newWidth > 200) return prev;

      const centerX = prev.x + prev.width / 2;
      const centerY = prev.y + prev.height / 2;

      return {
        x: centerX - newWidth / 2,
        y: centerY - newHeight / 2,
        width: newWidth,
        height: newHeight,
      };
    });
  };

  // Reset view to default
  const resetView = () => {
    setViewBox(defaultViewBox);
  };

  // Get touch distance for pinch-to-zoom
  const getTouchDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Convert screen coordinates to SVG coordinates
  const screenToSVG = (clientX: number, clientY: number) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const svg = svgRef.current;
    const pt = svg.createSVGPoint();
    pt.x = clientX;
    pt.y = clientY;
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse());
    return { x: svgP.x, y: svgP.y };
  };

  // Mouse/Touch handlers for panning
  const handlePointerDown = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    // Ignore if clicking on interactive elements
    const target = e.target as SVGElement;
    if (target.tagName === 'circle' || target.closest('circle')) return;

    setIsPanning(true);

    let clientX: number, clientY: number;
    if ('touches' in e && e.touches.length === 1) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }

    const svgPoint = screenToSVG(clientX, clientY);
    setStartPoint(svgPoint);
    setInitialViewBox(viewBox);
  };

  const handlePointerMove = (e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) => {
    if (!isPanning) return;

    let clientX: number, clientY: number;
    if ('touches' in e && e.touches.length === 1) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else if ('clientX' in e) {
      clientX = e.clientX;
      clientY = e.clientY;
    } else {
      return;
    }

    const currentPoint = screenToSVG(clientX, clientY);
    const dx = startPoint.x - currentPoint.x;
    const dy = startPoint.y - currentPoint.y;

    setViewBox({
      x: initialViewBox.x + dx,
      y: initialViewBox.y + dy,
      width: initialViewBox.width,
      height: initialViewBox.height,
    });
  };

  const handlePointerUp = () => {
    setIsPanning(false);
  };

  // Touch handlers for pinch-to-zoom
  const handleTouchStart = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches[0], e.touches[1]);
      setInitialDistance(distance);
      setInitialViewBoxForPinch(viewBox);
    } else if (e.touches.length === 1) {
      handlePointerDown(e);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length === 2 && initialDistance && initialViewBoxForPinch) {
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches[0], e.touches[1]);
      const scale = initialDistance / currentDistance;

      const newWidth = initialViewBoxForPinch.width * scale;
      const newHeight = initialViewBoxForPinch.height * scale;

      // Limit zoom levels
      if (newWidth < 20 || newWidth > 200) return;

      const centerX = initialViewBoxForPinch.x + initialViewBoxForPinch.width / 2;
      const centerY = initialViewBoxForPinch.y + initialViewBoxForPinch.height / 2;

      setViewBox({
        x: centerX - newWidth / 2,
        y: centerY - newHeight / 2,
        width: newWidth,
        height: newHeight,
      });
    } else if (e.touches.length === 1) {
      handlePointerMove(e);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<SVGSVGElement>) => {
    if (e.touches.length < 2) {
      setInitialDistance(null);
      setInitialViewBoxForPinch(null);
    }
    if (e.touches.length === 0) {
      handlePointerUp();
    }
  };

  // Mouse wheel zoom
  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    e.preventDefault();
    handleZoom(e.deltaY);
  };

  // Prevent context menu on long press for mobile
  useLayoutEffect(() => {
    const preventContextMenu = (e: Event) => e.preventDefault();
    const svgElement = svgRef.current;
    if (svgElement) {
      svgElement.addEventListener('contextmenu', preventContextMenu);
      return () => svgElement.removeEventListener('contextmenu', preventContextMenu);
    }
  }, []);

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Map Container */}
      <div className="relative bg-brutal-white dark:bg-brutal-black rounded-none p-8 md:p-12 border-4 border-brutal-black dark:border-brutal-white overflow-hidden shadow-brutal-lg dark:shadow-brutal-lg-light">
        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
          {/* Zoom In Button */}
          <motion.button
            onClick={() => handleZoom(-1)}
            className="w-10 h-10 md:w-12 md:h-12 bg-brutal-white dark:bg-brutal-black border-3 border-brutal-black dark:border-brutal-white shadow-brutal hover:shadow-brutal-lg dark:shadow-brutal-light dark:hover:shadow-brutal-lg-light transition-all font-black text-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Zoom in"
          >
            +
          </motion.button>

          {/* Zoom Out Button */}
          <motion.button
            onClick={() => handleZoom(1)}
            className="w-10 h-10 md:w-12 md:h-12 bg-brutal-white dark:bg-brutal-black border-3 border-brutal-black dark:border-brutal-white shadow-brutal hover:shadow-brutal-lg dark:shadow-brutal-light dark:hover:shadow-brutal-lg-light transition-all font-black text-lg flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Zoom out"
          >
            −
          </motion.button>

          {/* Reset View Button */}
          <motion.button
            onClick={resetView}
            className="w-10 h-10 md:w-12 md:h-12 bg-brutal-white dark:bg-brutal-black border-3 border-brutal-black dark:border-brutal-white shadow-brutal hover:shadow-brutal-lg dark:shadow-brutal-light dark:hover:shadow-brutal-lg-light transition-all font-black text-xs flex items-center justify-center"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Reset view"
            title="Reset view"
          >
            ⟲
          </motion.button>
        </div>

        {/* Map Instructions for Mobile */}
        <div className="absolute top-4 left-4 z-30 bg-brutal-white/90 dark:bg-brutal-black/90 border-2 border-brutal-black dark:border-brutal-white px-3 py-2 text-xs font-bold md:hidden">
          <p className="text-brutal-black dark:text-brutal-white">
            Pinch to zoom • Drag to pan
          </p>
        </div>

        {/* Map SVG */}
        <svg
          ref={svgRef}
          className={`relative z-20 w-full h-[400px] md:h-[500px] ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
          viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
          preserveAspectRatio="xMidYMid meet"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          style={{ touchAction: 'none' }}
        >
          <defs>
            {/* Grid pattern for background */}
            <pattern
              id="grid-pattern"
              width="4"
              height="4"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 4 0 L 0 0 0 4"
                fill="none"
                stroke={theme === 'dark' ? '#FFFFFF' : '#000000'}
                strokeWidth="0.1"
                opacity="0.2"
              />
            </pattern>
          </defs>

          {/* Background Grid - covers entire map area */}
          <rect
            x="0"
            y="0"
            width="100"
            height="50"
            fill="url(#grid-pattern)"
          />

          {/* World Map Background Image */}
          <image
            href="/world-map.svg"
            x="0"
            y="0"
            width="100"
            height="50"
            opacity="0.9"
            style={{
              filter: theme === 'dark' ? 'invert(1)' : 'none'
            }}
          />

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
        transition={{ duration: 0.1, ease: 'linear' }}
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
      {selectedExperience && (
        <ExperienceCardModal
          isOpen={selectedExperience !== null}
          onClose={() => setSelectedExperience(null)}
          company={selectedExperience.company}
          position={selectedExperience.position}
          period={selectedExperience.period}
          city={selectedExperience.location.city}
          techStack={selectedExperience.techStack}
        />
      )}
    </div>
  );
};

export default ExperienceMap;
