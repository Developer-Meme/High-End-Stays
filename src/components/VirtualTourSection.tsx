import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import * as THREE from 'three';

const rooms = [
  { id: 'living', name: 'Living Room', description: 'Open-plan living with plush sofa, Smart TV, and natural light.', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=80', thumbnail: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=60' },
  { id: 'bedroom', name: 'Master Bedroom', description: 'King-size bed with premium linens and blackout curtains.', image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1600&q=80', thumbnail: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=200&q=60' },
  { id: 'kitchen', name: 'Modern Kitchen', description: 'Fully equipped kitchen with premium appliances.', image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=80', thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&q=60' },
  { id: 'balcony', name: 'Private Balcony', description: 'Scenic views with comfortable outdoor seating.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80', thumbnail: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=60' },
  { id: 'bathroom', name: 'Luxury Bathroom', description: 'Rain shower and premium toiletries.', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1600&q=80', thumbnail: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=200&q=60' },
];

export function VirtualTourSection() {
  const [currentRoom, setCurrentRoom] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<{ scene: THREE.Scene; camera: THREE.PerspectiveCamera; renderer: THREE.WebGLRenderer; sphere: THREE.Mesh; lon: number; lat: number; } | null>(null);
  const animationRef = useRef<number>(0);
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 1, 1100);
    camera.position.set(0, 0, 0.1);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    const loader = new THREE.TextureLoader();
    const texture = loader.load(rooms[0].image);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    sceneRef.current = { scene, camera, renderer, sphere, lon: 0, lat: 0 };

    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      if (sceneRef.current) {
        if (!isDraggingRef.current) sceneRef.current.lon += 0.05;
        const phi = THREE.MathUtils.degToRad(90 - sceneRef.current.lat);
        const theta = THREE.MathUtils.degToRad(sceneRef.current.lon);
        camera.lookAt(500 * Math.sin(phi) * Math.cos(theta), 500 * Math.cos(phi), 500 * Math.sin(phi) * Math.sin(theta));
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

  useEffect(() => {
    if (!sceneRef.current) return;
    const loader = new THREE.TextureLoader();
    const texture = loader.load(rooms[currentRoom].image);
    const material = sceneRef.current.sphere.material as THREE.MeshBasicMaterial;
    material.map = texture;
    material.needsUpdate = true;
  }, [currentRoom]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    isDraggingRef.current = true;
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !sceneRef.current) return;
    const deltaX = e.clientX - lastMouseRef.current.x;
    const deltaY = e.clientY - lastMouseRef.current.y;
    sceneRef.current.lon -= deltaX * 0.2;
    sceneRef.current.lat = Math.max(-85, Math.min(85, sceneRef.current.lat + deltaY * 0.2));
    lastMouseRef.current = { x: e.clientX, y: e.clientY };
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    isDraggingRef.current = false;
  };

  return (
    <section id="virtual-tour" className="py-20 md:py-28" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Step Inside
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Virtual 3D Tour
          </h2>
          <p className="text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            Drag to look around. Auto-tour resumes when you let go.
          </p>
          <div className="w-12 h-0.5 mx-auto mt-6" style={{ backgroundColor: 'var(--accent)' }} />
        </div>

        <div className="relative rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border-color)' }}>
          <div
            ref={containerRef}
            className={`w-full aspect-[16/9] ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
          />

          <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-xs uppercase tracking-wider" style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#a3a3a3' }}>
            Drag to Explore • Auto-Rotates
          </div>

          <button className="absolute top-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#ffffff' }}>
            <Maximize2 className="w-4 h-4" />
          </button>

          <button onClick={() => setCurrentRoom((prev) => (prev - 1 + rooms.length) % rooms.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#ffffff' }}>
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button onClick={() => setCurrentRoom((prev) => (prev + 1) % rooms.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg flex items-center justify-center transition-colors" style={{ backgroundColor: 'rgba(0,0,0,0.7)', color: '#ffffff' }}>
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4">
            <p className="text-xs uppercase tracking-wider mb-1" style={{ color: '#a3a3a3' }}>
              Room {currentRoom + 1} of {rooms.length}
            </p>
            <h3 className="text-lg md:text-xl font-semibold text-white mb-1">{rooms[currentRoom].name}</h3>
            <p className="text-sm" style={{ color: '#a3a3a3' }}>{rooms[currentRoom].description}</p>
          </div>

          <div className="absolute bottom-4 right-4 flex gap-1.5">
            {rooms.map((_, idx) => (
              <button key={idx} onClick={() => setCurrentRoom(idx)}
                className={`w-2 h-2 rounded-full transition-colors ${idx === currentRoom ? 'bg-white' : 'bg-neutral-600 hover:bg-neutral-500'}`} />
            ))}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-3 mt-6 justify-center overflow-x-auto pb-2">
          {rooms.map((room, idx) => (
            <button key={room.id} onClick={() => setCurrentRoom(idx)}
              className={`flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded overflow-hidden border-2 transition-all ${idx === currentRoom ? 'opacity-100' : 'opacity-60 hover:opacity-100'}`}
              style={{ borderColor: idx === currentRoom ? 'var(--accent)' : 'transparent' }}>
              <img src={room.thumbnail} alt={room.name} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
