'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { personalInfo } from '../../data/portfolio';
import ThemeToggle from '../ThemeToggle';
import BrandMark from './BrandMark';

const navLinks = [
  { path: '/about', label: 'About' },
  { path: '/projects', label: 'Projects' },
  { path: '/contact', label: 'Contact' }
];

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-ground/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-3 px-6 py-[18px]">
        <Link href="/about" className="flex items-center gap-3 text-ink">
          <BrandMark />
          <span className="font-display-wide text-xl font-bold tracking-[-0.01em]">{personalInfo.name}</span>
        </Link>

        <nav aria-label="Main" className="flex flex-wrap items-center gap-1 text-[15px]">
          {navLinks.map((link) => {
            const isActive = pathname === link.path || (link.path === '/about' && pathname === '/');
            return (
              <Link
                key={link.path}
                href={link.path}
                aria-current={isActive ? 'page' : undefined}
                className={`rounded-full px-3.5 py-2.5 font-medium transition-colors ${
                  isActive ? 'bg-ink text-ground' : 'text-ink hover:bg-hover'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
};

export default Header;
