import { NextResponse } from 'next/server';
import { Redis } from '@upstash/redis';
import { retry, redisRetryOptions } from '@/lib/retry';

type Platform = 'windows' | 'mac' | 'linux';

const VALID_PLATFORMS: Platform[] = ['windows', 'mac', 'linux'];

// Initialize Upstash Redis client
// Make sure to set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in your environment variables
const url = process.env['UPSTASH_REDIS_REST_URL'];
const token = process.env['UPSTASH_REDIS_REST_TOKEN'];

if (!url || !token) {
  throw new Error(
    'UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set in environment variables.\n' +
    'Make sure your .env.local file exists in the project root and contains:\n' +
    'UPSTASH_REDIS_REST_URL=https://careful-yak-25151.upstash.io\n' +
    'UPSTASH_REDIS_REST_TOKEN=your-token-here'
  );
}

const redis = new Redis({
  url,
  token,
});

async function getCounts(): Promise<Record<Platform, number>> {
  const windows = await retry(
    () => redis.get<number>('downloads:windows'),
    redisRetryOptions
  ) ?? 0;
  
  const mac = await retry(
    () => redis.get<number>('downloads:mac'),
    redisRetryOptions
  ) ?? 0;
  
  const linux = await retry(
    () => redis.get<number>('downloads:linux'),
    redisRetryOptions
  ) ?? 0;
  
  return { windows, mac, linux };
}

async function incrementCount(platform: Platform): Promise<Record<Platform, number>> {
  // Atomic increment operation - works across all instances!
  // Retry the increment operation to handle flaky network
  await retry(
    () => redis.incr(`downloads:${platform}`),
    {
      ...redisRetryOptions,
      maxRetries: 5 // More retries for increment since it's critical
    }
  );
  
  // Get all counts with retry logic
  const windows = await retry(
    () => redis.get<number>('downloads:windows'),
    redisRetryOptions
  ) ?? 0;
  
  const mac = await retry(
    () => redis.get<number>('downloads:mac'),
    redisRetryOptions
  ) ?? 0;
  
  const linux = await retry(
    () => redis.get<number>('downloads:linux'),
    redisRetryOptions
  ) ?? 0;
  
  return { windows, mac, linux };
}

export async function GET() {
  try {
    const counts = await getCounts();
    return NextResponse.json(counts, { status: 200 });
  } catch (error) {
    const errorDetails = {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    };
    
    console.error('[GET /api/downloads] Error getting download counts:', errorDetails);
    
    const message = error instanceof Error ? error.message : 'Failed to get download counts';
    return NextResponse.json(
      { 
        error: message,
        message: 'Unable to retrieve download statistics. Please try again later.',
        windows: 0, 
        mac: 0, 
        linux: 0 
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const platform = String(body?.platform || '').toLowerCase() as Platform;
    
    if (!VALID_PLATFORMS.includes(platform)) {
      const errorMessage = `Invalid platform: ${platform}. Valid platforms are: ${VALID_PLATFORMS.join(', ')}`;
      console.error('[POST /api/downloads] Invalid platform:', {
        platform,
        validPlatforms: VALID_PLATFORMS,
        body
      });
      return NextResponse.json(
        { 
          error: errorMessage,
          message: 'Invalid download platform specified.'
        }, 
        { status: 400 }
      );
    }
    
    const counts = await incrementCount(platform);
    return NextResponse.json(counts, { status: 200 });
  } catch (error) {
    const errorDetails = {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      timestamp: new Date().toISOString()
    };
    
    console.error('[POST /api/downloads] Error incrementing download count:', errorDetails);
    
    const message = error instanceof Error ? error.message : 'Failed to increment download count';
    return NextResponse.json(
      { 
        error: message,
        message: 'Unable to track download. Please try again later.'
      }, 
      { status: 500 }
    );
  }
}
