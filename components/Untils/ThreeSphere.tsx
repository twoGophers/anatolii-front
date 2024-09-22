import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';

const ThreeParticleSphere = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sphereSize = 0.03; // Smaller sphere size

  useEffect(() => {
    // Scene, Camera, Renderer setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    const mount = mountRef.current;
    if (mount) {
      mount.appendChild(renderer.domElement);
    }

    // Create Particle Sphere Geometry
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      const x = sphereSize * Math.sin(phi) * Math.cos(theta);
      const y = sphereSize * Math.sin(phi) * Math.sin(theta);
      const z = sphereSize * Math.cos(phi);

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      colors[i * 3] = Math.random();
      colors[i * 3 + 1] = Math.random();
      colors[i * 3 + 2] = Math.random();
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Set size for particles
    const material = new THREE.PointsMaterial({
      size: 0.0001,
      vertexColors: true,
      transparent: true,
      opacity: 0.1,
      depthWrite: false,
    });

    const particleSphere = new THREE.Points(particlesGeometry, material);
    scene.add(particleSphere);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(10, 10, 10);
    scene.add(pointLight);

    camera.position.z = 2; // Adjusted camera position

    // Move sphere 10 pixels right and 10 pixels down
    particleSphere.position.set(0.1, -0.1, 0); // Установка позиции сферы

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      particleSphere.rotation.x += 0.005; // Slower rotation
      particleSphere.rotation.y += 0.005;

      const colorArray = particlesGeometry.attributes.color.array;
      for (let i = 0; i < colorArray.length; i += 3) {
        colorArray[i] = Math.random();
        colorArray[i + 1] = Math.random();
        colorArray[i + 2] = Math.random();
      }
      particlesGeometry.attributes.color.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    // Handle mouse movement to follow cursor
    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
      vector.unproject(camera);

      const distanceFromCamera = 2; // Fixed distance to sphere
      const dir = vector.sub(camera.position).normalize();
      particleSphere.position.copy(camera.position).add(dir.multiplyScalar(distanceFromCamera));
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle click to grow the sphere
    const handleClick = () => {
      gsap.to(particleSphere.scale, { duration: 0.5, x: 1.25, y: 1.25, z: 1.25, ease: "power2.out", onComplete: () => {
        gsap.to(particleSphere.scale, { duration: 0.5, x: 1, y: 1, z: 1, ease: "power2.out" });
      }});
    };

    // Add click event listener
    if (mount) {
      mount.addEventListener('click', handleClick);
    }

    // Clean up when component unmounts
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (mount) {
        mount.removeEventListener('click', handleClick);
        mount.removeChild(renderer.domElement);
      }
    };
  }, [sphereSize]);

  return <div ref={mountRef} className="fixed top-0 left-0 pointer-events-none" />;
};

export default ThreeParticleSphere;
