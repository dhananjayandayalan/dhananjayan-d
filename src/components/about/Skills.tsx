import { skills } from '../../data/portfolio';
import { lineStyles } from '../../lib/lines';

const Skills = () => (
  <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
    {skills.map((skill) => {
      const style = lineStyles[skill.line];
      return (
        <div key={skill.category} className="overflow-hidden rounded-[18px] border border-rule bg-surface">
          <div className={`flex items-center justify-between px-[22px] py-[18px] ${style.fill} ${style.onFill}`}>
            <h3 className="font-display text-xl font-bold">{skill.category}</h3>
            <span className="font-mono text-[13px]">
              {style.code} · {String(skill.items.length).padStart(2, '0')}
            </span>
          </div>
          <div className="relative py-6 pl-[50px] pr-[22px]">
            <div className={`absolute bottom-[34px] left-[27px] top-8 w-1 rounded-sm ${style.fill}`} aria-hidden="true" />
            <ul className="flex flex-col gap-3.5 text-[15px]">
              {skill.items.map((item) => (
                <li key={item} className="relative">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[29px] top-1 h-3.5 w-3.5 rounded-full border-[3px] bg-surface ${style.ring}`}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
    })}
  </div>
);

export default Skills;
