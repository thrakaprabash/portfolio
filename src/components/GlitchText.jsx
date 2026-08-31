import React from 'react';
import './GlitchText.css';

const GlitchText = ({ text, className = '' }) => {
    return (
        <span className={`glitch-wrapper ${className}`} data-text={text}>
            <span className="glitch-text">{text}</span>
        </span>
    );
};

export default GlitchText;
