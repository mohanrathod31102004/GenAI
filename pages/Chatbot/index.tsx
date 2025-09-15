import React, { useState, useEffect, useRef } from 'react';
import { Chat } from '@google/genai';
import { ChatMessage } from '../../types';
import { startChatSession } from '../../services/geminiService';
import { ChatHistory } from './ChatHistory';
import { MessageInput } from './MessageInput';

export const Chatbot: React.FC = () => {
    const [chat, setChat] = useState<Chat | null>(null);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Initialize chat session on component mount
    useEffect(() => {
        try {
            const chatSession = startChatSession();
            setChat(chatSession);
            // Add initial greeting message from the AI
            setMessages([
                {
                    role: 'model',
                    text: 'Hello! How can I help you today?',
                    timestamp: new Date(),
                }
            ]);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to start chat session.');
        }
    }, []);

    const handleSendMessage = async (text: string) => {
        if (!chat || !text.trim()) return;

        const userMessage: ChatMessage = {
            role: 'user',
            text: text,
            timestamp: new Date(),
        };
        
        // Add user message and a placeholder for the model's response
        setMessages(prev => [...prev, userMessage, { role: 'model', text: '', timestamp: new Date() }]);
        setIsLoading(true);
        setError(null);

        try {
            const stream = await chat.sendMessageStream({ message: text });
            
            for await (const chunk of stream) {
                const chunkText = chunk.text;
                // Update the last message (the model's response) with the new chunk
                setMessages(prev => {
                    const newMessages = [...prev];
                    newMessages[newMessages.length - 1].text += chunkText;
                    return newMessages;
                });
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
            setError(`Error: ${errorMessage}`);
            // Update the placeholder message with an error
             setMessages(prev => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1].text = `Sorry, I encountered an error: ${errorMessage}`;
                return newMessages;
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-w-3xl mx-auto bg-content-light dark:bg-content-dark rounded-2xl shadow-card-light dark:shadow-card-dark border border-gray-200 dark:border-gray-700">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                 <h1 className="text-xl font-bold text-center">AI Chatbot</h1>
            </div>
            <ChatHistory messages={messages} isLoading={isLoading} />
            <MessageInput onSendMessage={handleSendMessage} isLoading={isLoading} />
        </div>
    );
};