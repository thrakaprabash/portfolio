import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, Monitor, Smartphone, Server } from 'lucide-react';
import './Projects.css';

const Projects = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    const projects = [
        {
            title: "nut-loose",
            description: "Awareness-focused platform for youth mental health engagement.",
            tags: ["JavaScript", "Web"],
            github: "https://github.com/thrakaprabash/nut-loose",
            icon: <Monitor size={32} />
        },
        {
            title: "toolsyne",
            description: "Practical utility hub for everyday productivity tasks.",
            tags: ["React", "Vite", "JavaScript"],
            github: "https://github.com/thrakaprabash/toolsyne",
            icon: <Monitor size={32} />
        },
        {
            title: "Smart Health Care",
            description: "Open-source smart health care platform with feature and documentation contributions.",
            tags: ["JavaScript", "Open Source", "Healthcare"],
            github: "https://github.com/Vihanga-Deemantha/Smart-Health-Care",
            icon: <Server size={32} />
        },
        {
            title: "Focus Tree",
            description: "Focus-focused productivity app built in Kotlin.",
            tags: ["Kotlin", "Productivity"],
            github: "https://github.com/thrakaprabash/Focus-Tree",
            icon: <Smartphone size={32} />
        },
        {
            title: "BoardMate",
            description: "Online student hostel management system for registrations, rooms, and operations.",
            tags: ["JavaScript", "Node.js"],
            github: "https://github.com/thrakaprabash/BoardMate",
            icon: <Smartphone size={32} />
        },
        {
            title: "ecommerce",
            description: "Responsive e-commerce experience and storefront workflows.",
            tags: ["React", "Vite", "JavaScript"],
            github: "https://github.com/thrakaprabash/ecommerce",
            icon: <Monitor size={32} />
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section className="section projects-section" id="projects" ref={ref}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    Featured <span>Projects</span>
                </motion.h2>

                <motion.div
                    className="projects-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            className="project-card glass-panel"
                            variants={itemVariants}
                        >
                            <div className="project-top">
                                <div className="project-icon">
                                    {project.icon}
                                </div>
                                <div className="project-links">
                                    <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repository">
                                        <Github size={20} />
                                    </a>
                                    {project.demo && (
                                        <a href={project.demo} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                                            <ExternalLink size={20} />
                                        </a>
                                    )}
                                </div>
                            </div>

                            <h3 className="project-title">{project.title}</h3>
                            <p className="project-desc">{project.description}</p>

                            <div className="project-tags">
                                {project.tags.map((tag, i) => (
                                    <span key={i} className="project-tag">{tag}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.div
                    className="more-projects"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1, duration: 0.5 }}
                >
                    <a href="https://github.com/thrakaprabash" target="_blank" rel="noopener noreferrer" className="btn-secondary">
                        View More on GitHub
                    </a>
                </motion.div>
            </div>
        </section>
    );
};

export default Projects;
