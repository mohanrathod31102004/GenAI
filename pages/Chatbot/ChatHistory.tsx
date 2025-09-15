import React, { useRef, useEffect } from 'react';
import { ChatMessage } from '../../types';
import { SparklesIcon } from '../../components/icons/SparklesIcon';
import { UserIcon } from '../../components/icons/UserIcon';

interface ChatHistoryProps {
    messages: ChatMessage[];
    isLoading: boolean;
}

const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-1">
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
    </div>
);

export const ChatHistory: React.FC<ChatHistoryProps> = ({ messages, isLoading }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const formatTimestamp = (date: Date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
                <div key={index} className={`flex items-end gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'model' && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                            <SparklesIcon className="w-5 h-5 text-accent" />
                        </div>
                    )}
                    
                    <div className={`max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-2 relative group ${
                        msg.role === 'user'
                            ? 'bg-accent text-white rounded-br-none'
                            : 'bg-bkg-light dark:bg-gray-700 text-text-primary-light dark:text-text-primary-dark rounded-bl-none border border-gray-200 dark:border-gray-600'
                    }`}>
                        <p className="whitespace-pre-wrap">{msg.text}</p>
                        {(!msg.text && msg.role === 'model' && isLoading) && <TypingIndicator />}
                         <span className="absolute bottom-1 -right-12 text-xs text-text-secondary-light dark:text-text-secondary-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {formatTimestamp(msg.timestamp)}
                        </span>
                    </div>

                    {msg.role === 'user' && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                            <UserIcon className="w-5 h-5" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};