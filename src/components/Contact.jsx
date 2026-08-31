import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Github, Linkedin, Heart, Send, CheckCircle, Mail, MapPin, Copy, Check } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './Contact.css';

const Contact = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const myEmail = "prabashtharaka87@gmail.com";
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(myEmail);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formState.name || !formState.email || !formState.message) return;

        // Construct direct mailto link to tplstlsml@gmail.com
        const subject = encodeURIComponent(`Portfolio Inquiry from ${formState.name}`);
        const body = encodeURIComponent(
            `Hi Tharaka,\n\nName: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}\n\n---\nSent from your portfolio website.`
        );

        // Open user's email client directly pre-filled
        window.location.href = `mailto:${myEmail}?subject=${subject}&body=${body}`;

        setSubmitted(true);

        // Confetti celebration burst
        confetti({
            particleCount: 90,
            spread: 70,
            origin: { y: 0.7 },
            colors: ['#06b6d4', '#8b5cf6', '#38bdf8', '#22c55e']
        });
    };

    return (
        <footer className="contact-section" id="contact" ref={ref}>
            <div className="container">
                <motion.div
                    className="contact-content glass-panel"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="contact-info-col">
                        <span className="section-tag">&lt;get-in-touch /&gt;</span>
                        <h2>
                            Let's build something <span className="highlight-text">impactful</span> together
                        </h2>
                        <p>
                            I'm always open to discussing new projects, software engineering opportunities, open-source ideas, or tech collaborations.
                        </p>

                        <div className="contact-details">
                            <div className="contact-detail-item email-box">
                                <div className="detail-icon"><Mail size={18} /></div>
                                <a href={`mailto:${myEmail}`} className="email-link">{myEmail}</a>
                                <button
                                    className="copy-btn"
                                    onClick={handleCopyEmail}
                                    title="Copy email to clipboard"
                                    aria-label="Copy email"
                                >
                                    {copied ? <Check size={14} className="copied-icon" /> : <Copy size={14} />}
                                    <span>{copied ? "Copied!" : "Copy"}</span>
                                </button>
                            </div>

                            <div className="contact-detail-item">
                                <div className="detail-icon"><MapPin size={18} /></div>
                                <span>Kelaniya, Sri Lanka</span>
                            </div>
                        </div>

                        <div className="contact-social-pills">
                            <MagneticButton strength={15}>
                                <a
                                    href="https://www.linkedin.com/in/tharaka-prabash-670720287/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-pill linkedin"
                                >
                                    <Linkedin size={18} /> LinkedIn
                                </a>
                            </MagneticButton>

                            <MagneticButton strength={15}>
                                <a
                                    href="https://github.com/thrakaprabash"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="social-pill github"
                                >
                                    <Github size={18} /> GitHub
                                </a>
                            </MagneticButton>

                            <MagneticButton strength={15}>
                                <a
                                    href={`mailto:${myEmail}`}
                                    className="social-pill direct-mail"
                                >
                                    <Mail size={18} /> Direct Email
                                </a>
                            </MagneticButton>
                        </div>
                    </div>

                    {/* Interactive Direct Email Form */}
                    <div className="contact-form-col">
                        {submitted ? (
                            <motion.div
                                className="form-success glass-panel"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                            >
                                <CheckCircle size={48} className="success-icon" />
                                <h3>Email Client Opened!</h3>
                                <p>Your message has been pre-filled to <strong>{myEmail}</strong>. If your email app did not open automatically, click below to send directly.</p>
                                <div className="success-actions">
                                    <a
                                        href={`mailto:${myEmail}`}
                                        className="btn-primary"
                                    >
                                        <Mail size={16} /> Open Mail Client
                                    </a>
                                    <button
                                        className="btn-secondary"
                                        onClick={() => {
                                            setSubmitted(false);
                                            setFormState({ name: '', email: '', message: '' });
                                        }}
                                    >
                                        Write Another Message
                                    </button>
                                </div>
                            </motion.div>
                        ) : (
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-title-row">
                                    <h3 className="form-title">Send a Quick Message</h3>
                                    <span className="destination-tag">To: {myEmail}</span>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="name">Your Name</label>
                                    <input
                                        id="name"
                                        type="text"
                                        placeholder="e.g. Alex Turing"
                                        required
                                        value={formState.name}
                                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Your Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        placeholder="alex@domain.com"
                                        required
                                        value={formState.email}
                                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        placeholder="Let's build a project / collaborate..."
                                        required
                                        value={formState.message}
                                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                    ></textarea>
                                </div>

                                <MagneticButton strength={20} className="w-full">
                                    <button type="submit" className="btn-primary form-submit-btn">
                                        <Send size={16} /> Send to My Email
                                    </button>
                                </MagneticButton>
                            </form>
                        )}
                    </div>
                </motion.div>

                <div className="footer-bottom">
                    <p>
                        Designed & Engineered with <Heart size={15} className="heart-icon" /> by <span className="highlight">Tharaka Prabash Lakpriya</span>
                    </p>
                    <p className="copyright">© {new Date().getFullYear()} All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
};

export default Contact;
