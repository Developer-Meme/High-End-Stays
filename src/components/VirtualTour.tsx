import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface VirtualTourProps {
  theme?: 'default' | 'luxury-dark';
  isFeatured?: boolean;
}

const panoramaImages = {
  bedroom: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=4096&q=95',
  kitchen: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=4096&q=95',
  balcony: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=4096&q=95',
  living: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=4096&q=95',
};

type ViewType = keyof typeof panoramaImages;

export function VirtualTour({ theme = 'default', isFeatured = false }: VirtualTourProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sphereRef = useRef<THREE.Mesh | null>(null);
  const frameIdRef = useRef<number>(0);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('bedroom');
  const [isLoading, setIsLoading] = useState(true);

  const isDragging = useRef(false);
  const previousTouch = useRef({ x: 0, y: 0 });
  const lon = useRef(0);
  const lat = useRef(0);
  const autoRotate = useRef(true);
  const autoRotateTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Narrower FOV = clearer, less distorted view
    const camera = new THREE.PerspectiveCamera(85, width / height, 0.1, 1000);
    camera.position.set(0, 0, 0.1);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const geometry = new THREE.SphereGeometry(500, 64, 48);
    geometry.scale(-1, 1, 1);

    const textureLoader = new THREE.TextureLoader();
    setIsLoading(true);

    const loadTexture = (url: string) => {
      textureLoader.load(
        url,
        (texture) => {
          texture.mapping = THREE.EquirectangularReflectionMapping;
          texture.minFilter = THREE.LinearFilter;
          texture.magFilter = THREE.LinearFilter;
          texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
          const material = new THREE.MeshBasicMaterial({ map: texture });
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
          const cvs = document.createElement('canvas');
          cvs.width = 2048; cvs.height = 1024;
          const ctx = cvs.getContext('2d')!;
          const grad = ctx.createLinearGradient(0, 0, 0, cvs.height);
          if (theme === 'luxury-dark') {
            grad.addColorStop(0, '#1a1a2e'); grad.addColorStop(1, '#0f0f1a');
          } else {
            grad.addColorStop(0, '#f0ece6'); grad.addColorStop(1, '#d4cfc7');
          }
          ctx.fillStyle = grad;
          ctx.fillRect(0, 0, cvs.width, cvs.height);
          const fallback = new THREE.CanvasTexture(cvs);
          const mat = new THREE.MeshBasicMaterial({ map: fallback });
          const sph = new THREE.Mesh(geometry, mat);
          scene.add(sph);
          sphereRef.current = sph;
          setIsLoading(false);
        }
      );
    };

    loadTexture(panoramaImages[currentView]);

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      // Slow, gentle drift — clamp to 180° front hemisphere
      if (autoRotate.current) lon.current += 0.018;
      lon.current = Math.max(-88, Math.min(88, lon.current));
      lat.current = Math.max(-25, Math.min(25, lat.current));
      const phi = THREE.MathUtils.degToRad(90 - lat.current);
      const theta = THREE.MathUtils.degToRad(lon.current);
      camera.lookAt(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
      );
      renderer.render(scene, camera);
    };
    animate();

    const cvs = renderer.domElement;
    cvs.style.touchAction = 'none';

    // Touch handlers — responsive for fingers
    const onTouchStart = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 1) {
        isDragging.current = true;
        autoRotate.current = false;
        previousTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        if (autoRotateTimeout.current) clearTimeout(autoRotateTimeout.current);
      }
    };
    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!isDragging.current || e.touches.length !== 1) return;
      const dx = e.touches[0].clientX - previousTouch.current.x;
      const dy = e.touches[0].clientY - previousTouch.current.y;
      lon.current -= dx * 0.28;
      lat.current += dy * 0.15;
      previousTouch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging.current = false;
      autoRotateTimeout.current = setTimeout(() => { autoRotate.current = true; }, 2500);
    };

    // Mouse/pointer handlers
    const onPointerDown = (e: PointerEvent) => {
      isDragging.current = true;
      autoRotate.current = false;
      previousTouch.current = { x: e.clientX, y: e.clientY };
      if (autoRotateTimeout.current) clearTimeout(autoRotateTimeout.current);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging.current) return;
      const dx = e.clientX - previousTouch.current.x;
      const dy = e.clientY - previousTouch.current.y;
      lon.current -= dx * 0.22;
      lat.current += dy * 0.15;
      previousTouch.current = { x: e.clientX, y: e.clientY };
    };
    const onPointerUp = () => {
      isDragging.current = false;
      autoRotateTimeout.current = setTimeout(() => { autoRotate.current = true; }, 2500);
    };

    cvs.addEventListener('touchstart', onTouchStart, { passive: false });
    cvs.addEventListener('touchmove', onTouchMove, { passive: false });
    cvs.addEventListener('touchend', onTouchEnd);
    cvs.addEventListener('pointerdown', onPointerDown);
    cvs.addEventListener('pointermove', onPointerMove);
    cvs.addEventListener('pointerup', onPointerUp);
    cvs.addEventListener('pointerleave', onPointerUp);

    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameIdRef.current);
      cvs.removeEventListener('touchstart', onTouchStart);
      cvs.removeEventListener('touchmove', onTouchMove);
      cvs.removeEventListener('touchend', onTouchEnd);
      cvs.removeEventListener('pointerdown', onPointerDown);
      cvs.removeEventListener('pointermove', onPointerMove);
      cvs.removeEventListener('pointerup', onPointerUp);
      cvs.removeEventListener('pointerleave', onPointerUp);
      window.removeEventListener('resize', handleResize);
      if (autoRotateTimeout.current) clearTimeout(autoRotateTimeout.current);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [theme, currentView]);

  const changeView = (view: ViewType) => {
    if (view === currentView) return;
    lon.current = 0;
    lat.current = 0;
    autoRotate.current = true;
    setCurrentView(view);
    setIsLoading(true);
  };

  return (
    <div className="relative w-full h-full">
      <div ref={containerRef} className="w-full h-full" />

      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-900/80 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="w-7 h-7 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-[11px] text-neutral-400 tracking-wide">Loading view…</span>
          </div>
        </div>
      )}

      {/* Room selector — bottom pill bar */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 bg-black/65 backdrop-blur-sm rounded-full px-2 py-1.5">
        {(Object.keys(panoramaImages) as ViewType[]).map((v) => (
          <button
            key={v}
            onClick={() => changeView(v)}
            className={`px-2.5 py-1 rounded-full text-[10px] font-medium transition-all capitalize ${
              currentView === v ? 'bg-white text-black' : 'text-white/70 hover:text-white hover:bg-white/10'
            }`}
          >
            {v}
          </button>
        ))}
      </div>

      {/* Top-right: 180° badge + FEATURED badge side by side, never overlapping */}
      <div className="absolute top-3 right-3 flex items-center gap-1.5">
        <span className="bg-black/65 backdrop-blur-sm rounded-full px-2.5 py-1 text-[10px] font-bold text-white leading-none tracking-wide">
          180°
        </span>
        {isFeatured && (
          <span
            className="px-2.5 py-1 text-[10px] font-semibold text-white leading-none tracking-wide rounded-sm"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            FEATURED
          </span>
        )}
      </div>
    </div>
  );
}
