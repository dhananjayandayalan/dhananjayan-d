import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 group"
      style={{
        background: theme === 'dark'
          ? 'rgba(30, 41, 59, 0.8)'
          : 'rgba(255, 255, 255, 0.8)',
        border: theme === 'dark'
          ? '2px solid rgba(71, 85, 105, 0.5)'
          : '2px solid rgba(203, 213, 225, 0.5)',
      }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <svg
          className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
            theme === 'light'
              ? 'rotate-0 opacity-100 scale-100'
              : 'rotate-90 opacity-0 scale-0'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ color: theme === 'light' ? 'rgb(59, 130, 246)' : 'currentColor' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>

        {/* Moon Icon */}
        <svg
          className={`absolute inset-0 w-6 h-6 transition-all duration-500 ${
            theme === 'dark'
              ? 'rotate-0 opacity-100 scale-100'
              : '-rotate-90 opacity-0 scale-0'
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          style={{ color: theme === 'dark' ? 'rgb(139, 92, 246)' : 'currentColor' }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      </div>

      {/* Ripple effect on hover */}
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: theme === 'dark'
            ? 'radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
        }}
      />
    </button>
  );
};

export default ThemeToggle;
