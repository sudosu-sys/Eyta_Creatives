// ─── Site ────────────────────────────────────────────────────────────────────

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Eyta Creatives | Luxury Photography & Videography",
  description: "Eyta Creatives is a premier photography and videography studio crafting visual stories for luxury brands, high-end weddings, and exclusive events. Where artistry meets excellence.",
  language: "en",
};

// ─── Navigation ──────────────────────────────────────────────────────────────

export interface MenuLink {
  label: string;
  href: string;
}

export interface SocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface NavigationConfig {
  brandName: string;
  menuLinks: MenuLink[];
  socialLinks: SocialLink[];
  searchPlaceholder: string;
  cartEmptyText: string;
  cartCheckoutText: string;
  continueShoppingText: string;
  menuBackgroundImage: string;
}

export const navigationConfig: NavigationConfig = {
  brandName: "EYTA CREATIVES",
  menuLinks: [
    { label: "Home", href: "#hero" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Services", href: "#services" },
    { label: "About", href: "#about" },
    { label: "Journal", href: "#journal" },
    { label: "Contact", href: "#contact" },
  ],
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "Facebook", label: "Facebook", href: "https://facebook.com" },
    { icon: "Twitter", label: "Twitter", href: "https://twitter.com" },
  ],
  searchPlaceholder: "Search our work...",
  cartEmptyText: "Your inquiry list is empty",
  cartCheckoutText: "Send Inquiry",
  continueShoppingText: "Continue Browsing",
  menuBackgroundImage: "/images/menu-bg.jpg",
};

// ─── Hero ────────────────────────────────────────────────────────────────────

export interface HeroConfig {
  tagline: string;
  title: string;
  ctaPrimaryText: string;
  ctaPrimaryTarget: string;
  ctaSecondaryText: string;
  ctaSecondaryTarget: string;
  backgroundImage: string;
}

export const heroConfig: HeroConfig = {
  tagline: "LUXURY VISUAL STORYTELLING",
  title: "Where Light\nMeets\nLegacy",
  ctaPrimaryText: "View Our Work",
  ctaPrimaryTarget: "#portfolio",
  ctaSecondaryText: "Get in Touch",
  ctaSecondaryTarget: "#contact",
  backgroundImage: "/images/hero-bg.jpg",
};

// ─── SubHero ─────────────────────────────────────────────────────────────────

export interface Stat {
  value: number;
  suffix: string;
  label: string;
}

export interface SubHeroConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  linkText: string;
  linkTarget: string;
  image1: string;
  image2: string;
  stats: Stat[];
}

export const subHeroConfig: SubHeroConfig = {
  tag: "OUR PHILOSOPHY",
  heading: "Crafting Visual Excellence",
  bodyParagraphs: [
    "At Eyta Creatives, we believe every frame tells a story. Our approach combines technical mastery with artistic vision, creating imagery that transcends the ordinary and captures the essence of luxury.",
    "From high-fashion editorials to exclusive events, we bring the same dedication to perfection. Every project is an opportunity to create something extraordinary—images and films that resonate with elegance and timeless sophistication."
  ],
  linkText: "Discover Our Story",
  linkTarget: "#about",
  image1: "/images/subhero-1.jpg",
  image2: "/images/subhero-2.jpg",
  stats: [
    { value: 12, suffix: "+", label: "Years of Excellence" },
    { value: 500, suffix: "+", label: "Projects Delivered" },
    { value: 98, suffix: "%", label: "Client Satisfaction" },
  ],
};

// ─── Video Section ───────────────────────────────────────────────────────────

export interface VideoSectionConfig {
  tag: string;
  heading: string;
  bodyParagraphs: string[];
  ctaText: string;
  ctaTarget: string;
  backgroundImage: string;
}

export const videoSectionConfig: VideoSectionConfig = {
  tag: "CINEMATIC STORYTELLING",
  heading: "Films That\nCaptivate",
  bodyParagraphs: [
    "Our videography services transform moments into cinematic experiences. Using state-of-the-art equipment and innovative techniques, we create films that evoke emotion and leave lasting impressions.",
    "From brand documentaries to wedding films, every project receives our signature attention to detail and commitment to storytelling excellence."
  ],
  ctaText: "Explore Our Films",
  ctaTarget: "#portfolio",
  backgroundImage: "/images/video-section.jpg",
};

// ─── Products (Portfolio) ────────────────────────────────────────────────────

export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

export interface ProductsConfig {
  tag: string;
  heading: string;
  description: string;
  viewAllText: string;
  addToCartText: string;
  addedToCartText: string;
  categories: string[];
  products: Product[];
}

export const productsConfig: ProductsConfig = {
  tag: "OUR PORTFOLIO",
  heading: "Selected Works",
  description: "A curated collection of our finest photography and videography projects, showcasing our versatility and commitment to excellence across various industries.",
  viewAllText: "View All Projects",
  addToCartText: "Inquire About This",
  addedToCartText: "Added to Inquiry",
  categories: ["All", "Portrait", "Product", "Real Estate", "Automotive", "Culinary"],
  products: [
    { id: 1, name: "Ethereal Portrait Series", price: 0, category: "Portrait", image: "/images/portfolio-1.jpg" },
    { id: 2, name: "Luxury Watch Campaign", price: 0, category: "Product", image: "/images/portfolio-2.jpg" },
    { id: 3, name: "Penthouse Living", price: 0, category: "Real Estate", image: "/images/portfolio-3.jpg" },
    { id: 4, name: "Midnight Sports Car", price: 0, category: "Automotive", image: "/images/portfolio-4.jpg" },
    { id: 5, name: "Haute Couture Editorial", price: 0, category: "Portrait", image: "/images/portfolio-5.jpg" },
    { id: 6, name: "Michelin Star Plating", price: 0, category: "Culinary", image: "/images/portfolio-6.jpg" },
  ],
};

// ─── Features (Services) ─────────────────────────────────────────────────────

export interface Feature {
  icon: "Truck" | "ShieldCheck" | "Leaf" | "Heart";
  title: string;
  description: string;
}

export interface FeaturesConfig {
  features: Feature[];
}

export const featuresConfig: FeaturesConfig = {
  features: [
    {
      icon: "ShieldCheck",
      title: "Premium Equipment",
      description: "State-of-the-art cameras, lenses, and lighting equipment ensuring the highest quality output for every project."
    },
    {
      icon: "Heart",
      title: "Artistic Direction",
      description: "Experienced creative directors who bring unique vision and sophisticated aesthetics to every shoot."
    },
    {
      icon: "Truck",
      title: "Full Production",
      description: "End-to-end service from concept development to final delivery, including styling, location scouting, and post-production."
    },
    {
      icon: "Leaf",
      title: "Bespoke Experience",
      description: "Tailored solutions designed around your unique needs, ensuring a personalized and exclusive service."
    },
  ],
};

// ─── Blog (Journal) ──────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
}

export interface BlogConfig {
  tag: string;
  heading: string;
  viewAllText: string;
  readMoreText: string;
  posts: BlogPost[];
}

export const blogConfig: BlogConfig = {
  tag: "JOURNAL",
  heading: "Latest Stories",
  viewAllText: "View All Articles",
  readMoreText: "Read More",
  posts: [
    {
      id: 1,
      title: "The Art of Capturing Timeless Wedding Moments",
      date: "February 15, 2026",
      image: "/images/blog-1.jpg",
      excerpt: "Discover the techniques and philosophy behind creating wedding photographs that stand the test of time."
    },
    {
      id: 2,
      title: "Behind the Scenes: Luxury Brand Campaign",
      date: "January 28, 2026",
      image: "/images/blog-2.jpg",
      excerpt: "An exclusive look at the creative process behind our latest high-end commercial production."
    },
    {
      id: 3,
      title: "Mastering Light: Workshop Highlights",
      date: "January 10, 2026",
      image: "/images/blog-3.jpg",
      excerpt: "Key insights from our recent masterclass on advanced lighting techniques for portrait photography."
    },
  ],
};

// ─── FAQ ─────────────────────────────────────────────────────────────────────

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

export interface FaqConfig {
  tag: string;
  heading: string;
  ctaText: string;
  ctaTarget: string;
  faqs: FaqItem[];
}

export const faqConfig: FaqConfig = {
  tag: "FAQ",
  heading: "Common Questions",
  ctaText: "Have more questions? Contact us",
  ctaTarget: "#contact",
  faqs: [
    {
      id: 1,
      question: "What services does Eyta Creatives offer?",
      answer: "We specialize in luxury photography and videography services including brand campaigns, portrait sessions, product photography, real estate visualization, event coverage, and cinematic films. Each project is tailored to meet your specific vision and requirements."
    },
    {
      id: 2,
      question: "How far in advance should I book?",
      answer: "For weddings and major events, we recommend booking 6-12 months in advance. For commercial projects and portrait sessions, 2-4 weeks notice is typically sufficient. However, we occasionally accommodate rush projects—please reach out to discuss your timeline."
    },
    {
      id: 3,
      question: "What is your pricing structure?",
      answer: "Our pricing is project-based and depends on scope, duration, location, and deliverables. We offer bespoke packages starting from premium rates. Contact us for a detailed quote tailored to your specific needs."
    },
    {
      id: 4,
      question: "Do you travel for destination projects?",
      answer: "Absolutely. We regularly travel worldwide for destination weddings, luxury brand campaigns, and exclusive events. Our team is experienced in working across diverse locations and cultures."
    },
    {
      id: 5,
      question: "What is included in the final deliverables?",
      answer: "Deliverables vary by project but typically include professionally edited high-resolution images, cinematic films, and digital galleries. We also offer premium albums, prints, and custom packaging for an additional fee."
    },
  ],
};

// ─── About ───────────────────────────────────────────────────────────────────

export interface AboutSection {
  tag: string;
  heading: string;
  paragraphs: string[];
  quote: string;
  attribution: string;
  image: string;
  backgroundColor: string;
  textColor: string;
}

export interface AboutConfig {
  sections: AboutSection[];
}

export const aboutConfig: AboutConfig = {
  sections: [
    {
      tag: "ABOUT EYTA",
      heading: "A Legacy of Visual Excellence",
      paragraphs: [
        "Founded over a decade ago, Eyta Creatives has established itself as a premier destination for luxury photography and videography. Our journey began with a simple belief: that exceptional imagery has the power to transcend time.",
        "Today, we collaborate with the world's most discerning clients—from luxury brands and high-profile individuals to exclusive venues and publications. Our work has been featured in Vogue, Harper's Bazaar, and numerous international campaigns."
      ],
      quote: "",
      attribution: "",
      image: "/images/about-1.jpg",
      backgroundColor: "#1a1a1a",
      textColor: "#ffffff",
    },
    {
      tag: "OUR VISION",
      heading: "Creating Timeless Art",
      paragraphs: [],
      quote: "Every photograph should be a masterpiece. Every film should tell a story that lingers in the heart long after the credits roll.",
      attribution: "— Elena Voss, Creative Director",
      image: "/images/about-2.jpg",
      backgroundColor: "#2d2d2d",
      textColor: "#ffffff",
    },
  ],
};

// ─── Contact ─────────────────────────────────────────────────────────────────

export interface FormFields {
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
}

export interface ContactConfig {
  heading: string;
  description: string;
  locationLabel: string;
  location: string;
  emailLabel: string;
  email: string;
  phoneLabel: string;
  phone: string;
  formFields: FormFields;
  submitText: string;
  submittingText: string;
  submittedText: string;
  successMessage: string;
  backgroundImage: string;
}

export const contactConfig: ContactConfig = {
  heading: "Let's Create Together",
  description: "Ready to bring your vision to life? We'd love to hear about your project. Reach out and let's discuss how we can create something extraordinary together.",
  locationLabel: "Studio",
  location: "245 Park Avenue, Suite 1200\nNew York, NY 10167",
  emailLabel: "Email",
  email: "hello@eytacreatives.com",
  phoneLabel: "Phone",
  phone: "+1 (212) 555-0147",
  formFields: {
    nameLabel: "Your Name",
    namePlaceholder: "Enter your full name",
    emailLabel: "Email Address",
    emailPlaceholder: "your@email.com",
    messageLabel: "Tell Us About Your Project",
    messagePlaceholder: "Share your vision, timeline, and any specific requirements...",
  },
  submitText: "Send Inquiry",
  submittingText: "Sending...",
  submittedText: "Sent",
  successMessage: "Thank you for reaching out. We'll be in touch within 24 hours to discuss your project.",
  backgroundImage: "/images/contact-bg.jpg",
};

// ─── Footer ──────────────────────────────────────────────────────────────────

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterLinkGroup {
  title: string;
  links: FooterLink[];
}

export interface FooterSocialLink {
  icon: string;
  label: string;
  href: string;
}

export interface FooterConfig {
  brandName: string;
  brandDescription: string;
  newsletterHeading: string;
  newsletterDescription: string;
  newsletterPlaceholder: string;
  newsletterButtonText: string;
  newsletterSuccessText: string;
  linkGroups: FooterLinkGroup[];
  legalLinks: FooterLink[];
  copyrightText: string;
  socialLinks: FooterSocialLink[];
}

export const footerConfig: FooterConfig = {
  brandName: "EYTA CREATIVES",
  brandDescription: "Luxury photography and videography studio crafting timeless visual stories for the world's most discerning clients.",
  newsletterHeading: "Stay Inspired",
  newsletterDescription: "Subscribe to receive updates on our latest work, behind-the-scenes content, and exclusive insights.",
  newsletterPlaceholder: "Enter your email",
  newsletterButtonText: "Subscribe",
  newsletterSuccessText: "Welcome to the Eyta community.",
  linkGroups: [
    {
      title: "Services",
      links: [
        { label: "Portrait Photography", href: "#" },
        { label: "Commercial Films", href: "#" },
        { label: "Product Photography", href: "#" },
        { label: "Event Coverage", href: "#" },
        { label: "Real Estate", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "#about" },
        { label: "Our Team", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Press", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Journal", href: "#journal" },
        { label: "Pricing", href: "#" },
        { label: "FAQ", href: "#" },
        { label: "Contact", href: "#contact" },
      ],
    },
  ],
  legalLinks: [
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
  copyrightText: "© 2026 Eyta Creatives. All rights reserved.",
  socialLinks: [
    { icon: "Instagram", label: "Instagram", href: "https://instagram.com" },
    { icon: "Facebook", label: "Facebook", href: "https://facebook.com" },
    { icon: "Twitter", label: "Twitter", href: "https://twitter.com" },
  ],
};
