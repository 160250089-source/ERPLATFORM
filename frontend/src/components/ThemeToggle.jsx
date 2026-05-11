// src/components/ThemeToggle.jsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className={`
        relative flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 text-sm font-medium
        ${isDark
          ? 'bg-gray-800 border-gray-700 text-yellow-300 hover:bg-gray-700'
          : 'bg-gray-100 border-gray-200 text-gray-700 hover:bg-gray-200'
        }
      `}
    >
      {isDark ? (
        <>
          <Sun size={16} className="text-yellow-300" />
          <span className="text-yellow-300 hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <Moon size={16} className="text-gray-600" />
          <span className="text-gray-600 hidden sm:inline">Dark</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
