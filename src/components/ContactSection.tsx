import { useState } from 'react';
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react';

export function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const contactDetails = [
    { icon: Phone, label: 'Victor Meme', value: '+254 705 688 344', href: 'tel:+254705688344' },
    { icon: Phone, label: 'William Kinyeru', value: '+254 792 003 602', href: 'tel:+254792003602' },
    { icon: Mail, label: 'Email', value: 'highendstays@gmail.com', href: 'mailto:highendstays@gmail.com' },
    { icon: MapPin, label: 'Locations', value: 'Eldoret & Meru, Kenya', href: '#' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return;
    const msg = encodeURIComponent(`Hi, my name is ${form.name} (${form.email}).\n\n${form.message}`);
    window.open(`https://wa.me/254705688344?text=${msg}`, '_blank');
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      {/* Background image with overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=60&auto=format"
          alt="luxury interior"
          className="w-full h-full object-cover object-center"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--bg-primary)', opacity: 0.88 }} />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left — info */}
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
              Get in Touch
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-5 leading-tight" style={{ color: 'var(--text-primary)' }}>
              Book Your Stay
            </h2>
            <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
              Whether you're visiting for work, wellness, or a luxury staycation — we'd love to host you.
              Reach out and we'll curate the perfect experience.
            </p>

            {/* Contact details */}
            <div className="flex flex-col gap-5">
              {contactDetails.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-4 group"
                  onClick={href === '#' ? (e) => e.preventDefault() : undefined}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                    style={{ backgroundColor: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                  >
                    <Icon className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-widest font-medium mb-0.5" style={{ color: 'var(--text-muted)' }}>{label}</p>
                    <p className="text-sm font-medium transition-colors duration-200 group-hover:opacity-80" style={{ color: 'var(--text-primary)' }}>{value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* WhatsApp CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 mt-10">
              <a href="https://wa.me/254705688344" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold text-white transition-colors"
                style={{ backgroundColor: '#25D366' }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1da851')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#25D366')}>
                <MessageCircle className="w-4 h-4" />
                WhatsApp Victor
              </a>
              <a href="https://wa.me/254792003602" target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold transition-colors border"
                style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)', backgroundColor: 'var(--bg-tertiary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}>
                <MessageCircle className="w-4 h-4" />
                WhatsApp William
              </a>
            </div>
          </div>

          {/* Right — form card */}
          <div
            className="p-7 md:p-8 rounded-2xl border"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', backdropFilter: 'blur(12px)' }}
          >
            <div className="flex flex-col gap-5">
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                  Full Name
                </label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 border"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    borderColor: 'var(--input-border)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--input-border)')}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 border"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    borderColor: 'var(--input-border)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--input-border)')}
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest font-medium mb-2" style={{ color: 'var(--text-muted)' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us about your stay requirements..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg text-sm outline-none transition-all duration-200 border resize-none"
                  style={{
                    backgroundColor: 'var(--input-bg)',
                    borderColor: 'var(--input-border)',
                    color: 'var(--text-primary)',
                  }}
                  onFocus={(e) => (e.target.style.borderColor = 'var(--accent)')}
                  onBlur={(e) => (e.target.style.borderColor = 'var(--input-border)')}
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center gap-2 py-4 text-white text-sm font-semibold tracking-widest uppercase transition-all duration-300 rounded-lg"
                style={{ backgroundColor: sent ? '#16a34a' : 'var(--accent)' }}
                onMouseEnter={(e) => !sent && (e.currentTarget.style.backgroundColor = 'var(--accent-hover)')}
                onMouseLeave={(e) => !sent && (e.currentTarget.style.backgroundColor = 'var(--accent)')}
              >
                <Send className="w-4 h-4" />
                {sent ? 'Inquiry Sent via WhatsApp!' : 'Send Inquiry'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
