import { useEffect, useRef, useState } from 'react';
import { Truck, ShieldCheck, Leaf, Heart } from 'lucide-react';

// Define the shape of our API data
interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesSectionData {
  features: Feature[];
}

const iconMap: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; className?: string }>> = {
  Truck,
  ShieldCheck,
  Leaf,
  Heart,
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Data State
  const [config, setConfig] = useState<FeaturesSectionData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Data from Django API
  useEffect(() => {
    const fetchFeaturesData = async () => {
      try {
        const baseUrl = import.meta.env.VITE_API_URL || '';
        const response = await fetch(`${baseUrl}/api/features-section/`);
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error("Error fetching features section data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturesData();
  }, []);

  // Intersection Observer for scroll animations
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

  // Failsafes to prevent crashes
  if (loading) return null;
  if (!config || Object.keys(config).length === 0 || !config.features || config.features.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-[200px]"
      style={{ backgroundColor: 'rgba(139, 109, 75, 0.05)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          {config.features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon];
            return (
              <div
                key={feature.title}
                className={`p-8 lg:p-[63px] border-b md:border-b-0 md:border-r border-[#e1e1e1] last:border-0 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {IconComponent && (
                  <IconComponent
                    size={36}
                    strokeWidth={1.2}
                    className="text-[#8b6d4b] mb-6"
                  />
                )}
                <h3 className="font-serif text-2xl lg:text-[36px] text-black mb-4 leading-tight">
                  {feature.title}
                </h3>
                <p className="text-[#696969] text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;