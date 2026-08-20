// src/app/components/Marquee.tsx
import Link from 'next/link'

export default function Marquee() {
  const logos = [
    { name: 'Instagram', url: '/instagram.png', href: 'https://instagram.com' },
    { name: 'TikTok', url: '/tiktok.png', href: 'https://tiktok.com' },
    { name: 'Facebook', url: '/facebook.png', href: 'https://facebook.com' },
    { name: 'Telegram', url: '/telegram.png', href: 'https://t.me' },
  ]

  return (
    <section className="marquee-wrapper w-full py-4 md:py-6 bg-[#F0F1F3] shrink-0 overflow-hidden flex items-center">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .marquee-wrapper:hover .animate-marquee {
          animation-play-state: paused !important;
        }
      `}</style>
      <div className="flex flex-nowrap w-max animate-marquee">
        {[...logos, ...logos, ...logos, ...logos].map((logo, idx) => (
          <div key={idx} className="flex shrink-0 items-center justify-center px-12 md:px-20">
            <Link href={logo.href} target="_blank" rel="noopener noreferrer">
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="h-16 md:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300"
              />
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}