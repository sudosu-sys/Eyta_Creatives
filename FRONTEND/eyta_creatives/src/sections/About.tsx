import { useEffect, useRef, useState } from 'react';

// Define the shape of our API data
interface AboutSectionData {
  tag: string;
  heading: string;
  image: string;
  backgroundColor: string;
  textColor: string;
  quote?: string;
  attribution?: string;
  paragraphs: string[];
}

interface AboutSectionProps {
  id: string;
  image: string;
  contentBg: string;
  textColor: string;
  reverse?: boolean;
  children: React.ReactNode;
}

const AboutSection = ({ id, image, contentBg, textColor, reverse, children }: AboutSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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
  }, []);

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`min-h-screen flex flex-col ${reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
    >
      {/* Image Side */}
      <div
        className="w-full lg:w-3/5 h-[50vh] lg:h-auto min-h-[400px] bg-cover bg-top bg-fixed"
        style={{ backgroundImage: `url(${image})` }}
      />

      {/* Content Side */}
      <div
        className="w-full lg:w-2/5 flex items-center justify-center p-8 md:p-12 lg:p-16"
        style={{ backgroundColor: contentBg, color: textColor }}
      >
        <div
          className={`max-w-md transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const About = () => {
  // Data State
  const [sections, setSections] = useState<AboutSectionData[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch Data from Django API
  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${baseUrl}/api/about-section/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        // Check if data is an array (which it should be based on our view)
        if (Array.isArray(data)) {
          setSections(data);
        } else {
            console.error("About data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching about section data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  // Failsafes
  if (loading) return null;
  if (!sections || sections.length === 0) return null;

  return (
    <section id="about" className="relative">
      {sections.map((section, index) => (
        <AboutSection
          key={index}
          id={`about-${index}`}
          image={section.image}
          contentBg={section.backgroundColor}
          textColor={section.textColor}
          reverse={index % 2 !== 0}
        >
          {section.tag && (
            <span className="inline-block mb-4 text-sm tracking-[0.2em] font-medium uppercase opacity-70">
              {section.tag}
            </span>
          )}
          <h2 className="font-serif text-3xl md:text-[40px] leading-tight mb-6">
            {section.heading}
          </h2>
          {section.quote ? (
            <>
              <p className="text-lg font-light leading-relaxed opacity-90 mb-6">
                &ldquo;{section.quote}&rdquo;
              </p>
              {section.attribution && (
                <p className="text-base font-light opacity-70">
                  {section.attribution}
                </p>
              )}
            </>
          ) : (
            // Ensure paragraphs exist before mapping over them
            section.paragraphs && section.paragraphs.map((paragraph, pIndex) => (
              <p key={pIndex} className="text-lg font-light leading-relaxed opacity-90 mb-6">
                {paragraph}
              </p>
            ))
          )}
        </AboutSection>
      ))}

      {/* Vertical Navigation Dots */}
      {sections.length > 1 && (
        <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col gap-4 z-50">
          {sections.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const element = document.getElementById(`about-${index}`);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="w-3 h-3 rounded-full border border-white/50 bg-transparent hover:bg-white/30 transition-colors"
              aria-label={`Scroll to section ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default About;