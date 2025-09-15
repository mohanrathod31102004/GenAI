import React, { useState } from 'react';
import { ResumeData } from '../../../types';
import { improveResumeText } from '../../../services/geminiService';
import { SparklesIcon } from '../../../components/icons/SparklesIcon';

interface PersonalInfoFormProps {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ resumeData, setResumeData }) => {
    const [isImproving, setIsImproving] = useState(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setResumeData(prev => ({ ...prev, [name]: value }));
    };

    const handleImproveSummary = async () => {
        setIsImproving(true);
        try {
            const improvedSummary = await improveResumeText(resumeData.summary, 'summary');
            setResumeData(prev => ({ ...prev, summary: improvedSummary }));
        } catch (error) {
            console.error("Failed to improve summary:", error);
            // Optionally, show an error to the user
        } finally {
            setIsImproving(false);
        }
    };
    
    const inputStyle = "w-full px-3 py-2 bg-bkg-light dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition duration-200";

    return (
        <div className="space-y-4">
            <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">Full Name</label>
                <input id="fullName" type="text" name="fullName" value={resumeData.fullName} onChange={handleChange} placeholder="Full Name" className={inputStyle} />
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">Email</label>
                <input id="email" type="email" name="email" value={resumeData.email} onChange={handleChange} placeholder="Email" className={inputStyle} />
            </div>
            <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">Phone Number</label>
                <input id="phoneNumber" type="tel" name="phoneNumber" value={resumeData.phoneNumber} onChange={handleChange} placeholder="Phone Number" className={inputStyle} />
            </div>
            <div>
                <label htmlFor="address" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">Address</label>
                <input id="address" type="text" name="address" value={resumeData.address} onChange={handleChange} placeholder="Address" className={inputStyle} />
            </div>
            <div>
                <div className="flex justify-between items-center mb-1">
                    <label htmlFor="summary" className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Professional Summary</label>
                    <button 
                        type="button" 
                        onClick={handleImproveSummary}
                        disabled={isImproving || !resumeData.summary}
                        className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-accent rounded-md hover:bg-accent/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        <SparklesIcon className="w-4 h-4" />
                        {isImproving ? 'Improving...' : 'Improve with AI'}
                    </button>
                </div>
                <textarea id="summary" name="summary" rows={5} value={resumeData.summary} onChange={handleChange} placeholder="Professional Summary" className={inputStyle}></textarea>
            </div>
        </div>
    );
};