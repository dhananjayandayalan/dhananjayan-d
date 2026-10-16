import type { Project } from '../../types';
import { accentStyles } from '../../lib/lines';

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

const pad = (n: number) => String(n).padStart(2, '0');

const ProjectCard = ({ project, index, total }: ProjectCardProps) => {
  const accent = accentStyles[project.accent];
  const number = pad(index + 1);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[22px] border border-rule bg-surface">
      <div className={`relative flex h-[260px] flex-col justify-between overflow-hidden px-8 py-7 ${accent.fill} ${accent.onFill}`}>
        <div aria-hidden="true" className={`absolute -bottom-[60px] -right-10 h-[340px] w-[340px] rounded-full border-[22px] opacity-[0.14] ${accent.border}`} />
        <div aria-hidden="true" className={`absolute -bottom-[120px] right-20 h-[340px] w-[340px] rounded-full border-[22px] opacity-10 ${accent.border}`} />
        <div className="relative flex items-center justify-between">
          <span className="eyebrow">{project.kind}</span>
          <span className="font-mono text-[13px]">
            {number} / {pad(total)}
          </span>
        </div>
        <div aria-hidden="true" className="relative font-display text-[120px] font-extrabold leading-[0.8] tracking-[-0.05em] [font-stretch:120%]">
          {number}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-[22px] p-8">
        <h2 className="font-display text-[34px] font-bold leading-tight tracking-[-0.02em] [font-stretch:110%]">{project.name}</h2>
        <p className="max-w-[640px] text-[17px] leading-relaxed text-ink-soft">{project.description}</p>
        <div>
          <p className="eyebrow mb-2.5 text-xs text-muted">Tech stack</p>
          <ul className="flex flex-wrap gap-2 text-[13px]">
            {project.techStack.map((tech) => (
              <li key={tech} className="rounded-full border border-rule-soft bg-surface-2 px-3 py-1.5">
                {tech}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto flex flex-wrap gap-3 border-t border-rule-soft pt-[22px]">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[46px] items-center gap-2.5 rounded-full bg-ink px-5 text-sm font-semibold text-ground transition-opacity hover:opacity-90"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.3 6.4-1.5 6.4-7a5.4 5.4 0 0 0-1.5-3.8 5 5 0 0 0-.1-3.8s-1.2-.3-3.9 1.5a13.4 13.4 0 0 0-7 0C6.3 1.6 5.1 2 5.1 2a5 5 0 0 0-.1 3.8A5.4 5.4 0 0 0 3.5 9.6c0 5.4 3.3 6.6 6.4 7a3.4 3.4 0 0 0-.9 2.6V23" />
            </svg>
            Repository
          </a>
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center gap-2.5 rounded-full border-[1.5px] border-ink px-5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-ground"
            >
              Live site
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
          ) : (
            <span className="inline-flex min-h-[46px] items-center gap-2.5 rounded-full bg-[#fdf3d8] px-[18px] text-sm font-medium text-[#6b4a00]">
              <span className="h-2 w-2 rounded-full bg-tools-strong" aria-hidden="true" />
              Live demo in progress
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default ProjectCard;
