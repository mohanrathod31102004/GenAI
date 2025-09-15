import React from 'react';
import { ResumeData } from '../../../types';

interface TemplateProps {
    resumeData: ResumeData;
}

export const CreativeTemplate: React.FC<TemplateProps> = ({ resumeData }) => {
    return (
        <div data-template-id="creative" className="bg-content-light dark:bg-content-dark text-text-primary-light dark:text-text-primary-dark font-sans">
            <header className="p-8 bg-accent text-white text-center">
                <h1 className="text-4xl font-bold tracking-widest">{resumeData.fullName || 'Your Name'}</h1>
                <p className="text-md mt-2 opacity-90">
                    {resumeData.address} | {resumeData.phoneNumber} | {resumeData.email}
                </p>
            </header>

            <div className="p-8">
                <section className="mb-8 text-center">
                    <h2 className="hidden">Summary</h2>
                    <p className="text-md italic">{resumeData.summary}</p>
                </section>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <section className="mb-8">
                            <h2 className="text-2xl font-extrabold pb-2 mb-4 uppercase text-accent border-b-4 border-accent">Experience</h2>
                            {resumeData.experience.map(exp => (
                                <div key={exp.id} className="relative pl-6 mb-6 border-l-2 border-gray-300 dark:border-gray-600">
                                    <div className="absolute -left-[7px] top-1 w-3 h-3 bg-accent rounded-full"></div>
                                    <h3 className="font-bold text-lg">{exp.jobTitle} at {exp.company}</h3>
                                    <p className="text-xs font-mono text-text-secondary-light dark:text-text-secondary-dark mb-1 uppercase">{exp.startDate} - {exp.endDate}</p>
                                    <p className="text-sm whitespace-pre-wrap">{exp.description}</p>
                                </div>
                            ))}
                        </section>
                    </div>

                    <div className="md:col-span-1">
                        <section className="mb-8">
                            <h2 className="text-2xl font-extrabold pb-2 mb-4 uppercase text-accent border-b-4 border-accent">Education</h2>
                            {resumeData.education.map(edu => (
                                <div key={edu.id} className="mb-4">
                                    <h3 className="font-bold text-md">{edu.degree}</h3>
                                    <p className="text-sm">{edu.institution}</p>
                                    <p className="text-xs text-text-secondary-light dark:text-text-secondary-dark">{edu.gradDate}</p>
                                </div>
                            ))}
                        </section>

                        <section>
                            <h2 className="text-2xl font-extrabold pb-2 mb-4 uppercase text-accent border-b-4 border-accent">Skills</h2>
                            <ul className="space-y-2">
                                {resumeData.skills.map((skill, index) => (
                                    <li key={index} className="flex items-center gap-3">
                                        <span className="w-2 h-2 bg-accent rounded-full"></span>
                                        <span>{skill}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>
                </div>
            </div>
        </div>
    );
};