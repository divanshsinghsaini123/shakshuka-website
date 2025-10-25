'use client';

import SplitText from '../components/SplitText';

export default function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FCF8F2' }}>
      {/* Hero Section */}
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
          <div className="backdrop-blur-sm bg-white/10 rounded-3xl p-12 border border-white/20 shadow-2xl">
          <SplitText 
              text="Shakshuka"
            tag="h1"
              className="text-8xl font-bold mb-6 text-amber-800"
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
              className="text-3xl font-light mb-8 text-amber-800"
            splitType="words"
              delay={200}
            duration={0.6}
            from={{ opacity: 0, y: 30 }}
            to={{ opacity: 1, y: 0 }}
            onLetterAnimationComplete={() => {}}
          />
            <SplitText 
              text="Find your flow. Transform chaos into calm with mindful task management that nurtures focus and inner peace."
              className="text-lg mb-12 max-w-3xl mx-auto text-amber-700 leading-relaxed"
              splitType="words"
              delay={300}
              duration={0.6}
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              onLetterAnimationComplete={() => {}}
            />
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group relative px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg hover:shadow-xl">
                <span className="relative z-10">Download Now</span>
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <button className="px-8 py-4 rounded-full text-lg font-medium transition-all duration-300 hover:scale-105 border-2 border-amber-300 text-amber-600 hover:bg-amber-50">
                Learn More
          </button>
            </div>
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
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-amber-200 to-orange-200 border-2 border-amber-300 mb-8 shadow-lg">
              <span className="text-base font-bold text-amber-800">Features</span>
            </div>
            <SplitText 
              text="Powerful Features"
              tag="h2"
              className="text-7xl font-black mb-8 text-amber-800 drop-shadow-lg"
              splitType="words"
              delay={80}
              duration={0.7}
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              onLetterAnimationComplete={() => {}}
            />
            <p className="text-2xl text-center text-amber-700 max-w-4xl mx-auto leading-relaxed font-medium">
              Everything you need to organize your life and boost productivity
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="group relative">
              <div className="backdrop-blur-sm bg-white/20 rounded-3xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/30">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Task Management</h3>
                <p className="text-gray-600 leading-relaxed">Create, edit, and organize tasks with beautiful drag-and-drop interface. Set priorities, due dates, and categories.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="group relative">
              <div className="backdrop-blur-sm bg-white/20 rounded-3xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/30">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Daily Planner</h3>
                <p className="text-gray-600 leading-relaxed">Visual task scheduling with hourly time slots. Drag-and-drop interface for intuitive planning.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="group relative">
              <div className="backdrop-blur-sm bg-white/20 rounded-3xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/30">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Data Security</h3>
                <p className="text-gray-600 leading-relaxed">Encrypted local storage keeps your data secure. Export/import functionality with complete privacy.</p>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="group relative">
              <div className="backdrop-blur-sm bg-white/20 rounded-3xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/30">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Auto-Start</h3>
                <p className="text-gray-600 leading-relaxed">Windows autostart integration. Auto-save functionality and productivity tracking.</p>
              </div>
            </div>

            {/* Feature 5 */}
            <div className="group relative">
              <div className="backdrop-blur-sm bg-white/20 rounded-3xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/30">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Analytics</h3>
                <p className="text-gray-600 leading-relaxed">Dashboard with productivity stats, task completion streaks, and performance insights.</p>
              </div>
            </div>

            {/* Feature 6 */}
            <div className="group relative">
              <div className="backdrop-blur-sm bg-white/20 rounded-3xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/30">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Beautiful UI</h3>
                <p className="text-gray-600 leading-relaxed">Glassmorphism effects, smooth animations, and meditation-app inspired design.</p>
              </div>
            </div>
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
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-yellow-200 to-amber-200 border-2 border-yellow-300 mb-8 shadow-lg hover:scale-105 transition-transform duration-300">
              <span className="text-base font-bold text-yellow-800">Process</span>
            </div>
            <SplitText 
              text="How It Works"
              tag="h2"
              className="text-7xl font-black mb-8 text-yellow-800 drop-shadow-lg"
              splitType="words"
              delay={60}
              duration={0.8}
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              onLetterAnimationComplete={() => {}}
            />
            <p className="text-2xl text-center text-yellow-700 max-w-4xl mx-auto leading-relaxed font-medium">
              Simple, intuitive, and powerful task management designed for modern productivity
            </p>
          </div>
          
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
              {/* Feature 1 - Create Tasks with Video */}
              <div className="group opacity-0 translate-y-12 transition-all duration-800 ease-out" 
                   style={{ animation: 'fadeInUp 0.8s ease-out 0.1s forwards' }}>
                <div className="backdrop-blur-sm bg-white/20 rounded-3xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/30 relative overflow-hidden">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-orange-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-start space-x-4 mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold text-lg">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-amber-800 transition-colors duration-300">Create Tasks</h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Add tasks with priorities, categories, and due dates. Organize your work with beautiful drag-and-drop interface.</p>
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <video 
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                    >
                      <source src="/videos/Task_final.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  {/* Animated progress bar */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-amber-500 to-orange-600 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>
              </div>

              {/* Feature 2 - Plan Your Day with Video */}
              <div className="group opacity-0 translate-y-12 transition-all duration-800 ease-out" 
                   style={{ animation: 'fadeInUp 0.8s ease-out 0.2s forwards' }}>
                <div className="backdrop-blur-sm bg-white/20 rounded-3xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/30 relative overflow-hidden">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-start space-x-4 mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-orange-500 to-red-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold text-lg">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-orange-800 transition-colors duration-300">Plan Your Day</h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Schedule tasks in your daily planner with hourly time slots. Visual planning made simple and intuitive.</p>
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <video 
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                    >
                      <source src="/videos/planner_final.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  {/* Animated progress bar */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-red-600 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>
              </div>

              {/* Feature 3 - Strike Tasks with Video */}
              <div className="group opacity-0 translate-y-12 transition-all duration-800 ease-out" 
                   style={{ animation: 'fadeInUp 0.8s ease-out 0.3s forwards' }}>
                <div className="backdrop-blur-sm bg-white/20 rounded-3xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/30 relative overflow-hidden">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-amber-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-start space-x-4 mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold text-lg">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-yellow-800 transition-colors duration-300">Strike Tasks</h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Complete your daily tasks with satisfying strike-through animations. Build momentum and stay motivated.</p>
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <video 
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                    >
                      <source src="/videos/strike_final.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  {/* Animated progress bar */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-yellow-500 to-amber-600 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>
              </div>

              {/* Feature 4 - Track Progress with Video */}
              <div className="group opacity-0 translate-y-12 transition-all duration-800 ease-out" 
                   style={{ animation: 'fadeInUp 0.8s ease-out 0.4s forwards' }}>
                <div className="backdrop-blur-sm bg-white/20 rounded-3xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/30 relative overflow-hidden">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-start space-x-4 mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold text-lg">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-red-800 transition-colors duration-300">Track Progress</h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Monitor your productivity with analytics, streaks, and insights. Your data stays secure with encrypted storage.</p>
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <video 
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                    >
                      <source src="/videos/analytics_final.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  {/* Animated progress bar */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-red-500 to-pink-600 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>
              </div>

              {/* Feature 5 - Import Tasks with Video */}
              <div className="group opacity-0 translate-y-12 transition-all duration-800 ease-out" 
                   style={{ animation: 'fadeInUp 0.8s ease-out 0.5s forwards' }}>
                <div className="backdrop-blur-sm bg-white/20 rounded-3xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/30 relative overflow-hidden">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-start space-x-4 mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold text-lg">5</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-purple-800 transition-colors duration-300">Import Tasks</h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Seamlessly import your existing tasks from other platforms. Migrate your workflow without losing momentum.</p>
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <video 
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                    >
                      <source src="/videos/import_final.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  {/* Animated progress bar */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-600 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>
              </div>

              {/* Feature 6 - Auto-Start with Video */}
              <div className="group opacity-0 translate-y-12 transition-all duration-800 ease-out" 
                   style={{ animation: 'fadeInUp 0.8s ease-out 0.6s forwards' }}>
                <div className="backdrop-blur-sm bg-white/20 rounded-3xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/30 relative overflow-hidden">
                  {/* Animated background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-teal-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex items-start space-x-4 mb-4 relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-green-500 to-teal-600 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <span className="text-white font-bold text-lg">6</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-green-800 transition-colors duration-300">Auto-Start</h3>
                      <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">Windows autostart integration ensures your productivity tool is always ready when you need it.</p>
                    </div>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
                    <video 
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
                      autoPlay 
                      muted 
                      loop 
                      playsInline
                    >
                      <source src="/videos/startup_final.mp4" type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>
                  {/* Animated progress bar */}
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-green-500 to-teal-600 w-0 group-hover:w-full transition-all duration-700 ease-out"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-orange-200 to-red-200 border-2 border-orange-300 mb-8 shadow-lg">
              <span className="text-base font-bold text-orange-800">Open Source</span>
            </div>
            <SplitText 
              text="Open Source & Support"
              tag="h2"
              className="text-7xl font-black mb-8 text-orange-800 drop-shadow-lg"
              splitType="words"
              delay={90}
              duration={0.8}
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              onLetterAnimationComplete={() => {}}
            />
            <p className="text-2xl text-center text-orange-700 max-w-4xl mx-auto leading-relaxed font-medium">
              Free, open source, and community-driven development
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-lg shadow-lg p-8 text-center" style={{ backgroundColor: 'white' }}>
              <h3 className="text-2xl font-semibold mb-4" style={{ color: '#5C2D2D' }}>Free & Open Source</h3>
              <p className="mb-8" style={{ color: '#7A5C5C' }}>
                Our product is completely free and open source. We believe in transparency and community-driven development.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="https://github.com/admiralsuez/shakshuka-python/tree/release"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-medium shadow-lg hover:shadow-xl"
                >
                  View on GitHub
                </a>
                <button className="px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-orange-500 to-red-600 text-white font-medium shadow-lg hover:shadow-xl">
                  Support Development
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Download Section */}
      <section id="download" className="py-20" style={{ backgroundColor: '#FCF8F2' }}>
        <div className="container mx-auto px-4 text-center">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-red-200 to-pink-200 border-2 border-red-300 mb-8 shadow-lg">
              <span className="text-base font-bold text-red-800">Download</span>
            </div>
            <SplitText 
              text="Download Now"
              tag="h2"
              className="text-7xl font-black mb-8 text-red-800 drop-shadow-lg"
              splitType="words"
              delay={60}
              duration={0.7}
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              onLetterAnimationComplete={() => {}}
            />
            <p className="text-2xl text-red-700 max-w-4xl mx-auto leading-relaxed font-medium">
              Get started with Shakshuka today
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-4xl mx-auto">
            <a 
              href="https://github.com/admiralsuez/shakshuka-python/releases/download/v2.0/Shakshuka-Setup-v2.0.0-b3.exe"
              className="px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
              style={{ backgroundColor: '#E88D3F', color: 'white' }}
            >
              <div className="flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
                </svg>
                Download for Windows
              </div>
            </a>
            <div className="px-8 py-4 rounded-lg border-2 border-dashed transition-all duration-300 opacity-60" style={{ borderColor: '#E88D3F', color: '#7A5C5C' }}>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                <span>Mac - Coming Soon</span>
              </div>
            </div>
            <div className="px-8 py-4 rounded-lg border-2 border-dashed transition-all duration-300 opacity-60" style={{ borderColor: '#E88D3F', color: '#7A5C5C' }}>
              <div className="flex items-center justify-center gap-2">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Linux - Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-pink-200 to-red-200 border-2 border-pink-300 mb-8 shadow-lg">
              <span className="text-base font-bold text-pink-800">Contact</span>
            </div>
            <SplitText 
              text="Get In Touch"
              tag="h2"
              className="text-7xl font-black mb-8 text-pink-800 drop-shadow-lg"
              splitType="words"
              delay={80}
              duration={0.8}
              from={{ opacity: 0, y: 50 }}
              to={{ opacity: 1, y: 0 }}
              onLetterAnimationComplete={() => {}}
            />
            <p className="text-2xl text-center text-pink-700 max-w-4xl mx-auto leading-relaxed font-medium">
              Have questions or feedback? We'd love to hear from you!
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <div className="backdrop-blur-sm bg-white/20 rounded-3xl p-8 border border-white/30 shadow-xl">
            <form className="space-y-6">
              <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors bg-white/50 border-amber-300 focus:border-amber-500 focus:ring-amber-200" 
                    placeholder="Your name"
                  />
              </div>
              <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors bg-white/50 border-amber-300 focus:border-amber-500 focus:ring-amber-200" 
                    placeholder="your.email@example.com"
                  />
              </div>
              <div>
                  <label className="block text-sm font-medium mb-2 text-amber-800">Message</label>
                  <textarea 
                    rows={4} 
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors bg-white/50 border-amber-300 focus:border-amber-500 focus:ring-amber-200 resize-none" 
                    placeholder="Tell us what's on your mind..."
                  ></textarea>
              </div>
                <button 
                  type="submit" 
                  className="w-full py-4 rounded-lg transition-all duration-300 hover:scale-105 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium shadow-lg hover:shadow-xl"
                >
                Send Message
              </button>
            </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
