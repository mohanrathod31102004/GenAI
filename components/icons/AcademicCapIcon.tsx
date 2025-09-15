import React from 'react';

export const AcademicCapIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path d="M12 14l9-5-9-5-9 5 9 5z" />
    <path d="M12 14l6.16-3.422A12.083 12.083 0 0122 12.121V19l-10 5-10-5v-6.879A12.083 12.083 0 015.84 10.578L12 14z" />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M12 14l9-5-9-5-9 5 9 5zm0 0v7" 
    />
  </svg>
);
