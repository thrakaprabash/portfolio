import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { Code, Layers, Database, Wrench, TrendingUp, Cpu, Terminal } from 'lucide-react';
import './Skills.css';

const Skills = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.15 });

    const techStack = [
        {
            category: "Languages",
            icon: <Code size={20} />,
            tools: ["JavaScript", "TypeScript", "Python", "Java", "Kotlin", "HTML5", "CSS3"]
        },
        {
            category: "Frameworks & Libraries",
            icon: <Layers size={20} />,
            tools: ["React.js", "Next.js", "Node.js", "Express", "Vite", "Tailwind CSS", "Spring Boot"]
        },
        {
            category: "Database & Cloud",
            icon: <Database size={20} />,
            tools: ["MongoDB", "MySQL", "Docker", "AWS", "Git", "GitHub", "Vercel"]
        },
        {
            category: "Tools & Architecture",
            icon: <Wrench size={20} />,
            tools: ["Postman", "Figma", "REST APIs", "Micro-SaaS", "CI/CD", "Clean Architecture"]
        }
    ];

    const currentLearning = [
        { name: "TypeScript Ecosystem", progress: 75, tag: "Advanced" },
        { name: "Next.js 15 & Server Actions", progress: 70, tag: "Architecture" },
        { name: "Docker & Containerization", progress: 60, tag: "DevOps" },
        { name: "Kotlin Android Dev", progress: 50, tag: "Mobile" },
        { name: "AWS Cloud Infrastructure", progress: 45, tag: "Cloud" }
    ];

    const barVariants = {
        hidden: { width: 0 },
        visible: (custom) => ({
            width: `${custom}%`,
            transition: { duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }
        })
    };

    return (
        <section className="section skills-section" id="skills" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-tag">&lt;tech-matrix /&gt;</span>
                    <h2 className="section-title">
                        Tech Stack & <span>Skills</span>
                    </h2>
                </motion.div>

                <div className="skills-content">
                    <motion.div
                        className="skills-grid"
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {techStack.map((stack, idx) => (
                            <Tilt
                                key={idx}
                                tiltMaxAngleX={8}
                                tiltMaxAngleY={8}
                                perspective={1000}
                                scale={1.02}
                                transitionSpeed={1000}
                                glareEnable={true}
                                glareMaxOpacity={0.08}
                                glareColor="#8b5cf6"
                                className="tilt-skill-card"
                            >
                                <div className="skill-category glass-panel">
                                    <div className="skill-cat-header">
                                        <div className="skill-cat-icon">{stack.icon}</div>
                                        <h3>{stack.category}</h3>
                                    </div>
                                    <div className="skill-tags">
                                        {stack.tools.map((tool, i) => (
                                            <span key={i} className="skill-tag">
                                                {tool}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </Tilt>
                        ))}
                    </motion.div>

                    <motion.div
                        className="learning-progress glass-panel"
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="learning-header">
                            <div className="learning-title-wrap">
                                <div className="trending-icon">
                                    <TrendingUp size={22} />
                                </div>
                                <div>
                                    <h3>Growth & Learning</h3>
                                    <p className="learning-desc">Current roadmap & skill progression</p>
                                </div>
                            </div>
                            <span className="live-status-pill">Active</span>
                        </div>

                        <div className="progress-list">
                            {currentLearning.map((item, idx) => (
                                <div key={idx} className="progress-item">
                                    <div className="progress-info">
                                        <div className="name-with-tag">
                                            <span className="progress-name">{item.name}</span>
                                            <span className="progress-tag">{item.tag}</span>
                                        </div>
                                        <span className="progress-percent">{item.progress}%</span>
                                    </div>
                                    <div className="progress-bg">
                                        <motion.div
                                            className="progress-bar"
                                            custom={item.progress}
                                            variants={barVariants}
                                            initial="hidden"
                                            animate={isInView ? "visible" : "hidden"}
                                        >
                                            <div className="progress-glow-head"></div>
                                        </motion.div>
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
