import { useState, useEffect } from 'react';
import { useBooking } from '@/providers';
import { MapPin, Clock, Star, Wifi, Lock, Bed, Utensils, Zap, Dog, ChevronRight } from 'lucide-react';

type Category = 'All' | 'Eldoret' | 'Meru';

interface Property {
  id: string;
  name: string;
  location: 'Eldoret' | 'Meru';
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  tag?: string;
  comingSoon?: boolean;
  amenities: string[];
  guests: number;
  bedrooms: number;
}

const properties: Property[] = [
  {
    id: 'el-pioneer',
    name: 'Pioneer Heights',
    location: 'Eldoret',
    category: 'Studio',
    price: 8500,
    rating: 4.9,
    reviews: 47,
    guests: 2,
    bedrooms: 1,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&q=75&auto=format',
    tag: 'FEATURED',
    amenities: ['wifi', 'lock', 'kitchen', 'power'],
  },
  {
    id: 'el-mtrh',
    name: 'MTRH Executive',
    location: 'Eldoret',
    category: 'Studio',
    price: 7500,
    rating: 4.8,
    reviews: 32,
    guests: 2,
    bedrooms: 1,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=75&auto=format',
    amenities: ['wifi', 'lock', 'kitchen'],
  },
  {
    id: 'el-family',
    name: 'Family Haven',
    location: 'Eldoret',
    category: '2-Bedroom',
    price: 12000,
    rating: 4.95,
    reviews: 28,
    guests: 4,
    bedrooms: 2,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&q=75&auto=format',
    amenities: ['wifi', 'lock', 'kitchen', 'pets', 'power'],
  },
  {
    id: 'el-penthouse',
    name: 'City View Penthouse',
    location: 'Eldoret',
    category: 'Penthouse',
    price: 18000,
    rating: 5.0,
    reviews: 0,
    guests: 4,
    bedrooms: 2,
    image: 'https://images.unsplash.com/photo-1600047508788-786f3865b0e3?w=600&q=75&auto=format',
    comingSoon: true,
    amenities: ['wifi', 'lock', 'kitchen', 'power'],
  },
  {
    id: 'meru-makutano',
    name: 'Makutano Premium',
    location: 'Meru',
    category: 'Studio',
    price: 9000,
    rating: 4.85,
    reviews: 21,
    guests: 2,
    bedrooms: 1,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&q=75&auto=format',
    tag: 'FEATURED',
    amenities: ['wifi', 'lock', 'kitchen', 'power'],
  },
  {
    id: 'meru-royal',
    name: 'Mt. Kenya Royal Suite',
    location: 'Meru',
    category: 'Suite',
    price: 15000,
    rating: 5.0,
    reviews: 19,
    guests: 2,
    bedrooms: 1,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=75&auto=format',
    tag: 'LUXURY',
    amenities: ['wifi', 'lock', 'kitchen', 'power'],
  },
  {
    id: 'meru-garden',
    name: 'Garden Retreat',
    location: 'Meru',
    category: '2-Bedroom',
    price: 13500,
    rating: 4.9,
    reviews: 0,
    guests: 4,
    bedrooms: 2,
    image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&q=75&auto=format',
    comingSoon: true,
    amenities: ['wifi', 'lock', 'kitchen', 'pets'],
  },
  {
    id: 'meru-forest',
    name: 'Forest Edge Lodge',
    location: 'Meru',
    category: 'Lodge',
    price: 22000,
    rating: 5.0,
    reviews: 0,
    guests: 6,
    bedrooms: 3,
    image: 'https://images.unsplash.com/photo-1475087542963-13ab5e611954?w=600&q=75&auto=format',
    comingSoon: true,
    amenities: ['wifi', 'lock', 'kitchen', 'pets', 'power'],
  },
];

const amenityIcon: Record<string, { icon: React.ElementType; label: string }> = {
  wifi: { icon: Wifi, label: 'Wi-Fi' },
  lock: { icon: Lock, label: 'Smart Lock' },
  kitchen: { icon: Utensils, label: 'Kitchen' },
  power: { icon: Zap, label: 'Power Backup' },
  pets: { icon: Dog, label: 'Pets OK' },
  bed: { icon: Bed, label: 'Premium Bedding' },
};

export function ExploreSection() {
  const { booking, updateBooking } = useBooking();
  const [activeLocation, setActiveLocation] = useState<Category>('All');
  const [visible, setVisible] = useState(properties);
  const [fading, setFading] = useState(false);

  // Keep in sync with hero search bar location
  useEffect(() => {
    const loc = booking.location as Category;
    if (loc !== activeLocation) {
      setActiveLocation(loc === 'All' ? 'All' : loc);
    }
  }, [booking.location]);

  useEffect(() => {
    setFading(true);
    const t = setTimeout(() => {
      setVisible(activeLocation === 'All' ? properties : properties.filter(p => p.location === activeLocation));
      setFading(false);
    }, 250);
    return () => clearTimeout(t);
  }, [activeLocation]);

  const handleTab = (loc: Category) => {
    setActiveLocation(loc);
    updateBooking({ location: loc });
  };

  const openWhatsApp = () => window.open('https://wa.me/254705688344', '_blank');

  return (
    <section id="explore" className="py-20 md:py-28" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Explore Our Stays
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Find Your Perfect Stay
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto mb-8" style={{ color: 'var(--text-secondary)' }}>
            Handpicked luxury BnB accommodations in Eldoret and Meru. Select a location to explore.
          </p>
          <div className="w-12 h-0.5 mx-auto mb-8" style={{ backgroundColor: 'var(--accent)' }} />

          {/* Location tabs */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl border" style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}>
            {(['All', 'Eldoret', 'Meru'] as Category[]).map(loc => (
              <button
                key={loc}
                onClick={() => handleTab(loc)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300"
                style={{
                  backgroundColor: activeLocation === loc ? 'var(--accent)' : 'transparent',
                  color: activeLocation === loc ? '#fff' : 'var(--text-secondary)',
                }}
              >
                {loc !== 'All' && <MapPin className="w-3.5 h-3.5" />}
                {loc === 'All' ? 'All Properties' : loc}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6 transition-opacity duration-300"
          style={{ opacity: fading ? 0.3 : 1 }}
        >
          {visible.map((property) => (
            <article
              key={property.id}
              className="group rounded-xl overflow-hidden border transition-all duration-400"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
                opacity: property.comingSoon ? 0.85 : 1,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--card-hover-border)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={property.image}
                  alt={property.name}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                {/* Overlay for coming soon */}
                {property.comingSoon && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center backdrop-blur-[2px]">
                    <div className="text-center px-4">
                      <Clock className="w-7 h-7 mx-auto mb-2" style={{ color: 'var(--accent)' }} />
                      <p className="text-white font-semibold text-sm tracking-widest uppercase">Exploring Soon</p>
                      <p className="text-white/70 text-xs mt-1">Coming to this area</p>
                    </div>
                  </div>
                )}
                {/* Tags */}
                {property.tag && !property.comingSoon && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-bold tracking-widest text-white rounded"
                    style={{ backgroundColor: 'var(--accent)' }}>
                    {property.tag}
                  </div>
                )}
                {/* Location badge */}
                <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold text-white bg-black/50 backdrop-blur-sm">
                  <MapPin className="w-3 h-3" />
                  {property.location}
                </div>
              </div>

              {/* Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-medium" style={{ color: 'var(--accent)' }}>
                      {property.category}
                    </span>
                    <h3 className="text-sm font-semibold leading-tight" style={{ color: 'var(--text-primary)' }}>
                      {property.name}
                    </h3>
                  </div>
                  {!property.comingSoon && (
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Star className="w-3.5 h-3.5 fill-current" style={{ color: 'var(--accent)' }} />
                      <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{property.rating}</span>
                      {property.reviews > 0 && (
                        <span className="text-[10px]" style={{ color: 'var(--text-muted)' }}>({property.reviews})</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Amenity pills */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {property.amenities.slice(0, 4).map(key => {
                    const a = amenityIcon[key];
                    if (!a) return null;
                    const Icon = a.icon;
                    return (
                      <span key={key} className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px]"
                        style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                        <Icon className="w-3 h-3" />
                        {a.label}
                      </span>
                    );
                  })}
                </div>

                {/* Price + CTA */}
                <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div>
                    {property.comingSoon ? (
                      <span className="text-sm font-medium" style={{ color: 'var(--text-muted)' }}>Coming Soon</span>
                    ) : (
                      <>
                        <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
                          KES {property.price.toLocaleString()}
                        </span>
                        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>/night</span>
                      </>
                    )}
                  </div>
                  {property.comingSoon ? (
                    <button
                      onClick={openWhatsApp}
                      className="flex items-center gap-1 text-xs font-semibold transition-opacity"
                      style={{ color: 'var(--accent)' }}
                    >
                      Notify me <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      onClick={openWhatsApp}
                      className="px-3.5 py-1.5 text-[11px] font-bold tracking-wider uppercase text-white transition-all duration-200"
                      style={{ backgroundColor: 'var(--accent)' }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
                    >
                      Book Now
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Coming soon callout */}
        <div className="mt-10 text-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            <Clock className="w-4 h-4 inline-block mr-1.5 mb-0.5" style={{ color: 'var(--accent)' }} />
            More premium locations coming soon — Nairobi, Nakuru, Kisumu & beyond.
          </p>
        </div>
      </div>
    </section>
  );
}
