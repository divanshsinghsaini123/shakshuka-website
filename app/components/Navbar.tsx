'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-amber-200/30 text-amber-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img 
                src="/icon.ico" 
                alt="Shakshuka Logo" 
                className="w-8 h-8 mr-3"
              />
              <span className="text-xl font-bold">Shakshuka</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#hero" className="text-amber-800 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                Home
              </a>
              <a href="#features" className="text-amber-800 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                Features
              </a>
              <a href="#explainer" className="text-amber-800 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                How It Works
              </a>
              <a href="#pricing" className="text-amber-800 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                Pricing
              </a>
              <a href="#contact" className="text-amber-800 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors">
                Contact
              </a>
              <a href="#download" className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-200" style={{ backgroundColor: '#E88D3F', color: 'white' }}>
                Download
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-amber-800 hover:text-amber-600 focus:outline-none focus:text-amber-600 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 backdrop-blur-md bg-white/90 border-t border-amber-200/30">
            <a href="#hero" className="text-amber-800 hover:text-amber-600 block px-3 py-2 text-base font-medium transition-colors">
              Home
            </a>
            <a href="#features" className="text-amber-800 hover:text-amber-600 block px-3 py-2 text-base font-medium transition-colors">
              Features
            </a>
            <a href="#explainer" className="text-amber-800 hover:text-amber-600 block px-3 py-2 text-base font-medium transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-amber-800 hover:text-amber-600 block px-3 py-2 text-base font-medium transition-colors">
              Pricing
            </a>
            <a href="#contact" className="text-amber-800 hover:text-amber-600 block px-3 py-2 text-base font-medium transition-colors">
              Contact
            </a>
            <a href="#download" className="block px-3 py-2 rounded-full text-base font-medium transition-all duration-200" style={{ backgroundColor: '#E88D3F', color: 'white' }}>
              Download
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
