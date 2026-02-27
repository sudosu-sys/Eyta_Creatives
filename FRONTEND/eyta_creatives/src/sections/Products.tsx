import { useEffect, useRef, useState } from 'react';
import { ShoppingBag, Check } from 'lucide-react';

// Define types based on your Django serializers
export interface Product {
  id: number;
  name: string;
  price: string | number; // DRF DecimalField often returns as string
  image: string;
  category: string;
}

interface ProductsSectionData {
  tag: string;
  heading: string;
  description: string;
  addToCartText: string;
  addedToCartText: string;
  viewAllText: string;
  categories: string[];
  products: Product[];
}

interface ProductsProps {
  onAddToCart: (product: Product) => void;
}

const Products = ({ onAddToCart }: ProductsProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // UI State
  const [isVisible, setIsVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [addedItems, setAddedItems] = useState<number[]>([]);

  // Data State
  const [config, setConfig] = useState<ProductsSectionData | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Data from Django API
  useEffect(() => {
    const fetchProductsData = async () => {
      try {
        // Pointing directly to the Django server to prevent the frontend from intercepting it
        const response = await fetch('http://127.0.0.1:8000/api/products-section/'); 
        if (!response.ok) throw new Error('Failed to fetch data');
        
        const data: ProductsSectionData = await response.json();
        setConfig(data);
        
        // Set the initial active category to the first one available
        if (data.categories && data.categories.length > 0) {
          setActiveCategory(data.categories[0]);
        }
      } catch (error) {
        console.error("Error fetching products section data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductsData();
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
  }, [loading]); // Re-run when loading finishes so it observes the DOM properly

  // Show nothing or a loading spinner while fetching
  if (loading) return <div className="py-24 text-center text-[#8b6d4b]">Loading products...</div>;

  // Fail safe if no data was returned or if API returned an empty object {}
  if (!config || Object.keys(config).length === 0 || !config.products) return null;

  // Filter products based on active category
  const filteredProducts = activeCategory === config.categories[0]
    ? config.products
    : config.products.filter(p => p.category === activeCategory);

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    setAddedItems(prev => [...prev, product.id]);
    setTimeout(() => {
      setAddedItems(prev => prev.filter(id => id !== product.id));
    }, 2000);
  };

  return (
    <section id="products" ref={sectionRef} className="py-24 md:py-32 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-[60px]">
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
          {config.description && (
            <p className={`max-w-2xl mx-auto text-[#696969] text-lg transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
              {config.description}
            </p>
          )}
        </div>

        {/* Category Filter */}
        {config.categories && config.categories.length > 0 && (
          <div className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '600ms' }}>
            {config.categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 text-sm tracking-wide transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#8b6d4b] text-white'
                    : 'bg-[#fafafa] text-[#696969] hover:bg-[#f0f0f0]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group bg-[#fafafa] border border-[#f5f5f5] transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${800 + index * 100}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-[400px] overflow-hidden bg-[#fafafa]">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                />

                {/* Quick Add Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className={`absolute bottom-4 left-1/2 -translate-x-1/2 px-6 py-3 flex items-center gap-2 text-sm tracking-wide transition-all duration-300 ${
                    addedItems.includes(product.id)
                      ? 'bg-green-600 text-white'
                      : 'bg-[#8b6d4b] text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0'
                  }`}
                >
                  {addedItems.includes(product.id) ? (
                    <>
                      <Check size={16} />
                      {config.addedToCartText || "Added"}
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={16} />
                      {config.addToCartText || "Add to Cart"}
                    </>
                  )}
                </button>
              </div>

              {/* Product Info */}
              <div className="p-5 bg-white">
                <span className="text-xs text-[#aea4a4] tracking-wide uppercase">{product.category}</span>
                <h3 className="font-serif text-xl text-black mt-1">{product.name}</h3>
                <p className="text-[#aea4a4] font-medium mt-2">
                  {/* Parsing to float ensures .toFixed works even if DRF sends it as a string */}
                  ${parseFloat(product.price.toString()).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View All Link */}
        {config.viewAllText && (
          <div className={`text-center mt-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '1200ms' }}>
            <button className="px-12 py-4 border-2 border-[#8b6d4b] text-[#8b6d4b] font-light tracking-widest text-sm hover:bg-[#8b6d4b] hover:text-white transition-all duration-300">
              {config.viewAllText}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;