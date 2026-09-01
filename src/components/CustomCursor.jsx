import React, { useState, useEffect } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const mouseX = useMotionValue(-100);
    const mouseY = useMotionValue(-100);

    const springConfigFast = { damping: 25, stiffness: 400 };
    const springConfigSlow = { damping: 20, stiffness: 200 };

    const dotX = useSpring(mouseX, springConfigFast);
    const dotY = useSpring(mouseY, springConfigFast);

    const ringX = useSpring(mouseX, springConfigSlow);
    const ringY = useSpring(mouseY, springConfigSlow);

    useEffect(() => {
        if (
            typeof window === 'undefined' ||
            window.innerWidth <= 768 ||
            window.matchMedia('(hover: none)').matches ||
            'ontouchstart' in window
        ) {
            return;
        }

        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseOver = (e) => {
            if (
                e.target.tagName === 'A' ||
                e.target.tagName === 'BUTTON' ||
                e.target.closest('a') ||
                e.target.closest('button') ||
                e.target.closest('.project-card') ||
                e.target.closest('.skill-category') ||
                e.target.closest('.about-card')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const handleMouseLeave = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseleave', handleMouseLeave);

        document.body.style.cursor = 'none';

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseover', handleMouseOver);
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.body.style.cursor = 'auto';
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <>
            {/* Center dot */}
            <motion.div
                className="cursor-dot"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 0 : 1,
                }}
            />

            {/* Glowing outer aura ring */}
            <motion.div
                className="cursor-outline"
                style={{
                    x: ringX,
                    y: ringY,
                    translateX: '-50%',
                    translateY: '-50%',
                }}
                animate={{
                    scale: isHovering ? 1.6 : 1,
                    borderColor: isHovering ? 'rgba(6, 182, 212, 0.9)' : 'rgba(139, 92, 246, 0.6)',
                    backgroundColor: isHovering ? 'rgba(6, 182, 212, 0.12)' : 'rgba(139, 92, 246, 0.03)',
                    boxShadow: isHovering ? '0 0 15px rgba(6, 182, 212, 0.4)' : '0 0 5px rgba(139, 92, 246, 0.2)'
                }}
            />
        </>
    );
};

export default CustomCursor;
