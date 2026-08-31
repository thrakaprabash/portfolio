import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { GraduationCap, GitPullRequest, Smartphone, Server, Award, Calendar, ExternalLink } from 'lucide-react';
import './Experience.css';

const experiences = [
    {
        period: "2023 — 2027 (Expected)",
        title: "BSc (Hons) IT - Software Engineering",
        organization: "SLIIT (Sri Lanka Institute of Information Technology)",
        description: "Focusing on data structures & algorithms, OOP, distributed computing, database systems, software architecture patterns, and software quality assurance.",
        icon: <GraduationCap size={22} />,
        category: "education",
        badge: "Undergraduate",
        skills: ["Software Engineering", "OOP", "Data Structures", "DBMS", "Java", "C++"]
    },
    {
        period: "2024 — Present",
        title: "Smart Health Care — Open Source Contributor",
        organization: "Open Source Collaboration",
        description: "Contributed to core platform modules, healthcare record workflows, API design, and comprehensive documentation for medical appointment and patient management systems.",
        icon: <GitPullRequest size={22} />,
        category: "opensource",
        badge: "Open Source",
        link: "https://github.com/Vihanga-Deemantha/Smart-Health-Care",
        skills: ["JavaScript", "Full-Stack", "Team Collaboration", "Git/GitHub", "API Design"]
    },
    {
        period: "2024",
        title: "FocusTreeApp — Mobile Lead Developer",
        organization: "Productivity App",
        description: "Engineered a native Android gamified productivity application using Kotlin, implementing custom focus timers, local persistence, clean architecture, and intuitive UI components.",
        icon: <Smartphone size={22} />,
        category: "project",
        badge: "Mobile Architecture",
        link: "https://github.com/thrakaprabash/FocusTreeApp",
        skills: ["Kotlin", "Android Studio", "Clean Architecture", "UI/UX", "State Management"]
    },
    {
        period: "2024 — 2025",
        title: "Full-Stack & Micro-SaaS Ecosystems",
        organization: "Independent Development",
        description: "Developed and architected scalable web applications including toolsyne (developer utilities suite), nut-loose (youth awareness platform), and BoardMate (student hostel management system).",
        icon: <Server size={22} />,
        category: "work",
        badge: "Full-Stack",
        link: "https://github.com/thrakaprabash",
        skills: ["React", "Next.js", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Docker"]
    }
];

const Experience = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.1 });

    return (
        <section className="section experience-section" id="experience" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-tag">&lt;journey /&gt;</span>
                    <h2 className="section-title">
                        Experience & <span>Timeline</span>
                    </h2>
                </motion.div>

                <div className="timeline-container">
                    <div className="timeline-line"></div>

                    <div className="timeline-items">
                        {experiences.map((item, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={index}
                                    className={`timeline-item ${isEven ? 'left' : 'right'}`}
                                    initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -50 : 50 }}
                                    transition={{ duration: 0.6, delay: index * 0.15 }}
                                >
                                    <div className="timeline-node-marker">
                                        <div className={`timeline-icon-box ${item.category}`}>
                                            {item.icon}
                                        </div>
                                    </div>

                                    <div className="timeline-card-wrapper">
                                        <Tilt
                                            tiltMaxAngleX={6}
                                            tiltMaxAngleY={6}
                                            perspective={1000}
                                            scale={1.02}
                                            transitionSpeed={1000}
                                            glareEnable={true}
                                            glareMaxOpacity={0.08}
                                            glareColor="#06b6d4"
                                            className="timeline-tilt"
                                        >
                                            <div className="timeline-card glass-panel">
                                                <div className="timeline-card-top">
                                                    <div className="period-badge">
                                                        <Calendar size={13} />
                                                        <span>{item.period}</span>
                                                    </div>
                                                    <span className={`category-tag ${item.category}`}>
                                                        {item.badge}
                                                    </span>
                                                </div>

                                                <h3 className="timeline-title">{item.title}</h3>
                                                <h4 className="timeline-org">
                                                    {item.organization}
                                                    {item.link && (
                                                        <a
                                                            href={item.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="org-link"
                                                            aria-label={`View link for ${item.title}`}
                                                        >
                                                            <ExternalLink size={14} />
                                                        </a>
                                                    )}
                                                </h4>

                                                <p className="timeline-desc">{item.description}</p>

                                                <div className="timeline-skills">
                                                    {item.skills.map((skill, i) => (
                                                        <span key={i} className="timeline-skill-chip">
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </Tilt>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
