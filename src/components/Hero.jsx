import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Github, Linkedin, ChevronDown, Sparkles, Terminal, Code, FileDown } from 'lucide-react';
import ParticleBackground from './ParticleBackground';
import NeuralPlanet from './NeuralPlanet';
import GlitchText from './GlitchText';
import MagneticButton from './MagneticButton';
import './Hero.css';

const Hero = () => {
    return (
        <section className="hero-section" id="home">
            <ParticleBackground />

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
                        <span className="terminal-prompt"><Terminal size={16} /></span>
                        <span>Hello World, I'm</span>
                    </motion.div>

                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                    >
                        <GlitchText text="Tharaka Prabash" /> <span className="title-accent">Lakpriya</span>
                    </motion.h1>

                    <motion.div
                        className="hero-typewriter-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <span className="typewriter-prefix">&gt; </span>
                        <TypeAnimation
                            sequence={[
                                'Full-Stack Developer',
                                2000,
                                'Backend & API Architect',
                                2000,
                                'Software Engineering Undergrad',
                                2000,
                                'Micro-SaaS & Cloud Enthusiast',
                                2000,
                            ]}
                            wrapper="span"
                            speed={50}
                            className="hero-subtitle-typed"
                            repeat={Infinity}
                        />
                    </motion.div>

                    <motion.p
                        className="hero-description"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                    >
                        Engineering robust full-stack systems, modern cloud pipelines, and scalable APIs with a deep commitment to code quality and seamless user experiences.
                    </motion.p>

                    <motion.div
                        className="hero-actions"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 0.5 }}
                    >
                        <MagneticButton strength={20}>
                            <a href="#projects" className="btn-primary">
                                <Sparkles size={16} className="btn-icon" /> View My Work
                            </a>
                        </MagneticButton>

                        <MagneticButton strength={20}>
                            <a
                                href="/Tharaka_Prabash_Lakpriya_CV.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                download="Tharaka_Prabash_Lakpriya_CV.pdf"
                                className="btn-cv"
                            >
                                <FileDown size={16} className="btn-icon" /> Download CV
                            </a>
                        </MagneticButton>

                        <MagneticButton strength={20}>
                            <a href="#contact" className="btn-secondary">
                                Contact Me
                            </a>
                        </MagneticButton>
                    </motion.div>

                    <motion.div
                        className="hero-socials"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 0.5 }}
                    >
                        <MagneticButton strength={15}>
                            <a href="https://github.com/thrakaprabash" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
                                <Github size={20} />
                            </a>
                        </MagneticButton>
                        <MagneticButton strength={15}>
                            <a href="https://www.linkedin.com/in/tharaka-prabash-670720287/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                                <Linkedin size={20} />
                            </a>
                        </MagneticButton>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="hero-image-container"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    <NeuralPlanet avatarUrl="https://github.com/thrakaprabash.png" />

                    {/* Floating Badges with 3D tilts and float animations */}
                    <motion.div
                        className="floating-badge badge-react"
                        animate={{ y: [0, -14, 0] }}
                        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    >
                        <span className="badge-dot react-dot"></span> React
                    </motion.div>

                    <motion.div
                        className="floating-badge badge-node"
                        animate={{ y: [0, 14, 0] }}
                        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                    >
                        <span className="badge-dot node-dot"></span> Node.js
                    </motion.div>

                    <motion.div
                        className="floating-badge badge-ts"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 0.5 }}
                    >
                        <span className="badge-dot ts-dot"></span> TypeScript
                    </motion.div>

                    <motion.div
                        className="floating-badge badge-docker"
                        animate={{ y: [0, 12, 0] }}
                        transition={{ repeat: Infinity, duration: 5.5, ease: "easeInOut", delay: 1.5 }}
                    >
                        <span className="badge-dot docker-dot"></span> Docker
                    </motion.div>
                </motion.div>
            </div>

            <motion.div
                className="scroll-indicator"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
                <a href="#about" aria-label="Scroll down to About section">
                    <span className="scroll-mouse">
                        <span className="scroll-wheel"></span>
                    </span>
                    <ChevronDown size={20} className="scroll-arrow" />
                </a>
            </motion.div>
        </section>
    );
};

export default Hero;
