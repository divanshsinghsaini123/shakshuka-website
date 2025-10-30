'use client';

type Counts = { windows: number; mac: number; linux: number };

export default function DownloadStats({ counts }: { counts: Counts }) {
  const total = (counts?.windows || 0) + (counts?.mac || 0) + (counts?.linux || 0);
  const items = [
    { label: 'Windows', value: counts?.windows || 0 },
    { label: 'Mac', value: counts?.mac || 0 },
    { label: 'Linux', value: counts?.linux || 0 },
    { label: 'Total', value: total }
  ];

  return (
    <div className="inline-flex items-stretch rounded-3xl px-6 py-4 bg-gradient-to-br from-amber-50 to-orange-50 text-amber-800 shadow-xl border border-amber-300">
      {items.map((it, idx) => (
        <div key={it.label} className="flex items-center gap-2 px-4">
          <div className="text-3xl font-extrabold tabular-nums">{it.value}</div>
          <div className="text-sm text-amber-700">{it.label}</div>
          {idx < items.length - 1 && (
            <div className="mx-3 h-8 w-px bg-amber-300/60" aria-hidden="true"></div>
          )}
        </div>
      ))}
    </div>
  );
}


