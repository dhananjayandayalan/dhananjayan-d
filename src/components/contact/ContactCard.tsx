import type { ReactNode } from 'react';
import { personalInfo } from '../../data/portfolio';

interface Item {
  label: string;
  value: string;
  tile: string;
  icon: ReactNode;
  href?: string;
  external?: boolean;
}

const iconProps = {
  width: 20,
  height: 20,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true
};

const items: Item[] = [
  {
    label: 'Email',
    value: personalInfo.email,
    href: `mailto:${personalInfo.email}`,
    tile: 'bg-line-frontend text-white',
    icon: (
      <svg {...iconProps}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    )
  },
  {
    label: 'LinkedIn',
    value: personalInfo.linkedInHandle,
    href: personalInfo.linkedIn,
    external: true,
    tile: 'bg-line-backend text-white',
    icon: (
      <svg {...iconProps}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  },
  {
    label: 'GitHub',
    value: personalInfo.githubHandle,
    href: personalInfo.github,
    external: true,
    tile: 'bg-line-devops text-white',
    icon: (
      <svg {...iconProps}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3.1-.3 6.4-1.5 6.4-7a5.4 5.4 0 0 0-1.5-3.8 5 5 0 0 0-.1-3.8s-1.2-.3-3.9 1.5a13.4 13.4 0 0 0-7 0C6.3 1.6 5.1 2 5.1 2a5 5 0 0 0-.1 3.8A5.4 5.4 0 0 0 3.5 9.6c0 5.4 3.3 6.6 6.4 7a3.4 3.4 0 0 0-.9 2.6V23" />
      </svg>
    )
  },
  {
    label: 'Based in',
    value: `${personalInfo.location} · ${personalInfo.timezone}`,
    tile: 'bg-line-tools text-[#15171c]',
    icon: (
      <svg {...iconProps}>
        <path d="M12 21s-7-6.2-7-12a7 7 0 0 1 14 0c0 5.8-7 12-7 12z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    )
  }
];

const ContactCard = () => (
  <aside
    aria-label="Other ways to connect"
    className="on-band flex min-w-0 flex-[1_1_360px] flex-col gap-2 rounded-[22px] bg-band p-8 text-band-ink"
  >
    <h2 className="mb-[18px] font-display text-[28px] font-bold tracking-[-0.02em] [font-stretch:110%]">Connect with me</h2>

    {items.map((item) => {
      const content = (
        <>
          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.tile}`}>{item.icon}</span>
          <span className="min-w-0 flex-1">
            <span className="block font-mono text-xs uppercase tracking-[0.06em] text-band-muted">{item.label}</span>
            <span className="mt-[3px] block break-words font-medium">{item.value}</span>
          </span>
        </>
      );

      return item.href ? (
        <a
          key={item.label}
          href={item.href}
          target={item.external ? '_blank' : undefined}
          rel={item.external ? 'noopener noreferrer' : undefined}
          className="-mx-3.5 flex items-center gap-4 rounded-[14px] p-3.5 transition-colors hover:bg-band-surface"
        >
          {content}
        </a>
      ) : (
        <div key={item.label} className="flex items-center gap-4 py-3.5">
          {content}
        </div>
      );
    })}

    <p className="mt-auto border-t border-band-rule pt-[22px] text-[15px] leading-relaxed text-band-soft">
      Feel free to reach out for collaborations, opportunities, or just to say hi. I’m always open to discussing new
      projects and ideas.
    </p>
  </aside>
);

export default ContactCard;
