'use client';

import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const PrintableResume = ({ personalInfo, skills, experiences, education, certifications }: any) => {
  const resumeRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => resumeRef.current,
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Printable Resume</h2>
        <button
          onClick={handlePrint}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          Print Resume
        </button>
      </div>
      
      <div ref={resumeRef} className="p-8 bg-white text-black">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">{personalInfo.name}</h1>
          <h2 className="text-xl text-indigo-600">{personalInfo.title}</h2>
          <div className="flex justify-center space-x-4 mt-2">
            <p>{personalInfo.email}</p>
            <p>•</p>
            <p>{personalInfo.phone}</p>
            <p>•</p>
            <p>{personalInfo.location}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold border-b-2 border-indigo-600 pb-2 mb-4">Professional Summary</h3>
          <p>{personalInfo.about}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold border-b-2 border-indigo-600 pb-2 mb-4">Technical Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.technical.map((skill: string, index: number) => (
              <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold border-b-2 border-indigo-600 pb-2 mb-4">Work Experience</h3>
          {experiences.map((exp: any) => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <h4 className="font-semibold">{exp.position}</h4>
                <p className="text-indigo-600">{exp.period}</p>
              </div>
              <p className="font-medium">{exp.company}</p>
              <p className="mb-2">{exp.description}</p>
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech: string, i: number) => (
                  <span key={i} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-semibold border-b-2 border-indigo-600 pb-2 mb-4">Education</h3>
          {education.map((edu: any) => (
            <div key={edu.id} className="mb-4">
              <div className="flex justify-between">
                <h4 className="font-semibold">{edu.degree}</h4>
                <p className="text-indigo-600">{edu.period}</p>
              </div>
              <p className="font-medium">{edu.institution}</p>
              <p>{edu.description}</p>
            </div>
          ))}
        </div>
        
        <div>
          <h3 className="text-xl font-semibold border-b-2 border-indigo-600 pb-2 mb-4">Certifications</h3>
          {certifications.map((cert: any) => (
            <div key={cert.id} className="mb-4">
              <h4 className="font-semibold">{cert.name}</h4>
              <p className="font-medium">{cert.issuer}</p>
              <p>Issued: {cert.date}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrintableResume;