import type { Experience, Project, Skill } from '../types';

export const personalInfo = {
  name: 'Your Name',
  title: 'Full Stack Developer',
  email: 'your.email@example.com',
  linkedIn: 'https://linkedin.com/in/yourprofile',
  summary: `Passionate Full Stack Developer with expertise in building scalable web applications.
  Experienced in modern JavaScript frameworks, cloud technologies, and agile development practices.
  Dedicated to writing clean, maintainable code and delivering exceptional user experiences.`
};

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'First Company',
    position: 'Software Developer',
    period: 'Jan 2020 - Dec 2021',
    location: {
      city: 'Delhi',
      coordinates: {
        lat: 28.6139,
        lng: 77.2090
      }
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'AWS']
  },
  {
    id: 2,
    company: 'Second Company',
    position: 'Senior Software Developer',
    period: 'Jan 2022 - Present',
    location: {
      city: 'Chennai',
      coordinates: {
        lat: 13.0827,
        lng: 80.2707
      }
    },
    techStack: ['React', 'TypeScript', 'PostgreSQL', 'Docker', 'Kubernetes']
  }
];

export const projects: Project[] = [
  {
    id: 1,
    name: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with payment integration',
    techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: 'https://github.com/yourusername/ecommerce',
    liveUrl: 'https://your-ecommerce.com'
  },
  {
    id: 2,
    name: 'Task Management App',
    description: 'A collaborative task management application with real-time updates',
    techStack: ['React', 'Firebase', 'Tailwind CSS'],
    githubUrl: 'https://github.com/yourusername/task-manager',
    liveUrl: 'https://your-task-app.com'
  },
  {
    id: 3,
    name: 'Weather Dashboard',
    description: 'A beautiful weather dashboard with location-based forecasts',
    techStack: ['React', 'TypeScript', 'OpenWeather API'],
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    liveUrl: 'https://your-weather.com'
  }
];

export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis']
  },
  {
    category: 'DevOps',
    items: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Nginx']
  },
  {
    category: 'Tools',
    items: ['Git', 'VS Code', 'Figma', 'Postman', 'Jest']
  }
];
