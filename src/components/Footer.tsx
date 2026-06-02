import { Phone, Mail, MessageCircle } from 'lucide-react';
import logoImage from '@/assets/uploads/logo-clean.png';
import { useTheme } from '@/providers';

export function Footer() {
  const { theme } = useTheme();
  const logoFilter = theme === 'light' ? 'brightness-0' : 'brightness-0 invert';

  return (
    <footer className="py-12 md:py-16 border-t" style={{ backgroundColor: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <img src={logoImage} alt="High End Stays logo" className={`h-16 md:h-20 w-auto mb-4 md:mb-6 opacity-90 ${logoFilter}`} />
            <p className="max-w-md leading-relaxed mb-4 md:mb-6 text-sm md:text-base" style={{ color: 'var(--text-secondary)' }}>
              Experience premium BnB living in Kenya's finest stays. Sleek, modern, and fully equipped
              spaces designed for discerning travelers seeking luxury and comfort.
            </p>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/highendstays"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
                aria-label="Instagram"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: 'var(--text-secondary)' }}>
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Contact Victor */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4" style={{ color: 'var(--text-primary)' }}>Victor Meme</h4>
            <p className="text-sm mb-3 md:mb-4" style={{ color: 'var(--accent)' }}>Guest Experience Lead</p>
            <div className="flex flex-col gap-2 md:gap-3">
              <a href="tel:+254705688344" className="flex items-center gap-2 text-sm transition-colors" style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                <Phone className="w-4 h-4" />
                <span>+254 705 688 344</span>
              </a>
              <a href="https://wa.me/254705688344" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors" style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#25D366')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Contact William */}
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-3 md:mb-4" style={{ color: 'var(--text-primary)' }}>William Kinyeru</h4>
            <p className="text-sm mb-3 md:mb-4" style={{ color: 'var(--accent)' }}>Operations & Growth Lead</p>
            <div className="flex flex-col gap-2 md:gap-3">
              <a href="tel:+254792003602" className="flex items-center gap-2 text-sm transition-colors" style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                <Phone className="w-4 h-4" />
                <span>+254 792 003 602</span>
              </a>
              <a href="https://wa.me/254792003602" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm transition-colors" style={{ color: 'var(--text-secondary)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#25D366')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center justify-center py-6 md:py-8 border-y" style={{ borderColor: 'var(--border-color)' }}>
          <a href="mailto:highendstays@gmail.com"
            className="flex items-center gap-2 md:gap-3 text-sm md:text-lg transition-colors" style={{ color: 'var(--text-secondary)' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}>
            <Mail className="w-4 h-4 md:w-5 md:h-5" style={{ color: 'var(--accent)' }} />
            <span>highendstays@gmail.com</span>
          </a>
        </div>

        {/* Copyright */}
        <div className="pt-6 md:pt-8 text-center">
          <p className="text-xs md:text-sm" style={{ color: 'var(--text-muted)' }}>
            © 2026 High-End Stays BnB. All Rights Reserved.
          </p>
          <p className="text-xs md:text-sm mt-1" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
            Designed & Developed by{' '}
            <span style={{ color: 'var(--accent)' }}>Victor Meme</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
