import { motion } from 'framer-motion';
import { skills } from '../../data/portfolio';

const Skills = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {skills.map((skillCategory, index) => (
        <motion.div
          key={skillCategory.category}
          className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <h3 className="text-xl font-bold mb-4 text-gradient">
            {skillCategory.category}
          </h3>
          <ul className="space-y-2">
            {skillCategory.items.map((skill) => (
              <motion.li
                key={skill}
                className="text-gray-300 flex items-center"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {skill}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default Skills;
