import { NextRequest, NextResponse } from 'next/server';
import { githubClient } from '@/lib/github/client';
import { fetchAndCacheRepositories, getCachedData } from '@/lib/github/repositories';
import { GITHUB_CONFIG } from '@/lib/github/config';
import { verifyOwnerSession } from '@/lib/auth/owner';

// GET /api/github/repositories - Public endpoint, reads from cache only
export async function GET(request: NextRequest) {
  const cached = getCachedData();

  // Check if owner is connected (has token cookie)
  const isOwner = await verifyOwnerSession();
  const hasToken = !!request.cookies.get('github_token')?.value;

  // If owner is connected and cache is empty, try to populate
  if (isOwner && hasToken && (!cached.lastSynced || cached.repositories.length === 0)) {
    const token = request.cookies.get('github_token')?.value;
    if (token) {
      githubClient.setToken(token);
    }
    try {
      const fresh = await fetchAndCacheRepositories(GITHUB_CONFIG.owner);
      return NextResponse.json({
        connected: true,
        data: fresh,
      });
    } catch {
      return NextResponse.json({
        connected: true,
        data: cached,
        error: 'Failed to fetch repositories',
      });
    }
  }

  return NextResponse.json({
    connected: hasToken,
    data: cached,
  });
}
