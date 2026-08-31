import React, { useEffect, useRef } from 'react';

const NoiseOverlay = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId;
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);

        const createNoise = () => {
            const idata = ctx.createImageData(w, h);
            const buffer32 = new Uint32Array(idata.data.buffer);
            const len = buffer32.length;

            for (let i = 0; i < len; i++) {
                if (Math.random() < 0.08) {
                    // Random subtle grain
                    buffer32[i] = (Math.floor(Math.random() * 255) << 24) | 0x00ffffff;
                }
            }

            ctx.putImageData(idata, 0, 0);
            animationFrameId = requestAnimationFrame(createNoise);
        };

        createNoise();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 9998,
                opacity: 0.035,
                mixBlendMode: 'overlay'
            }}
        />
    );
};

export default NoiseOverlay;
