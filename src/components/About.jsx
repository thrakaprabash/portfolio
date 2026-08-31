import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import { GraduationCap, Code2, Rocket, Globe, Sparkles, FolderGit2, Cpu, CheckCircle2 } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './About.css';

const AnimatedCounter = ({ target, suffix = "", isInView }) => {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        if (!isInView) return;
        let start = 0;
        const duration = 1200;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(start));
            }
        }, stepTime);

        return () => clearInterval(timer);
    }, [isInView, target]);

    return <span>{count}{suffix}</span>;
};

const About = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const highlights = [
        {
            title: "Education",
            icon: <GraduationCap size={24} />,
            desc: "BSc (Hons) IT - Software Engineering @ SLIIT",
            badge: "Undergraduate"
        },
        {
            title: "Core Architecture",
            icon: <Code2 size={24} />,
            desc: "Full-stack web applications, REST & GraphQL APIs",
            badge: "Backend Focus"
        },
        {
            title: "Interests & Innovation",
            icon: <Rocket size={24} />,
            desc: "Micro-SaaS, CI/CD automation pipelines & Cloud native",
            badge: "Continuous Explorer"
        },
        {
            title: "Quality First",
            icon: <Globe size={24} />,
            desc: "Maintainability, test-driven logic, optimal user UX",
            badge: "High Standard"
        }
    ];

    const stats = [
        { label: "Public Projects", number: 10, suffix: "+", icon: <FolderGit2 size={18} /> },
        { label: "Tech Stacks", number: 8, suffix: "+", icon: <Cpu size={18} /> },
        { label: "Commitment", number: 100, suffix: "%", icon: <CheckCircle2 size={18} /> },
    ];

    return (
        <section className="section about-section" id="about" ref={ref}>
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="section-tag">&lt;overview /&gt;</span>
                    <h2 className="section-title">
                        About <span>Me</span>
                    </h2>
                </motion.div>

                {/* Quick Stats Banner */}
                <motion.div
                    className="stats-strip glass-panel"
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {stats.map((stat, i) => (
                        <div key={i} className="stat-item">
                            <div className="stat-icon">{stat.icon}</div>
                            <div className="stat-content">
                                <span className="stat-number">
                                    <AnimatedCounter target={stat.number} suffix={stat.suffix} isInView={isInView} />
                                </span>
                                <span className="stat-label">{stat.label}</span>
                            </div>
                        </div>
                    ))}
                </motion.div>

                <div className="about-content">
                    <motion.div
                        className="about-text glass-panel"
                        initial={{ opacity: 0, x: -40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <div className="terminal-header">
                            <div className="terminal-dots">
                                <span className="dot red"></span>
                                <span className="dot yellow"></span>
                                <span className="dot green"></span>
                            </div>
                            <span className="terminal-title">tharaka_bio.ts</span>
                        </div>

                        <div className="about-body">
                            <h3>Driven by Engineering Precision</h3>
                            <p>
                                I am an undergraduate in <strong>BSc (Hons) IT - Software Engineering at SLIIT</strong>, based in Kelaniya, Sri Lanka.
                                I engineer end-to-end full-stack systems with strong emphasis on backend architecture, clean code standards, and reliable performance.
                            </p>
                            <p>
                                I am actively interested in <strong>micro-SaaS architectures, API design, DevOps pipelines</strong>, and intuitive digital product interfaces.
                            </p>
                            <p>
                                Recent focus areas include <strong>TypeScript, Next.js architecture, Docker containers, Kotlin, and AWS</strong>, alongside open-source collaborations like
                                <a href="https://github.com/Vihanga-Deemantha/Smart-Health-Care" target="_blank" rel="noopener noreferrer" className="highlight-link"> Smart Health Care</a>.
                            </p>

                            <MagneticButton strength={20}>
                                <a href="https://github.com/thrakaprabash" target="_blank" rel="noopener noreferrer" className="btn-primary mt-4 inline-block">
                                    <Sparkles size={16} className="btn-icon" /> Explore My GitHub
                                </a>
                            </MagneticButton>
                        </div>
                    </motion.div>

                    <motion.div
                        className="about-cards-container"
                        initial={{ opacity: 0, x: 40 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {highlights.map((item, index) => (
                            <Tilt
                                key={index}
                                tiltMaxAngleX={10}
                                tiltMaxAngleY={10}
                                perspective={1000}
                                scale={1.02}
                                transitionSpeed={1200}
                                glareEnable={true}
                                glareMaxOpacity={0.12}
                                glareColor="#06b6d4"
                                glarePosition="all"
                                className="tilt-card-wrapper"
                            >
                                <div className="about-card glass-panel">
                                    <div className="card-top-row">
                                        <div className="about-icon">{item.icon}</div>
                                        <span className="card-badge">{item.badge}</span>
                                    </div>
                                    <h4>{item.title}</h4>
                                    <p>{item.desc}</p>
                                </div>
                            </Tilt>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
