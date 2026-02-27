import { Instagram, Facebook, Twitter, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Link {
  label: string;
  href: string;
}

interface SocialLink extends Link {
  icon: string;
}

interface LinkGroup {
  title: string;
  links: Link[];
}

interface FooterSectionData {
  brandName: string;
  brandDescription: string;
  copyrightText: string;
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterSuccessText: string;
  socialLinks: SocialLink[];
  legalLinks: Link[];
  linkGroups: LinkGroup[];
}

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Instagram,
  Facebook,
  Twitter,
};

const Footer = () => {
  const [config, setConfig] = useState<FooterSectionData | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${baseUrl}/api/footer-section/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error("Error fetching footer section data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFooterData();
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToSection = (href: string) => {
    if (href === '#') return;
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) return null;
  if (!config || Object.keys(config).length === 0 || !config.brandName) return null;

  return (
    <footer className="bg-white py-16 md:py-24">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="font-serif text-2xl mb-6">{config.brandName}</h3>
            <p className="text-[#696969] font-light text-sm leading-relaxed mb-6">
              {config.brandDescription}
            </p>
            <div className="flex items-center gap-4">
              {config.socialLinks && config.socialLinks.map((social) => {
                const IconComponent = iconMap[social.icon];
                if (!IconComponent) return null;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="text-[#696969] hover:text-[#8b6d4b] transition-all duration-300 hover:scale-90"
                    aria-label={social.label}
                  >
                    <IconComponent size={20} strokeWidth={1.5} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link Groups */}
          {config.linkGroups && config.linkGroups.map((group) => (
            <div key={group.title}>
              <h4 className="font-sans text-sm font-medium uppercase tracking-wider mb-6">{group.title}</h4>
              <ul className="space-y-3">
                {group.links && group.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-[#696969] text-base font-light link-hover inline-block"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          {config.newsletterHeading && (
            <div className="lg:col-span-1">
              <h4 className="font-sans text-sm font-medium uppercase tracking-wider mb-6">{config.newsletterHeading}</h4>
              <p className="text-[#696969] text-sm font-light mb-4">
                {config.newsletterDescription}
              </p>
              <form onSubmit={handleSubscribe} className="flex flex-col gap-3">
                <div className="relative">
                  <input
                    type="email"
                    placeholder={config.newsletterPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[#8b6d4b] transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-[#8b6d4b] text-white text-sm font-light tracking-wider btn-hover"
                >
                  {isSubscribed ? (
                    <span>{config.newsletterSuccessText}</span>
                  ) : (
                    <>
                      <span>{config.newsletterButtonText}</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[#333] text-xs uppercase tracking-wider font-medium">
              {config.copyrightText}
            </p>
            <div className="flex items-center gap-6">
              {config.legalLinks && config.legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-[#696969] text-xs hover:text-black transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;