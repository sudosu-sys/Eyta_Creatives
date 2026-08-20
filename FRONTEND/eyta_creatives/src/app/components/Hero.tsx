// src/app/components/Hero.tsx
import Link from 'next/link'
import Image from 'next/image'

export default function Hero() {
  return (
    <main className="px-6 md:px-12 py-4 h-full grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-[1600px] mx-auto items-center">
      {/* Left Column: Text Content */}
      <div className="flex flex-col justify-center">
        {/* Top Badge */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center text-white">
            {/* Abstract logo icon */}
            <svg viewBox="0 0 100 100" width="16" height="16" className="fill-current">
              <circle cx="25" cy="50" r="20" />
              <circle cx="75" cy="50" r="20" />
            </svg>
          </div>
          <div>
            <p className="font-bold text-sm text-black">20M+ User</p>
            <p className="text-sm text-black/60">
              Read Our <Link href="#" className="text-black underline decoration-1 underline-offset-2 font-medium">Success Stories</Link>
            </p>
          </div>
        </div>

        {/* Main Heading */}
        <h1 
          className="text-[120px] leading-[0.9] tracking-tight text-black flex items-start mb-8" 
          style={{ fontFamily: 'var(--font-zodiak), serif' }}
        >
          Eyta<span className="text-6xl mt-4 font-sans font-light">+</span>
        </h1>

        <div className="h-px bg-black/10 w-full max-w-md mb-8" />

        {/* Subtext */}
        <p className="text-xl text-black/80 max-w-md mb-8 leading-relaxed">
          Drive Sales Growth, And Harness Ai-Powered User Content — Up To 50× Faster.
        </p>

        {/* Review Section */}
        <div className="flex items-center gap-6 mb-8">
          {/* Avatar Placeholder */}
          <div className="relative">
            <div className="w-10 h-10 rounded-full bg-gray-400 overflow-hidden border border-black/10">
              {/* Insert Avatar Image Here */}
            </div>
            {/* Decorative spark marks */}
            <svg className="absolute -top-3 -left-3 w-6 h-6 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v4M5 5l3 3M2 12h4" strokeLinecap="round"/>
            </svg>
          </div>
          <div className="text-sm">
            <div className="flex items-center gap-2">
              <span className="text-black/80">Loved the performance</span>
              <span className="text-black/30">/</span>
              <span className="font-bold flex items-center gap-1">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                4.9
              </span>
            </div>
            <p className="text-black/60 mt-0.5">100% Satisfied</p>
          </div>
        </div>

        <div className="h-px bg-black/10 w-full max-w-md mb-8" />

        {/* CTA Buttons */}
        <div className="flex items-center gap-8">
          <Link 
            href="#" 
            className="bg-black text-white px-8 py-3.5 rounded-full font-medium text-sm hover:bg-black/90 transition-colors"
          >
            Book Now 
          </Link>
          <Link 
            href="#" 
            className="text-sm font-medium text-black flex items-center gap-1 hover:opacity-70 transition-opacity"
          >
            Our Pricing 
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </Link>
        </div>
      </div>

      {/* Right Column: Visuals */}
      <div className="relative w-full h-full flex justify-center items-center">
        {/* Main Model Image */}
        <div className="relative z-10 w-full h-full bg-black/5 rounded-3xl overflow-hidden flex items-center justify-center border border-black/5">
          <Image 
            src="/header.png" 
            alt="Main Model" 
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </main>
  )
}