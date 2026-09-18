import { NextRequest, NextResponse } from 'next/server';
import { githubClient } from '@/lib/github/client';
import { getCachedData, ensureCachePopulated } from '@/lib/github/repositories';
import { verifyOwnerSession } from '@/lib/auth/owner';

// GET /api/github/repositories - Public endpoint
// Always ensures the cache is populated before responding, using the server-side
// GITHUB_TOKEN when no admin session token is available. This guarantees every
// visitor sees real project data, not empty defaults.
export async function GET(request: NextRequest) {
  // If the visitor is the authenticated admin with a GitHub token cookie,
  // prefer their token for the request (it may have broader permissions).
  const isOwner = await verifyOwnerSession();
  const adminToken = request.cookies.get('github_token')?.value;

  if (isOwner && adminToken) {
    githubClient.setToken(adminToken);
  }

  // Ensure cache is populated (uses server-side token if admin token not set).
  // This is a no-op if the cache is fresh (< 1 hour old).
  await ensureCachePopulated();

  const cached = getCachedData();
  return NextResponse.json({
    connected: !!(isOwner && adminToken),
    data: cached,
  });
}
