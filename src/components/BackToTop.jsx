import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import MagneticButton from './MagneticButton';
import './BackToTop.css';

const BackToTop = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisible = () => {
            const scrolled = document.documentElement.scrollTop || window.scrollY;
            setVisible(scrolled > 400);
        };

        window.addEventListener('scroll', toggleVisible);
        return () => window.removeEventListener('scroll', toggleVisible);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    className="back-to-top-wrapper"
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    transition={{ duration: 0.2 }}
                >
                    <MagneticButton strength={20}>
                        <button
                            className="back-to-top-btn"
                            onClick={scrollToTop}
                            aria-label="Scroll back to top"
                            title="Back to Top"
                        >
                            <ArrowUp size={20} />
                        </button>
                    </MagneticButton>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
