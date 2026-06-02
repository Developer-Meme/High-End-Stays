import { useEffect, useState } from 'react';
import { useTheme } from '@/providers';

export function MouseFollower() {
  const { isDark } = useTheme();
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || window.innerWidth < 1024) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      const target = e.target as HTMLElement;
      const computedStyle = window.getComputedStyle(target);
      setIsPointer(
        computedStyle.cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') !== null ||
        target.closest('button') !== null
      );
    };
    const handleMouseLeave = () => setIsVisible(false);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference hidden lg:block"
        style={{ left: position.x, top: position.y, transform: 'translate(-50%, -50%)' }}
      >
        <div
          className={`rounded-full bg-white transition-all duration-200 ease-out ${
            isPointer ? 'w-10 h-10 opacity-50' : 'w-3 h-3 opacity-100'
          }`}
        />
      </div>

      <div
        className="fixed pointer-events-none z-[9998] hidden lg:block transition-opacity duration-500"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          background: isDark
            ? 'radial-gradient(circle, rgba(139, 115, 85, 0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(139, 115, 85, 0.05) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
    </>
  );
}
