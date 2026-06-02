import { Phone, Clock, MessageSquare, Sparkles, Settings, Camera, MapPin, MessageCircle } from 'lucide-react';

const teamMembers = [
  {
    role: 'Front of House',
    name: 'Victor Meme',
    title: 'Guest Experience Lead',
    icon: Sparkles,
    phone: '+254705688344',
    phoneDisplay: '+254 705 688 344',
    whatsapp: 'https://wa.me/254705688344',
    skills: [
      { icon: MessageSquare, label: 'Hospitality & 24/7 Guest Communication' },
      { icon: Sparkles, label: 'Interior Styling & Staging' },
      { icon: MapPin, label: 'Curated Local Guides — Eldoret & Meru' },
    ],
  },
  {
    role: 'Back of House',
    name: 'William Kinyeru',
    title: 'Operations & Growth Lead',
    icon: Settings,
    phone: '+254792003602',
    phoneDisplay: '+254 792 003 602',
    whatsapp: 'https://wa.me/254792003602',
    skills: [
      { icon: Settings, label: 'Platform Logistics & Pricing Optimization' },
      { icon: Camera, label: 'Professional Photography & Cleaning Coordination' },
      { icon: MapPin, label: 'Tech & Maintenance Infrastructure' },
    ],
  },
];

export function TeamSection() {
  return (
    <section id="team" className="py-20 md:py-28" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <p className="text-xs md:text-sm font-medium tracking-[0.2em] uppercase mb-4" style={{ color: 'var(--accent)' }}>
            Leadership
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            The DNA of Excellence
          </h2>
          <p className="text-base md:text-lg" style={{ color: 'var(--text-secondary)' }}>
            Institutional operational efficiency meets genuine hospitality.
          </p>
          <div className="w-12 h-0.5 mx-auto mt-6" style={{ backgroundColor: 'var(--accent)' }} />
        </div>

        {/* Team cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="p-6 md:p-8 border rounded-lg"
              style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}
            >
              {/* Header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: 'var(--bg-tertiary)' }}
                >
                  <member.icon className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ color: 'var(--accent)' }}>
                    {member.role}
                  </p>
                  <h3 className="text-lg md:text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {member.name}
                  </h3>
                  <p className="text-xs uppercase tracking-wider" style={{ color: 'var(--accent-hover)' }}>
                    {member.title}
                  </p>
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-3 mb-6">
                {member.skills.map((skill) => (
                  <div key={skill.label} className="flex items-center gap-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                    <skill.icon className="w-4 h-4 flex-shrink-0" style={{ color: 'var(--accent-hover)' }} />
                    <span>{skill.label}</span>
                  </div>
                ))}
              </div>

              {/* Contact buttons — phone + WhatsApp icons */}
              <div className="flex items-center gap-3">
                <a
                  href={`tel:${member.phone}`}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all duration-300"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)', backgroundColor: 'var(--bg-tertiary)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-color)'; e.currentTarget.style.color = 'var(--text-primary)'; }}
                >
                  <Phone className="w-4 h-4" />
                  <span>{member.phoneDisplay}</span>
                </a>

                <a
                  href={member.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300"
                  style={{ backgroundColor: '#25D366', color: '#ffffff' }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#1da851')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#25D366')}
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Golden Rule Banner */}
        <div
          className="p-6 md:p-8 rounded-lg text-center"
          style={{ background: 'linear-gradient(135deg, var(--accent-deep) 0%, var(--accent) 100%)' }}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Clock className="w-5 h-5 text-white/80" />
            <p className="text-xs text-white/80 uppercase tracking-[0.2em] font-medium">Our Golden Rule</p>
          </div>
          <p className="text-lg md:text-xl font-serif text-white mb-6 max-w-2xl mx-auto">
            "Never let a guest message go unanswered for more than an hour.{' '}
            <br className="hidden md:block" />
            24/7 emergency readiness."
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {teamMembers.map((m) => (
              <div key={m.name} className="flex items-center gap-3">
                <a
                  href={`tel:${m.phone}`}
                  className="flex items-center gap-1.5 text-sm text-white/90 hover:text-white transition-colors"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{m.phoneDisplay}</span>
                </a>
                <a
                  href={m.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-white/90 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WA</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
