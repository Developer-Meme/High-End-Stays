import { useState, useEffect } from 'react';
import { Star, Send, Quote } from 'lucide-react';

const staticReviews = [
  { id: '1', name: 'Sarah M.', rating: 5, comment: 'Absolutely stunning BnB apartment! The attention to detail was incredible. The smart TV setup and fast WiFi made working remotely a breeze. Will definitely book again!', date: '2024-12-15', location: 'Eldoret' },
  { id: '2', name: 'Dr. James K.', rating: 5, comment: 'Perfect location near MTRH. After long hospital shifts, coming back to this clean, comfortable BnB space was exactly what I needed. Highly recommend for medical professionals.', date: '2024-12-10', location: 'Eldoret' },
  { id: '3', name: 'The Ochieng Family', rating: 5, comment: 'Our family had an amazing time! The kids loved the space, and we appreciated the secure compound. The team was incredibly responsive to our needs.', date: '2024-11-28', location: 'Eldoret' },
  { id: '4', name: 'Michael T.', rating: 5, comment: 'The Makutano BnB retreat exceeded all expectations. Waking up to Mt. Kenya views from the balcony was magical. The gold and purple interior design is absolutely luxurious.', date: '2024-11-20', location: 'Meru' },
  { id: '5', name: 'Angela W.', rating: 5, comment: "Victor and William are phenomenal hosts. Their 1-hour response guarantee is real! Every question was answered promptly. The BnB apartment was spotless.", date: '2024-11-15', location: 'Eldoret' },
  { id: '6', name: 'Peter N.', rating: 5, comment: 'As a business traveler, I need reliability. High End Stays BnB delivered perfectly — smooth check-in, dedicated workspace, and excellent WiFi. Will use again on my next trip.', date: '2024-11-05', location: 'Eldoret' },
];

export function ReviewsSection() {
  const [formData, setFormData] = useState({ name: '', rating: 5, comment: '' });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const subject = encodeURIComponent(`New BnB Review from ${formData.name}`);
    const body = encodeURIComponent(`Name: ${formData.name}\nRating: ${formData.rating}/5 stars\n\nReview:\n${formData.comment}`);
    window.location.href = `mailto:highendstays@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', rating: 5, comment: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <section id="reviews" className="py-20 md:py-28" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Testimonials
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            What Our BnB Guests Say
          </h2>
          <p className="text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            Real experiences from real guests. Join our community of satisfied travelers.
          </p>
          <div className="w-12 h-0.5 mx-auto mt-6" style={{ backgroundColor: 'var(--accent)' }} />
        </div>

        {/* Scrolling reviews */}
        <div className="relative mb-16 overflow-hidden">
          <div
            className="flex gap-4 md:gap-6 animate-scroll-reviews"
            style={{ animationDuration: isMobile ? '18s' : '40s' }}
          >
            {[...staticReviews, ...staticReviews].map((review, idx) => (
              <div
                key={`${review.id}-${idx}`}
                className="flex-shrink-0 w-[280px] md:w-[350px] p-5 md:p-6 border rounded-lg"
                style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
              >
                <Quote className="w-6 h-6 md:w-8 md:h-8 mb-3 md:mb-4" style={{ color: 'var(--accent-deep)', opacity: 0.5 }} />
                <p className="text-sm md:text-base mb-4 md:mb-6 leading-relaxed line-clamp-4" style={{ color: 'var(--text-secondary)' }}>
                  "{review.comment}"
                </p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm md:text-base" style={{ color: 'var(--text-primary)' }}>{review.name}</p>
                    <p className="text-xs md:text-sm" style={{ color: 'var(--text-muted)' }}>{review.location}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 md:w-4 md:h-4 ${i < review.rating ? 'fill-current' : ''}`}
                        style={{ color: i < review.rating ? 'var(--accent)' : 'var(--text-muted)' }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Review form */}
        <div className="max-w-2xl mx-auto">
          <div className="p-6 md:p-8 border rounded-lg" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
            <h3 className="text-lg md:text-xl font-semibold mb-6 text-center" style={{ color: 'var(--text-primary)' }}>
              Share Your BnB Experience
            </h3>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
                  <Star className="w-7 h-7" style={{ color: 'var(--accent)' }} />
                </div>
                <p className="text-lg font-medium" style={{ color: 'var(--text-primary)' }}>Thank you for your review!</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Your email client should open shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3.5 border focus:outline-none transition-colors"
                    style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                    Your Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData({ ...formData, rating: star })}
                        onMouseEnter={() => setHoveredRating(star)}
                        onMouseLeave={() => setHoveredRating(0)}
                        className="p-1 transition-transform hover:scale-110"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${(hoveredRating || formData.rating) >= star ? 'fill-current' : ''}`}
                          style={{ color: (hoveredRating || formData.rating) >= star ? 'var(--accent)' : 'var(--text-muted)' }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                    Your Review
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    className="w-full px-4 py-3.5 border focus:outline-none transition-colors resize-none"
                    style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--input-border)', color: 'var(--text-primary)' }}
                    placeholder="Tell us about your BnB experience..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center justify-center gap-2 w-full py-4 text-white font-semibold tracking-wider uppercase transition-colors duration-300 disabled:opacity-50"
                  style={{ backgroundColor: 'var(--accent)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending...' : 'Submit Review'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scroll-reviews {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll-reviews {
          animation: scroll-reviews linear infinite;
        }
        .animate-scroll-reviews:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
