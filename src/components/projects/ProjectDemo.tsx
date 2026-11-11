import { useEffect, useRef } from 'react';
import type { Project } from '../../types';
import { accentStyles } from '../../lib/lines';

interface ProjectDemoProps {
  project: Project;
}

const ProjectDemo = ({ project }: ProjectDemoProps) => {
  const frameRef = useRef<HTMLDivElement>(null);

  // The project card is swipeable (Framer Motion drag listens for native pointerdown),
  // so stop presses on the player — seek bar, volume — from turning into a swipe.
  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const stop = (e: PointerEvent) => e.stopPropagation();
    el.addEventListener('pointerdown', stop);
    return () => el.removeEventListener('pointerdown', stop);
  }, []);

  const { demo } = project;
  if (!demo) return null;

  const accent = accentStyles[project.accent];
  const headingId = `demo-${project.id}`;

  return (
    <section aria-labelledby={headingId}>
      <p className="eyebrow mb-2.5 text-xs text-muted">Demo video</p>
      <h3 id={headingId} className="font-display text-xl font-semibold leading-snug tracking-[-0.01em]">
        {demo.title}
      </h3>

      <div ref={frameRef} className="mt-4 aspect-video w-full cursor-auto overflow-hidden rounded-2xl border border-rule-soft bg-surface-2">
        {demo.youtubeId ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${demo.youtubeId}`}
            title={`${project.name} demo video`}
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            loading="lazy"
            className="h-full w-full"
          />
        ) : demo.src ? (
          <video src={demo.src} poster={demo.poster} controls playsInline preload="metadata" className="h-full w-full bg-black object-contain">
            Your browser can&apos;t play this video.
          </video>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-muted">
            <span className={`flex h-14 w-14 items-center justify-center rounded-full ${accent.fill} ${accent.onFill}`} aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.5v13l11-6.5-11-6.5Z" />
              </svg>
            </span>
            <span className="text-sm font-medium">Demo video coming soon</span>
          </div>
        )}
      </div>

      <p className="eyebrow mb-3 mt-5 text-xs text-muted">What to expect</p>
      <ol className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
        {demo.highlights.map((highlight, i) => (
          <li key={highlight.heading} className="flex gap-3">
            <span
              aria-hidden="true"
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-[11px] font-semibold ${accent.fill} ${accent.onFill}`}
            >
              {i + 1}
            </span>
            <div>
              <h4 className="text-[15px] font-semibold leading-snug">{highlight.heading}</h4>
              <p className="mt-0.5 text-sm leading-relaxed text-muted">{highlight.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ProjectDemo;
