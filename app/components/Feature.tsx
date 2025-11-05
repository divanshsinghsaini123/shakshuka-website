


export type FeatureProps = {
    title: string;
    description: string;
    icon: React.ReactNode;
    gradient?: string;
};
function Feature(props : FeatureProps){
return(

    <div className="group relative">
              <div className="backdrop-blur-sm bg-white/20 rounded-3xl p-8 border border-white/30 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:bg-white/30">
                <div className={`w-16 h-16 rounded-2xl ${props.gradient || 'bg-gradient-to-r from-amber-500 to-yellow-600'} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {props.icon as React.ReactNode}
                </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{props.title}</h3>
                <p className="text-gray-600 leading-relaxed">{props.description}</p>
              </div>
            </div>
)
}


export default Feature;