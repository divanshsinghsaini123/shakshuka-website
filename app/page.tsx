'use client';

import { useState, useEffect } from 'react';
import SplitText from './components/SplitText';
import Feature from './components/Feature';
import HeroFeature from './components/HeroFeature';
import ComparisonTable from './components/ComparisonTable';
import { getDownloadCounts, incrementDownload } from '../lib/downloads';
import DownloadStats from './components/DownloadStats';
import ErrorToast from './components/ErrorToast';

export default function Home() {
  const [downloadCounts, setDownloadCounts] = useState({ windows: 0, mac: 0, linux: 0 });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [toastError, setToastError] = useState<string | null>(null);

  // Load download counts on mount
  useEffect(() => {
    let mounted = true;
    setIsLoading(true);
    setError(null);
    console.log("this is the link 0-----"+ process.env['NEXT_PUBLIC_DOWNLOAD_URL']);
    getDownloadCounts()
      .then(c => {
        if (mounted) {
          setDownloadCounts(c);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          const errorMessage = err instanceof Error ? err.message : 'Failed to load download statistics';
          console.error('[Home] Error loading download counts:', err);
          setError(errorMessage);
          setIsLoading(false);
        }
      });
    
    return () => { mounted = false; };
  }, []);
  const features = [
    {
      title: 'Task Management',
      description: 'Create, edit, and organize tasks with beautiful drag-and-drop interface. Set priorities, due dates, and categories.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
      gradient: 'bg-gradient-to-r from-amber-400 to-amber-500'
    },
    {
      title: 'Daily Planner',
      description: 'Visual task scheduling with hourly time slots. Drag-and-drop interface for intuitive planning.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
      gradient: 'bg-gradient-to-r from-orange-400 to-orange-500'
    },
    {
      title: 'Data Security',
      description: 'Encrypted local storage keeps your data secure. Export/import functionality with complete privacy.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
      gradient: 'bg-gradient-to-r from-yellow-500 to-yellow-600'
    },
    {
      title: 'Auto-Start',
      description: 'Windows autostart integration. Auto-save functionality and productivity tracking.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />,
      gradient: 'bg-gradient-to-r from-amber-500 to-orange-500'
    },
    {
      title: 'Analytics',
      description: 'Dashboard with producrtivity stats, task completion streaks, and performance insights.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
      gradient: 'bg-gradient-to-r from-orange-500 to-amber-500'
    },
    {
      title: 'Beautiful UI',
      description: 'Glassmorphism effects, smooth animations, and meditation-app inspired design.',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />,
      gradient: 'bg-gradient-to-r from-yellow-400 to-amber-500'
    },
  ];
  const heroFeatures = [
    {
      number: 1,
      title: 'Create Tasks',
      description: 'Add tasks with priorities, categories, and due dates. Organize your work with beautiful drag-and-drop interface.',
      videoSrc: 'Task_final',
      animationDelay: 0.1,
      gradientFrom: 'from-amber-500',
      gradientTo: 'to-orange-600',
      hoverTextColor: 'group-hover:text-amber-800'
    },
    {
      number: 2,
      title: 'Plan Your Day',
      description: 'Schedule tasks in your daily planner with hourly time slots. Visual planning made simple and intuitive.',
      videoSrc: 'planner_final',
      animationDelay: 0.2,
      gradientFrom: 'from-orange-500',
      gradientTo: 'to-red-600',
      hoverTextColor: 'group-hover:text-orange-800'
    },
    {
      number: 3,
      title: 'Strike Tasks',
      description: 'Complete your daily tasks with satisfying strike-through animations. Build momentum and stay motivated.',
      videoSrc: 'strike_final',
      animationDelay: 0.3,
      gradientFrom: 'from-yellow-500',
      gradientTo: 'to-amber-600',
      hoverTextColor: 'group-hover:text-yellow-800'
    },
    {
      number: 4,
      title: 'Track Progress',
      description: 'Monitor your productivity with analytics, streaks, and insights. Your data stays secure with encrypted storage.',
      videoSrc: 'analytics_final',
      animationDelay: 0.4,
      gradientFrom: 'from-red-500',
      gradientTo: 'to-pink-600',
      hoverTextColor: 'group-hover:text-red-800'
    },
    {
      number: 5,
      title: 'Import Tasks',
      description: 'Seamlessly import your existing tasks from other platforms. Migrate your workflow without losing momentum.',
      videoSrc: 'import_final',
      animationDelay: 0.5,
      gradientFrom: 'from-purple-500',
      gradientTo: 'to-indigo-600',
      hoverTextColor: 'group-hover:text-purple-800'
    },
    {
      number: 6,
      title: 'Auto-Start',
      description: 'Windows autostart integration ensures your productivity tool is always ready when you need it.',
      videoSrc: 'startup_final',
      animationDelay: 0.6,
      gradientFrom: 'from-green-500',
      gradientTo: 'to-teal-600',
      hoverTextColor: 'group-hover:text-green-800'
    },
    {
      number: 7,
      title: 'Quick Add',
      description: 'Add tasks instantly with quick add functionality. Capture your thoughts and ideas without interrupting your flow.',
      videoSrc: 'quick add',
      animationDelay: 0.7,
      gradientFrom: 'from-blue-500',
      gradientTo: 'to-cyan-600',
      hoverTextColor: 'group-hover:text-blue-800'
    },
    {
      number: 8,
      title: 'Privacy First',
      description: 'Your data stays secure with local encrypted storage. Complete privacy and control over your information.',
      videoSrc: 'lock',
      animationDelay: 0.8,
      gradientFrom: 'from-indigo-500',
      gradientTo: 'to-purple-600',
      hoverTextColor: 'group-hover:text-indigo-800'
    }
  ];
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero FeatureSection */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-gradient-to-br from-amber-100/20 to-orange-100/20"></div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-amber-200 to-orange-200 rounded-full blur-xl opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-full blur-xl opacity-40 animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-orange-200 to-red-200 rounded-full blur-lg opacity-50 animate-pulse"></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-6 sm:p-8 md:p-12 border border-white/20 shadow-2xl">
          <SplitText 
              text="Shakshuka"
            tag="h1"
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 text-amber-800"
            splitType="chars"
            delay={50}
            duration={0.8}
            from={{ opacity: 0, y: 50 }}
            to={{ opacity: 1, y: 0 }}
            onLetterAnimationComplete={() => {}}
          />
          <SplitText 
              text="Modern Task Management"
              tag="h2"
              className="text-xl sm:text-2xl md:text-3xl font-light mb-6 sm:mb-8 text-amber-800"
            splitType="words"
              delay={200}
            duration={0.6}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            onLetterAnimationComplete={() => {}}
          />
            <SplitText 
              text="Find your flow. Transform chaos into calm with mindful task management that nurtures focus and inner peace."
              className="text-sm sm:text-base md:text-lg mb-8 sm:mb-12 max-w-3xl mx-auto text-amber-700 leading-relaxed px-4"
              splitType="words"
              delay={300}
              duration={0.6}
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              onLetterAnimationComplete={() => {}}
            />
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center" role="group" aria-label="Download options">
              <a 
                href={process.env['NEXT_PUBLIC_DOWNLOAD_URL']}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-amber-600 to-orange-600 text-white shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                onClick={async () => {
                  // e.preventDefault();
                  // Optimistically update UI
                  setDownloadCounts(prev => ({ ...prev, windows: prev.windows + 1 }));
                  
                  const result = await incrementDownload('windows');
                  if (!result.success && result.error) {
                    // Revert optimistic update on error
                    setDownloadCounts(prev => ({ ...prev, windows: Math.max(0, prev.windows - 1) }));
                    setToastError(result.error.message || 'Failed to track download. Please try again.');
                  }
                }}
                aria-label="Download Shakshuka for Windows"
              >
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                  </svg>
                  Windows
                </div>
              </a>
              <div className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-medium transition-all duration-300 border-2 border-dashed border-warm-orange text-secondary-brown opacity-70 cursor-not-allowed" aria-disabled="true" aria-label="Mac version coming soon" role="status">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span className="text-xs sm:text-base">Mac - Coming Soon</span>
                </div>
              </div>
              <div className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-base sm:text-lg font-medium transition-all duration-300 border-2 border-dashed border-warm-orange text-secondary-brown opacity-70 cursor-not-allowed" aria-disabled="true" aria-label="Linux version coming soon" role="status">
                <div className="flex items-center justify-center gap-2">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span className="text-xs sm:text-base">Linux - Coming Soon</span>
                </div>
              </div>
            </div>
            <div className="mt-6 sm:mt-8 flex justify-center px-4">
              <DownloadStats counts={downloadCounts} isLoading={isLoading} error={error} />
            </div>
            <a 
              href="#features" 
              className="mt-6 sm:mt-10 inline-flex items-center justify-center text-amber-700 hover:text-amber-800 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 rounded-lg p-2"
              aria-label="Scroll to features section"
            >
              <svg className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-amber-100/10 to-orange-100/10"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-amber-200 to-orange-200 border-2 border-amber-300 shadow-lg">
                <span className="text-sm sm:text-base font-bold text-amber-800">Features</span>
              </div>
              <SplitText 
                text="Powerful Features"
                tag="h2"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 md:mb-8 text-amber-800 drop-shadow-lg"
                splitType="words"
                delay={80}
                duration={0.7}
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                onLetterAnimationComplete={() => {}}
              />
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center text-amber-700 max-w-4xl mx-auto leading-relaxed font-medium px-4">
              Everything you need to organize your life and boost productivity
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {
              features.map((feature, index) =>(
                <Feature key={index} title={feature.title} description={feature.description} icon={feature.icon} gradient={feature.gradient} />
              ))
            }
          </div>
        </div>
      </section>

      {/* Explainer Section */}
      <section id="explainer" className="py-32 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="w-full h-full bg-gradient-to-br from-yellow-100/20 via-amber-100/20 to-orange-100/20"></div>
          {/* Floating geometric shapes */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-200/30 to-amber-200/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-orange-200/30 to-red-200/30 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-amber-200/30 to-yellow-200/30 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-yellow-200 to-amber-200 border-2 border-yellow-300 shadow-lg hover:scale-105 transition-transform duration-300">
                <span className="text-sm sm:text-base font-bold text-yellow-800">Process</span>
              </div>
              <SplitText 
                text="How It Works"
                tag="h2"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 md:mb-8 text-yellow-800 drop-shadow-lg"
                splitType="words"
                delay={60}
                duration={0.8}
                from={{ opacity: 0, y: 50 }}
                to={{ opacity: 1, y: 0 }}
                onLetterAnimationComplete={() => {}}
              />
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center text-yellow-700 max-w-4xl mx-auto leading-relaxed font-medium px-4">
              Simple, intuitive, and powerful task management designed for modern productivity
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {heroFeatures.map((feature) => (
                <HeroFeature
                  key={feature.number}
                  number={feature.number}
                  title={feature.title}
                  description={feature.description}
                  videoSrc={feature.videoSrc}
                  animationDelay={feature.animationDelay}
                  gradientFrom={feature.gradientFrom}
                  gradientTo={feature.gradientTo}
                  hoverTextColor={feature.hoverTextColor}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparison" className="py-32 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="w-full h-full bg-gradient-to-br from-yellow-100/20 via-amber-100/20 to-orange-100/20"></div>
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-yellow-200/30 to-amber-200/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-orange-200/30 to-red-200/30 rounded-full blur-xl animate-bounce"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-r from-amber-200/30 to-yellow-200/30 rounded-full blur-3xl animate-pulse"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-yellow-200 to-amber-200 border-2 border-yellow-300 shadow-lg">
                <span className="text-sm sm:text-base font-bold text-yellow-800">Compare</span>
              </div>
              <SplitText 
                text="Feature Comparison"
                tag="h2"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 md:mb-8 text-yellow-800 drop-shadow-lg"
                splitType="words"
                delay={60}
                duration={0.8}
                from={{ opacity: 0, y: 50 }}
                to={{ opacity: 1, y: 0 }}
                onLetterAnimationComplete={() => {}}
              />
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center text-yellow-700 max-w-4xl mx-auto leading-relaxed font-medium px-4">
              See how Shakshuka compares to other productivity tools
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <ComparisonTable
              apps={[
                {
                  name: 'Shakshuka',
                  features: {
                    'Calendar integration': true,
                    'Timeboxing': true,
                    'Task app integrations': true,
                    'Guided planning & rituals': true,
                    'Daily shutdown & highlights': true,
                    'Analytics': true,
                    'Security/Password protection': true,
                    'Local encrypted storage': true,
                    'Auto-start integration': true,
                    'Import/Export functionality': true,
                    'Task completion with strike-through': true,
                    'Advanced UI customization': true,
                    'Free & Open Source': true,
                  }
                },
                {
                  name: 'Sunsama',
                  features: {
                    'Calendar integration': true,
                    'Timeboxing': true,
                    'Task app integrations': true,
                    'Guided planning & rituals': true,
                    'Daily shutdown & highlights': true,
                    'Analytics': true,
                    'Security/Password protection': false,
                    'Local encrypted storage': false,
                    'Auto-start integration': false,
                    'Import/Export functionality': true,
                    'Task completion with strike-through': false,
                    'Advanced UI customization': false,
                    'Free & Open Source': false,
                  }
                },
                {
                  name: 'Trello',
                  features: {
                    'Calendar integration': true,
                    'Timeboxing': false,
                    'Task app integrations': true,
                    'Guided planning & rituals': false,
                    'Daily shutdown & highlights': false,
                    'Analytics': true,
                    'Security/Password protection': false,
                    'Local encrypted storage': false,
                    'Auto-start integration': false,
                    'Import/Export functionality': true,
                    'Task completion with strike-through': false,
                    'Advanced UI customization': false,
                    'Free & Open Source': false,
                  }
                },
                {
                  name: 'Basecamp',
                  features: {
                    'Calendar integration': true,
                    'Timeboxing': false,
                    'Task app integrations': false,
                    'Guided planning & rituals': false,
                    'Daily shutdown & highlights': false,
                    'Analytics': true,
                    'Security/Password protection': false,
                    'Local encrypted storage': false,
                    'Auto-start integration': false,
                    'Import/Export functionality': true,
                    'Task completion with strike-through': false,
                    'Advanced UI customization': false,
                    'Free & Open Source': false,
                  }
                },
                {
                  name: 'Asana',
                  features: {
                    'Calendar integration': true,
                    'Timeboxing': true,
                    'Task app integrations': true,
                    'Guided planning & rituals': false,
                    'Daily shutdown & highlights': false,
                    'Analytics': true,
                    'Security/Password protection': false,
                    'Local encrypted storage': false,
                    'Auto-start integration': false,
                    'Import/Export functionality': true,
                    'Task completion with strike-through': false,
                    'Advanced UI customization': false,
                    'Free & Open Source': false,
                  }
                },
                {
                  name: 'TickTick',
                  features: {
                    'Calendar integration': true,
                    'Timeboxing': true,
                    'Task app integrations': false,
                    'Guided planning & rituals': false,
                    'Daily shutdown & highlights': false,
                    'Analytics': true,
                    'Security/Password protection': false,
                    'Local encrypted storage': false,
                    'Auto-start integration': false,
                    'Import/Export functionality': true,
                    'Task completion with strike-through': false,
                    'Advanced UI customization': false,
                    'Free & Open Source': false,
                  }
                },
                {
                  name: 'Todoist',
                  features: {
                    'Calendar integration': true,
                    'Timeboxing': false,
                    'Task app integrations': false,
                    'Guided planning & rituals': false,
                    'Daily shutdown & highlights': false,
                    'Analytics': false,
                    'Security/Password protection': false,
                    'Local encrypted storage': false,
                    'Auto-start integration': false,
                    'Import/Export functionality': true,
                    'Task completion with strike-through': false,
                    'Advanced UI customization': false,
                    'Free & Open Source': false,
                  }
                },
              ]}
              features={[
                'Calendar integration',
                'Timeboxing',
                'Task app integrations',
                'Guided planning & rituals',
                'Daily shutdown & highlights',
                'Analytics',
                'Security/Password protection',
                'Local encrypted storage',
                'Auto-start integration',
                'Import/Export functionality',
                'Task completion with strike-through',
                'Advanced UI customization',
                'Free & Open Source',
              ]}
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-orange-200 to-red-200 border-2 border-orange-300 shadow-lg">
                <span className="text-sm sm:text-base font-bold text-orange-800">Open Source</span>
              </div>
              <SplitText 
                text="Open Source & Support"
                tag="h2"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black mb-4 sm:mb-6 md:mb-8 text-orange-800 drop-shadow-lg"
                splitType="words"
                delay={90}
                duration={0.8}
                from={{ opacity: 0, y: 50 }}
                to={{ opacity: 1, y: 0 }}
                onLetterAnimationComplete={() => {}}
              />
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-center text-orange-700 max-w-4xl mx-auto leading-relaxed font-medium px-4">
              Free, open source, and community-driven development
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-lg shadow-lg p-8 text-center bg-white">
              <h3 className="text-2xl font-semibold mb-4 text-primary-brown">Free & Open Source</h3>
              <p className="mb-8 text-secondary-brown">
                Our product is completely free and open source. We believe in transparency and community-driven development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href={process.env['NEXT_PUBLIC_GITHUB_URL']}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                aria-label="View Shakshuka on GitHub (opens in new tab)"
              >
                View on GitHub
              </a>
                <button 
                  className="px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                  aria-label="Support Shakshuka development"
                >
                  Support Development
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-32 bg-cream">
        <div className="container mx-auto px-4 text-center">
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8">
              <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-red-200 to-pink-200 border-2 border-red-300 shadow-lg">
                <span className="text-sm sm:text-base font-bold text-red-800">Download</span>
              </div>
              <SplitText 
                text="Download Now"
                tag="h2"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-red-800 drop-shadow-lg"
                splitType="words"
                delay={60}
                duration={0.7}
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                onLetterAnimationComplete={() => {}}
              />
            </div>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-red-700 max-w-4xl mx-auto leading-relaxed font-medium px-4">
              Get started with Shakshuka today
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-4xl mx-auto" role="group" aria-label="Download options">
            <a 
                href={process.env['NEXT_PUBLIC_DOWNLOAD_URL']}
              className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg text-sm sm:text-base bg-warm-orange text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
              onClick={async () => {
                // e.preventDefault();
                // Optimistically update UI
                setDownloadCounts(prev => ({ ...prev, windows: prev.windows + 1 }));
                
                const result = await incrementDownload('windows');
                if (!result.success && result.error) {
                  // Revert optimistic update on error
                  setDownloadCounts(prev => ({ ...prev, windows: Math.max(0, prev.windows - 1) }));
                  setToastError(result.error.message || 'Failed to track download. Please try again.');
                }
              }}
              aria-label="Download Shakshuka for Windows"
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                <span className="text-xs sm:text-base">Download for Windows</span>
              </div>
            </a>
            <div className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-2 border-dashed border-warm-orange text-secondary-brown transition-all duration-300 opacity-60 cursor-not-allowed text-sm sm:text-base" aria-disabled="true" aria-label="Mac version coming soon" role="status">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span className="text-xs sm:text-base">Mac - Coming Soon</span>
              </div>
            </div>
            <div className="px-6 sm:px-8 py-3 sm:py-4 rounded-lg border-2 border-dashed border-warm-orange text-secondary-brown transition-all duration-300 opacity-60 cursor-not-allowed text-sm sm:text-base" aria-disabled="true" aria-label="Linux version coming soon" role="status">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span className="text-xs sm:text-base">Linux - Coming Soon</span>
              </div>
            </div>
          </div>
          <div className="mt-6 sm:mt-8 flex justify-center px-4">
            <DownloadStats counts={downloadCounts} isLoading={isLoading} error={error} />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      
      {/* Error Toast */}
      {toastError && (
        <ErrorToast
          message={toastError}
          onClose={() => setToastError(null)}
          duration={5000}
        />
      )}
    </div>
  );
}
