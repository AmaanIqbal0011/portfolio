import { NextRequest, NextResponse } from 'next/server';
import { GITHUB_CONFIG } from '@/lib/github/config';
import { githubClient } from '@/lib/github/client';
import { fetchAndCacheRepositories } from '@/lib/github/repositories';
import { verifyOwnerSession } from '@/lib/auth/owner';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const storedState = request.cookies.get('github_oauth_state')?.value;

  if (!code) {
    return NextResponse.redirect(new URL('/admin/github?error=no_code', request.url));
  }

  if (!state || state !== storedState) {
    return NextResponse.redirect(new URL('/admin/github?error=invalid_state', request.url));
  }

  const isOwner = await verifyOwnerSession();
  if (!isOwner) {
    return NextResponse.redirect(new URL('/admin/github?error=not_authorized', request.url));
  }

  try {
    const token = await githubClient.exchangeCodeForToken(code);
    githubClient.setToken(token);

    const profile = await githubClient.getProfile(GITHUB_CONFIG.owner);
    await fetchAndCacheRepositories(profile.login);

    const response = NextResponse.redirect(new URL('/admin/github?github=connected', request.url));
    response.cookies.set('github_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 86400 * 30, // 30 days
      path: '/',
    });
    response.cookies.delete('github_oauth_state');

    return response;
  } catch (error) {
    console.error('GitHub OAuth callback error:', error);
    return NextResponse.redirect(new URL('/admin/github?error=oauth_failed', request.url));
  }
}
