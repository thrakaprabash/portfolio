import React, { useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const MagneticButton = ({ children, className = '', strength = 30, ...props }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { damping: 15, stiffness: 150, mass: 0.1 };
    const springX = useSpring(x, springConfig);
    const springY = useSpring(y, springConfig);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distanceX = (e.clientX - centerX) / (rect.width / 2);
        const distanceY = (e.clientY - centerY) / (rect.height / 2);

        x.set(distanceX * strength);
        y.set(distanceY * strength);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            style={{ x: springX, y: springY, display: 'inline-block' }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className={`magnetic-wrap ${className}`}
            {...props}
        >
            {children}
        </motion.div>
    );
};

export default MagneticButton;
