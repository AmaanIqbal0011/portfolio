import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projectSettings } from '@/lib/db/schema';
import { verifyOwnerSession } from '@/lib/auth/owner';

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(projectSettings)
      .orderBy(projectSettings.displayOrder);

    const hidden = rows.filter(r => r.isHidden).map(r => r.repoName);
    const customImages: Record<string, string> = {};
    for (const row of rows) {
      if (row.customImageUrl) {
        customImages[row.repoName] = row.customImageUrl;
      }
    }

    return NextResponse.json({ hidden, customImages, projects: rows });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to load settings', details: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isOwner = await verifyOwnerSession();
    if (!isOwner) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { hidden, customImages } = body;

    if (!Array.isArray(hidden)) {
      return NextResponse.json({ error: 'Invalid data: hidden must be an array' }, { status: 400 });
    }

    const images: Record<string, string> = customImages || {};

    const allRepoNames = new Set([...hidden, ...Object.keys(images)]);

    for (const repoName of allRepoNames) {
      const isHidden = hidden.includes(repoName);
      const customImageUrl = images[repoName] || null;

      await db
        .insert(projectSettings)
        .values({
          repoName,
          isHidden,
          customImageUrl,
        })
        .onConflictDoUpdate({
          target: projectSettings.repoName,
          set: {
            isHidden,
            customImageUrl,
            updatedAt: new Date(),
          },
        });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to save settings', details: message }, { status: 500 });
  }
}
