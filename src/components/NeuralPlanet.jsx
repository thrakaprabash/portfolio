import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Hero.css';

const NeuralPlanet = ({ avatarUrl = 'https://github.com/thrakaprabash.png' }) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const avatarRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        let animationFrameId;
        const width = container.clientWidth || 420;
        const height = container.clientHeight || 420;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 4.2;

        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Master Group for rotation
        const planetGroup = new THREE.Group();
        scene.add(planetGroup);

        // 1. Generate Fibonacci Sphere Nodes (Neurons)
        const nodeCount = 135;
        const radius = 1.65;
        const nodePositions = [];
        const nodeColors = [];
        const pointsArray = [];

        const colorA = new THREE.Color('#06b6d4'); // Cyan
        const colorB = new THREE.Color('#8b5cf6'); // Purple
        const colorC = new THREE.Color('#38bdf8'); // Sky Blue
        const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

        for (let i = 0; i < nodeCount; i++) {
            const y = 1 - (i / (nodeCount - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phi * i;

            const jitter = (Math.random() - 0.5) * 0.08;
            const r = radius + jitter;

            const x = Math.cos(theta) * radiusAtY * r;
            const z = Math.sin(theta) * radiusAtY * r;
            const posY = y * r;

            const v = new THREE.Vector3(x, posY, z);
            pointsArray.push(v);
            nodePositions.push(x, posY, z);

            const mix = Math.random();
            const col = mix < 0.5 ? colorA.clone().lerp(colorB, mix * 2) : colorB.clone().lerp(colorC, (mix - 0.5) * 2);
            nodeColors.push(col.r, col.g, col.b);
        }

        // Particle Texture
        const particleCanvas = document.createElement('canvas');
        particleCanvas.width = 64;
        particleCanvas.height = 64;
        const pCtx = particleCanvas.getContext('2d');
        const gradient = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.25, 'rgba(6, 182, 212, 0.9)');
        gradient.addColorStop(0.65, 'rgba(139, 92, 246, 0.3)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        pCtx.fillStyle = gradient;
        pCtx.fillRect(0, 0, 64, 64);
        const particleTexture = new THREE.CanvasTexture(particleCanvas);

        const nodesGeometry = new THREE.BufferGeometry();
        nodesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
        nodesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(nodeColors, 3));

        const nodesMaterial = new THREE.PointsMaterial({
            size: 0.13,
            map: particleTexture,
            vertexColors: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const neuronPoints = new THREE.Points(nodesGeometry, nodesMaterial);
        planetGroup.add(neuronPoints);

        // 2. Synapse Lines
        const linePositions = [];
        const lineColors = [];
        const maxDist = 0.72;

        for (let i = 0; i < pointsArray.length; i++) {
            let connections = 0;
            for (let j = i + 1; j < pointsArray.length; j++) {
                const dist = pointsArray[i].distanceTo(pointsArray[j]);
                if (dist < maxDist && connections < 4) {
                    linePositions.push(
                        pointsArray[i].x, pointsArray[i].y, pointsArray[i].z,
                        pointsArray[j].x, pointsArray[j].y, pointsArray[j].z
                    );

                    const alpha = 1 - dist / maxDist;
                    const c1 = colorA.clone().lerp(colorB, Math.random());
                    const c2 = colorB.clone().lerp(colorA, Math.random());

                    lineColors.push(c1.r * alpha, c1.g * alpha, c1.b * alpha);
                    lineColors.push(c2.r * alpha, c2.g * alpha, c2.b * alpha);
                    connections++;
                }
            }
        }

        const linesGeometry = new THREE.BufferGeometry();
        linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
        linesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));

        const linesMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: 0.35,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        const synapseLines = new THREE.LineSegments(linesGeometry, linesMaterial);
        planetGroup.add(synapseLines);

        // 3. Orbital Halo Rings
        const ring1Geo = new THREE.TorusGeometry(1.35, 0.012, 16, 64);
        const ring1Mat = new THREE.MeshBasicMaterial({
            color: '#06b6d4',
            transparent: true,
            opacity: 0.45,
            blending: THREE.AdditiveBlending
        });
        const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
        planetGroup.add(ring1);

        const ring2Geo = new THREE.TorusGeometry(1.5, 0.01, 16, 64);
        const ring2Mat = new THREE.MeshBasicMaterial({
            color: '#8b5cf6',
            transparent: true,
            opacity: 0.35,
            blending: THREE.AdditiveBlending
        });
        const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        planetGroup.add(ring2);

        // 4. Outer Cosmic Dust
        const dustPos = [];
        for (let i = 0; i < 60; i++) {
            const r = 2.1 + Math.random() * 0.7;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(Math.random() * 2 - 1);
            dustPos.push(
                r * Math.sin(phi) * Math.cos(theta),
                r * Math.sin(phi) * Math.sin(theta),
                r * Math.cos(phi)
            );
        }
        const dustGeo = new THREE.BufferGeometry();
        dustGeo.setAttribute('position', new THREE.Float32BufferAttribute(dustPos, 3));
        const dustMat = new THREE.PointsMaterial({
            size: 0.04,
            color: '#38bdf8',
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });
        const dust = new THREE.Points(dustGeo, dustMat);
        planetGroup.add(dust);

        // Interactive Rotation States
        let targetRotY = 0;
        let targetRotX = 0.15;
        let currentRotY = 0;
        let currentRotX = 0.15;
        let isDragging = false;
        let prevMouse = { x: 0, y: 0 };
        let lastInteraction = Date.now();

        const handleWheel = (e) => {
            targetRotY += e.deltaY * 0.002;
            targetRotX += e.deltaY * 0.0006;
            lastInteraction = Date.now();
        };

        const handlePointerDown = (e) => {
            isDragging = true;
            prevMouse = { x: e.clientX, y: e.clientY };
            lastInteraction = Date.now();
        };

        const handlePointerMove = (e) => {
            if (!isDragging) return;
            const dx = e.clientX - prevMouse.x;
            const dy = e.clientY - prevMouse.y;
            targetRotY += dx * 0.007;
            targetRotX += dy * 0.007;
            prevMouse = { x: e.clientX, y: e.clientY };
            lastInteraction = Date.now();
        };

        const handlePointerUp = () => {
            isDragging = false;
            lastInteraction = Date.now();
        };

        const handleResize = () => {
            if (!container) return;
            const w = container.clientWidth || 420;
            const h = container.clientHeight || 420;
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };

        window.addEventListener('wheel', handleWheel, { passive: true });
        window.addEventListener('resize', handleResize);
        container.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);

        // Animation Loop
        let clock = new THREE.Clock();

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            const delta = clock.getDelta();
            const elapsed = clock.getElapsedTime();

            // Auto-spin if idle
            if (!isDragging && Date.now() - lastInteraction > 2000) {
                targetRotY += delta * 0.35;
            }

            // Smooth interpolation
            currentRotY += (targetRotY - currentRotY) * 0.08;
            currentRotX += (targetRotX - currentRotX) * 0.08;

            planetGroup.rotation.y = currentRotY;
            planetGroup.rotation.x = currentRotX;

            // Rotate orbital rings
            ring1.rotation.z = elapsed * 0.5;
            ring1.rotation.x = Math.sin(elapsed * 0.4) * 0.3;
            ring2.rotation.z = -elapsed * 0.35;
            ring2.rotation.y = Math.cos(elapsed * 0.4) * 0.3;

            // Sync HTML center avatar 3D tilt
            if (avatarRef.current) {
                const tiltX = -currentRotX * 20;
                const tiltY = (currentRotY % (Math.PI * 2)) * 25;
                avatarRef.current.style.transform = `translate(-50%, -50%) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            }

            renderer.render(scene, camera);
        };

        animate();

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('wheel', handleWheel);
            window.removeEventListener('resize', handleResize);
            container.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);

            renderer.dispose();
            nodesGeometry.dispose();
            nodesMaterial.dispose();
            linesGeometry.dispose();
            linesMaterial.dispose();
            ring1Geo.dispose();
            ring1Mat.dispose();
            ring2Geo.dispose();
            ring2Mat.dispose();
            dustGeo.dispose();
            dustMat.dispose();
            particleTexture.dispose();
        };
    }, []);

    return (
        <div className="neural-planet-wrapper" ref={containerRef}>
            <canvas ref={canvasRef} className="neural-canvas" />

            {/* Central Glowing Profile Avatar */}
            <div className="neural-center-avatar" ref={avatarRef}>
                <div className="avatar-core-glow"></div>
                <img
                    src={avatarUrl}
                    alt="Tharaka Prabash Lakpriya"
                    className="avatar-core-img"
                    onError={(e) => {
                        e.target.src = 'https://avatars.githubusercontent.com/u/148107771?v=4';
                    }}
                />
                <div className="avatar-scanline"></div>
                <div className="avatar-cyber-border"></div>
            </div>
        </div>
    );
};

export default NeuralPlanet;
