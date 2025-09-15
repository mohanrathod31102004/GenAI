import React from 'react';
import { ResumeData } from '../../types';
import { Template } from './index';
import { ClassicTemplate } from './templates/ClassicTemplate';
import { ModernTemplate } from './templates/ModernTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';


interface ResumePreviewProps {
    resumeData: ResumeData;
    template: Template;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, template }) => {
    const renderTemplate = () => {
        switch(template) {
            case 'classic':
                return <ClassicTemplate resumeData={resumeData} />;
            case 'modern':
                return <ModernTemplate resumeData={resumeData} />;
            case 'creative':
                return <CreativeTemplate resumeData={resumeData} />;
            default:
                return <ClassicTemplate resumeData={resumeData} />;
        }
    }
    return (
        <div className="w-full h-full">
           {renderTemplate()}
        </div>
    );
};