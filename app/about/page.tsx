'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { personalInfo } from '@/data/portfolio';
import ExperienceMap from '@/components/about/ExperienceMap';
import Skills from '@/components/about/Skills';
import StackSummary from '@/components/about/StackSummary';

export default function About() {
  return (
    <>
      <section className="mx-auto flex max-w-[1240px] flex-wrap items-end gap-14 px-6 pb-24 pt-[88px]">
        <motion.div
          className="min-w-0 flex-[999_1_560px]"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
        >
          <p className="eyebrow mb-7 flex flex-wrap items-center gap-2.5 text-muted">
            <span className="h-2 w-2 rounded-full bg-line-devops" aria-hidden="true" />
            {personalInfo.title} · {personalInfo.location}
          </p>
          <h1 className="font-display text-[clamp(48px,7.2vw,104px)] font-extrabold leading-[0.94] tracking-[-0.035em] [font-stretch:115%]">
            Hi, I’m
            <br />
            {personalInfo.firstName}.
          </h1>
          <p className="mt-8 max-w-[620px] text-[19px] leading-relaxed text-ink-soft">{personalInfo.summary}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex min-h-12 items-center gap-2.5 rounded-full bg-ink px-6 text-[15px] font-semibold text-ground transition-opacity hover:opacity-90"
            >
              View projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center rounded-full border-[1.5px] border-ink px-6 text-[15px] font-semibold text-ink transition-colors hover:bg-ink hover:text-ground"
            >
              Get in touch
            </Link>
          </div>
        </motion.div>

        <StackSummary />
      </section>

      <ExperienceMap />

      <section aria-labelledby="skills" className="mx-auto max-w-[1240px] px-6 pb-28 pt-24">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="eyebrow mb-4 text-muted">03 — Skills</p>
            <h2 id="skills" className="font-display-wide text-[clamp(36px,4.6vw,60px)] font-extrabold leading-none tracking-[-0.03em]">
              Skills &amp; technologies
            </h2>
          </div>
          <p className="max-w-[380px] leading-relaxed text-muted">
            Four lines, one network. The tools I reach for across the stack.
          </p>
        </div>
        <Skills />
      </section>
    </>
  );
}
