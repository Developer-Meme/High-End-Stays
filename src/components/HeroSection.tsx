import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Search } from 'lucide-react';
import { useBooking, useTheme } from '@/providers';

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=75&auto=format',
    mobileUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=70&auto=format',
    alt: 'Luxury apartment exterior with stunning architecture'
  },
  {
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=75&auto=format',
    mobileUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=70&auto=format',
    alt: 'Modern living room with contemporary design'
  },
  {
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=75&auto=format',
    mobileUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=70&auto=format',
    alt: 'Beautiful home with inviting atmosphere'
  },
  {
    url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=1920&q=75&auto=format',
    mobileUrl: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=70&auto=format',
    alt: 'Cozy bedroom with premium bedding'
  }
];

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [nextSlideIdx, setNextSlideIdx] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [loaded, setLoaded] = useState<boolean[]>(heroImages.map((_, i) => i === 0));
  const { booking, updateBooking } = useBooking();
  const { theme } = useTheme();
  const dateScheme = theme === 'light' ? 'light' : 'dark';

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload next image ahead of time
  useEffect(() => {
    const next = (currentSlide + 1) % heroImages.length;
    setNextSlideIdx(next);
    const img = new Image();
    img.src = isMobile ? heroImages[next].mobileUrl : heroImages[next].url;
    img.onload = () => setLoaded(prev => { const n = [...prev]; n[next] = true; return n; });
  }, [currentSlide, isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goNext = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  const goPrev = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

  const scrollToExplore = () => {
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSearch = () => {
    document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              transform: index === currentSlide ? 'scale(1)' : 'scale(1.04)',
              transition: 'opacity 1.2s cubic-bezier(0.4,0,0.2,1), transform 1.2s cubic-bezier(0.4,0,0.2,1)',
              willChange: 'opacity, transform',
            }}
          >
            {(loaded[index] || index === 0) && (
              <img
                src={isMobile ? image.mobileUrl : image.url}
                alt={image.alt}
                className="w-full h-full object-cover object-center"
                loading={index === 0 ? 'eager' : 'lazy'}
                fetchPriority={index === 0 ? 'high' : 'auto'}
                decoding="async"
              />
            )}
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/80" />
      </div>

      {/* Slide nav arrows */}
      <button onClick={goPrev} className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group" aria-label="Previous slide">
        <ChevronLeft className="w-6 h-6 group-hover:-translate-x-0.5 transition-transform" />
      </button>
      <button onClick={goNext} className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 items-center justify-center text-white hover:bg-white/20 transition-all duration-300 group" aria-label="Next slide">
        <ChevronRight className="w-6 h-6 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* Slide indicators */}
      <div className="absolute bottom-36 md:bottom-40 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="h-1.5 rounded-full transition-all duration-500"
            style={{ width: index === currentSlide ? 32 : 6, backgroundColor: index === currentSlide ? '#fff' : 'rgba(255,255,255,0.4)' }}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center w-full">
        <p className="font-script text-3xl sm:text-4xl lg:text-5xl text-white/90 mb-3 animate-fade-in-up">
          Welcome to Luxury
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight mb-4 tracking-tight animate-fade-in-up animation-delay-200">
          Premium BnB Living in
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400">
            Kenya's Finest Stays
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/80 mb-8 leading-relaxed animate-fade-in-up animation-delay-400 px-2">
          Sleek, modern, and fully equipped BnB spaces for business, family getaways, or luxury staycations.
        </p>

        {/* ── Search Bar ── */}
        <div className="animate-fade-in-up animation-delay-500 max-w-3xl mx-auto mb-8">
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-0 rounded-xl overflow-hidden shadow-2xl"
            style={{
              backgroundColor: 'var(--hero-bar-bg)',
              border: '1px solid var(--hero-bar-border)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
            }}
          >
            {/* Location */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 sm:flex-1 border-b sm:border-b-0 sm:border-r min-w-0"
              style={{ borderColor: 'var(--hero-bar-divider)' }}
            >
              <MapPin className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--hero-icon)' }} />
              <div className="text-left min-w-0 flex-1">
                <p className="text-[9px] uppercase tracking-[0.18em] font-bold mb-0.5" style={{ color: 'var(--hero-icon)' }}>Location</p>
                <select
                  value={booking.location}
                  onChange={(e) => updateBooking({ location: e.target.value })}
                  className="bg-transparent text-sm font-semibold outline-none cursor-pointer w-full truncate appearance-none"
                  style={{ color: 'var(--hero-bar-text)', maxWidth: '100%' }}
                >
                  <option value="All" style={{ backgroundColor: 'var(--hero-bar-select-bg)', color: 'var(--hero-bar-text)' }}>All Locations</option>
                  <option value="Eldoret" style={{ backgroundColor: 'var(--hero-bar-select-bg)', color: 'var(--hero-bar-text)' }}>Eldoret</option>
                  <option value="Meru" style={{ backgroundColor: 'var(--hero-bar-select-bg)', color: 'var(--hero-bar-text)' }}>Meru</option>
                </select>
              </div>
            </div>
            {/* Check-in */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 sm:flex-1 border-b sm:border-b-0 sm:border-r"
              style={{ borderColor: 'var(--hero-bar-divider)' }}
            >
              <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--hero-icon)' }} />
              <div className="text-left min-w-0 flex-1">
                <p className="text-[9px] uppercase tracking-[0.18em] font-bold mb-0.5" style={{ color: 'var(--hero-icon)' }}>Check-In</p>
                <input
                  type="date"
                  value={booking.checkIn}
                  onChange={(e) => updateBooking({ checkIn: e.target.value })}
                  className="bg-transparent text-sm font-semibold outline-none w-full cursor-pointer"
                  style={{ color: 'var(--hero-bar-text)', colorScheme: dateScheme }}
                />
              </div>
            </div>
            {/* Check-out */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 sm:flex-1 border-b sm:border-b-0 sm:border-r"
              style={{ borderColor: 'var(--hero-bar-divider)' }}
            >
              <Calendar className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--hero-icon)' }} />
              <div className="text-left min-w-0 flex-1">
                <p className="text-[9px] uppercase tracking-[0.18em] font-bold mb-0.5" style={{ color: 'var(--hero-icon)' }}>Check-Out</p>
                <input
                  type="date"
                  value={booking.checkOut}
                  onChange={(e) => updateBooking({ checkOut: e.target.value })}
                  className="bg-transparent text-sm font-semibold outline-none w-full cursor-pointer"
                  style={{ color: 'var(--hero-bar-text)', colorScheme: dateScheme }}
                />
              </div>
            </div>
            {/* Guests */}
            <div
              className="flex items-center gap-3 px-4 py-3.5 sm:w-36 border-b sm:border-b-0 sm:border-r"
              style={{ borderColor: 'var(--hero-bar-divider)' }}
            >
              <Users className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--hero-icon)' }} />
              <div className="text-left">
                <p className="text-[9px] uppercase tracking-[0.18em] font-bold mb-0.5" style={{ color: 'var(--hero-icon)' }}>Guests</p>
                <select
                  value={booking.guests}
                  onChange={(e) => updateBooking({ guests: Number(e.target.value) })}
                  className="bg-transparent text-sm font-semibold outline-none cursor-pointer"
                  style={{ color: 'var(--hero-bar-text)' }}
                >
                  {[1,2,3,4,5,6].map(n => (
                    <option key={n} value={n} style={{ backgroundColor: 'var(--hero-bar-select-bg)', color: 'var(--hero-bar-text)' }}>{n} Guest{n > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Search button */}
            <button
              onClick={handleSearch}
              className="group relative flex items-center justify-center gap-2.5 px-7 py-4 font-bold text-white text-sm tracking-[0.12em] uppercase transition-all duration-300 overflow-hidden"
              style={{ backgroundColor: 'var(--accent)', minWidth: 130 }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" style={{ backgroundColor: '#fff' }} />
              <Search className="w-[15px] h-[15px] stroke-[2.5] flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <span className="leading-none">Search</span>
            </button>
          </div>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up animation-delay-600">
          {[
            { dot: '#34d399', label: '24/7 Support' },
            { dot: 'var(--hero-icon)', label: 'Premium Locations' },
            { dot: '#60a5fa', label: 'Verified Properties' },
          ].map(({ dot, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide shadow-sm"
              style={{
                backgroundColor: 'var(--hero-bar-bg)',
                border: '1px solid var(--hero-bar-border)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                color: 'var(--hero-bar-text)',
              }}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: dot, boxShadow: `0 0 6px ${dot}` }} />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-5 h-8 rounded-full border-2 border-white/40 flex justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-white/60 animate-scroll" />
        </div>
      </div>

      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.9s ease-out forwards; opacity: 0; }
        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-500 { animation-delay: 0.5s; }
        .animation-delay-600 { animation-delay: 0.65s; }
        @keyframes scroll {
          0%, 100% { opacity: 0; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(4px); }
        }
        .animate-scroll { animation: scroll 2s ease-in-out infinite; }
      `}</style>
    </section>
  );
}
