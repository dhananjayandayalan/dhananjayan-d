import type { Experience, LineId, Project, Skill } from '../types';

export const personalInfo = {
  name: 'Dhananjayan D',
  firstName: 'Dhananjayan',
  title: 'Full Stack Developer',
  location: 'Chennai, India',
  timezone: 'IST (UTC+5:30)',
  email: 'dhananjayan.dayalan@gmail.com',
  linkedIn: 'https://linkedin.com/in/dhananjayandayalan',
  linkedInHandle: 'in/dhananjayandayalan',
  github: 'https://github.com/dhananjayandayalan',
  githubHandle: 'dhananjayandayalan',
  startYear: 2021,
  summary:
    'I build scalable web applications end to end — React and TypeScript on the front, Node.js and PostgreSQL behind it. I care about clean, maintainable code and interfaces people enjoy using.'
};

export const experiences: Experience[] = [
  {
    id: 1,
    company: 'Avizva Solutions',
    position: 'Development Engineer — Frontend Technologies',
    period: 'Sep 2021 — Aug 2025',
    shortLabel: 'Avizva · 2021–25',
    years: '2021–25',
    location: {
      city: 'Delhi',
      coordinates: { lat: 28.6139, lng: 77.209 }
    },
    techStack: ['React', 'Node.js', 'MongoDB', 'AWS', 'TypeScript', 'Redux', 'Express', 'Jest', 'Micro-frontend']
  },
  {
    id: 2,
    company: 'Tata Consultancy Services',
    position: 'Systems Engineer — C1 Grade',
    period: 'Sep 2025 — Present',
    shortLabel: 'TCS · Now',
    years: '2025–',
    current: true,
    location: {
      city: 'Chennai',
      coordinates: { lat: 13.0827, lng: 80.2707 }
    },
    techStack: ['React', 'TypeScript', 'PostgreSQL', 'Docker', 'AWS', 'Node.js', 'Serverless', 'Twilio Flex', 'C#', 'Java', 'Spring Boot']
  }
];

export const projects: Project[] = [
  {
    id: 1,
    name: 'Syncify',
    kind: 'Cross-platform app',
    accent: 'red',
    description:
      'A cross-platform application that synchronizes playlists across multiple music streaming services — Spotify, Apple Music, Amazon Music and YouTube Music.',
    techStack: ['React', 'React Native', 'Tailwind', 'Node.js', 'PostgreSQL', 'Docker', 'Turborepo', 'Spotify API', 'Apple Music API'],
    githubUrl: 'https://github.com/dhananjayandayalan/syncify'
  },
  {
    id: 2,
    name: 'Cheerify',
    kind: 'AI web app',
    accent: 'purple',
    description:
      'Generates unique, AI-powered cheer-up notes for Twitter users by analysing their Twitter personality and turning it into a custom PDF message.',
    techStack: ['Vue', 'Node.js', 'Gemini API', 'Twitter API', 'PDF Generation'],
    githubUrl: 'https://github.com/dhananjayandayalan/cheerify'
  },
  {
    id: 3,
    name: 'Personal Portfolio',
    kind: 'Website',
    accent: 'green',
    description:
      'This site — my projects, skills and experience, statically generated with Next.js and animated with Framer Motion.',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    // TODO: point this at the portfolio repository once it is public.
    githubUrl: 'https://github.com/dhananjayandayalan/dhananjayan-d',
    liveUrl: 'https://dhananjayan-d.vercel.app'
  },
  {
    id: 4,
    name: 'Real-time Collaboration PM System',
    kind: 'Real-time system',
    accent: 'blue',
    description:
      'Project management with live collaboration — boards update instantly over WebSockets, backed by Dockerised microservices on PostgreSQL and Redis.',
    techStack: ['React', 'Node.js', 'Express.js', 'TypeScript', 'Redux Toolkit', 'WebSocket', 'Docker', 'PostgreSQL', 'Redis', 'Micro-Services', 'CSS'],
    githubUrl: 'https://github.com/dhananjayandayalan/real-time-collaboration-project-management-system'
  },
  {
    id: 5,
    name: 'Momentum UI',
    kind: 'Component library',
    accent: 'amber',
    description: 'A unique set of components for a niche use case, built framework-agnostic across React, Vue, Angular and Svelte.',
    techStack: ['React', 'Vue', 'Angular', 'Svelte', 'Storybook', 'Turborepo', 'pnpm', 'Codex', 'Claude Code'],
    githubUrl: 'https://github.com/dhananjayandayalan/momentum-ui'
  }
];

export const skills: Skill[] = [
  {
    category: 'Frontend',
    line: 'frontend',
    items: ['React', 'TypeScript', 'Next.js', 'Remix', 'Vue.js', 'Tailwind CSS', 'SCSS', 'Shadcn', 'Redux', 'Zustand', 'React Native']
  },
  {
    category: 'Backend',
    line: 'backend',
    items: ['Node.js', 'Nest.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'Java', 'Spring Boot', 'Golang']
  },
  {
    category: 'DevOps',
    line: 'devops',
    items: ['Docker', 'AWS', 'GitHub Actions', 'GCP', 'Azure', 'Turborepo', 'Vercel', 'Netlify', 'Serverless Framework', 'Kubernetes']
  },
  {
    category: 'Tools',
    line: 'tools',
    items: ['Git', 'Figma', 'Jest', 'Vitest', 'Turborepo', 'Webpack', 'Vite', 'Twilio Flex']
  }
];

/** Tech names that don't appear verbatim in `skills` but belong to a line. */
const lineAliases: Record<string, LineId> = {
  'micro-frontend': 'frontend',
  serverless: 'devops'
};

/** Which stack line a technology belongs to (falls back to Tools). */
export const lineFor = (tech: string): LineId => {
  const key = tech.trim().toLowerCase();
  if (lineAliases[key]) return lineAliases[key];
  const match = skills.find((s) => s.items.some((item) => item.toLowerCase() === key));
  return match?.line ?? 'tools';
};
