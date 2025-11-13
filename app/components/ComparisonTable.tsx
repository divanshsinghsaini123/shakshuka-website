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
                  <th className="sticky left-0 z-20 px-6 py-4 text-left font-bold text-amber-800 bg-gradient-to-r from-amber-100/40 to-orange-100/40 backdrop-blur-sm border-r-2 border-white/20 min-w-[200px] cursor-default select-none">
                    Feature
                  </th>
                  {apps.map((app, index) => (
                    <th
                      key={app.name}
                      className={`px-6 py-4 text-center font-bold text-amber-800 min-w-[150px] transition-all duration-300 cursor-default ${
                        hoveredCell?.startsWith(`header-${index}`) ? 'bg-amber-200/40 scale-105' : ''
                      }`}
                      onMouseEnter={() => setHoveredCell(`header-${index}`)}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <div className="text-lg font-black select-none">{app.name}</div>
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
                    <td className="sticky left-0 z-10 px-6 py-4 font-semibold text-amber-900 bg-gradient-to-r from-amber-50/60 to-orange-50/60 backdrop-blur-sm border-r-2 border-white/20 cursor-default select-none">
                      {feature}
                    </td>
                    {apps.map((app, appIndex) => {
                      const hasFeature = app.features[feature] ?? false;
                      const cellId = `${feature}-${appIndex}`;
                      return (
                        <td
                          key={`${feature}-${app.name}`}
                          className={`px-6 py-4 text-center transition-all duration-300 ${
                            hoveredCell === cellId ? 'bg-amber-100/30 scale-105' : ''
                          }`}
                          onMouseEnter={() => setHoveredCell(cellId)}
                          onMouseLeave={() => setHoveredCell(null)}
                        >
                          <div className="flex items-center justify-center">
                            {hasFeature ? (
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center shadow-lg transform transition-transform duration-300 hover:scale-125">
                                <svg
                                  className="w-5 h-5 text-white"
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
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 flex items-center justify-center shadow-lg opacity-60">
                                <svg
                                  className="w-5 h-5 text-white"
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

