'use client';

import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    
    // Close mobile menu if open
    setIsMenuOpen(false);
    
    // Find the target element
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      // Calculate offset for fixed navbar (navbar height + some padding)
      const navbarHeight = 64; // h-16 = 4rem = 64px
      const offset = navbarHeight + 20; // Extra 20px padding
      
      // Get element position
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      // Temporarily disable smooth scroll, jump instantly, then re-enable if needed
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, offsetPosition);
      // Force a reflow to ensure instant jump
      void document.documentElement.offsetHeight;
      // Re-enable smooth scroll for other navigation (optional)
      // document.documentElement.style.scrollBehavior = '';
    }
  };

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/80 border-b border-amber-200/30 text-amber-900 shadow-lg"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <a 
              href="#hero" 
              onClick={(e) => handleNavClick(e, 'hero')}
              className="flex-shrink-0 flex items-center focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-lg px-2 py-1"
              aria-label="Shakshuka - Go to homepage"
            >
              <img 
                src="/icon.ico" 
                alt="" 
                className="w-8 h-8 mr-3"
                aria-hidden="true"
              />
              <span className="text-xl font-bold">Shakshuka</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <ul className="ml-10 flex items-baseline space-x-8" role="list">
              <li role="none">
                <a 
                  href="#hero" 
                  onClick={(e) => handleNavClick(e, 'hero')} 
                  className="text-amber-800 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-lg"
                >
                  Home
                </a>
              </li>
              <li role="none">
                <a 
                  href="#features" 
                  onClick={(e) => handleNavClick(e, 'features')} 
                  className="text-amber-800 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-lg"
                >
                  Features
                </a>
              </li>
              <li role="none">
                <a 
                  href="#explainer" 
                  onClick={(e) => handleNavClick(e, 'explainer')} 
                  className="text-amber-800 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-lg"
                >
                  How It Works
                </a>
              </li>
              <li role="none">
                <a 
                  href="#pricing" 
                  onClick={(e) => handleNavClick(e, 'pricing')} 
                  className="text-amber-800 hover:text-amber-600 px-3 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-lg"
                >
                  Pricing
                </a>
              </li>
              <li role="none">
                <a 
                  href="#download" 
                  onClick={(e) => handleNavClick(e, 'download')} 
                  className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-warm-orange text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  Download
                </a>
              </li>
            </ul>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-amber-800 hover:text-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-lg p-2 transition-colors"
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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
        <div className="md:hidden" id="mobile-menu">
          <ul className="px-2 pt-2 pb-3 space-y-1 sm:px-3 backdrop-blur-md bg-white/90 border-t border-amber-200/30" role="list">
            <li role="none">
              <a 
                href="#hero" 
                onClick={(e) => handleNavClick(e, 'hero')} 
                className="text-amber-800 hover:text-amber-600 block px-3 py-2 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-lg"
              >
                Home
              </a>
            </li>
            <li role="none">
              <a 
                href="#features" 
                onClick={(e) => handleNavClick(e, 'features')} 
                className="text-amber-800 hover:text-amber-600 block px-3 py-2 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-lg"
              >
                Features
              </a>
            </li>
            <li role="none">
              <a 
                href="#explainer" 
                onClick={(e) => handleNavClick(e, 'explainer')} 
                className="text-amber-800 hover:text-amber-600 block px-3 py-2 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-lg"
              >
                How It Works
              </a>
            </li>
            <li role="none">
              <a 
                href="#pricing" 
                onClick={(e) => handleNavClick(e, 'pricing')} 
                className="text-amber-800 hover:text-amber-600 block px-3 py-2 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-lg"
              >
                Pricing
              </a>
            </li>
            <li role="none">
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')} 
                className="text-amber-800 hover:text-amber-600 block px-3 py-2 text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-lg"
              >
                Contact
              </a>
            </li>
            <li role="none">
              <a 
                href="#download" 
                onClick={(e) => handleNavClick(e, 'download')} 
                className="block px-3 py-2 rounded-full text-base font-medium transition-all duration-200 bg-warm-orange text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              >
                Download
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
