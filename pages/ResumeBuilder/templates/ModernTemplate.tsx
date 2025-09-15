import React from 'react';
import { ResumeData } from '../../../types';

interface TemplateProps {
    resumeData: ResumeData;
}

export const ModernTemplate: React.FC<TemplateProps> = ({ resumeData }) => {
    return (
        <div data-template-id="modern" className="p-8 bg-content-light dark:bg-content-dark text-text-primary-light dark:text-text-primary-dark font-sans">
            <header className="mb-8 text-left">
                <h1 className="text-5xl font-extrabold text-accent">{resumeData.fullName || 'Your Name'}</h1>
                <p className="text-md text-text-secondary-light dark:text-text-secondary-dark mt-2">
                    {resumeData.address} | {resumeData.phoneNumber} | {resumeData.email}
                </p>
            </header>

            <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                    <section className="mb-6">
                        <h2 className="text-2xl font-bold text-accent pb-2 mb-3 border-b-2 border-gray-300 dark:border-gray-700">Summary</h2>
                        <p className="text-sm leading-relaxed">{resumeData.summary}</p>
                    </section>
                    
                    <section className="mb-6">
                        <h2 className="text-2xl font-bold text-accent pb-2 mb-3 border-b-2 border-gray-300 dark:border-gray-700">Experience</h2>
                        {resumeData.experience.map(exp => (
                            <div key={exp.id} className="mb-5">
                                <h3 className="font-semibold text-lg">{exp.jobTitle}</h3>
                                <div className="flex justify-between text-sm font-medium text-text-secondary-light dark:text-text-secondary-dark mb-1">
                                    <span>{exp.company}</span>
                                    <span>{exp.startDate} - {exp.endDate}</span>
                                </div>
                                <p className="text-sm whitespace-pre-wrap">{exp.description}</p>
                            </div>
                        ))}
                    </section>
                </div>
                
                <div className="col-span-1">
                    <section className="mb-6">
                        <h2 className="text-2xl font-bold text-accent pb-2 mb-3 border-b-2 border-gray-300 dark:border-gray-700">Education</h2>
                        {resumeData.education.map(edu => (
                            <div key={edu.id} className="mb-3">
                                <h3 className="font-semibold text-md">{edu.degree}</h3>
                                <p className="text-sm text-text-secondary-light dark:text-text-secondary-dark">{edu.institution}</p>
                                <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{edu.gradDate}</p>
                            </div>
                        ))}
                    </section>

                    <section>
                        <h2 className="text-2xl font-bold text-accent pb-2 mb-3 border-b-2 border-gray-300 dark:border-gray-700">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            {resumeData.skills.map((skill, index) => (
                                <span key={index} className="bg-accent/10 dark:bg-accent/20 text-accent text-xs font-semibold px-3 py-1 rounded-full">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};