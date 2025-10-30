import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

type Platform = 'windows' | 'mac' | 'linux';

const VALID_PLATFORMS: Platform[] = ['windows', 'mac', 'linux'];
const INITIAL_COUNTS: Record<Platform, number> = { windows: 0, mac: 0, linux: 0 };

const COUNTS_PATH = path.join(process.cwd(), 'data', 'download-counts.json');

async function readCounts(): Promise<Record<Platform, number>> {
  try {
    const raw = await fs.readFile(COUNTS_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      windows: Number(parsed.windows || 0),
      mac: Number(parsed.mac || 0),
      linux: Number(parsed.linux || 0)
    } as Record<Platform, number>;
  } catch (_) {
    return INITIAL_COUNTS as Record<Platform, number>;
  }
}

async function writeCounts(counts: Record<Platform, number>) {
  await fs.mkdir(path.dirname(COUNTS_PATH), { recursive: true });
  await fs.writeFile(COUNTS_PATH, JSON.stringify(counts, null, 2), 'utf-8');
}

export async function GET() {
  const counts = await readCounts();
  return NextResponse.json(counts, { status: 200 });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const platform = String(body?.platform || '').toLowerCase() as Platform;
    if (!VALID_PLATFORMS.includes(platform)) {
      return NextResponse.json({ error: 'Invalid platform' }, { status: 400 });
    }
    const counts = await readCounts();
    counts[platform] = (counts[platform] || 0) + 1;
    await writeCounts(counts);
    return NextResponse.json(counts, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}


