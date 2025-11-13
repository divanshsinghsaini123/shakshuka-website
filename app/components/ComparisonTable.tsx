'use client';

import { useState } from 'react';

interface AppFeature {
  name: string;
  logo?: string;
  features: {
    [key: string]: boolean;
  };
}

interface ComparisonTableProps {
  apps: AppFeature[];
  features: string[];
}

const ComparisonTable = ({ apps, features }: ComparisonTableProps) => {
  const [hoveredCell, setHoveredCell] = useState<string | null>(null);

  return (
    <div className="w-full overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
      <div className="inline-block min-w-full">
        <div className="backdrop-blur-sm bg-white/20  border border-white/30 shadow-2xl overflow-hidden">
          <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-amber-100/30 to-orange-100/30 border-b-2 border-white/20">
                  <th className="sticky left-0 z-20 px-2 py-2 sm:px-4 sm:py-3 md:px-4 md:py-3 text-left font-bold text-amber-800 bg-gradient-to-r from-amber-100/40 to-orange-100/40 backdrop-blur-sm border-r-2 border-white/20 min-w-[120px] sm:min-w-[150px] md:min-w-[160px] cursor-default select-none text-xs sm:text-sm md:text-sm">
                    Feature
                  </th>
                  {apps.map((app, index) => (
                    <th
                      key={app.name}
                      className={`px-2 py-2 sm:px-4 sm:py-3 md:px-4 md:py-3 text-center font-bold text-amber-800 min-w-[100px] sm:min-w-[120px] md:min-w-[120px] transition-all duration-300 cursor-default ${
                        hoveredCell?.startsWith(`header-${index}`) ? 'bg-amber-200/40 scale-105' : ''
                      }`}
                      onMouseEnter={() => setHoveredCell(`header-${index}`)}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <div className="flex flex-col items-center gap-1 sm:gap-2">
                        <div className="text-xs sm:text-sm md:text-sm font-black select-none">{app.name}</div>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {features.map((feature, featureIndex) => (
                  <tr
                    key={feature}
                    className={`border-b border-white/10 transition-all duration-300 ${
                      featureIndex % 2 === 0 ? 'bg-white/5' : 'bg-white/10'
                    } hover:bg-amber-50/20`}
                  >
                    <td className="sticky left-0 z-10 px-2 py-2 sm:px-4 sm:py-3 md:px-4 md:py-3 font-semibold text-amber-900 bg-gradient-to-r from-amber-50/60 to-orange-50/60 backdrop-blur-sm border-r-2 border-white/20 cursor-default select-none text-xs sm:text-sm md:text-sm">
                      {feature}
                    </td>
                    {apps.map((app, appIndex) => {
                      const hasFeature = app.features[feature] ?? false;
                      const cellId = `${feature}-${appIndex}`;
                      return (
                        <td
                          key={`${feature}-${app.name}`}
                          className={`px-2 py-2 sm:px-4 sm:py-3 md:px-4 md:py-3 text-center transition-all duration-300 ${
                            hoveredCell === cellId ? 'bg-amber-100/30 scale-105' : ''
                          }`}
                          onMouseEnter={() => setHoveredCell(cellId)}
                          onMouseLeave={() => setHoveredCell(null)}
                        >
                          <div className="flex items-center justify-center">
                            {hasFeature ? (
                              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-7 md:h-7 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-125">
                                <svg
                                  className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              </div>
                            ) : (
                              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-7 md:h-7 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center shadow-lg opacity-60">
                                <svg
                                  className="w-3 h-3 sm:w-4 sm:h-4 md:w-4 md:h-4 text-white"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTable;

