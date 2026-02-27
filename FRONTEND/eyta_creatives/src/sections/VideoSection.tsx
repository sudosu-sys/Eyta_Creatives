import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

interface VideoSectionData {
  tag: string;
  heading: string;
  backgroundImage: string;
  videoFile?: string; // New field from Django
  bodyParagraphs: string[];
  ctaText: string;
  ctaTarget: string;
}

const VideoSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  // Data State
  const [config, setConfig] = useState<VideoSectionData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Data from Django API
  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/video-section/');
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error("Error fetching video section data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoData();
  }, []);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  // Failsafes
  if (loading) return null;
  if (!config || Object.keys(config).length === 0 || !config.heading) return null;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col lg:flex-row"
    >
      {/* Media Side (Image Thumbnail or Video Player) */}
      <div className="relative w-full lg:w-1/2 h-[50vh] lg:h-auto min-h-[400px] bg-black">
        {isPlaying && config.videoFile ? (
          <video 
            src={config.videoFile} 
            controls 
            autoPlay 
            className="w-full h-full object-cover"
            onEnded={() => setIsPlaying(false)}
          />
        ) : (
          <>
            {/* Thumbnail Image */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
              style={{ backgroundImage: `url(${config.backgroundImage})` }}
            />
            <div className="absolute inset-0 bg-black/30 transition-opacity hover:bg-black/40" />
            
            {/* Play Button Overlay */}
            {config.videoFile && (
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={() => setIsPlaying(true)}
                  className="w-20 h-20 bg-white/20 backdrop-blur-sm border border-white/50 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all duration-300 group hover:scale-105"
                  aria-label="Play video"
                >
                  <Play size={32} fill="currentColor" className="ml-2 group-hover:scale-110 transition-transform" />
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Content Side */}
      <div
        className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24"
        style={{ backgroundColor: 'rgba(243, 239, 239, 0.49)' }}
      >
        <div className="max-w-lg">
          {config.tag && (
            <span
              className={`inline-block mb-4 text-sm tracking-[0.2em] text-[#8b6d4b] font-medium uppercase transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {config.tag}
            </span>
          )}

          <h2
            className={`font-serif text-3xl md:text-4xl lg:text-[54px] text-black leading-tight mb-6 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: '400ms', lineHeight: '1.2' }}
          >
            {config.heading}
          </h2>

          {config.bodyParagraphs && config.bodyParagraphs.map((paragraph, index) => (
            <p
              key={index}
              className={`text-[#696969] text-lg leading-relaxed mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${600 + index * 200}ms` }}
            >
              {paragraph}
            </p>
          ))}

          {config.ctaText && (
            <div
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${600 + (config.bodyParagraphs?.length || 0) * 200 + 200}ms` }}
            >
              <a
                href={config.ctaTarget}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(config.ctaTarget)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center px-8 py-4 bg-[#8b6d4b] text-white font-light tracking-widest text-sm btn-hover"
              >
                {config.ctaText}
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default VideoSection;