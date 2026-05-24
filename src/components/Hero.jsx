import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, ChevronDown } from 'lucide-react';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section" id="home">
            <div className="container hero-container">
                <motion.div
                    className="hero-content"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="greeting"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <span className="wave">👋</span> Hello, I'm
                    </motion.div>

                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        Tharaka Prabash <span>Lakpriya</span>
                    </motion.h1>

                    <motion.h2
                        className="hero-subtitle"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        Software Engineering Undergraduate & Full-Stack Developer
                    </motion.h2>

                    <motion.p
                        className="hero-description"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        Focused on robust full-stack systems, backend architecture, and software quality. Interested in micro-SaaS, API design, automation pipelines, and practical UX.
                    </motion.p>

                    <motion.div
                        className="hero-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        <a href="#projects" className="btn-primary">View My Work</a>
                        <a href="#contact" className="btn-secondary">Contact Me</a>
                    </motion.div>

                    <motion.div
                        className="hero-socials"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                    >
                        <a href="https://github.com/thrakaprabash" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
                            <Github size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/tharaka-prabash-670720287/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                            <Linkedin size={20} />
                        </a>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-image-container"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <div className="hero-shape"></div>
                    <div className="hero-avatar">
                        <img src="https://github.com/thrakaprabash.png" alt="Tharaka Prabash Lakpriya" />
                    </div>

                    {/* Floating elements */}
                    <motion.div
                        className="floating-badge badge-react"
                        animate={{ y: [0, -15, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                        React
                    </motion.div>
                    <motion.div
                        className="floating-badge badge-node"
                        animate={{ y: [0, 15, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                    >
                        Node.js
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                className="scroll-indicator"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <a href="#about"><ChevronDown size={32} /></a>
            </motion.div>
        </section>
    );
};

export default Hero;
