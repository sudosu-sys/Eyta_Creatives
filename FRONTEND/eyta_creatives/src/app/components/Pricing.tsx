'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Pricing() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const plans = [
    {
      name: 'Basic',
      price: '14,499',
      features: ['3 posts/week', 'SEO', '2 shooting days/month', 'Full social media management', 'Free website'],
      isPopular: false
    },
    {
      name: 'Standard',
      price: '18,999',
      features: ['3 posts/week', 'SEO', '4 shooting days/month', 'Full social media management', 'Free website'],
      isPopular: true
    },
    {
      name: 'Premium',
      price: '27,499',
      features: ['4 posts/week', 'SEO', '8 shooting days/month', 'Full social media management', 'Free website'],
      isPopular: false
    }
  ]

  return (
    <section className="w-full max-w-[1600px] mx-auto px-6 md:px-12 py-16 md:py-24 bg-[#F0F1F3]">
      <div className="flex flex-col items-center mb-16">
        <h2 
          className="text-5xl md:text-7xl tracking-tight text-black mb-4"
          style={{ fontFamily: 'var(--font-zodiak), serif' }}
        >
          Choose Your Plan
        </h2>
        <p className="text-black/80 text-center max-w-md">
          Scale your growth with our flexible pricing packages.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, idx) => (
          <div 
            key={idx} 
            className={`relative p-8 rounded-2xl border ${
              plan.isPopular 
                ? 'bg-black text-white border-black shadow-xl md:-translate-y-4 z-10' 
                : 'bg-white text-black border-black/10 shadow-sm'
            } flex flex-col`}
          >
            {plan.isPopular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#ff5c35] text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
            )}
            
            <h3 className={`text-xl font-medium mb-4 ${plan.isPopular ? 'text-white/80' : 'text-black/80'}`}>
              {plan.name}
            </h3>
            
            <div className="mb-8">
              <span className="text-5xl font-bold">{plan.price}</span>
              <span className={`text-sm ml-1 ${plan.isPopular ? 'text-white/60' : 'text-black/50'}`}>Birr/mo</span>
            </div>
            
            <ul className="flex-1 space-y-4 mb-8">
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-3">
                  <svg className={`w-5 h-5 shrink-0 mt-0.5 ${plan.isPopular ? 'text-[#ff5c35]' : 'text-black'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className={`text-sm leading-relaxed ${plan.isPopular ? 'text-white/90' : 'text-black/80'}`}>
                    {feature}
                  </span>
                </li>
              ))}
            </ul>

            <button 
              onClick={() => setIsModalOpen(true)}
              className={`w-full py-3.5 rounded-full font-medium text-sm text-center transition-colors ${
                plan.isPopular 
                  ? 'bg-white text-black hover:bg-white/90' 
                  : 'bg-black text-white hover:bg-black/90'
              }`}
            >
              Call Now
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-sm relative shadow-2xl border border-black/5">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-black/40 hover:text-black transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <h3 className="text-2xl font-bold text-black mb-2" style={{ fontFamily: 'var(--font-zodiak), serif' }}>Get in Touch</h3>
            <p className="text-sm text-black/60 mb-6">Tap a number below to place a call.</p>
            <div className="flex flex-col gap-3">
              <a href="tel:0991005292" className="w-full py-3.5 bg-black/5 hover:bg-black hover:text-white transition-colors text-black font-medium text-sm rounded-xl text-center">
                0991005292
              </a>
              <a href="tel:0996520752" className="w-full py-3.5 bg-black/5 hover:bg-black hover:text-white transition-colors text-black font-medium text-sm rounded-xl text-center">
                0996520752
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}