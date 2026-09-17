import { NextRequest, NextResponse } from 'next/server';
import { githubClient } from '@/lib/github/client';
import { fetchAndCacheRepositories } from '@/lib/github/repositories';
import { GITHUB_CONFIG } from '@/lib/github/config';
import { verifyOwnerSession } from '@/lib/auth/owner';

export async function POST(request: NextRequest) {
  const isOwner = await verifyOwnerSession();
  if (!isOwner) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const token = request.cookies.get('github_token')?.value;
  if (!token) {
    return NextResponse.json(
      { error: 'GitHub not connected' },
      { status: 400 }
    );
  }

  githubClient.setToken(token);

  try {
    const data = await fetchAndCacheRepositories(GITHUB_CONFIG.owner);
    return NextResponse.json({ success: true, data });
  } catch {
    return NextResponse.json(
      { error: 'Failed to sync repositories' },
      { status: 500 }
    );
  }
}
