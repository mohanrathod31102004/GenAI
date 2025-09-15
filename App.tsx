import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ImageGenerator } from './pages/ImageGenerator';
import { ResumeBuilder } from './pages/ResumeBuilder';
import { Chatbot } from './pages/Chatbot';

export type Page = 'imageGenerator' | 'resumeBuilder' | 'chatbot';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [currentPage, setCurrentPage] = useState<Page>('imageGenerator');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (userPrefersDark) {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen bg-bkg-light dark:bg-bkg-dark text-text-primary-light dark:text-text-primary-dark font-sans transition-colors duration-300">
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      <main className="container mx-auto px-4 py-8 h-[calc(100vh-65px)]">
        {currentPage === 'imageGenerator' && <ImageGenerator />}
        {currentPage === 'resumeBuilder' && <ResumeBuilder theme={theme} />}
        {currentPage === 'chatbot' && <Chatbot />}
      </main>
    </div>
  );
};

export default App;