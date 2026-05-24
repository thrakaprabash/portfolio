import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import './Skills.css';

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const techStack = [
        { category: "Languages", tools: ["JavaScript", "TypeScript", "Python", "Java", "Kotlin", "HTML", "CSS"] },
        { category: "Frameworks & Libraries", tools: ["React", "Next.js", "Node.js", "Express", "Vite", "Tailwind CSS", "Bootstrap", "Spring"] },
        { category: "Database & DevOps", tools: ["MongoDB", "MySQL", "Docker", "Git", "GitHub", "Vercel", "Netlify"] },
        { category: "Tools & Practices", tools: ["Postman", "Figma", "VS Code", "API Design", "Software Quality"] }
    ];

    const currentLearning = [
        { name: "TypeScript", progress: 70 },
        { name: "Next.js", progress: 65 },
        { name: "Docker", progress: 55 },
        { name: "Kotlin", progress: 45 },
        { name: "AWS", progress: 40 }
    ];

    const barVariants = {
        hidden: { width: 0 },
        visible: (custom) => ({
            width: `${custom}%`,
            transition: { duration: 1, delay: 0.5, ease: "easeOut" }
        })
    };

    return (
        <section className="section skills-section" id="skills" ref={ref}>
            <div className="container">
                <motion.h2
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    Tech Stack & <span>Skills</span>
                </motion.h2>

                <div className="skills-content">
                    <motion.div
                        className="skills-grid"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {techStack.map((stack, idx) => (
                            <div key={idx} className="skill-category glass-panel">
                                <h3>{stack.category}</h3>
                                <div className="skill-tags">
                                    {stack.tools.map((tool, i) => (
                                        <span key={i} className="skill-tag">{tool}</span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    <motion.div
                        className="learning-progress glass-panel"
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h3>📈 Currently Learning</h3>
                        <p className="learning-desc">Continuously expanding my skill set to build better products.</p>

                        <div className="progress-list">
                            {currentLearning.map((item, idx) => (
                                <div key={idx} className="progress-item">
                                    <div className="progress-info">
                                        <span className="progress-name">{item.name}</span>
                                        <span className="progress-percent">{item.progress}%</span>
                                    </div>
                                    <div className="progress-bg">
                                        <motion.div
                                            className="progress-bar"
                                            custom={item.progress}
                                            variants={barVariants}
                                            initial="hidden"
                                            animate={isInView ? "visible" : "hidden"}
                                        ></motion.div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
