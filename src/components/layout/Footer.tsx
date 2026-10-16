import { personalInfo } from '../../data/portfolio';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-4 px-6 py-7 text-sm text-muted">
        <span>
          Made with Next.js · © {year} {personalInfo.name}
        </span>
        <div className="flex flex-wrap gap-5">
          <a className="hover:text-ink" href={`mailto:${personalInfo.email}`}>Email</a>
          <a className="hover:text-ink" href={personalInfo.linkedIn} target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a className="hover:text-ink" href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
