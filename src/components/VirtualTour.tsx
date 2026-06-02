import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface VirtualTourProps {
  theme?: 'default' | 'luxury-dark';
  listingId?: string;
}

// Real 360° panoramic images for different room views
const panoramaImages = {
  bedroom: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=2048&q=80',
  kitchen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=2048&q=80',
  balcony: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=2048&q=80',
  living: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2048&q=80'
};

type ViewType = keyof typeof panoramaImages;

export function VirtualTour({ theme = 'default' }: VirtualTourProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const frameIdRef = useRef<number>(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [currentView, setCurrentView] = useState<ViewType>('bedroom');
  const [isLoading, setIsLoading] = useState(true);

  // Interaction state
  const isDragging = useRef(false);
  const previousMouse = useRef({ x: 0, y: 0 });
  const lon = useRef(0);
  const lat = useRef(0);
  const autoRotate = useRef(true);
  const autoRotateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load texture and create scene
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera - inside the sphere looking outward
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0.1);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create sphere geometry for 360° view
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1); // Flip inside-out for interior view

    // Load panorama texture
    const textureLoader = new THREE.TextureLoader();
    setIsLoading(true);

    const loadTexture = (url: string) => {
      textureLoader.load(
        url,
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          const material = new THREE.MeshBasicMaterial({ map: texture });

          // Remove old sphere if exists
          if (sphereRef.current) {
            scene.remove(sphereRef.current);
            sphereRef.current.geometry.dispose();
            (sphereRef.current.material as THREE.MeshBasicMaterial).dispose();
          }

          const sphere = new THREE.Mesh(geometry, material);
          scene.add(sphere);
          sphereRef.current = sphere;
          setIsLoading(false);
        },
        undefined,
        () => {
          // On error, use a fallback gradient
          const canvas = document.createElement('canvas');
          canvas.width = 2048;
          canvas.height = 1024;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            if (theme === 'luxury-dark') {
              gradient.addColorStop(0, '#1a1a2e');
              gradient.addColorStop(0.5, '#16213e');
              gradient.addColorStop(1, '#0f0f1a');
            } else {
              gradient.addColorStop(0, '#f5f5f5');
              gradient.addColorStop(0.5, '#e8e4de');
              gradient.addColorStop(1, '#d4cfc7');
            }
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add some texture
            ctx.fillStyle = theme === 'luxury-dark' ? 'rgba(212, 175, 55, 0.1)' : 'rgba(139, 115, 85, 0.1)';
            for (let i = 0; i < 50; i++) {
              const x = Math.random() * canvas.width;
              const y = Math.random() * canvas.height;
              ctx.beginPath();
              ctx.arc(x, y, Math.random() * 50 + 10, 0, Math.PI * 2);
              ctx.fill();
            }
          }

          const fallbackTexture = new THREE.CanvasTexture(canvas);
          const material = new THREE.MeshBasicMaterial({ map: fallbackTexture });
          const sphere = new THREE.Mesh(geometry, material);
          scene.add(sphere);
          sphereRef.current = sphere;
          setIsLoading(false);
        }
      );
    };

    loadTexture(panoramaImages[currentView]);

    // Animation loop
    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);

      // Auto-rotate when not interacting
      if (autoRotate.current) {
        lon.current += 0.05;
      }

      // Clamp latitude
      lat.current = Math.max(-85, Math.min(85, lat.current));

      // Convert lon/lat to camera target
      const phi = THREE.MathUtils.degToRad(90 - lat.current);
      const theta = THREE.MathUtils.degToRad(lon.current);

      const target = new THREE.Vector3(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
      );

      camera.lookAt(target);
      renderer.render(scene, camera);
    };

    animate();

    // Interaction handlers
    const canvas = renderer.domElement;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      autoRotate.current = false;
      setIsInteracting(true);
      previousMouse.current = { x: e.clientX, y: e.clientY };
      if (autoRotateTimeout.current) clearTimeout(autoRotateTimeout.current);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - previousMouse.current.x;
      const dy = e.clientY - previousMouse.current.y;

      lon.current -= dx * 0.2;
      lat.current += dy * 0.2;

      previousMouse.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerUp = () => {
      isDragging.current = false;
      // Resume auto-rotate after 3 seconds
      autoRotateTimeout.current = setTimeout(() => {
        autoRotate.current = true;
        setIsInteracting(false);
      }, 3000);
    };

    // Touch support
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        autoRotate.current = false;
        setIsInteracting(true);
        previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        if (autoRotateTimeout.current) clearTimeout(autoRotateTimeout.current);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - previousMouse.current.x;
      const dy = e.touches[0].clientY - previousMouse.current.y;

      lon.current -= dx * 0.2;
      lat.current += dy * 0.2;

      previousMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
      autoRotateTimeout.current = setTimeout(() => {
        autoRotate.current = true;
        setIsInteracting(false);
      }, 3000);
    };

    // Device orientation for mobile
    const handleOrientation = (e: DeviceOrientationEvent) => {
      if (e.gamma !== null && e.beta !== null && !isDragging.current) {
        lon.current = e.gamma * 2;
        lat.current = (e.beta - 45) * 0.5;
      }
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointerleave', handlePointerUp);
    canvas.addEventListener('touchstart', handleTouchStart, { passive: true });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    if ('ontouchstart' in window) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    // Resize handler
    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointerleave', handlePointerUp);
      canvas.removeEventListener('touchstart', handleTouchStart);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('deviceorientation', handleOrientation);
      if (autoRotateTimeout.current) clearTimeout(autoRotateTimeout.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [theme, currentView]);

  // Handle view change
  const changeView = (view: ViewType) => {
    if (view === currentView) return;
    setCurrentView(view);
    setIsLoading(true);
  };

  return (
    <div data-ev-id="ev_aaccacf014" className="relative w-full h-full">
			<div data-ev-id="ev_9540be631f" ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

			{/* Loading indicator */}
			{isLoading &&
      <div data-ev-id="ev_b1f857e978" className="absolute inset-0 flex items-center justify-center bg-neutral-100 dark:bg-neutral-900">
					<div data-ev-id="ev_5432841a26" className="flex flex-col items-center gap-3">
						<div data-ev-id="ev_ad07cfd2ac" className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
						<span data-ev-id="ev_74c9eec1fb" className="text-sm text-neutral-500">Loading 360° view...</span>
					</div>
				</div>
      }

			{/* View selector */}
			<div data-ev-id="ev_ac68c77e9e" className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/60 backdrop-blur-sm rounded-full px-3 py-2">
				{(Object.keys(panoramaImages) as ViewType[]).map((v) =>
        <button data-ev-id="ev_d8234bb051"
        key={v}
        onClick={() => changeView(v)}
        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${
        currentView === v ?
        'bg-white text-black' :
        'text-white/70 hover:text-white hover:bg-white/10'}`
        }>

						{v}
					</button>
        )}
			</div>

			{/* Interaction hint */}
			{!isInteracting && !isLoading &&
      <div data-ev-id="ev_7339fa8ce8" className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-2 flex items-center gap-2">
					<svg data-ev-id="ev_bcf7d15877" className="w-4 h-4 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path data-ev-id="ev_80d9679c96" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
					</svg>
					<span data-ev-id="ev_91c9f2199a" className="text-xs text-white/80">Drag to explore 360°</span>
				</div>
      }

			{/* 360 badge */}
			<div data-ev-id="ev_0759f711f3" className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
				<span data-ev-id="ev_050790f208" className="text-xs font-bold text-white">360°</span>
				<span data-ev-id="ev_ab89b1540e" className="text-xs text-white/70">Virtual Tour</span>
			</div>
		</div>);

}