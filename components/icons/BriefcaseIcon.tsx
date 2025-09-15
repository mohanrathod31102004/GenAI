import React from 'react';

export const BriefcaseIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    className={className} 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor" 
    strokeWidth={2}
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" 
    />
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      d="M4 7l8 4 8-4" 
    />
    <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M18 8.118l-8 4-8-4L12 4.118 18 8.118zM12 12.118V19.882"
     />
     <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12.118v-3.77a1 1 0 00-.5-.866l-8-4.572a1 1 0 00-1 0l-8 4.572a1 1 0 00-.5.866v3.77m18 0l-9 5.143m9-5.143v5.714a1 1 0 01-1.5.866L12 14.857l-7.5 4.286a1 1 0 01-1.5-.866v-5.714m0 0L12 7l9 5.118"
      />
  </svg>
);
