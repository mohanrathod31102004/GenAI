import React, { useState } from 'react';
import { ResumeData, Experience } from '../../../types';
import { PlusIcon } from '../../../components/icons/PlusIcon';
import { TrashIcon } from '../../../components/icons/TrashIcon';
import { improveResumeText } from '../../../services/geminiService';
import { SparklesIcon } from '../../../components/icons/SparklesIcon';

interface ExperienceFormProps {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export const ExperienceForm: React.FC<ExperienceFormProps> = ({ resumeData, setResumeData }) => {
    const [improvingIndex, setImprovingIndex] = useState<number | null>(null);
    
    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newExperience = [...resumeData.experience];
        newExperience[index] = { ...newExperience[index], [name]: value };
        setResumeData(prev => ({ ...prev, experience: newExperience }));
    };

    const addExperience = () => {
        const newExp: Experience = { id: `exp${Date.now()}`, jobTitle: '', company: '', startDate: '', endDate: '', description: '' };
        setResumeData(prev => ({ ...prev, experience: [...prev.experience, newExp] }));
    };

    const removeExperience = (index: number) => {
        const newExperience = resumeData.experience.filter((_, i) => i !== index);
        setResumeData(prev => ({ ...prev, experience: newExperience }));
    };

    const handleImproveText = async (index: number) => {
        const experienceToImprove = resumeData.experience[index];
        if (!experienceToImprove.description) return;

        setImprovingIndex(index);
        try {
            const improvedDescription = await improveResumeText(
                experienceToImprove.description, 
                'experience',
                experienceToImprove.jobTitle
            );
            const newExperience = [...resumeData.experience];
            newExperience[index].description = improvedDescription;
            setResumeData(prev => ({ ...prev, experience: newExperience }));
        } catch (error) {
            console.error("Failed to improve experience:", error);
        } finally {
            setImprovingIndex(null);
        }
    };

    const inputStyle = "w-full px-3 py-2 bg-bkg-light dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition duration-200";

    return (
        <div className="space-y-4">
            {resumeData.experience.map((exp, index) => (
                <div key={exp.id} className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg space-y-4 relative">
                    <button onClick={() => removeExperience(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700" aria-label="Remove experience"><TrashIcon className="w-5 h-5"/></button>
                    <div>
                        <label htmlFor={`jobTitle-${exp.id}`} className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">Job Title</label>
                        <input id={`jobTitle-${exp.id}`} type="text" name="jobTitle" value={exp.jobTitle} onChange={(e) => handleChange(index, e)} placeholder="Job Title" className={inputStyle} />
                    </div>
                    <div>
                        <label htmlFor={`company-${exp.id}`} className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">Company</label>
                        <input id={`company-${exp.id}`} type="text" name="company" value={exp.company} onChange={(e) => handleChange(index, e)} placeholder="Company" className={inputStyle} />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor={`startDate-${exp.id}`} className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">Start Date</label>
                            <input id={`startDate-${exp.id}`} type="text" name="startDate" value={exp.startDate} onChange={(e) => handleChange(index, e)} placeholder="e.g., Jan 2020" className={inputStyle} />
                        </div>
                        <div>
                            <label htmlFor={`endDate-${exp.id}`} className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">End Date</label>
                            <input id={`endDate-${exp.id}`} type="text" name="endDate" value={exp.endDate} onChange={(e) => handleChange(index, e)} placeholder="e.g., Present" className={inputStyle} />
                        </div>
                    </div>
                    <div>
                         <div className="flex justify-between items-center mb-1">
                            <label htmlFor={`description-${exp.id}`} className="block text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark">Description</label>
                             <button
                                type="button"
                                onClick={() => handleImproveText(index)}
                                disabled={improvingIndex === index || !exp.description}
                                className="flex items-center gap-1 px-2 py-1 text-xs font-semibold text-accent rounded-md hover:bg-accent/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                <SparklesIcon className="w-4 h-4" />
                                {improvingIndex === index ? 'Improving...' : 'Improve with AI'}
                            </button>
                        </div>
                        <textarea id={`description-${exp.id}`} name="description" rows={4} value={exp.description} onChange={(e) => handleChange(index, e)} placeholder="Describe your responsibilities and achievements." className={inputStyle}></textarea>
                    </div>
                </div>
            ))}
            <button onClick={addExperience} type="button" className="w-full flex justify-center items-center gap-2 px-4 py-2 text-accent border-2 border-accent rounded-lg hover:bg-accent hover:text-white transition-colors">
                <PlusIcon className="w-5 h-5"/> Add Experience
            </button>
        </div>
    );
};