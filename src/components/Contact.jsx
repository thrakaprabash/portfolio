import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Github, Linkedin, Heart } from 'lucide-react';
import './Contact.css';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.3 });

    return (
        <footer className="contact-section" id="contact" ref={ref}>
            <div className="container">
                <motion.div
                    className="contact-content glass-panel"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="contact-text">
                        <h2>Let's build something <span>impactful</span> together</h2>
                        <p>
                            I am open to collaborations, open-source contributions, and product-focused work.
                            If you want to connect or build something meaningful, reach out on LinkedIn.
                        </p>

                        <a href="https://www.linkedin.com/in/tharaka-prabash-670720287/" target="_blank" rel="noopener noreferrer" className="btn-primary contact-btn">
                            <Linkedin size={20} /> Connect on LinkedIn
                        </a>
                    </div>

                    <div className="contact-right">
                        <h3>Find me on</h3>
                        <div className="contact-socials">
                            <a href="https://github.com/thrakaprabash" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                                <Github size={22} /> <span>GitHub</span>
                            </a>
                            <a href="https://www.linkedin.com/in/tharaka-prabash-670720287/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                                <Linkedin size={22} /> <span>LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </motion.div>

                <div className="footer-bottom">
                    <p>
                        Built with <Heart size={16} className="heart-icon" /> by <span className="highlight">Tharaka Prabash</span>
                    </p>
                    <p className="copyright">© {new Date().getFullYear()} All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
