import { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon, Crown } from 'lucide-react';
import { useTheme } from '@/providers';
import logoImage from '@/assets/uploads/logo-clean.png';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Explore', href: '#explore' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Properties', href: '#listings-display' },
  { label: 'Virtual Tour', href: '#virtual-tour' },
  { label: 'Team', href: '#team' },
  { label: 'FAQs', href: '#faqs' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/254705688344', '_blank');
    setIsMobileMenuOpen(false);
  };

  const cycleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('royal');
    else setTheme('dark');
  };

  const ThemeIcon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Crown;

  const logoFilter = theme === 'light' ? 'brightness-0' : 'brightness-0 invert';

  return (
    <nav
      className="sticky top-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: isScrolled ? 'var(--navbar-bg)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid var(--border-subtle)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-3">
            <img src={logoImage} alt="High End Stays" className={`h-10 md:h-12 w-auto ${logoFilter}`} />
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-medium tracking-wide uppercase transition-colors duration-300 hover:opacity-100"
                style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: Theme switcher + Book Now */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Theme toggle */}
            <button
              onClick={cycleTheme}
              title={`Switch to ${theme === 'dark' ? 'Light' : theme === 'light' ? 'Royal' : 'Dark'} theme`}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 border"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                borderColor: 'var(--border-color)',
                color: theme === 'royal' ? 'var(--accent)' : 'var(--text-secondary)',
              }}
            >
              <ThemeIcon className="w-4 h-4" />
            </button>

            {/* Book Now - Desktop */}
            <button
              onClick={openWhatsApp}
              className="hidden md:block px-5 py-2.5 text-white text-xs font-semibold tracking-wider uppercase transition-colors"
              style={{ backgroundColor: 'var(--accent)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
            >
              Book Now
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div
          className="px-4 py-6 border-t"
          style={{ backgroundColor: 'var(--navbar-bg)', borderColor: 'var(--border-subtle)' }}
        >
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-base font-medium tracking-wide uppercase py-2 transition-colors duration-300"
                style={{ color: 'var(--text-secondary)' }}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={openWhatsApp}
              className="mt-2 px-5 py-3 text-white text-sm font-semibold tracking-wider uppercase transition-colors text-center"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
