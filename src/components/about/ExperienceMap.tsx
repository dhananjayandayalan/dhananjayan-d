'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { experiences, lineFor } from '../../data/portfolio';
import {
  MAP_SIZE,
  buildDotPath,
  capsuleAngle,
  project,
  referenceCities,
  routeSegment
} from '../../data/journeyMap';
import { lineOrder, lineStyles } from '../../lib/lines';

/** Sideways offset of each line inside the route bundle (px, map units). */
const BUNDLE_OFFSETS = [-9, -3, 3, 9];
const pct = (n: number) => `${(n / MAP_SIZE) * 100}%`;

const ExperienceMap = () => {
  const defaultId = experiences.find((e) => e.current)?.id ?? experiences[experiences.length - 1]?.id;
  const [selectedId, setSelectedId] = useState<number | undefined>(defaultId);

  const dotPath = useMemo(() => buildDotPath(), []);
  const stations = useMemo(
    () =>
      experiences.map((exp, i) => {
        const point = project(exp.location.coordinates.lat, exp.location.coordinates.lng);
        const prev = i > 0 ? experiences[i - 1] : null;
        const prevPoint = prev ? project(prev.location.coordinates.lat, prev.location.coordinates.lng) : null;
        return { exp, point, angle: capsuleAngle(prevPoint, point) };
      }),
    []
  );

  const segments = stations.slice(1).map((s, i) => ({ from: stations[i].point, to: s.point }));
  const selected = experiences.find((e) => e.id === selectedId) ?? experiences[0];

  return (
    <section aria-labelledby="journey" className="on-band bg-band text-band-ink">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center gap-14 px-6 pb-[104px] pt-24">
        {/* Copy, station list and the selected station's card */}
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-7">
          <div>
            <p className="eyebrow mb-4 text-band-muted">02 — Journey</p>
            <h2 id="journey" className="font-display-wide text-[clamp(36px,4.6vw,60px)] font-extrabold leading-none tracking-[-0.03em]">
              My journey
            </h2>
            <p className="mt-[18px] max-w-[440px] leading-relaxed text-band-soft">
              {stations.map((s) => s.exp.location.city).join(' to ')}. Every role is an interchange where my stack
              lines meet — pick a station to see what I worked with there.
            </p>
          </div>

          <div className="flex flex-col border-t border-band-rule">
            {experiences.map((exp) => {
              const active = exp.id === selected.id;
              return (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setSelectedId(exp.id)}
                  aria-pressed={active}
                  className={`flex min-h-16 cursor-pointer items-center gap-4 border-b border-band-rule px-3.5 py-3 text-left transition-colors hover:bg-band-surface ${
                    active ? 'bg-band-surface' : ''
                  }`}
                >
                  <span
                    className={`h-3 w-[22px] shrink-0 rounded-md border-[3px] bg-band ${active ? 'border-line-tools' : 'border-[#6b6e76]'}`}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-semibold">{exp.location.city}</span>
                    <span className="mt-0.5 block text-[13px] text-band-muted">{exp.company}</span>
                  </span>
                  <span className="font-mono text-xs text-band-muted">{exp.years}</span>
                </button>
              );
            })}
          </div>

          <div aria-live="polite" className="rounded-[18px] border border-band-rule bg-band-surface p-[26px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={selected.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
              >
                <div className="mb-2.5 flex items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.06em] text-band-muted">{selected.period}</span>
                  {selected.current && (
                    <span className="rounded bg-line-tools px-2 py-[3px] font-mono text-[11px] tracking-[0.08em] text-[#15171c]">NOW</span>
                  )}
                </div>
                <h3 className="font-display text-[26px] font-bold tracking-[-0.02em]">{selected.company}</h3>
                <p className="mb-5 mt-1.5 text-[15px] text-band-soft">{selected.position}</p>
                <ul className="flex flex-wrap gap-2 text-[13px]">
                  {selected.techStack.map((tech) => (
                    <li key={tech} className="flex items-center gap-2 rounded-full border border-[#3a3d45] px-3 py-1.5">
                      <span className={`h-2 w-2 rounded-full ${lineStyles[lineFor(tech)].tint}`} aria-hidden="true" />
                      {tech}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* The map */}
        <div className="mx-auto w-full min-w-0 max-w-[620px] flex-[1_1_480px]">
          <div className="relative aspect-square w-full">
            <svg viewBox={`0 0 ${MAP_SIZE} ${MAP_SIZE}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
              <path d={dotPath} fill="none" stroke="var(--band-dot)" strokeWidth={4.4} strokeLinecap="round" />
              <g fill="none" strokeWidth={5} strokeLinejoin="round">
                {segments.map((seg, si) =>
                  lineOrder.map((line, li) => (
                    <path
                      key={`${si}-${line}`}
                      d={routeSegment(seg.from, seg.to, BUNDLE_OFFSETS[li])}
                      stroke={lineStyles[line].tintHex}
                    />
                  ))
                )}
              </g>
              {stations.map(({ exp, point, angle }) => (
                <rect
                  key={exp.id}
                  x={point.x - 19}
                  y={point.y - 10}
                  width={38}
                  height={20}
                  rx={10}
                  fill="#f5f5f0"
                  stroke="#15171c"
                  strokeWidth={3}
                  transform={`rotate(${angle} ${point.x} ${point.y})`}
                />
              ))}
              <g fill="#6b6e76">
                {referenceCities.map((c) => (
                  <circle key={c.name} cx={c.x} cy={c.y} r={4} />
                ))}
              </g>
            </svg>

            {referenceCities.map((c) => (
              <span
                key={c.name}
                aria-hidden="true"
                className="absolute whitespace-nowrap font-mono text-xs text-[#8b8e96]"
                style={{
                  left: pct(c.x),
                  top: pct(c.y),
                  transform: c.labelSide === 'left' ? 'translate(calc(-100% - 10px), -50%)' : 'translate(12px, -50%)'
                }}
              >
                {c.name}
              </span>
            ))}

            {stations.map(({ exp, point }) => {
              const active = exp.id === selected.id;
              return (
                <div key={exp.id}>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="station-pulse pointer-events-none absolute h-14 w-14 rounded-full bg-line-tools/35"
                      style={{ left: pct(point.x), top: pct(point.y), transform: 'translate(-50%, -50%)' }}
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => setSelectedId(exp.id)}
                    aria-pressed={active}
                    aria-label={`${exp.location.city} — ${exp.company}`}
                    className="group absolute h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full"
                    style={{ left: pct(point.x), top: pct(point.y) }}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 rounded-full border-2 transition-opacity ${
                        active ? 'border-line-tools opacity-100' : 'border-[#6b6e76] opacity-0 group-hover:opacity-100'
                      }`}
                    />
                  </button>
                  <div
                    className="pointer-events-none absolute whitespace-nowrap"
                    style={{ left: pct(point.x), top: pct(point.y), transform: 'translate(34px, -50%)' }}
                  >
                    <div className={`font-display text-lg font-bold ${active ? 'text-white' : 'text-band-soft'}`}>
                      {exp.location.city}
                    </div>
                    <div className="mt-0.5 font-mono text-[11px] uppercase tracking-[0.04em] text-band-muted">{exp.shortLabel}</div>
                  </div>
                </div>
              );
            })}

            <div aria-hidden="true" className="absolute right-[2%] top-[2%] flex flex-col items-center gap-1 font-mono text-[11px] text-[#8b8e96]">
              <svg width="14" height="18" viewBox="0 0 14 18">
                <path d="M7 1 13 17 7 13 1 17Z" fill="#8b8e96" />
              </svg>
              N
            </div>
          </div>

          <div className="mt-[18px] flex flex-wrap items-center justify-between gap-4 border-t border-band-rule pt-[18px]">
            <ul className="flex flex-wrap gap-4 text-[13px] text-band-soft">
              {lineOrder.map((line) => (
                <li key={line} className="flex items-center gap-2">
                  <span className={`h-[5px] w-5 rounded-sm ${lineStyles[line].tint}`} aria-hidden="true" />
                  {lineStyles[line].label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceMap;
