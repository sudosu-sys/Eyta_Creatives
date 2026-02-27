import { useEffect, useRef, useState } from 'react';
import { ArrowRight, X } from 'lucide-react';

interface BlogPostType {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  content: string; // New field for the modal
}

interface BlogSectionData {
  tag: string;
  heading: string;
  readMoreText: string;
  viewAllText: string;
  posts: BlogPostType[];
}

const Blog = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Modal State
  const [selectedPost, setSelectedPost] = useState<BlogPostType | null>(null);

  // Data State
  const [config, setConfig] = useState<BlogSectionData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Data from Django API
  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/blog-section/');
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error("Error fetching blog section data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogData();
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedPost]);

  // Failsafes
  if (loading) return null;
  if (!config || Object.keys(config).length === 0 || (!config.heading && (!config.posts || config.posts.length === 0))) return null;

  return (
    <>
      <section id="blog" ref={sectionRef} className="py-24 bg-[#f7f7f7]">
        <div className="max-w-[1100px] mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            {config.tag && (
              <span className={`inline-block mb-4 text-sm tracking-[0.2em] text-[#8b6d4b] font-medium uppercase transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {config.tag}
              </span>
            )}
            <h2 className={`font-serif text-4xl md:text-5xl text-black mb-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
              {config.heading}
            </h2>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {config.posts && config.posts.map((post, index) => (
              <article
                key={post.id}
                onClick={() => setSelectedPost(post)}
                className={`group relative h-[500px] overflow-hidden cursor-pointer transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: `${400 + index * 150}ms` }}
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${post.image})` }}
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <span className="text-sm font-light tracking-wide opacity-80 mb-3 transform translate-y-0 group-hover:-translate-y-4 transition-all duration-500">
                    {post.date}
                  </span>

                  <h3 className="font-serif text-2xl md:text-[26px] leading-tight mb-4 transform translate-y-0 group-hover:-translate-y-4 transition-all duration-500">
                    {post.title}
                  </h3>

                  <p className="text-sm font-light opacity-0 transform translate-y-4 group-hover:opacity-80 group-hover:translate-y-0 transition-all duration-500 mb-6 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    <span className="text-sm tracking-[0.2em] uppercase">{config.readMoreText || "Read More"}</span>
                    <ArrowRight size={16} />
                    <div className="absolute bottom-8 left-8 h-[1px] bg-[#8b6d4b] w-0 group-hover:w-24 transition-all duration-700 delay-100" />
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* View All Link */}
          {config.viewAllText && (
            <div className={`text-center mt-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '900ms' }}>
              <button className="inline-flex items-center gap-2 text-[#8b6d4b] font-medium tracking-wide hover:gap-4 transition-all duration-300">
                {config.viewAllText}
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Blog Post Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity cursor-pointer"
            onClick={() => setSelectedPost(null)}
          />
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col transition-all">
            {/* Close Button */}
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black text-white rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>
            
            {/* Modal Image Header */}
            <div className="w-full h-[300px] md:h-[400px] relative shrink-0">
              <img 
                src={selectedPost.image} 
                alt={selectedPost.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Modal Text Body */}
            <div className="p-8 md:p-12 bg-white">
              <span className="text-sm tracking-[0.2em] text-[#8b6d4b] uppercase font-medium mb-4 block">
                {selectedPost.date}
              </span>
              <h3 className="font-serif text-3xl md:text-5xl text-black mb-8 leading-tight">
                {selectedPost.title}
              </h3>
              
              {/* whitespace-pre-line ensures that line breaks in your Django TextField are respected */}
              <div className="text-[#696969] text-lg font-light leading-relaxed whitespace-pre-line">
                {selectedPost.content || selectedPost.excerpt}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;