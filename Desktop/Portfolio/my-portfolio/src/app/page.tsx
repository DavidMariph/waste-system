// src/app/page.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiGithub, FiExternalLink, FiDownload, FiMenu, FiX, FiFilter, FiSearch } from 'react-icons/fi';

// Define types for our data
type Project = {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  demoLink: string;
  codeLink: string;
  category: string;
};

type Experience = {
  id: number;
  company: string;
  position: string;
  period: string;
  description: string;
  technologies: string[];
};

type Education = {
  id: number;
  institution: string;
  degree: string;
  period: string;
  description: string;
};

type Certification = {
  id: number;
  name: string;
  issuer: string;
  date: string;
  credentialLink: string;
};

export default function Portfolio() {
  const [activePage, setActivePage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Sample data - replace with your actual information
  const personalInfo = {
    name: "David Mariph",
    title: "Full Stack Developer",
    email: "mariphzone@gmail.com",
    phone: "+254 701696134",
    location: "Diani,Ukunda",
    about: "Passionate full-stack developer with 5+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies.",
    social: {
      github: "https://github.com/yourusername",
      linkedin: "https://linkedin.com/in/yourusername",
      twitter: "https://twitter.com/yourusername"
    }
  };

  const skills = {
    technical: ["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Express", "MongoDB", "PostgreSQL", "Tailwind CSS", "AWS"],
    soft: ["Problem Solving", "Team Leadership", "Agile Methodology", "Communication", "Project Management", "Mentoring"]
  };

  const experiences: Experience[] = [
    {
      id: 1,
      company: "Tech Innovations Inc.",
      position: "Senior Full Stack Developer",
      period: "2023 - Present",
      description: "Led development of customer-facing web applications, improved performance by 40%, and mentored junior developers.",
      technologies: ["React", "Node.js", "MongoDB", "AWS"]
    },
    {
      id: 2,
      company: "Digital Solutions LLC",
      position: "Frontend Developer",
      period: "2023 - 2025",
      description: "Developed responsive web applications and collaborated with UX designers to implement user-friendly interfaces.",
      technologies: ["React", "JavaScript", "CSS", "REST APIs"]
    },
    {
      id: 3,
      company: "WebCraft Studio",
      position: "Junior Web Developer",
      period: "2023 - 2025",
      description: "Built and maintained client websites, implemented new features, and fixed bugs.",
      technologies: ["HTML", "CSS", "JavaScript", "PHP"]
    }
  ];

  const education: Education[] = [
    {
      id: 1,
      institution: "Taita Taveta National Polytechnic",
      degree: "diploma in ICT",
      period: "2023- 2025",
      description: "Specialized in software engineering and machine learning. GPA: 3.8/4.0"
    },
    {
      id: 2,
      institution: "Technical University Of Mombasa,Mombasa",
      degree: "Degree in Data Analysis",
      period: "2026 - Present",
      description: "Dean's List, ACM Chapter President. Relevant coursework: Algorithms, Data Structures, Web Development"
    }
  ];

  const certifications: Certification[] = [
    {
      id: 1,
      name: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2021",
      credentialLink: "#"
    },
    {
      id: 2,
      name: "Google Professional Cloud Developer",
      issuer: "Google",
      date: "2020",
      credentialLink: "#"
    },
    {
      id: 3,
      name: "React Native Certification",
      issuer: "Meta",
      date: "2019",
      credentialLink: "#"
    }
  ];

  const projects: Project[] = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-featured online store with product filtering, cart functionality, and payment processing.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      demoLink: "#",
      codeLink: "#",
      category: "fullstack"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A drag-and-drop task management application with real-time updates and team collaboration features.",
      image: "/api/placeholder/400/250",
      technologies: ["React", "Firebase", "Material UI", "Framer Motion"],
      demoLink: "#",
      codeLink: "#",
      category: "frontend"
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "Real-time weather application with 5-day forecast and location-based services.",
      image: "/api/placeholder/400/250",
      technologies: ["JavaScript", "OpenWeather API", "Chart.js"],
      demoLink: "#",
      codeLink: "#",
      category: "frontend"
    },
    {
      id: 4,
      title: "REST API Microservices",
      description: "A scalable microservices architecture with authentication and database management.",
      image: "/api/placeholder/400/250",
      technologies: ["Node.js", "Express", "MongoDB", "Docker"],
      demoLink: "#",
      codeLink: "#",
      category: "backend"
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.4
  };

  const renderPage = () => {
    switch(activePage) {
      case 'home':
        return <HomePage personalInfo={personalInfo} skills={skills} />;
      case 'projects':
        return <ProjectsPage 
                 projects={filteredProjects} 
                 searchQuery={searchQuery}
                 setSearchQuery={setSearchQuery}
                 activeFilter={activeFilter}
                 setActiveFilter={setActiveFilter}
               />;
      case 'experience':
        return <ExperiencePage experiences={experiences} />;
      case 'academics':
        return <AcademicsPage education={education} certifications={certifications} />;
      default:
        return <HomePage personalInfo={personalInfo} skills={skills} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Navigation */}
      <nav className="fixed w-full bg-white shadow-sm z-10">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-xl font-bold text-indigo-600"
          >
            {personalInfo.name}
          </motion.div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {['home', 'projects', 'experience', 'academics'].map((item) => (
              <button
                key={item}
                onClick={() => setActivePage(item)}
                className={`capitalize ${activePage === item ? 'text-indigo-600 font-medium' : 'text-gray-600 hover:text-indigo-500'}`}
              >
                {item}
              </button>
            ))}
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center">
              <FiDownload className="mr-2" />
              Resume
            </button>
          </div>

          {/* Mobile Navigation Toggle */}
          <button 
            className="md:hidden text-gray-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white shadow-lg"
            >
              <div className="container mx-auto px-4 py-3 flex flex-col space-y-3">
                {['home', 'projects', 'experience', 'academics'].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setActivePage(item);
                      setMobileMenuOpen(false);
                    }}
                    className={`capitalize py-2 text-left ${activePage === item ? 'text-indigo-600 font-medium' : 'text-gray-600'}`}
                  >
                    {item}
                  </button>
                ))}
                <button className="bg-indigo-600 text-white px-4 py-2 rounded-md flex items-center justify-center">
                  <FiDownload className="mr-2" />
                  Download Resume
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Content */}
      <main className="pt-20 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold">{personalInfo.name}</h3>
              <p className="text-gray-400">{personalInfo.title}</p>
            </div>
            <div className="flex space-x-4">
              <a href={personalInfo.social.github} className="text-gray-400 hover:text-white">
                <FiGithub size={20} />
              </a>
              <a href={personalInfo.social.linkedin} className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href={personalInfo.social.twitter} className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-6 text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Home Page Component
const HomePage = ({ personalInfo, skills }: { personalInfo: any, skills: any }) => {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between mb-16">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 mb-8 md:mb-0"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Hi, I'm {personalInfo.name}</h1>
          <h2 className="text-2xl md:text-3xl text-indigo-600 mb-4">{personalInfo.title}</h2>
          <p className="text-gray-600 mb-6">{personalInfo.about}</p>
          <div className="flex space-x-4">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium">
              View My Work
            </button>
            <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-md font-medium">
              Contact Me
            </button>
          </div>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-1/2 flex justify-center"
        >
          <div className="w-64 h-64 bg-indigo-100 rounded-full overflow-hidden shadow-xl">
            <img 
              src="/api/placeholder/256/256" 
              alt={personalInfo.name} 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </section>

      {/* Skills Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">Skills & Expertise</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Technical Skills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">Technical Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.technical.map((skill: string, index: number) => (
                <span 
                  key={index}
                  className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
          
          {/* Soft Skills */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">Soft Skills</h3>
            <div className="flex flex-wrap gap-2">
              {skills.soft.map((skill: string, index: number) => (
                <span 
                  key={index}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Get In Touch</h2>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <p className="font-medium">Email</p>
            <p className="text-indigo-600">{personalInfo.email}</p>
          </div>
          <div>
            <p className="font-medium">Phone</p>
            <p className="text-indigo-600">{personalInfo.phone}</p>
          </div>
          <div>
            <p className="font-medium">Location</p>
            <p className="text-indigo-600">{personalInfo.location}</p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

// Projects Page Component
const ProjectsPage = ({ 
  projects, 
  searchQuery, 
  setSearchQuery, 
  activeFilter, 
  setActiveFilter 
}: { 
  projects: Project[], 
  searchQuery: string, 
  setSearchQuery: (query: string) => void,
  activeFilter: string,
  setActiveFilter: (filter: string) => void
}) => {
  const filters = ['all', 'frontend', 'backend', 'fullstack'];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">My Projects</h1>
      <p className="text-gray-600 text-center mb-8">A collection of my recent work</p>
      
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <div className="relative w-full md:w-1/3">
          <FiSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        
        <div className="flex flex-wrap gap-2">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm capitalize ${activeFilter === filter ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
      
      {/* Projects Grid */}
      {projects.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="h-48 overflow-hidden bg-gray-200">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Project Image
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, i) => (
                    <span key={i} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <a 
                    href={project.demoLink} 
                    className="text-indigo-600 flex items-center hover:text-indigo-800"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Live Demo <FiExternalLink className="ml-1" />
                  </a>
                  <a 
                    href={project.codeLink} 
                    className="text-gray-700 flex items-center hover:text-gray-900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Code <FiGithub className="ml-1" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

// Experience Page Component
const ExperiencePage = ({ experiences }: { experiences: Experience[] }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Professional Experience</h1>
      <p className="text-gray-600 text-center mb-8">My career journey and professional growth</p>
      
      <div className="max-w-3xl mx-auto">
        {experiences.map((exp, index) => (
          <motion.div 
            key={exp.id}
            initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="mb-8 relative"
          >
            {/* Timeline dot */}
            <div className="absolute left-0 h-4 w-4 rounded-full bg-indigo-600 border-4 border-white shadow -ml-2 mt-1.5"></div>
            
            <div className="ml-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex flex-col md:flex-row justify-between mb-2">
                  <h3 className="text-xl font-semibold">{exp.position}</h3>
                  <p className="text-indigo-600 font-medium">{exp.period}</p>
                </div>
                <p className="text-gray-700 font-medium mb-3">{exp.company}</p>
                <p className="text-gray-600 mb-4">{exp.description}</p>
                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech, i) => (
                    <span key={i} className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// Academics Page Component
const AcademicsPage = ({ education, certifications }: { education: Education[], certifications: Certification[] }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-2">Education & Certifications</h1>
      <p className="text-gray-600 text-center mb-8">My academic background and professional certifications</p>
      
      {/* Education Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Education</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          {education.map((edu, index) => (
            <motion.div
              key={edu.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <h3 className="text-xl font-semibold mb-2">{edu.degree}</h3>
              <p className="text-gray-700 font-medium mb-2">{edu.institution}</p>
              <p className="text-gray-600 mb-3">{edu.period}</p>
              <p className="text-gray-600">{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Certifications Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 text-indigo-600">Certifications</h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md flex flex-col"
            >
              <h3 className="text-xl font-semibold mb-2 flex-grow">{cert.name}</h3>
              <p className="text-gray-700 font-medium mb-2">{cert.issuer}</p>
              <p className="text-gray-600 mb-3">{cert.date}</p>
              <a 
                href={cert.credentialLink} 
                className="text-indigo-600 hover:text-indigo-800 mt-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                View Credential
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
