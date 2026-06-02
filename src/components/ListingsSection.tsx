import { useBooking } from '@/providers';
import { VirtualTour } from './VirtualTour';
import { MapPin, Users, Bed, Bath, Star } from 'lucide-react';
import type { Listing } from '@/types/listings';
import { useState, useEffect } from 'react';

const listings: Listing[] = [
  {
    id: 'eldoret-pioneer-1',
    name: 'High End Stays BnB - Pioneer Heights',
    location: 'Eldoret',
    price: 8500,
    description: 'Luxurious one-bedroom BnB apartment in the heart of Pioneer Estate, minutes from MTRH. Modern finishes with panoramic city views.',
    amenities: ['Smart TV', 'High-Speed WiFi', 'Secure Parking', 'Air Conditioning', 'Fully Equipped Kitchen'],
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    bedrooms: 1, bathrooms: 1, guests: 2, rating: 4.9, reviewCount: 47, isFeatured: true,
  },
  {
    id: 'eldoret-mtrh-2',
    name: 'High End Stays BnB - MTRH Executive',
    location: 'Eldoret',
    price: 7500,
    description: 'Premium BnB apartment perfect for medical professionals. Walking distance to Moi Teaching and Referral Hospital with 24/7 security.',
    amenities: ['Netflix', 'Fast WiFi', 'Dedicated Workspace', 'Secure Entry', 'Coffee Station'],
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
    bedrooms: 1, bathrooms: 1, guests: 2, rating: 4.8, reviewCount: 32,
  },
  {
    id: 'eldoret-family-3',
    name: 'High End Stays BnB - Family Haven',
    location: 'Eldoret',
    price: 12000,
    description: 'Spacious two-bedroom BnB apartment ideal for families. Kid-friendly setup with entertainment system and secure playground access.',
    amenities: ['2 Bedrooms', 'Smart TV', 'Child-Safe', 'Parking', 'Garden Access'],
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
    bedrooms: 2, bathrooms: 2, guests: 4, rating: 4.95, reviewCount: 28,
  },
  {
    id: 'meru-makutano-1',
    name: 'High End Stays BnB - Makutano Premium',
    location: 'Meru',
    price: 9000,
    description: 'Stunning BnB suite near Makutano town center. Perfect for business travelers and tourists exploring Mt. Kenya region.',
    amenities: ['Smart TV', 'High-Speed WiFi', 'Secure Parking', 'Balcony', 'Kitchen'],
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
    bedrooms: 1, bathrooms: 1, guests: 2, rating: 4.85, reviewCount: 21, isFeatured: true, theme: 'luxury-dark',
  },
  {
    id: 'meru-makutano-2',
    name: 'High End Stays BnB - Mt. Kenya Royal',
    location: 'Meru',
    price: 15000,
    description: 'Exclusive luxury BnB retreat with breathtaking views of Mt. Kenya. Ultra-premium experience with gold-class amenities.',
    amenities: ['Mountain Views', 'Private Balcony', 'Premium WiFi', 'Concierge', 'Gourmet Kitchen'],
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
    bedrooms: 1, bathrooms: 1, guests: 2, rating: 5.0, reviewCount: 19, isFeatured: true, theme: 'luxury-dark',
  },
];

export function ListingsSection() {
  const { booking } = useBooking();
  const [filteredListings, setFilteredListings] = useState(listings);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setAnimating(true);
    const timer = setTimeout(() => {
      setFilteredListings(
        booking.location === 'All' ? listings : listings.filter((l) => l.location === booking.location)
      );
      setAnimating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [booking.location]);

  const openWhatsApp = () => window.open('https://wa.me/254705688344', '_blank');

  return (
    <section id="listings-display" className="py-20 md:py-28" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Explore
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Our Premium BnB Properties
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {booking.location === 'All'
              ? 'Discover our handpicked selection of luxury BnB accommodations across Kenya.'
              : `Showing premium BnB stays in ${booking.location}.`}
          </p>
          <div className="w-12 h-0.5 mx-auto mt-6" style={{ backgroundColor: 'var(--accent)' }} />
        </div>

        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 transition-all duration-500 ${
            animating ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {filteredListings.map((listing) => (
            <article
              key={listing.id}
              className="group overflow-hidden border rounded-lg transition-all duration-500"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--card-hover-border)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
            >
              <div className="relative aspect-[16/10] w-full">
                <VirtualTour theme={listing.theme === 'luxury-dark' ? 'luxury-dark' : 'default'} />
                {listing.isFeatured && (
                  <div
                    className="absolute top-4 right-4 px-3 py-1.5 text-xs font-semibold text-white"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    FEATURED
                  </div>
                )}
              </div>

              <div className="p-5 md:p-6">
                <div className="flex items-start justify-between gap-4 mb-3">
                  <div>
                    <h3 className="text-base md:text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
                      {listing.name}
                    </h3>
                    <div className="flex items-center gap-1.5" style={{ color: 'var(--text-secondary)' }}>
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="text-sm">{listing.location}, Kenya</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1" style={{ color: 'var(--accent)' }}>
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{listing.rating}</span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>({listing.reviewCount})</span>
                  </div>
                </div>

                <p className="text-sm mb-4 line-clamp-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {listing.description}
                </p>

                <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  <div className="flex items-center gap-1.5">
                    <Bed className="w-4 h-4" />
                    <span>{listing.bedrooms} Bed{listing.bedrooms > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Bath className="w-4 h-4" />
                    <span>{listing.bathrooms} Bath{listing.bathrooms > 1 ? 's' : ''}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{listing.guests} Guest{listing.guests > 1 ? 's' : ''}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <div>
                    <span className="text-xl md:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                      KES {listing.price.toLocaleString()}
                    </span>
                    <span className="text-sm" style={{ color: 'var(--text-muted)' }}> / night</span>
                  </div>
                  <button
                    onClick={openWhatsApp}
                    className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white transition-colors"
                    style={{ backgroundColor: 'var(--accent)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
