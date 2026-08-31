import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, FileDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import './Navbar.css';

const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [mobileOpen, setMobileOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = ['home', 'about', 'experience', 'skills', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const top = el.offsetTop;
                    const height = el.offsetHeight;
                    if (scrollPosition >= top && scrollPosition < top + height) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`navbar-header ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-container glass-panel">
                <a href="#home" className="navbar-logo">
                    <span className="logo-bracket">&lt;</span>
                    <span className="logo-text">TP</span>
                    <span className="logo-dot">.</span>
                    <span className="logo-bracket">/&gt;</span>
                </a>

                {/* Desktop Menu */}
                <nav className="desktop-nav">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.href.substring(1);
                        return (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`nav-link ${isActive ? 'active' : ''}`}
                            >
                                {item.name}
                                {isActive && (
                                    <motion.div
                                        layoutId="activePill"
                                        className="active-pill"
                                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                    />
                                )}
                            </a>
                        );
                    })}
                </nav>

                <div className="nav-right">
                    <a
                        href="/Tharaka_Prabash_Lakpriya_CV.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        download="Tharaka_Prabash_Lakpriya_CV.pdf"
                        className="navbar-cv-btn"
                        title="Download CV"
                    >
                        <FileDown size={14} />
                        <span>CV</span>
                    </a>

                    <ThemeToggle />

                    <a
                        href="https://github.com/thrakaprabash"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="status-badge"
                    >
                        <span className="status-dot"></span>
                        <span className="status-text">Available</span>
                    </a>

                    <button
                        className="mobile-toggle"
                        onClick={() => setMobileOpen(!mobileOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        className="mobile-drawer glass-panel"
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={`mobile-nav-link ${activeSection === item.href.substring(1) ? 'active' : ''}`}
                                onClick={() => setMobileOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        <a
                            href="/Tharaka_Prabash_Lakpriya_CV.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            download="Tharaka_Prabash_Lakpriya_CV.pdf"
                            className="mobile-nav-link mobile-cv-link"
                            onClick={() => setMobileOpen(false)}
                        >
                            <FileDown size={16} /> Download CV (PDF)
                        </a>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
};

export default Navbar;
