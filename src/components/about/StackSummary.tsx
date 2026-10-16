import { experiences, personalInfo, projects, skills } from '../../data/portfolio';
import { lineStyles } from '../../lib/lines';

const StackSummary = () => {
  const total = skills.reduce((sum, s) => sum + s.items.length, 0);
  const facts = [
    { value: String(personalInfo.startYear), label: 'Shipping since' },
    { value: String(experiences.length), label: experiences.length === 1 ? 'Company' : 'Companies' },
    { value: String(projects.length), label: 'Projects' }
  ];

  return (
    <aside aria-label="Stack overview" className="min-w-0 flex-[1_1_340px] rounded-[18px] border border-rule bg-surface p-7">
      <div className="mb-5 flex items-baseline justify-between">
        <span className="eyebrow text-xs text-muted">Stack lines</span>
        <span className="font-mono text-xs text-muted">{total} total</span>
      </div>

      <div className="mb-6 flex h-3 gap-[3px] overflow-hidden rounded-full" aria-hidden="true">
        {skills.map((s) => (
          <span key={s.category} className={lineStyles[s.line].fill} style={{ flex: s.items.length }} />
        ))}
      </div>

      <ul className="flex flex-col gap-3.5 text-[15px]">
        {skills.map((s) => (
          <li key={s.category} className="flex items-center gap-3">
            <span className={`h-2 w-7 rounded-full ${lineStyles[s.line].fill}`} aria-hidden="true" />
            <span className="flex-1 font-medium">{s.category}</span>
            <span className="font-mono text-[13px] text-muted">{s.items.length}</span>
          </li>
        ))}
      </ul>

      <dl className="mt-6 grid grid-cols-[repeat(3,auto)] justify-between gap-3 border-t border-rule-soft pt-5">
        {facts.map((f) => (
          <div key={f.label} className="flex flex-col-reverse">
            <dt className="mt-0.5 whitespace-nowrap text-[13px] text-muted">{f.label}</dt>
            <dd className="font-display-wide text-[28px] font-bold">{f.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
};

export default StackSummary;
