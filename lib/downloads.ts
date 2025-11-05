"use client";

type Platform = "windows" | "mac" | "linux";

export interface DownloadError {
  message: string;
  code?: string;
  originalError?: unknown;
}

export async function getDownloadCounts(): Promise<Record<Platform, number>> {
  try {
    const res = await fetch("/api/downloads", { cache: "no-store" });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
      const errorMessage = errorData?.error || `HTTP ${res.status}: Failed to fetch download counts`;
      console.error('[getDownloadCounts] Request failed:', {
        status: res.status,
        statusText: res.statusText,
        error: errorMessage
      });
      throw new Error(errorMessage);
    }
    
    const data = await res.json();
    return {
      windows: Number(data.windows || 0),
      mac: Number(data.mac || 0),
      linux: Number(data.linux || 0)
    } as Record<Platform, number>;
  } catch (error) {
    console.error('[getDownloadCounts] Error fetching download counts:', {
      error,
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    // Return default values but log the error
    return { windows: 0, mac: 0, linux: 0 } as Record<Platform, number>;
  }
}

export async function incrementDownload(platform: Platform): Promise<{ success: boolean; error?: DownloadError }> {
  try {
    const res = await fetch("/api/downloads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform })
    });
    
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
      const errorMessage = errorData?.error || `HTTP ${res.status}: Failed to increment download count`;
      console.error('[incrementDownload] Request failed:', {
        platform,
        status: res.status,
        statusText: res.statusText,
        error: errorMessage
      });
      
      return {
        success: false,
        error: {
          message: errorMessage,
          code: `HTTP_${res.status}`,
          originalError: errorData
        }
      };
    }
    
    return { success: true };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Network error while incrementing download count';
    console.error('[incrementDownload] Error incrementing download count:', {
      platform,
      error,
      message: errorMessage,
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return {
      success: false,
      error: {
        message: errorMessage,
        code: 'NETWORK_ERROR',
        originalError: error
      }
    };
  }
}


