'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectCard from '@/components/projects/ProjectCard';
import { projects } from '@/data/portfolio';
import { accentStyles } from '@/lib/lines';

const pad = (n: number) => String(n).padStart(2, '0');
const SWIPE_THRESHOLD = 8000;

export default function Projects() {
  const [[index, direction], setPage] = useState<[number, number]>([0, 0]);
  const total = projects.length;

  const goTo = (next: number) => {
    const wrapped = (next + total) % total;
    setPage([wrapped, next > index ? 1 : -1]);
  };

  return (
    <div className="mx-auto max-w-[1240px] px-6 pb-24 pt-[72px]">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="eyebrow mb-4 text-muted">Selected work</p>
          <h1 className="font-display text-[clamp(44px,6vw,84px)] font-extrabold leading-[0.95] tracking-[-0.035em] [font-stretch:115%]">
            Projects
          </h1>
        </div>
        <p className="max-w-[380px] leading-relaxed text-muted">
          A collection of my personal projects and work. Pick one from the index or step through them.
        </p>
      </div>

      {total === 0 ? (
        <p className="rounded-[22px] border border-rule bg-surface p-10 text-center text-muted">Projects will be added soon.</p>
      ) : (
        <div className="flex flex-wrap items-stretch gap-7">
          <div
            className="relative min-w-0 flex-[999_1_560px]"
            aria-live="polite"
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight') goTo(index + 1);
              if (e.key === 'ArrowLeft') goTo(index - 1);
            }}
          >
            <AnimatePresence mode="wait" initial={false} custom={direction}>
              <motion.div
                key={projects[index].id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                dragDirectionLock
                onDragEnd={(_, { offset, velocity }) => {
                  const swipe = Math.abs(offset.x) * velocity.x;
                  if (swipe < -SWIPE_THRESHOLD) goTo(index + 1);
                  else if (swipe > SWIPE_THRESHOLD) goTo(index - 1);
                }}
                style={{ touchAction: 'pan-y' }}
                className="h-full cursor-grab active:cursor-grabbing"
              >
                <ProjectCard project={projects[index]} index={index} total={total} />
              </motion.div>
            </AnimatePresence>
          </div>

          <aside aria-label="Project index" className="flex min-w-0 flex-[1_1_340px] flex-col">
            <p className="eyebrow mb-3 text-xs text-muted">Index</p>
            <div className="flex flex-col border-t border-rule">
              {projects.map((p, i) => {
                const active = i === index;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => goTo(i)}
                    aria-pressed={active}
                    className={`flex min-h-[72px] cursor-pointer items-center gap-4 border-b border-rule px-4 py-3.5 text-left transition-colors hover:bg-surface ${
                      active ? 'bg-surface' : ''
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`w-1.5 self-stretch rounded-sm ${active ? accentStyles[p.accent].bar : 'bg-transparent'}`}
                    />
                    <span className="w-6 font-mono text-[13px] text-muted">{pad(i + 1)}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-lg font-semibold leading-tight">{p.name}</span>
                      <span className="mt-1 block text-[13px] text-muted">{p.kind}</span>
                    </span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                );
              })}
            </div>

            <div className="mt-auto flex items-center gap-3.5 pt-7">
              <button
                type="button"
                onClick={() => goTo(index - 1)}
                aria-label="Previous project"
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-ink text-ink transition-colors hover:bg-ink hover:text-ground"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => goTo(index + 1)}
                aria-label="Next project"
                className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-ink text-ink transition-colors hover:bg-ink hover:text-ground"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </button>
              <div className="flex flex-1 gap-1" aria-hidden="true">
                {projects.map((p, i) => (
                  <span key={p.id} className={`h-1.5 flex-1 rounded-sm ${i === index ? accentStyles[p.accent].bar : 'bg-rule'}`} />
                ))}
              </div>
              <span className="font-mono text-sm font-medium">
                {pad(index + 1)} / {pad(total)}
              </span>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
