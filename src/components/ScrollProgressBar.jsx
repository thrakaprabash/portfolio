import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgressBar = () => {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            style={{
                scaleX,
                transformOrigin: '0%',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(90deg, #06b6d4, #8b5cf6, #38bdf8)',
                boxShadow: '0 0 10px rgba(6, 182, 212, 0.7), 0 0 5px rgba(139, 92, 246, 0.5)',
                zIndex: 9999,
                pointerEvents: 'none'
            }}
        />
    );
};

export default ScrollProgressBar;
