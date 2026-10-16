/** The four colour-coded "stack lines" used across the site. */
export type LineId = 'frontend' | 'backend' | 'devops' | 'tools';

/** Accent colours available to projects (stack lines plus purple). */
export type AccentId = 'red' | 'blue' | 'green' | 'amber' | 'purple';

export interface Experience {
  id: number;
  company: string;
  position: string;
  period: string;
  /** Short label shown under the station name on the journey map, e.g. "AVIZVA · 2021–25". */
  shortLabel: string;
  /** Compact year range for the station list, e.g. "2021–25". */
  years: string;
  current?: boolean;
  location: {
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  techStack: string[];
}

export interface Project {
  id: number;
  name: string;
  /** One- or two-word category shown on the project panel, e.g. "Component library". */
  kind: string;
  accent: AccentId;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  mobile?: string;
  message: string;
}

export interface ContactApiResponse {
  message: string;
}

export interface Skill {
  category: string;
  line: LineId;
  items: string[];
}
