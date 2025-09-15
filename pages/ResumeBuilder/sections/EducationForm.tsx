import React from 'react';
import { ResumeData, Education } from '../../../types';
import { PlusIcon } from '../../../components/icons/PlusIcon';
import { TrashIcon } from '../../../components/icons/TrashIcon';

interface EducationFormProps {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

export const EducationForm: React.FC<EducationFormProps> = ({ resumeData, setResumeData }) => {
    
    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const newEducation = [...resumeData.education];
        newEducation[index] = { ...newEducation[index], [name]: value };
        setResumeData(prev => ({ ...prev, education: newEducation }));
    };

    const addEducation = () => {
        const newEdu: Education = { id: `edu${Date.now()}`, institution: '', degree: '', gradDate: '' };
        setResumeData(prev => ({ ...prev, education: [...prev.education, newEdu] }));
    };

    const removeEducation = (index: number) => {
        const newEducation = resumeData.education.filter((_, i) => i !== index);
        setResumeData(prev => ({ ...prev, education: newEducation }));
    };

    const inputStyle = "w-full px-3 py-2 bg-bkg-light dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-accent focus:border-accent transition duration-200";

    return (
        <div className="space-y-4">
            {resumeData.education.map((edu, index) => (
                <div key={edu.id} className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg space-y-4 relative">
                    <button onClick={() => removeEducation(index)} className="absolute top-2 right-2 text-red-500 hover:text-red-700"><TrashIcon className="w-5 h-5"/></button>
                    <input type="text" name="institution" value={edu.institution} onChange={(e) => handleChange(index, e)} placeholder="Institution" className={inputStyle} />
                    <input type="text" name="degree" value={edu.degree} onChange={(e) => handleChange(index, e)} placeholder="Degree" className={inputStyle} />
                    <input type="text" name="gradDate" value={edu.gradDate} onChange={(e) => handleChange(index, e)} placeholder="Graduation Date" className={inputStyle} />
                </div>
            ))}
            <button onClick={addEducation} className="w-full flex justify-center items-center gap-2 px-4 py-2 text-accent border-2 border-accent rounded-lg hover:bg-accent hover:text-white transition-colors">
                <PlusIcon className="w-5 h-5"/> Add Education
            </button>
        </div>
    );
};
