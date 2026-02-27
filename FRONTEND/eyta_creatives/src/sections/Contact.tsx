import { useEffect, useRef, useState } from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react';

interface ContactSectionData {
  heading: string;
  description: string;
  backgroundImage?: string;
  location: string;
  locationLabel: string;
  email: string;
  emailLabel: string;
  phone: string;
  phoneLabel: string;
  formFields: {
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
  };
  submitText: string;
  submittingText: string;
  submittedText: string;
  successMessage: string;
}

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Data State
  const [config, setConfig] = useState<ContactSectionData | null>(null);
  const [loading, setLoading] = useState(true);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${baseUrl}/api/contact-section/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error("Error fetching contact section data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchContactData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  if (loading) return null;
  if (!config || Object.keys(config).length === 0 || !config.heading) return null;

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen flex items-center justify-center">
      {config.backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${config.backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 py-24">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          <div className={`lg:w-1/2 text-white transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="font-serif text-5xl md:text-6xl lg:text-[80px] mb-8 leading-none">
              {config.heading}
            </h2>
            <p className="text-xl font-light leading-relaxed opacity-90 mb-12 max-w-md">
              {config.description}
            </p>

            <div className="space-y-6 mb-12">
              {config.location && (
                <div className="flex items-center gap-4">
                  <MapPin size={20} strokeWidth={1.5} className="text-[#8b6d4b]" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider opacity-60 mb-1">{config.locationLabel}</span>
                    <span className="font-light">{config.location}</span>
                  </div>
                </div>
              )}

              {config.email && (
                <div className="flex items-center gap-4">
                  <Mail size={20} strokeWidth={1.5} className="text-[#8b6d4b]" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider opacity-60 mb-1">{config.emailLabel}</span>
                    <a href={`mailto:${config.email}`} className="font-light hover:text-[#8b6d4b] transition-colors">
                      {config.email}
                    </a>
                  </div>
                </div>
              )}

              {config.phone && (
                <div className="flex items-center gap-4">
                  <Phone size={20} strokeWidth={1.5} className="text-[#8b6d4b]" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider opacity-60 mb-1">{config.phoneLabel}</span>
                    <a href={`tel:${config.phone}`} className="font-light hover:text-[#8b6d4b] transition-colors">
                      {config.phone}
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={`lg:w-1/2 max-w-md w-full transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <input
                  type="text"
                  placeholder={config.formFields?.namePlaceholder || "Name"}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-white/50 text-white placeholder-white/50 py-4 focus:outline-none focus:border-[#8b6d4b] transition-colors font-light text-lg"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder={config.formFields?.emailPlaceholder || "Email"}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-transparent border-b border-white/50 text-white placeholder-white/50 py-4 focus:outline-none focus:border-[#8b6d4b] transition-colors font-light text-lg"
                />
              </div>
              <div>
                <textarea
                  placeholder={config.formFields?.messagePlaceholder || "Message"}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  rows={4}
                  className="w-full bg-transparent border-b border-white/50 text-white placeholder-white/50 py-4 focus:outline-none focus:border-[#8b6d4b] transition-colors font-light text-lg resize-none"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-3 py-5 bg-[#8b6d4b] text-white font-light tracking-widest text-sm btn-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="animate-pulse">{config.submittingText}</span>
                ) : isSubmitted ? (
                  <><span>{config.submittedText}</span></>
                ) : (
                  <>
                    <span>{config.submitText}</span>
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
            {isSubmitted && (
              <p className="mt-6 text-green-400 text-center font-light">{config.successMessage}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;