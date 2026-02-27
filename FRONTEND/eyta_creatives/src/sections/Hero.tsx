import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';

// Define the interface to match your Django Serializer
interface HeroData {
  tagline: string;
  title: string;
  background_image: string;
  cta_primary_text: string;
  cta_primary_target: string;
  cta_secondary_text: string;
  cta_secondary_target: string;
}

const Hero = () => {
  const [heroData, setHeroData] = useState<HeroData | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Fetch data from Django
    const fetchHero = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${baseUrl}/api/hero/`);
        const data = await response.json();
        setHeroData(data);
        setIsVisible(true);
      } catch (error) {
        console.error("Error fetching hero data:", error);
      }
    };

    fetchHero();
  }, []);

  const scrollToNext = () => {
    const nextSection = document.querySelector('#subhero');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Guard clause for loading state
  if (!heroData) return <div className="h-screen bg-black" />;

  const titleLines = heroData.title.split('\n');

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Parallax Background */}
      <div
        className="absolute inset-0 parallax-bg"
        style={{
          backgroundImage: `url(${heroData.background_image})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-white px-6">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '300ms' }}
        >
          <span className="inline-block mb-4 text-sm tracking-[0.3em] font-light uppercase">
            {heroData.tagline}
          </span>
        </div>

        <h1
          className={`font-serif text-4xl md:text-6xl lg:text-7xl max-w-4xl leading-tight transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '500ms' }}
        >
          {titleLines.map((line, i) => (
            <span key={i}>
              {line}
              {i < titleLines.length - 1 && <br />}
            </span>
          ))}
        </h1>

        <div
          className={`mt-10 flex flex-col sm:flex-row gap-4 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '900ms' }}
        >
          {heroData.cta_primary_text && (
            <a
              href={heroData.cta_primary_target}
              onClick={(e) => {
                if (heroData.cta_primary_target.startsWith('#')) {
                  e.preventDefault();
                  document.querySelector(heroData.cta_primary_target)?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-12 py-4 bg-[#8b6d4b] text-white font-light tracking-widest text-sm btn-hover"
            >
              {heroData.cta_primary_text}
            </a>
          )}
          {heroData.cta_secondary_text && (
            <a
              href={heroData.cta_secondary_target}
              onClick={(e) => {
                if (heroData.cta_secondary_target.startsWith('#')) {
                  e.preventDefault();
                  document.querySelector(heroData.cta_secondary_target)?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="px-12 py-4 border border-white text-white font-light tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300"
            >
              {heroData.cta_secondary_text}
            </a>
          )}
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToNext}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 text-white animate-bounce transition-opacity duration-1000 ${
          isVisible ? 'opacity-70' : 'opacity-0'
        }`}
        style={{ transitionDelay: '1200ms' }}
      >
        <ChevronDown size={32} strokeWidth={1} />
      </button>
    </section>
  );
};

export default Hero;