import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, Code2, Rocket, Globe } from 'lucide-react';
import './About.css';

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const skills = [
        { title: "Education", icon: <GraduationCap />, desc: "BSc (Hons) IT - SE @ SLIIT" },
        { title: "Focus", icon: <Code2 />, desc: "Full-stack systems and backend architecture" },
        { title: "Interests", icon: <Rocket />, desc: "Micro-SaaS, API design, automation" },
        { title: "Quality", icon: <Globe />, desc: "Maintainability, testability, real user value" }
    ];

    return (
        <section className="section about-section" id="about" ref={ref}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    About <span>Me</span>
                </motion.h2>

                <div className="about-content">
                    <motion.div
                        className="about-text glass-panel"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3>Get to know me!</h3>
                        <p>
                            I am an undergraduate in BSc (Hons) IT - Software Engineering at SLIIT, based in Kelaniya, Sri Lanka.
                            I focus on robust full-stack systems, backend architecture, and software quality.
                        </p>
                        <p>
                            I am interested in micro-SaaS products, API design, automation pipelines, and practical UX.
                            My goal is to build maintainable, testable solutions that deliver real user value.
                        </p>
                        <p>
                            Recently, I have been deepening TypeScript, Next.js architecture, Docker workflows, Kotlin, and AWS,
                            while contributing to open-source work such as
                            <a href="https://github.com/Vihanga-Deemantha/Smart-Health-Care" target="_blank" rel="noopener noreferrer"> Smart Health Care</a>.
                        </p>

                        <a href="https://github.com/thrakaprabash" target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 inline-block">
                            Check out my GitHub
                        </a>
                    </motion.div>

                    <motion.div
                        className="about-cards-container"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {skills.map((skill, index) => (
                            <motion.div
                                key={index}
                                className="about-card glass-panel"
                                whileHover={{ y: -5, scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="about-icon">{skill.icon}</div>
                                <h4>{skill.title}</h4>
                                <p>{skill.desc}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
