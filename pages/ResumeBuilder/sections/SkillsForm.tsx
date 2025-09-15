import React, { useState } from 'react';
import { ResumeData } from '../../../types';

interface SkillsFormProps {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export const SkillsForm: React.FC<SkillsFormProps> = ({ resumeData, setResumeData }) => {
    const [currentSkill, setCurrentSkill] = useState('');

    const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && currentSkill.trim() && !resumeData.skills.includes(currentSkill.trim())) {
            e.preventDefault();
            setResumeData(prev => ({...prev, skills: [...prev.skills, currentSkill.trim()]}));
            setCurrentSkill('');
        }
    };
    
    const removeSkill = (skillToRemove: string) => {
        setResumeData(prev => ({
            ...prev,
            skills: prev.skills.filter(skill => skill !== skillToRemove)
        }));
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-4">
                {resumeData.skills.map((skill, index) => (
                    <span key={index} className="flex items-center gap-2 bg-accent/20 text-accent text-sm font-medium px-3 py-1 rounded-full">
                        {skill}
                        <button onClick={() => removeSkill(skill)} className="text-accent hover:text-accent-hover font-bold">
                            &times;
                        </button>
                    </span>
                ))}
            </div>
            <input 
                type="text"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyDown={handleAddSkill}
                placeholder="Add a skill and press Enter"
                className="w-full px-3 py-2 bg-bkg-light dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition duration-200"
            />
        </div>
    );
};
