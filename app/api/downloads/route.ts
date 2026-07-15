import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { retry, redisRetryOptions } from '@/lib/retry';

type Platform = 'windows' | 'mac' | 'linux';

const VALID_PLATFORMS: Platform[] = ['windows', 'mac', 'linux'];

interface StatsDoc {
  _id: string;
  windows?: number;
  mac?: number;
  linux?: number;
}

async function getCounts(): Promise<Record<Platform, number>> {
  const client = await clientPromise;
  const db = client.db();

  const stats = await retry(
    () => db.collection<StatsDoc>('shakshuka_downloads').findOne({ _id: 'stats' }),
    redisRetryOptions
  );

  return {
    windows: stats?.windows ?? 0,
    mac: stats?.mac ?? 0,
    linux: stats?.linux ?? 0
  };
}

async function incrementCount(platform: Platform): Promise<Record<Platform, number>> {
  const client = await clientPromise;
  const db = client.db();

  // Atomic increment operation - works across all instances!
  // Retry the increment operation to handle flaky network
  await retry(
    () => db.collection<StatsDoc>('shakshuka_downloads').updateOne(
      { _id: 'stats' },
      { $inc: { [platform]: 1 } },
      { upsert: true }
    ),
    {
      ...redisRetryOptions,
      maxRetries: 5 // More retries for increment since it's critical
    }
  );

  // Get all counts with retry logic
  return getCounts();
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
