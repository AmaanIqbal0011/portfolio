import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const SETTINGS_PATH = join(process.cwd(), 'data', 'project-settings.json');

export interface ProjectSettings {
  hidden: string[];
  customImages: Record<string, string>;
}

async function readSettings(): Promise<ProjectSettings> {
  try {
    const data = await readFile(SETTINGS_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { hidden: [], customImages: {} };
  }
}

async function writeSettings(settings: ProjectSettings): Promise<void> {
  await writeFile(SETTINGS_PATH, JSON.stringify(settings, null, 2));
}

export async function GET() {
  const settings = await readSettings();
  return NextResponse.json(settings);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { hidden, customImages } = body;

  if (!Array.isArray(hidden)) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  await writeSettings({
    hidden,
    customImages: customImages || {},
  });
  return NextResponse.json({ success: true });
}
