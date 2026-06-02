import { Wifi, Lock, Bed, UtensilsCrossed, Dog, Zap } from 'lucide-react';

const amenities = [
  { id: 'wifi', icon: Wifi, title: 'High-Speed Wi-Fi', description: 'Dedicated workspace-friendly connectivity for uninterrupted productivity.' },
  { id: 'smartlock', icon: Lock, title: 'Smart Lock Check-In', description: 'Seamless 24/7 self-arrival with keyless entry technology.' },
  { id: 'bedding', icon: Bed, title: 'Hotel-Grade Bedding', description: '300+ thread count crisp white linens for truly restorative sleep.' },
  { id: 'kitchen', icon: UtensilsCrossed, title: 'Modern Kitchen', description: 'Fully equipped culinary setup with premium appliances.' },
  { id: 'pets', icon: Dog, title: 'Pet-Friendly', description: 'Your companions are welcome. Home includes every family member.', badge: 'PETS WELCOME' },
  { id: 'power', icon: Zap, title: 'Power & Water Backup', description: 'Reliable backup solutions ensuring uninterrupted comfort.' },
];

export function AmenitiesSection() {
  return (
    <section id="amenities" className="py-20 md:py-28 relative overflow-hidden" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-primary) 50%, var(--bg-secondary) 100%)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-12 md:mb-16">
          <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            What We Offer
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Premium Amenities
          </h2>
          <p className="text-base md:text-lg max-w-xl" style={{ color: 'var(--text-secondary)' }}>
            Every detail considered. Every comfort delivered.
          </p>
          <div className="w-12 h-0.5 mt-6" style={{ backgroundColor: 'var(--accent)' }} />
        </div>

        {/* Amenities grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {amenities.map((amenity) => (
            <div
              key={amenity.id}
              className="group relative p-6 md:p-8 rounded-lg transition-all duration-500 border"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--card-hover-border)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
            >
              {amenity.badge && (
                <span
                  className="absolute top-4 right-4 px-2 py-1 text-[10px] font-semibold tracking-wider text-white rounded"
                  style={{ backgroundColor: 'var(--accent)' }}
                >
                  {amenity.badge}
                </span>
              )}

              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-5 transition-colors duration-500"
                style={{ backgroundColor: 'var(--bg-tertiary)' }}
              >
                <amenity.icon className="w-5 h-5" strokeWidth={1.5} style={{ color: 'var(--accent)' }} />
              </div>

              <h3 className="text-base md:text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {amenity.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {amenity.description}
              </p>
              <div className="w-8 h-0.5 mt-5" style={{ backgroundColor: 'var(--accent-deep)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
