import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

const LoadingScreen = () => {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setLoading(false), 300);
                    return 100;
                }
                return prev + Math.floor(Math.random() * 25) + 10;
            });
        }, 120);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    className="loading-screen"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="loading-content">
                        <motion.div
                            className="loading-logo"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.4 }}
                        >
                            <span className="logo-bracket">&lt;</span>
                            <span className="logo-text">TP</span>
                            <span className="logo-dot">.</span>
                            <span className="logo-bracket">/&gt;</span>
                        </motion.div>

                        <div className="loading-bar-wrap">
                            <motion.div
                                className="loading-bar-fill"
                                style={{ width: `${Math.min(progress, 100)}%` }}
                            />
                        </div>

                        <div className="loading-status">
                            <span className="system-ready">INITIALIZING NEURAL PORTFOLIO...</span>
                            <span className="percent-text">{Math.min(progress, 100)}%</span>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default LoadingScreen;
