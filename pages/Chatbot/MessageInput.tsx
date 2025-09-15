import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon } from '../../components/icons/PaperAirplaneIcon';
import { MicrophoneIcon } from '../../components/icons/MicrophoneIcon';

interface MessageInputProps {
    onSendMessage: (text: string) => void;
    isLoading: boolean;
}

// Add SpeechRecognition to window type to avoid TypeScript errors
declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}


export const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage, isLoading }) => {
    const [text, setText] = useState('');
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);
    const [speechSupport, setSpeechSupport] = useState(false);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            setSpeechSupport(true);
            const recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';
            recognition.interimResults = false;

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onerror = (event: any) => {
                console.error('Speech recognition error:', event.error);
                setIsListening(false);
            };
            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setText(prev => (prev ? prev.trim() + ' ' : '') + transcript);
            };
            recognitionRef.current = recognition;
        } else {
            console.warn("Speech recognition not supported in this browser.");
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const handleListen = () => {
        if (isLoading || !recognitionRef.current) return;

        if (isListening) {
            recognitionRef.current.stop();
        } else {
            recognitionRef.current.start();
        }
    };

    const handleSubmit = () => {
        if (text.trim() && !isLoading) {
            onSendMessage(text);
            setText('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
        }
    };

    return (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="relative">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type or speak your message..."
                    rows={1}
                    className="w-full h-12 p-3 pr-24 bg-bkg-light dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition duration-200 resize-none"
                    disabled={isLoading}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                     {speechSupport && (
                         <button
                            type="button"
                            onClick={handleListen}
                            disabled={isLoading}
                            className={`p-2 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
                                isListening 
                                ? 'bg-red-500/20 text-red-500 animate-pulse' 
                                : 'text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-gray-700'
                            }`}
                            aria-label={isListening ? "Stop listening" : "Use microphone"}
                        >
                            <MicrophoneIcon className="w-5 h-5" />
                        </button>
                    )}
                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !text.trim()}
                        className="p-2 rounded-full text-white bg-accent hover:bg-accent-hover disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed transition-colors"
                        aria-label="Send message"
                    >
                        <PaperAirplaneIcon className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};