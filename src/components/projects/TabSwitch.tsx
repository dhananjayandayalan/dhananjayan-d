import { motion } from 'framer-motion';

interface TabSwitchProps {
  tabs: { id: string; name: string }[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const TabSwitch = ({ tabs, activeTab, onTabChange }: TabSwitchProps) => {
  return (
    <div className="flex justify-center mb-8">
      <div className="inline-flex bg-slate-800/50 dark:bg-slate-800/50 light:bg-gray-100 rounded-lg p-1 gap-1 backdrop-blur-sm border border-card">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`relative px-6 py-2.5 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'text-white!'
                : 'text-gray-600'
            }`}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-linear-to-r from-blue-600 to-purple-600 rounded-md"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabSwitch;
