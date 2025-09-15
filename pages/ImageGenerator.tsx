import React, { useState, useCallback } from 'react';
import { ImageGeneratorForm } from '../components/ImageGeneratorForm';
import { ImageCard } from '../components/ImageCard';
import { Spinner } from '../components/Spinner';
import { GeneratedImage } from '../types';
import { generateImagesFromApi, generateImageVariationsFromApi } from '../services/geminiService';
import { ASPECT_RATIOS } from '../constants';

export const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A majestic lion wearing a crown, cinematic style');
  const [aspectRatio, setAspectRatio] = useState<string>(ASPECT_RATIOS[0].value);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt) {
      setError('Please enter a prompt to generate an image.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    try {
      const images = await generateImagesFromApi(prompt, aspectRatio);
      setGeneratedImages(images);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt, aspectRatio]);

  const handleGenerateVariations = useCallback(async (dataUrl: string) => {
    setIsLoading(true);
    setError(null);
    setGeneratedImages([]);

    const match = dataUrl.match(/^data:(.*);base64,(.*)$/);
    if (!match || match.length !== 3) {
      setError("Invalid image data format.");
      setIsLoading(false);
      return;
    }
    const mimeType = match[1];
    const base64ImageData = match[2];

    try {
      const images = await generateImageVariationsFromApi(base64ImageData, mimeType, prompt);
      setGeneratedImages(images);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred while generating variations.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [prompt]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-content-light dark:bg-content-dark p-6 sm:p-8 rounded-2xl shadow-card-light dark:shadow-card-dark border border-gray-200 dark:border-gray-700">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2">AI Image Generator</h1>
        <p className="text-center text-text-secondary-light dark:text-text-secondary-dark mb-8">
          Bring your ideas to life. Describe anything you can imagine.
        </p>
        <ImageGeneratorForm
          prompt={prompt}
          setPrompt={setPrompt}
          aspectRatio={aspectRatio}
          setAspectRatio={setAspectRatio}
          onSubmit={handleGenerate}
          isLoading={isLoading}
        />
      </div>

      {error && (
        <div className="mt-8 bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg text-center" role="alert">
          <p>{error}</p>
        </div>
      )}

      {isLoading && (
        <div className="text-center mt-12 flex flex-col items-center justify-center">
          <Spinner />
          <p className="mt-4 text-lg text-text-secondary-light dark:text-text-secondary-dark animate-pulse">
            Generating your masterpiece...
          </p>
        </div>
      )}

      {!isLoading && generatedImages.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Your Creation</h2>
          <div className="grid grid-cols-1 gap-6">
            {generatedImages.map((image) => (
              <ImageCard
                key={image.id}
                image={image}
                prompt={prompt}
                onGenerateVariations={handleGenerateVariations}
                isLoading={isLoading}
              />
            ))}
          </div>
        </div>
      )}
      
      {!isLoading && generatedImages.length === 0 && !error && (
        <div className="text-center mt-12 text-text-secondary-light dark:text-text-secondary-dark">
          <img src="https://picsum.photos/seed/placeholder/500/300" alt="Placeholder" className="mx-auto rounded-lg opacity-30 dark:opacity-20" />
          <p className="mt-4 text-lg">Your generated images will appear here.</p>
        </div>
      )}
    </div>
  );
};
