// src/app/components/Navbar.tsx
'use client'

import Link from 'next/link'

const navLinks = [
  { name: 'Product', href: '/product' },
  { name: 'Solutions', href: '/solutions' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Developers', href: '/developers' },
]

export default function Navbar() {
  return (
    <nav className="w-full bg-white px-6 py-4 md:px-12 flex items-center justify-between text-sm font-normal text-black font-sans">
      {/* Left side: Logo and Email */}
      <div className="flex items-center gap-3">
        {/* Abstract double-dot logo */}
        <svg 
          viewBox="0 0 100 100" 
          width="24" 
          height="24" 
          className="fill-current"
        >
          <circle cx="25" cy="50" r="20" />
          <circle cx="75" cy="50" r="20" />
        </svg>
        <Link href="mailto:Sales@reelers.io" className="text-black/80 hover:text-black">
          / Sales@reelers.io
        </Link>
      </div>

      {/* Center section: Navigation links */}
      <div className="flex items-center gap-1.5 text-black/90">
        {navLinks.map((link, index) => (
          <div key={link.name} className="flex items-center">
            <Link 
              href={link.href} 
              className="hover:text-black hover:font-medium transition-all"
            >
              {link.name}
            </Link>
            {/* Dot separator, unless it's the last item */}
            {index < navLinks.length - 1 && (
              <span className="mx-2 text-black/50">.</span>
            )}
          </div>
        ))}
      </div>

      {/* Right section: Vertical bar, Login, Button */}
      <div className="flex items-center gap-4">
        {/* Vertical Separator */}
        <span className="h-4 w-px bg-black/20" aria-hidden="true"></span>
        
        <Link href="/login" className="text-black/90 hover:text-black">
          Log in
        </Link>
        
        {/* Get it Now Button */}
        <Link 
          href="/signup" 
          className="bg-black text-white px-6 py-2.5 rounded-full font-medium text-xs hover:bg-black/90 transition-colors"
        >
          Get it Now — It’s Free
        </Link>
      </div>
    </nav>
  )
}