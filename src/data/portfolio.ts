import type { Experience, Project, Skill, ProjectCategory } from '../types';

export const personalInfo = {
  name: 'Dhananjayan D',
  title: 'Full Stack Developer',
  email: 'dhananjayan.dayalan@gmail.com',
  linkedIn: 'https://linkedin.com/in/dhananjayandayalan',
  summary: `Passionate Full Stack Developer with expertise in building scalable web applications.
  Experienced in modern JavaScript frameworks. Dedicated to writing clean, maintainable code and delivering exceptional user experiences.`
};

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'Avizva Solutions',
    position: 'Development Engineer - Frontend Technologies',
    period: 'Sep 2021 - August 2025',
    location: {
      city: 'Delhi',
      coordinates: {
        lat: 30.6139,
        lng: 68.2090
      }
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'AWS', 'Typescript', 'Redux', 'Express', 'Jest', 'Micro-frontend']
  },
  {
    id: 2,
    company: 'Tata Consultancy Services',
    position: 'Systems Engineer - C1 Grade',
    period: 'Sept 2025 - Present',
    location: {
      city: 'Chennai',
      coordinates: {
        lat: 15.0827,
        lng: 70.2707
      }
    },
    techStack: ['React', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'Node.js', 'Serverless']
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
  }
];

export const projectCategories: ProjectCategory[] = [
  {
    id: 'hobby',
    name: 'Hobby Projects',
    projects: [
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
      }
    ]
  },
  {
    id: 'frontend-mentor',
    name: 'Frontend Mentor Challenges',
    projects: []
  }
];

export const skills: Skill[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Remix', 'Tailwind CSS', 'SCSS', 'Shadcn', 'Redux', 'React Native']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Nest.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis']
  },
  {
    category: 'DevOps',
    items: ['Docker', 'AWS', 'GitHub Actions']
  },
  {
    category: 'Tools',
    items: ['Git', 'Figma', 'Jest', 'Vitest', 'Turborepo', 'Webpack', 'Vite']
  }
];
