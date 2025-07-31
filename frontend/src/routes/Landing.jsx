import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import Logo from "../assets/images/Spotify_logo.png";
import { useNavigate } from "react-router-dom";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls, Environment } from "@react-three/drei";
// import LogoModel from "./components/LogoModel";

// import Logo from "../assets/images/logo.glb"

const SpotifyLanding = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [animationPhase, setAnimationPhase] = useState("entering"); // 'entering', 'completed'
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const cookies = document.cookie.includes("token=");
  const navigate = useNavigate();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 50, 200);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mountRef.current.appendChild(renderer.domElement);
    sceneRef.current = scene;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x1db954, 0.4);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x1db954, 2, 100);
    pointLight1.position.set(10, 10, 10);
    pointLight1.castShadow = true;
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xff6b6b, 1.5, 100);
    pointLight2.position.set(-10, -10, 5);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x4ecdc4, 1, 100);
    pointLight3.position.set(0, 15, -10);
    scene.add(pointLight3);

    // Create floating vinyl records
    const vinylGroup = new THREE.Group();
    const vinylGeometry = new THREE.RingGeometry(2, 4, 32);
    const vinylMaterial = new THREE.MeshPhongMaterial({
      color: 0x1a1a1a,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });

    // Create multiple vinyl records with initial off-screen positions
    for (let i = 0; i < 8; i++) {
      const vinyl = new THREE.Mesh(vinylGeometry, vinylMaterial);
      const finalX = Math.random() * 40 - 20;
      const finalY = Math.random() * 20 - 10;
      const finalZ = Math.random() * 30 - 15;

      // Start from far outside the screen
      vinyl.position.set(
        finalX + (Math.random() - 0.5) * 200,
        finalY + (Math.random() - 0.5) * 100,
        finalZ - 100
      );

      vinyl.rotation.x = Math.random() * Math.PI;
      vinyl.rotation.y = Math.random() * Math.PI;
      vinyl.userData = {
        originalY: finalY,
        finalPosition: { x: finalX, y: finalY, z: finalZ },
        rotationSpeed: Math.random() * 0.0008 + 0.0003,
        floatSpeed: Math.random() * 0.0005 + 0.0002,
        driftSpeedX: (Math.random() - 0.5) * 0.002,
        driftSpeedZ: (Math.random() - 0.5) * 0.0015,
        enterDelay: Math.random() * 2000,
        hasEntered: false,
      };
      vinylGroup.add(vinyl);
    }
    scene.add(vinylGroup);

    // Create 3D music notes with initial off-screen positions
    const noteGroup = new THREE.Group();
    const createMusicNote = (finalX, finalY, finalZ) => {
      const noteGeometry = new THREE.SphereGeometry(0.5, 16, 16);
      const noteMaterial = new THREE.MeshPhongMaterial({
        color: 0x1db954,
        transparent: true,
        opacity: 0.7,
      });
      const note = new THREE.Mesh(noteGeometry, noteMaterial);

      // Start from random off-screen position
      note.position.set(
        finalX + (Math.random() - 0.5) * 150,
        finalY + (Math.random() - 0.5) * 80,
        finalZ - 80
      );

      // Add stem
      const stemGeometry = new THREE.CylinderGeometry(0.05, 0.05, 2);
      const stemMaterial = new THREE.MeshPhongMaterial({ color: 0x1db954 });
      const stem = new THREE.Mesh(stemGeometry, stemMaterial);
      stem.position.set(0, 1, 0);
      note.add(stem);

      note.userData = {
        originalY: finalY,
        finalPosition: { x: finalX, y: finalY, z: finalZ },
        floatSpeed: Math.random() * 0.0008 + 0.0003,
        rotationSpeed: Math.random() * 0.0015 + 0.0008,
        driftSpeedX: (Math.random() - 0.5) * 0.003,
        driftSpeedZ: (Math.random() - 0.5) * 0.002,
        enterDelay: Math.random() * 3000,
        hasEntered: false,
      };

      return note;
    };

    // Add music notes with staggered entrance (increased from 12 to 25)
    for (let i = 0; i < 25; i++) {
      const finalX = Math.random() * 80 - 40;
      const finalY = Math.random() * 25 - 12.5;
      const finalZ = Math.random() * 60 - 30;
      const note = createMusicNote(finalX, finalY, finalZ);
      noteGroup.add(note);
    }
    scene.add(noteGroup);

    // Create floating geometric shapes with initial off-screen positions
    const geometryGroup = new THREE.Group();
    const shapes = [
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.SphereGeometry(0.8, 16, 16),
      new THREE.ConeGeometry(0.8, 1.5, 8),
      new THREE.TetrahedronGeometry(1),
    ];

    for (let i = 0; i < 15; i++) {
      const geometry = shapes[Math.floor(Math.random() * shapes.length)];
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(Math.random(), 0.7, 0.6),
        transparent: true,
        opacity: 0.6,
      });
      const shape = new THREE.Mesh(geometry, material);

      const finalX = Math.random() * 80 - 40;
      const finalY = Math.random() * 20 - 10;
      const finalZ = Math.random() * 50 - 25;

      // Start from random off-screen position
      shape.position.set(
        finalX + (Math.random() - 0.5) * 300,
        finalY + (Math.random() - 0.5) * 150,
        finalZ - 150
      );

      shape.userData = {
        finalPosition: { x: finalX, y: finalY, z: finalZ },
        rotationSpeed: Math.random() * 0.003 + 0.0008,
        floatSpeed: Math.random() * 0.0012 + 0.0005,
        enterDelay: Math.random() * 4000,
        hasEntered: false,
      };
      geometryGroup.add(shape);
    }
    scene.add(geometryGroup);

    camera.position.z = 30;
    camera.position.y = 5;

    // Mouse movement effect (disabled)
    const handleMouseMove = (event) => {
      // Mouse tracking disabled - no cursor effects
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    const startTime = Date.now();
    const animate = () => {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      const elapsedTime = Date.now() - startTime;

      // Animate entrance of vinyl records
      vinylGroup.children.forEach((vinyl) => {
        if (
          !vinyl.userData.hasEntered &&
          elapsedTime > vinyl.userData.enterDelay
        ) {
          vinyl.userData.hasEntered = true;
        }

        if (vinyl.userData.hasEntered) {
          // Smooth entrance animation with continuous drifting
          const progress = Math.min(
            (elapsedTime - vinyl.userData.enterDelay) / 2000,
            1
          );
          const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

          vinyl.position.x =
            vinyl.position.x +
            (vinyl.userData.finalPosition.x - vinyl.position.x) * 0.02 +
            vinyl.userData.driftSpeedX;
          vinyl.position.y =
            vinyl.userData.finalPosition.y +
            Math.sin(time * vinyl.userData.floatSpeed) * 0.6;
          vinyl.position.z =
            vinyl.position.z +
            (vinyl.userData.finalPosition.z - vinyl.position.z) * 0.02 +
            vinyl.userData.driftSpeedZ;

          // Wrap around screen boundaries
          if (vinyl.position.x > 30) vinyl.position.x = -30;
          if (vinyl.position.x < -30) vinyl.position.x = 30;
          if (vinyl.position.z > 25) vinyl.position.z = -25;
          if (vinyl.position.z < -25) vinyl.position.z = 25;

          vinyl.rotation.z += vinyl.userData.rotationSpeed;
        }
      });

      // Animate entrance of music notes
      noteGroup.children.forEach((note) => {
        if (
          !note.userData.hasEntered &&
          elapsedTime > note.userData.enterDelay
        ) {
          note.userData.hasEntered = true;
        }

        if (note.userData.hasEntered) {
          // Smooth entrance animation
          const progress = Math.min(
            (elapsedTime - note.userData.enterDelay) / 2500,
            1
          );
          const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

          // Continuous slow drifting movement
          note.position.x =
            note.position.x +
            (note.userData.finalPosition.x - note.position.x) * 0.025 +
            note.userData.driftSpeedX;
          note.position.y =
            note.userData.finalPosition.y +
            Math.sin(time * note.userData.floatSpeed) * 0.8;
          note.position.z =
            note.position.z +
            (note.userData.finalPosition.z - note.position.z) * 0.025 +
            note.userData.driftSpeedZ;

          // Wrap around screen boundaries for continuous movement
          if (note.position.x > 50) note.position.x = -50;
          if (note.position.x < -50) note.position.x = 50;
          if (note.position.z > 40) note.position.z = -40;
          if (note.position.z < -40) note.position.z = 40;

          note.rotation.y += note.userData.rotationSpeed;
          note.rotation.x += note.userData.rotationSpeed * 0.5;
        }
      });

      // Animate entrance of geometric shapes
      geometryGroup.children.forEach((shape) => {
        if (
          !shape.userData.hasEntered &&
          elapsedTime > shape.userData.enterDelay
        ) {
          shape.userData.hasEntered = true;
        }

        if (shape.userData.hasEntered) {
          // Smooth entrance animation
          const progress = Math.min(
            (elapsedTime - shape.userData.enterDelay) / 3000,
            1
          );
          const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease out cubic

          shape.position.x =
            shape.position.x +
            (shape.userData.finalPosition.x - shape.position.x) * 0.015;
          shape.position.y =
            shape.userData.finalPosition.y +
            Math.sin(time * shape.userData.floatSpeed) * 0.008;
          shape.position.z =
            shape.position.z +
            (shape.userData.finalPosition.z - shape.position.z) * 0.015;

          shape.rotation.x += shape.userData.rotationSpeed;
          shape.rotation.y += shape.userData.rotationSpeed * 0.7;
        }
      });

      // Check if entrance animation is complete
      if (elapsedTime > 5000 && animationPhase === "entering") {
        setAnimationPhase("completed");
      }

      // Camera stays in fixed position - no mouse following
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();
    setIsLoaded(true);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [mousePosition]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      {/* 3D Scene */}
      <div ref={mountRef} className="fixed inset-0 z-0" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-br from-black via-gray-900 to-green-900 opacity-60" />

      {/* Content */}
      <div className="relative z-20 flex flex-col min-h-screen">
        {/* Header */}
        <header className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center w-8 h-8 bg-green-500 rounded-full">
              <img src={Logo} alt="Logo" />
            </div>
            <span className="text-xl font-bold text-white">Spotify</span>
          </div>
          <nav className="hidden space-x-8 md:flex">
            <a
              href="#"
              className="text-gray-300 transition-colors hover:text-white"
            >
              Premium
            </a>
            <a
              href="#"
              className="text-gray-300 transition-colors hover:text-white"
            >
              Support
            </a>
            <a
              href="#"
              className="text-gray-300 transition-colors hover:text-white"
            >
              Download
            </a>
          </nav>
          {!cookies ? (
            <div className="flex space-x-4">
              <button
                className="text-gray-300 transition-colors hover:text-white"
                onClick={() => navigate("/login")}
              >
                Log in
              </button>
              <button
                className="px-6 py-2 font-semibold text-black transition-transform bg-white rounded-full hover:scale-105"
                onClick={() => navigate("/login")}
              >
                Sign up
              </button>
            </div>
          ) : (
            <button
              className="px-6 py-2 font-semibold text-black transition-transform bg-white rounded-full hover:scale-105"
              onClick={() => navigate("/home")}
            >
              Get Started
            </button>
          )}
        </header>

        {/* Hero Section */}
        <main className="flex items-center justify-center flex-1 px-6">
          <div className="max-w-4xl text-center">
            <div
              className={`transition-all duration-1000 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
            >
              <h1 className="mb-6 text-5xl font-bold leading-tight text-white md:text-7xl">
                Music for
                <span className="block text-transparent bg-gradient-to-r from-blue-600 via-green-500 to-green-700 bg-clip-text">
                  everyone
                </span>
              </h1>
              <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-300 md:text-2xl">
                Millions of songs. No credit card needed. Experience the magic
                of music in 3D.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  className="px-8 py-4 text-lg font-bold text-black transition-all duration-300 bg-green-500 rounded-full hover:bg-green-400 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/50"
                  onClick={() => navigate("/home")}
                >
                  Get Started
                </button>
                <button className="px-8 py-4 text-lg font-bold text-white transition-all duration-300 border-2 border-white rounded-full hover:bg-white hover:text-black hover:scale-105">
                  View Premium Plans
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* Features Section */}
        <section className="px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-8 md:grid-cols-3">
              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 rounded-full bg-gradient-to-br from-green-400 to-green-600 group-hover:scale-110">
                  <span className="text-2xl">🎵</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  50+ million songs
                </h3>
                <p className="text-gray-400">
                  Stream your favorites and discover new music
                </p>
              </div>

              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 group-hover:scale-110">
                  <span className="text-2xl">📱</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  Any device
                </h3>
                <p className="text-gray-400">
                  Phone, computer, tablet, speaker, TV, and more
                </p>
              </div>

              <div className="text-center group">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 transition-transform duration-300 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 group-hover:scale-110">
                  <span className="text-2xl">🚫</span>
                </div>
                <h3 className="mb-2 text-xl font-bold text-white">
                  Ad-free music
                </h3>
                <p className="text-gray-400">
                  Enjoy uninterrupted music with Premium
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="px-6 py-8 border-t border-gray-800">
          <div className="flex flex-col items-center justify-between max-w-6xl mx-auto md:flex-row">
            <div className="flex items-center mb-4 space-x-2 md:mb-0">
              <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full">
                <span className="text-xs font-bold text-black">♪</span>
              </div>
              <span className="font-bold text-white">Spotify</span>
            </div>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="transition-colors hover:text-white">
                Legal
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Privacy Center
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Cookies
              </a>
            </div>
          </div>
        </footer>
      </div>

      {/* Loading indicator */}
      {!isLoaded && (
        <div className="absolute inset-0 z-30 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 border-4 border-green-500 rounded-full border-t-transparent animate-spin"></div>
            <p className="text-lg text-white">Loading ...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpotifyLanding;
