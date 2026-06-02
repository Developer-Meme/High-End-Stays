import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';

const rooms = [
  {
    id: 'living',
    name: 'Living Room',
    description: 'Open-plan living with plush sofa, Smart TV, and natural light.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=4096&q=95',
    thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&q=80',
  },
  {
    id: 'bedroom',
    name: 'Master Bedroom',
    description: 'King-size bed with premium linens and blackout curtains.',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=4096&q=95',
    thumbnail: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=300&q=80',
  },
  {
    id: 'kitchen',
    name: 'Modern Kitchen',
    description: 'Fully equipped kitchen with premium appliances and granite counters.',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=4096&q=95',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&q=80',
  },
  {
    id: 'balcony',
    name: 'Private Balcony',
    description: 'Scenic views with comfortable outdoor seating and fresh air.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=4096&q=95',
    thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&q=80',
  },
  {
    id: 'bathroom',
    name: 'Luxury Bathroom',
    description: 'Rain shower, deep soaking tub, and premium toiletries.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=4096&q=95',
    thumbnail: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=300&q=80',
  },
];

export function VirtualTourSection() {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    sphere: THREE.Mesh;
    lon: number;
    lat: number;
  } | null>(null);
  const animationRef = useRef<number>(0);
  const lastPosRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    // Tighter FOV for sharper, less distorted view
    const camera = new THREE.PerspectiveCamera(80, width / height, 1, 1100);
    camera.position.set(0, 0, 0.1);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    // Full device pixel ratio for crisp retina display on mobile
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(500, 64, 48);
    geometry.scale(-1, 1, 1);

    const loader = new THREE.TextureLoader();
    const texture = loader.load(rooms[0].image);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    sceneRef.current = { scene, camera, renderer, sphere, lon: 0, lat: 0 };

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      if (sceneRef.current) {
        // Slow, smooth auto-rotation
        if (!isDraggingRef.current) sceneRef.current.lon += 0.025;
        sceneRef.current.lat = Math.max(-85, Math.min(85, sceneRef.current.lat));
        const phi = THREE.MathUtils.degToRad(90 - sceneRef.current.lat);
        const theta = THREE.MathUtils.degToRad(sceneRef.current.lon);
        camera.lookAt(
          500 * Math.sin(phi) * Math.cos(theta),
          500 * Math.cos(phi),
          500 * Math.sin(phi) * Math.sin(theta)
        );
        renderer.render(scene, camera);
      }
    };
    animate();

    const handleResize = () => {
      if (!containerRef.current || !sceneRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      sceneRef.current.camera.aspect = w / h;
      sceneRef.current.camera.updateProjectionMatrix();
      sceneRef.current.renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  // Update texture when room changes
  useEffect(() => {
    if (!sceneRef.current) return;
    const loader = new THREE.TextureLoader();
    const texture = loader.load(rooms[currentRoom].image);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    const material = sceneRef.current.sphere.material as THREE.MeshBasicMaterial;
    material.map = texture;
    material.needsUpdate = true;
    // Reset view angle on room switch
    sceneRef.current.lon = 0;
    sceneRef.current.lat = 0;
  }, [currentRoom]);

  // --- Pointer/mouse drag ---
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    lastPosRef.current = { x: e.clientX, y: e.clientY };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !sceneRef.current) return;
    const dx = e.clientX - lastPosRef.current.x;
    const dy = e.clientY - lastPosRef.current.y;
    sceneRef.current.lon -= dx * 0.22;
    sceneRef.current.lat = Math.max(-85, Math.min(85, sceneRef.current.lat + dy * 0.18));
    lastPosRef.current = { x: e.clientX, y: e.clientY };
  };
  const handlePointerUp = () => { isDraggingRef.current = false; };

  // --- Touch drag (for mobile/tablet) ---
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      isDraggingRef.current = true;
      lastPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    }
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current || !sceneRef.current || e.touches.length !== 1) return;
    const dx = e.touches[0].clientX - lastPosRef.current.x;
    const dy = e.touches[0].clientY - lastPosRef.current.y;
    sceneRef.current.lon -= dx * 0.28;
    sceneRef.current.lat = Math.max(-85, Math.min(85, sceneRef.current.lat + dy * 0.18));
    lastPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const handleTouchEnd = () => { isDraggingRef.current = false; };

  // --- Fullscreen ---
  const toggleFullscreen = () => {
    if (!wrapperRef.current) return;
    if (!document.fullscreenElement) {
      wrapperRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(() => {
        // Fallback: CSS fullscreen overlay
        setIsFullscreen(true);
      });
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false));
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      if (!document.fullscreenElement) setIsFullscreen(false);
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const room = rooms[currentRoom];

  return (
    <section id="virtual-tour" className="py-20 md:py-28" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Step Inside
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Virtual 3D Tour
          </h2>
          <p className="text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            Swipe to look around. Auto-tour resumes when you let go.
          </p>
          <div className="w-12 h-0.5 mx-auto mt-6" style={{ backgroundColor: 'var(--accent)' }} />
        </div>

        {/* Viewer + info */}
        <div
          ref={wrapperRef}
          className={`relative rounded-xl overflow-hidden border ${isFullscreen ? 'fixed inset-0 z-50 rounded-none border-0' : ''}`}
          style={{ borderColor: 'var(--border-color)', backgroundColor: '#000' }}
        >
          {/* Three.js canvas */}
          <div
            ref={containerRef}
            className="w-full aspect-[16/9] touch-none select-none"
            style={isFullscreen ? { width: '100%', height: '100%', aspectRatio: 'unset' } : {}}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />

          {/* Expand button — top right, works on mobile + tablet */}
          <button
            onClick={toggleFullscreen}
            aria-label="Toggle fullscreen"
            className="absolute top-3 right-3 w-9 h-9 rounded-lg flex items-center justify-center transition-opacity hover:opacity-100 opacity-80 active:scale-95"
            style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#fff' }}
          >
            {isFullscreen ? (
              // Compress icon
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9L4 4m0 0h5m-5 0v5M15 9l5-5m0 0h-5m5 0v5M9 15l-5 5m0 0h5m-5 0v-5M15 15l5 5m0 0h-5m5 0v-5" />
              </svg>
            ) : (
              // Expand icon
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5M20 8V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5M20 16v4m0 0h-4m4 0l-5-5" />
              </svg>
            )}
          </button>

          {/* Room info — bottom left, outside the image area, doesn't overlap view */}
          <div
            className="absolute bottom-0 left-0 right-0 px-4 py-3 md:px-5 md:py-4"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.55) 60%, transparent 100%)' }}
          >
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] uppercase tracking-widest mb-0.5 font-medium" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  Room {currentRoom + 1} of {rooms.length}
                </p>
                <h3 className="text-base md:text-lg font-semibold text-white leading-tight mb-1">
                  {room.name}
                </h3>
                <p className="text-xs md:text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.75)' }}>
                  {room.description}
                </p>
              </div>
              {/* Dot indicators — right side of info bar */}
              <div className="flex gap-1.5 flex-shrink-0 pb-0.5">
                {rooms.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentRoom(idx)}
                    aria-label={`Go to room ${idx + 1}`}
                    className={`rounded-full transition-all ${
                      idx === currentRoom ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-2.5 mt-5 overflow-x-auto pb-1 snap-x snap-mandatory scrollbar-hide">
          {rooms.map((room, idx) => (
            <button
              key={room.id}
              onClick={() => setCurrentRoom(idx)}
              className={`flex-shrink-0 snap-start rounded-lg overflow-hidden transition-all duration-200 ${
                idx === currentRoom ? 'ring-2 opacity-100 scale-[1.03]' : 'opacity-55 hover:opacity-90'
              }`}
              style={{
                width: '80px',
                height: '56px',
                ['--tw-ring-color' as string]: 'var(--accent)',
                ringColor: 'var(--accent)',
                ...(idx === currentRoom ? { outline: '2px solid var(--accent)', outlineOffset: '2px' } : {}),
              }}
            >
              <img
                src={room.thumbnail}
                alt={room.name}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
