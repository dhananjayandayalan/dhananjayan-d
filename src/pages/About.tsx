import { motion } from 'framer-motion';
import { personalInfo } from '../data/portfolio';
import ExperienceMap from '../components/about/ExperienceMap';
import Skills from '../components/about/Skills';

const About = () => {
  return (
    <div className="space-y-16">
      {/* Professional Summary */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center md:text-left"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hi, I'm <span className="text-gradient">{personalInfo.name}</span>
        </h1>
        <h2 className="text-2xl md:text-3xl text-gray-400 mb-6">
          {personalInfo.title}
        </h2>
        <motion.p
          className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto md:mx-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          {personalInfo.summary}
        </motion.p>
      </motion.section>

      {/* Experience Map */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          My <span className="text-gradient">Journey</span>
        </h2>
        <ExperienceMap />
        <p className='text-center text-xs my-1.5 text-theme-secondary opacity-70 font-light'>*Try <span className='text-gradient font-bold'>Clicking</span> (or) <span className='text-gradient font-bold'>Hovering</span> on both Company Name and Location Pin</p>
      </motion.section>

      {/* Skills */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold mb-8 text-center">
          <span className="text-gradient">Skills</span> & Technologies
        </h2>
        <Skills />
      </motion.section>
    </div>
  );
};

export default About;
