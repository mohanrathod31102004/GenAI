import React from 'react';
import { ResumeData } from '../../../types';

interface TemplateProps {
    resumeData: ResumeData;
}

export const ClassicTemplate: React.FC<TemplateProps> = ({ resumeData }) => {
    return (
        <div data-template-id="classic" className="p-8 bg-content-light dark:bg-content-dark text-text-primary-light dark:text-text-primary-dark font-serif">
            <header className="text-center mb-8 border-b pb-4 border-gray-300 dark:border-gray-600">
                <h1 className="text-4xl font-bold tracking-wider">{resumeData.fullName || 'Your Name'}</h1>
                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark mt-2">
                    {resumeData.address} | {resumeData.phoneNumber} | {resumeData.email}
                </p>
            </header>

            <section className="mb-6">
                <h2 className="text-xl font-bold border-b-2 border-accent pb-2 mb-3 uppercase tracking-widest">Summary</h2>
                <p className="text-sm">{resumeData.summary}</p>
            </section>
            
            <section className="mb-6">
                <h2 className="text-xl font-bold border-b-2 border-accent pb-2 mb-3 uppercase tracking-widest">Experience</h2>
                {resumeData.experience.map(exp => (
                    <div key={exp.id} className="mb-4">
                        <h3 className="font-bold text-lg">{exp.jobTitle}</h3>
                        <div className="flex justify-between text-sm italic text-text-secondary-light dark:text-text-secondary-dark mb-1">
                            <span>{exp.company}</span>
                            <span>{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p className="text-sm whitespace-pre-wrap">{exp.description}</p>
                    </div>
                ))}
            </section>
            
            <section className="mb-6">
                <h2 className="text-xl font-bold border-b-2 border-accent pb-2 mb-3 uppercase tracking-widest">Education</h2>
                 {resumeData.education.map(edu => (
                    <div key={edu.id} className="mb-2">
                        <h3 className="font-bold text-lg">{edu.institution}</h3>
                        <div className="flex justify-between text-sm italic text-text-secondary-light dark:text-text-secondary-dark">
                            <span>{edu.degree}</span>
                            <span>{edu.gradDate}</span>
                        </div>
                    </div>
                ))}
            </section>

            <section>
                <h2 className="text-xl font-bold border-b-2 border-accent pb-2 mb-3 uppercase tracking-widest">Skills</h2>
                <div className="flex flex-wrap gap-2">
                    {resumeData.skills.map((skill, index) => (
                        <span key={index} className="bg-bkg-light dark:bg-gray-700 text-sm px-3 py-1 rounded-full">
                            {skill}
                        </span>
                    ))}
                </div>
            </section>
        </div>
    );
};