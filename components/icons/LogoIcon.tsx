// Fix: Recreated the missing LogoIcon component.
import React from 'react';

export const LogoIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.5 15.5v-5l-3.29 3.29c-.39.39-1.02.39-1.41 0-.39-.39-.39-1.02 0-1.41L9.08 11H4.5c-.55 0-1-.45-1-1s.45-1 1-1h4.58L5.79 5.62c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0L10.5 7.5v-5c0-.55.45-1 1-1s1 .45 1 1v5l3.29-3.29c.39-.39 1.02-.39 1.41 0 .39.39.39 1.02 0 1.41L14.92 9H19.5c.55 0 1 .45 1 1s-.45 1-1 1h-4.58l3.29 3.29c.39.39.39 1.02 0 1.41-.39.39-1.02-.39-1.41 0L13.5 12.5v5c0 .55-.45 1-1 1s-1-.45-1-1z"
    />
  </svg>
);
