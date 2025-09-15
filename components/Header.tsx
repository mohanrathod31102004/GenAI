// Fix: Recreated the missing Header component with a responsive navigation bar.
import React from 'react';
import { Page } from '../App';
import { ThemeToggle } from './ThemeToggle';
import { LogoIcon } from './icons/LogoIcon';

interface HeaderProps {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const navItems: { id: Page; label: string; shortLabel: string }[] = [
  { id: 'imageGenerator', label: 'Image Generator', shortLabel: 'Image Gen' },
  { id: 'resumeBuilder', label: 'Resume Builder', shortLabel: 'Resume' },
  { id: 'chatbot', label: 'Chatbot', shortLabel: 'Chatbot' },
];

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme, currentPage, setCurrentPage }) => {
  return (
    <header className="bg-content-light dark:bg-content-dark shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700 h-[65px]">
      <nav className="container mx-auto px-2 sm:px-4 flex justify-between items-center h-full">
        <div className="flex items-center gap-2">
            <LogoIcon className="h-8 w-8 text-accent" />
            <span className="text-lg sm:text-xl font-bold text-text-primary-light dark:text-text-primary-dark hidden md:inline">GenAI Suite</span>
        </div>
        
        <div className="flex-1 flex justify-center items-center space-x-1 sm:space-x-2 px-1">
            {navItems.map(item => (
                <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex-1 sm:flex-none text-center px-2 sm:px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-colors duration-200 truncate ${
                    currentPage === item.id
                    ? 'bg-accent text-white'
                    : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
                >
                  <span className="sm:hidden">{item.shortLabel}</span>
                  <span className="hidden sm:inline">{item.label}</span>
                </button>
            ))}
        </div>

        <div className="flex items-center">
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </nav>
    </header>
  );
};
