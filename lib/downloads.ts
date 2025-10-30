"use client";

type Platform = "windows" | "mac" | "linux";

export async function getDownloadCounts(): Promise<Record<Platform, number>> {
  try {
    const res = await fetch("/api/downloads", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch counts");
    const data = await res.json();
    return {
      windows: Number(data.windows || 0),
      mac: Number(data.mac || 0),
      linux: Number(data.linux || 0)
    } as Record<Platform, number>;
  } catch (_) {
    return { windows: 0, mac: 0, linux: 0 } as Record<Platform, number>;
  }
}

export async function incrementDownload(platform: Platform): Promise<void> {
  try {
    await fetch("/api/downloads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform })
    });
  } catch (_) {
    // ignore failures - purely best-effort
  }
}


