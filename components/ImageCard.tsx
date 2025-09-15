import React from 'react';
import { GeneratedImage } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';
import { SparklesIcon } from './icons/SparklesIcon';

interface ImageCardProps {
  image: GeneratedImage;
  prompt: string;
  onGenerateVariations: (dataUrl: string) => void;
  isLoading: boolean;
}

export const ImageCard: React.FC<ImageCardProps> = ({ image, prompt, onGenerateVariations, isLoading }) => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = image.dataUrl;
    // Sanitize prompt for filename
    const filename = prompt.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-').slice(0, 50) || 'generated-image';
    link.download = `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleVariationsClick = () => {
    onGenerateVariations(image.dataUrl);
  };
  
  return (
    <div className="group relative bg-content-light dark:bg-content-dark rounded-lg shadow-card-light dark:shadow-card-dark overflow-hidden border border-gray-200 dark:border-gray-700">
      <img
        src={image.dataUrl}
        alt={prompt}
        className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
        <div className="flex items-center space-x-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
                onClick={handleVariationsClick}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/60 text-text-primary-light dark:text-text-primary-dark font-semibold rounded-lg hover:bg-white dark:hover:bg-black disabled:opacity-50 disabled:cursor-not-allowed"
                title="Generate Variations"
            >
                <SparklesIcon className="h-5 w-5" />
                Variations
            </button>
            <button
                onClick={handleDownload}
                className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-black/60 text-text-primary-light dark:text-text-primary-dark font-semibold rounded-lg hover:bg-white dark:hover:bg-black"
                title="Download Image"
            >
                <DownloadIcon className="h-5 w-5" />
                Download
            </button>
        </div>
      </div>
    </div>
  );
};
