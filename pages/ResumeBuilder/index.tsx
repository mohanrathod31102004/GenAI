import React, { useState, useRef } from 'react';
import { ResumeData } from '../../types';
import { ResumeForm } from './ResumeForm';
import { ResumePreview } from './ResumePreview';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export type Template = 'classic' | 'modern' | 'creative';

const initialResumeData: ResumeData = {
    fullName: 'Jane Doe',
    email: 'jane.doe@example.com',
    phoneNumber: '123-456-7890',
    address: '123 Main St, Anytown, USA',
    summary: 'A highly motivated and results-oriented professional with a proven track record of success in project management and team leadership. Seeking to leverage skills in a challenging new role.',
    experience: [
        { id: 'exp1', jobTitle: 'Senior Project Manager', company: 'Tech Solutions Inc.', startDate: 'Jan 2018', endDate: 'Present', description: 'Led cross-functional teams to deliver complex software projects on time and within budget, resulting in a 15% increase in customer satisfaction.' },
        { id: 'exp2', jobTitle: 'Project Coordinator', company: 'Innovate Corp.', startDate: 'Jun 2015', endDate: 'Dec 2017', description: 'Assisted in the planning and execution of IT projects, managed project documentation, and communicated with stakeholders.' },
    ],
    education: [
        { id: 'edu1', institution: 'State University', degree: 'B.S. in Computer Science', gradDate: 'May 2015' }
    ],
    skills: ['Project Management', 'Agile Methodologies', 'JIRA', 'Team Leadership', 'Budgeting', 'JavaScript', 'React']
};

interface ResumeBuilderProps {
  theme: 'light' | 'dark';
}

const TemplateSelector: React.FC<{ selected: Template, onSelect: (template: Template) => void }> = ({ selected, onSelect }) => {
    const templates: { id: Template; name: string }[] = [
        { id: 'classic', name: 'Classic' },
        { id: 'modern', name: 'Modern' },
        { id: 'creative', name: 'Creative' },
    ];
    const baseStyle = "px-4 py-2 text-sm font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent";
    const activeStyle = "bg-accent text-white";
    const inactiveStyle = "bg-content-light dark:bg-content-dark text-text-secondary-light dark:text-text-secondary-dark hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600";

    return (
        <div className="flex items-center space-x-2 p-1 bg-bkg-light dark:bg-bkg-dark rounded-lg">
            {templates.map(template => (
                <button
                    key={template.id}
                    onClick={() => onSelect(template.id)}
                    className={`${baseStyle} ${selected === template.id ? activeStyle : inactiveStyle}`}
                >
                    {template.name}
                </button>
            ))}
        </div>
    );
};

export const ResumeBuilder: React.FC<ResumeBuilderProps> = ({ theme }) => {
    const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
    const [isDownloading, setIsDownloading] = useState(false);
    const [template, setTemplate] = useState<Template>('classic');
    const previewRef = useRef<HTMLDivElement>(null);

    const handleDownloadPdf = async () => {
        if (!previewRef.current) return;
        setIsDownloading(true);
        const previewElement = previewRef.current.querySelector('[data-template-id]');
        if (!previewElement) {
             console.error("Could not find template element to capture.");
             setIsDownloading(false);
             return;
        }

        try {
            const canvas = await html2canvas(previewElement as HTMLElement, {
                scale: 2,
                useCORS: true,
                backgroundColor: theme === 'light' ? '#ffffff' : '#1E1E1E',
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a4',
            });
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`${template}-resume.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setIsDownloading(false);
        }
    };
    
    return (
        <div className="max-w-7xl mx-auto">
             <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">AI Resume Builder</h1>
                    <p className="text-text-secondary-light dark:text-text-secondary-dark">
                        Craft your professional resume with the help of AI.
                    </p>
                </div>
                 <div className="flex flex-col sm:flex-row items-center gap-4">
                    <TemplateSelector selected={template} onSelect={setTemplate} />
                    <button
                        onClick={handleDownloadPdf}
                        disabled={isDownloading}
                        className="w-full sm:w-auto px-6 py-3 text-white font-semibold bg-accent rounded-lg shadow-md hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent-hover disabled:bg-gray-400 disabled:dark:bg-gray-600 disabled:cursor-not-allowed transition duration-200"
                    >
                        {isDownloading ? 'Downloading...' : 'Download PDF'}
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
                <div className="bg-content-light dark:bg-content-dark p-2 rounded-2xl shadow-card-light dark:shadow-card-dark border border-gray-200 dark:border-gray-700">
                    <div ref={previewRef}>
                        <ResumePreview resumeData={resumeData} template={template} />
                    </div>
                </div>
            </div>
        </div>
    );
};