'use client';

type Counts = { windows: number; mac: number; linux: number };

interface DownloadStatsProps {
  counts: Counts;
  isLoading?: boolean;
  error?: string | null;
}

export default function DownloadStats({ counts, isLoading = false, error = null }: DownloadStatsProps) {
  const total = (counts?.windows || 0) + (counts?.mac || 0) + (counts?.linux || 0);
  const items = [
    { label: 'Windows', value: counts?.windows || 0 },
    { label: 'Mac', value: counts?.mac || 0 },
    { label: 'Linux', value: counts?.linux || 0 },
    { label: 'Total', value: total }
  ];

  if (error) {
    return (
      <div className="flex flex-wrap items-stretch justify-center rounded-3xl px-3 py-3 sm:px-6 sm:py-4 bg-red-50 text-red-800 shadow-xl border border-red-300 gap-2 sm:gap-0">
        <div className="flex items-center gap-2 px-2 sm:px-4">
          <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="text-sm sm:text-base">Unable to load statistics</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap items-stretch justify-center rounded-3xl px-3 py-3 sm:px-6 sm:py-4 bg-gradient-to-br from-amber-50 to-orange-50 text-amber-800 shadow-xl border border-amber-300 gap-2 sm:gap-0">
      {isLoading ? (
        <div className="flex items-center gap-2 px-2 sm:px-4">
          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-amber-800"></div>
          <div className="text-sm sm:text-base">Loading statistics...</div>
        </div>
      ) : (
        items.map((it, idx) => (
          <div key={it.label} className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 px-2 sm:px-4">
            <div className="text-2xl sm:text-3xl font-extrabold tabular-nums">{it.value}</div>
            <div className="text-xs sm:text-sm text-amber-700">{it.label}</div>
            {idx < items.length - 1 && (
              <div className="hidden sm:block mx-3 h-8 w-px bg-amber-300/60" aria-hidden="true"></div>
            )}
          </div>
        ))
      )}
    </div>
  );
}


