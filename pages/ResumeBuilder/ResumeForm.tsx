import React, { useState } from 'react';
import { ResumeData } from '../../types';
import { PersonalInfoForm } from './sections/PersonalInfoForm';
import { ExperienceForm } from './sections/ExperienceForm';
import { EducationForm } from './sections/EducationForm';
import { SkillsForm } from './sections/SkillsForm';
import { UserIcon } from '../../components/icons/UserIcon';
import { BriefcaseIcon } from '../../components/icons/BriefcaseIcon';
import { AcademicCapIcon } from '../../components/icons/AcademicCapIcon';
import { WrenchScrewdriverIcon } from '../../components/icons/WrenchScrewdriverIcon';

interface ResumeFormProps {
    resumeData: ResumeData;
    setResumeData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

type Section = 'personal' | 'experience' | 'education' | 'skills';

export const ResumeForm: React.FC<ResumeFormProps> = ({ resumeData, setResumeData }) => {
    const [openSection, setOpenSection] = useState<Section>('personal');

    const renderSection = (title: string, id: Section, icon: React.ReactNode, content: React.ReactNode) => (
        <div className="border-b border-gray-200 dark:border-gray-700">
            <h2>
                <button
                    type="button"
                    className="flex items-center justify-between w-full p-5 font-medium text-left"
                    onClick={() => setOpenSection(openSection === id ? '' as Section : id)}
                    aria-expanded={openSection === id}
                >
                    <span className="flex items-center gap-3">
                        {icon}
                        {title}
                    </span>
                    <svg className={`w-3 h-3 transform transition-transform ${openSection === id ? 'rotate-180' : ''}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
                    </svg>
                </button>
            </h2>
            <div className={`${openSection === id ? 'block' : 'hidden'} p-5 border-t border-gray-200 dark:border-gray-700`}>
                {content}
            </div>
        </div>
    );

    return (
        <div className="bg-content-light dark:bg-content-dark rounded-2xl shadow-card-light dark:shadow-card-dark border border-gray-200 dark:border-gray-700">
             {renderSection('Personal Information', 'personal', <UserIcon className="w-5 h-5" />, 
                <PersonalInfoForm resumeData={resumeData} setResumeData={setResumeData} />
            )}
            {renderSection('Work Experience', 'experience', <BriefcaseIcon className="w-5 h-5" />, 
                <ExperienceForm resumeData={resumeData} setResumeData={setResumeData} />
            )}
            {renderSection('Education', 'education', <AcademicCapIcon className="w-5 h-5" />, 
                <EducationForm resumeData={resumeData} setResumeData={setResumeData} />
            )}
             {renderSection('Skills', 'skills', <WrenchScrewdriverIcon className="w-5 h-5" />, 
                <SkillsForm resumeData={resumeData} setResumeData={setResumeData} />
            )}
        </div>
    );
};
