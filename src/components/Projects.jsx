import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { ExternalLink, Github, Monitor, Smartphone, Server, Sparkles, FolderCode } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './Projects.css';

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });
    const [filter, setFilter] = useState('all');

    const projects = [
        {
            title: "nut-loose",
            category: "web",
            description: "Awareness-focused modern web platform engineered for youth mental health engagement and interactive community resources.",
            tags: ["JavaScript", "Web UI", "Mental Health"],
            github: "https://github.com/thrakaprabash/nut-loose",
            featured: true,
            icon: <Monitor size={28} />
        },
        {
            title: "toolsyne",
            category: "web",
            description: "A fast, modular utility and productivity suite for developers and power users built with React, Vite, and modern APIs.",
            tags: ["React", "Vite", "JavaScript", "Tooling"],
            github: "https://github.com/thrakaprabash/toolsyne",
            featured: true,
            icon: <FolderCode size={28} />
        },
        {
            title: "Smart Health Care",
            category: "opensource",
            description: "Open-source smart health care digital platform with core feature integration, documentation, and healthcare record workflows.",
            tags: ["JavaScript", "Open Source", "Healthcare", "Full-Stack"],
            github: "https://github.com/Vihanga-Deemantha/Smart-Health-Care",
            featured: true,
            icon: <Server size={28} />
        },
        {
            title: "FocusTreeApp",
            category: "mobile",
            description: "Focus-driven gamified productivity and task management app engineered with native Kotlin Android architecture.",
            tags: ["Kotlin", "Android", "Productivity"],
            github: "https://github.com/thrakaprabash/FocusTreeApp",
            featured: false,
            icon: <Smartphone size={28} />
        },
        {
            title: "BoardMate",
            category: "web",
            description: "Online student hostel management web system for room allocations, registrations, tenant records, and operations.",
            tags: ["JavaScript", "Node.js", "Express", "Full-Stack"],
            github: "https://github.com/thrakaprabash/BoardMate",
            featured: false,
            icon: <Server size={28} />
        },
        {
            title: "ecommerce",
            category: "web",
            description: "Responsive e-commerce storefront with cart management, dynamic product catalog filters, and high-performance UX.",
            tags: ["React", "Vite", "JavaScript", "Commerce"],
            github: "https://github.com/thrakaprabash/ecommerce",
            featured: false,
            icon: <Monitor size={28} />
        }
    ];

    const filteredProjects = filter === 'all'
        ? projects
        : projects.filter(p => p.category === filter);

    const filterTabs = [
        { id: 'all', label: 'All Projects' },
        { id: 'web', label: 'Web & Full-Stack' },
        { id: 'mobile', label: 'Mobile & Tools' },
        { id: 'opensource', label: 'Open Source' }
    ];

    return (
        <section className="section projects-section" id="projects" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-tag">&lt;portfolio /&gt;</span>
                    <h2 className="section-title">
                        Featured <span>Projects</span>
                    </h2>
                </motion.div>

                {/* Filter Tabs */}
                <motion.div
                    className="project-filter-tabs"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    {filterTabs.map((tab) => (
                        <button
                            key={tab.id}
                            className={`filter-tab ${filter === tab.id ? 'active' : ''}`}
                            onClick={() => setFilter(tab.id)}
                        >
                            {tab.label}
                            {filter === tab.id && (
                                <motion.div
                                    layoutId="projectTabPill"
                                    className="tab-pill"
                                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                />
                            )}
                        </button>
                    ))}
                </motion.div>

                {/* Projects Grid */}
                <motion.div
                    layout
                    className="projects-grid"
                >
                    <AnimatePresence>
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                layout
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="tilt-project-wrap"
                            >
                                <Tilt
                                    tiltMaxAngleX={8}
                                    tiltMaxAngleY={8}
                                    perspective={1000}
                                    scale={1.02}
                                    transitionSpeed={1200}
                                    glareEnable={true}
                                    glareMaxOpacity={0.12}
                                    glareColor="#06b6d4"
                                    className="tilt-inner"
                                >
                                    <div className="project-card glass-panel">
                                        <div className="project-top">
                                            <div className="project-icon-box">
                                                {project.icon}
                                            </div>
                                            <div className="project-links">
                                                {project.featured && (
                                                    <span className="featured-pill">
                                                        <span className="pulsing-dot"></span> Featured
                                                    </span>
                                                )}
                                                <a
                                                    href={project.github}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={`GitHub repository for ${project.title}`}
                                                    className="icon-link-btn"
                                                >
                                                    <Github size={18} />
                                                </a>
                                            </div>
                                        </div>

                                        <h3 className="project-title">{project.title}</h3>
                                        <p className="project-desc">{project.description}</p>

                                        <div className="project-tags">
                                            {project.tags.map((tag, i) => (
                                                <span key={i} className="project-tag">{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </Tilt>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                <motion.div
                    className="more-projects"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <MagneticButton strength={25}>
                        <a href="https://github.com/thrakaprabash" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                            <Sparkles size={16} className="btn-icon" /> View All Repositories on GitHub
                        </a>
                    </MagneticButton>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
