// src/app/page.tsx
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Gallery from './components/Gallery'
import Pricing from './components/Pricing'

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#F0F1F3]">
      {/* Container background updated to match the silver gradient in the design */}
      <div className="h-[95vh] flex flex-col bg-gradient-to-br from-[#e4e4e4] via-[#efefef] to-[#f4f4f4] m-4 md:m-8 mb-0 rounded-[32px] overflow-hidden shrink-0">
        <Navbar />
        <div className="flex-1 overflow-hidden relative">
          <Hero />
        </div>
      </div>
      
      <Marquee />
      <Gallery />
      <Pricing />
    </div>
  )
}