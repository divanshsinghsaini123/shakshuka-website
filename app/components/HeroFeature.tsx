import OptimizedVideo from './OptimizedVideo';

interface HeroFeatureProps {
  number: number;
  title: string;
  description: string;
  videoSrc: string;
  animationDelay: number;
  gradientFrom: string;
  gradientTo: string;
  hoverTextColor: string;
}

export default function HeroFeature({
  number,
  title,
  description,
  videoSrc,
  animationDelay,
  gradientFrom,
  gradientTo,
  hoverTextColor
}: HeroFeatureProps) {
  return (
    <div 
      className="group opacity-0 translate-y-12 animate-fade-in-up" 
      style={{ '--animation-delay': `${animationDelay}s` } as React.CSSProperties}
    >
      <div className="backdrop-blur-sm bg-white/20 rounded-3xl p-6 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/30 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-r ${gradientFrom}/10 ${gradientTo}/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
        
        <div className="flex items-start space-x-4 mb-4 relative z-10">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${gradientFrom} ${gradientTo} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
            <span className="text-white font-bold text-lg">{number}</span>
          </div>
          <div>
            <h3 className={`text-xl font-bold mb-2 text-gray-800 ${hoverTextColor} transition-colors duration-300`}>{title}</h3>
            <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{description}</p>
          </div>
        </div>
        
        <div className="rounded-xl overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300">
          <OptimizedVideo 
            src={videoSrc}
            className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Animated progress bar */}
        <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${gradientFrom} ${gradientTo} w-0 group-hover:w-full transition-all duration-700 ease-out`}></div>
      </div>
    </div>
  );
}

