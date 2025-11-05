import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from '../components/projects/ProjectCard';
import { projects } from '../data/portfolio';

const Projects = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return projects.length - 1;
      if (nextIndex >= projects.length) return 0;
      return nextIndex;
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          My <span className="text-gradient">Projects</span>
        </h1>
        <p className="text-lg text-gray-400">
          A collection of my personal projects and work
        </p>
      </motion.div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Carousel */}
        <div className="relative h-[600px] md:h-[550px] flex items-center justify-center overflow-hidden">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(_, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full max-w-2xl px-4 cursor-grab active:cursor-grabbing"
            >
              <ProjectCard project={projects[currentIndex]} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <button
          className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-700 light:bg-white/90 light:hover:bg-gray-100 text-theme-primary p-3 rounded-full transition-all duration-200 z-10 backdrop-blur-sm border border-card hover:scale-110 shadow-lg"
          onClick={() => paginate(-1)}
          aria-label="Previous project"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          className="absolute right-2 md:right-0 top-1/2 -translate-y-1/2 bg-slate-800/80 hover:bg-slate-700 dark:bg-slate-800/80 dark:hover:bg-slate-700 light:bg-white/90 light:hover:bg-gray-100 text-theme-primary p-3 rounded-full transition-all duration-200 z-10 backdrop-blur-sm border border-card hover:scale-110 shadow-lg"
          onClick={() => paginate(1)}
          aria-label="Next project"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-blue-500'
                  : 'w-2 bg-gray-600 hover:bg-gray-500'
              }`}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>

        {/* Counter */}
        <motion.div
          className="text-center mt-6 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <span className="text-lg font-medium">
            {currentIndex + 1} / {projects.length}
          </span>
        </motion.div>

        {/* Instructions */}
        <motion.p
          className="text-center mt-4 text-gray-500 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          Drag or use arrows to navigate
        </motion.p>
      </div>
    </div>
  );
};

export default Projects;
