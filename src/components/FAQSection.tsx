import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  { id: 'check-times', question: 'What are the check-in and check-out times?', answer: 'Check-in time is 3:00 PM, allowing us to ensure your BnB space is immaculate and ready for your arrival. Check-out time is 11:00 AM. Early check-in or late check-out may be arranged upon request, subject to availability.' },
  { id: 'self-checkin', question: 'How does self-check-in work?', answer: 'We offer flexible self-check-in options tailored to each BnB property. Select premium units feature high-tech smart locks with unique access codes sent directly to your phone before arrival. Other properties utilize secure physical key handovers at designated locations. Detailed instructions are provided 24 hours before your check-in.' },
  { id: 'cancellation', question: 'What is the cancellation policy?', answer: 'We offer flexible booking terms: Free cancellation up to 48 hours before check-in for a full refund. Cancellations within 48 hours receive a 50% refund. No-shows are non-refundable. For extended BnB stays (7+ nights), please contact us for our special long-term cancellation terms.' },
  { id: 'smoking', question: 'Is there a no-smoking policy?', answer: 'High-End Stays BnB maintains a strict 100% smoke-free policy indoors to preserve air quality and cleanliness for all guests. Designated outdoor smoking areas are available at select properties. Violation of this policy may result in additional cleaning fees.' },
  { id: 'pets', question: 'Are pets allowed, and are there any rules?', answer: 'Yes! We are pet-friendly. Your furry companions are welcome to join your stay. Please notify us about pets in advance. A refundable pet deposit may apply. We ask that pets are well-behaved and owners clean up after them.' },
  { id: 'parking', question: 'Is there parking available?', answer: 'All our BnB properties offer secure parking within gated compounds. Parking is complimentary for guests. For properties in Eldoret near MTRH, we have dedicated covered parking spaces available.' },
];

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faqs" className="py-20 md:py-28" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Common Questions
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Everything You Need to Know
          </h2>
          <p className="text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            Quick answers so nothing stands between you and the perfect stay.
          </p>
          <div className="w-12 h-0.5 mx-auto mt-6" style={{ backgroundColor: 'var(--accent)' }} />
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="border overflow-hidden rounded-lg"
              style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-card)' }}
            >
              <button
                onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left transition-colors"
                style={{ color: 'var(--text-primary)' }}
              >
                <span className="text-sm md:text-base font-medium">{faq.question}</span>
                <div
                  className="w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0"
                  style={{ borderColor: 'var(--border-color)' }}
                >
                  {openId === faq.id
                    ? <Minus className="w-3 h-3" style={{ color: 'var(--text-secondary)' }} />
                    : <Plus className="w-3 h-3" style={{ color: 'var(--text-secondary)' }} />
                  }
                </div>
              </button>

              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-5 pb-5">
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>Still have questions?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/254705688344"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-white text-sm font-semibold tracking-wider uppercase transition-colors"
              style={{ backgroundColor: 'var(--accent)' }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--accent)')}
            >
              WhatsApp Victor
            </a>
            <a
              href="https://wa.me/254792003602"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-sm font-semibold tracking-wider uppercase transition-colors border"
              style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', backgroundColor: 'transparent' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; }}
            >
              WhatsApp William
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
