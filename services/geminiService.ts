import { GoogleGenAI, Modality, Chat } from "@google/genai";
import { GeneratedImage } from '../types';

// Per coding guidelines, initialize GoogleGenAI with a named apiKey parameter.
// API_KEY is assumed to be available in process.env.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Generates images from a text prompt using the Gemini API.
 */
export const generateImagesFromApi = async (prompt: string, aspectRatio: string): Promise<GeneratedImage[]> => {
  try {
    // Per coding guidelines, use the 'imagen-4.0-generate-001' model for image generation tasks.
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png',
        aspectRatio: aspectRatio,
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      return response.generatedImages.map((img, index) => {
        const base64ImageBytes: string = img.image.imageBytes;
        const dataUrl = `data:image/png;base64,${base64ImageBytes}`;
        return {
          id: `generated-${Date.now()}-${index}`,
          dataUrl: dataUrl,
        };
      });
    }
    return [];
  } catch (error) {
    console.error('Error generating images:', error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate images: ${error.message}`);
    }
    throw new Error('An unknown error occurred while generating images.');
  }
};

/**
 * Generates variations of an existing image using the Gemini API.
 */
export const generateImageVariationsFromApi = async (
  base64ImageData: string,
  mimeType: string,
  prompt: string
): Promise<GeneratedImage[]> => {
    try {
        // Per coding guidelines, use 'gemini-2.5-flash-image-preview' for image editing.
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: {
                parts: [
                    {
                        inlineData: {
                            data: base64ImageData,
                            mimeType: mimeType,
                        },
                    },
                    {
                        text: `Generate a variation of this image, inspired by the prompt: "${prompt}"`,
                    },
                ],
            },
            config: {
                // Per coding guidelines, responseModalities must include both IMAGE and TEXT for this model.
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });

        const images: GeneratedImage[] = [];
        if (response.candidates && response.candidates.length > 0) {
            for (const part of response.candidates[0].content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    const dataUrl = `data:image/png;base64,${base64ImageBytes}`;
                    images.push({
                        id: `variation-${Date.now()}-${images.length}`,
                        dataUrl,
                    });
                }
            }
        }
        if (images.length === 0) {
            throw new Error("No image variations were generated.");
        }
        return images;

    } catch (error) {
        console.error('Error generating image variations:', error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate image variations: ${error.message}`);
        }
        throw new Error('An unknown error occurred while generating image variations.');
    }
};

/**
 * Improves resume text for a specific section using the Gemini API.
 * @param text The text to improve.
 * @param context The resume section (e.g., 'summary', 'experience').
 * @param jobTitle Optional job title for context, especially for experience.
 * @returns The improved text as a string.
 */
export const improveResumeText = async (
  text: string,
  context: 'summary' | 'experience',
  jobTitle?: string
): Promise<string> => {
  if (!text.trim()) {
    return text;
  }

  let prompt = '';
  if (context === 'summary') {
    prompt = `You are an expert resume writer. Rewrite the following professional summary to be more impactful, concise, and tailored for a professional audience. Focus on highlighting key strengths and career goals. The summary is:\n\n"${text}"`;
  } else if (context === 'experience') {
    prompt = `You are an expert resume writer. Rewrite the following job description to be more powerful and achievement-oriented. Use strong action verbs, quantify results where possible (even with realistic estimates if numbers aren't provided), and optimize for Applicant Tracking Systems (ATS) by including relevant keywords for a '${
      jobTitle || 'professional'
    }' role. Convert paragraphs into 3-5 concise bullet points. The description is:\n\n"${text}"`;
  } else {
      throw new Error("Invalid context provided for resume improvement.");
  }

  try {
    // Per coding guidelines, use 'gemini-2.5-flash' for general text tasks.
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            // Disable thinking for faster, more direct responses suitable for this task.
            thinkingConfig: { thinkingBudget: 0 }
        }
    });
    // Per coding guidelines, access the text directly from the response object.
    const improvedText = response.text.trim();
    return improvedText;
  } catch (error) {
    console.error(`Error improving resume ${context}:`, error);
    if (error instanceof Error) {
        throw new Error(`Failed to improve text: ${error.message}`);
    }
    throw new Error('An unknown error occurred while improving the text.');
  }
};


/**
 * Starts a new chat session with the Gemini API.
 */
export const startChatSession = (): Chat => {
    // Per coding guidelines, use 'gemini-2.5-flash' for general text tasks.
    const chat: Chat = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction: 'You are a helpful and creative AI assistant.',
        },
    });
    return chat;
};