import { NextRequest, NextResponse } from 'next/server';
import { GITHUB_CONFIG } from '@/lib/github/config';
import { verifyOwnerSession } from '@/lib/auth/owner';
import crypto from 'crypto';

export async function GET(request: NextRequest) {
  const isOwner = await verifyOwnerSession();
  if (!isOwner) {
    return NextResponse.redirect(new URL('/admin/github', request.url));
  }

  if (!GITHUB_CONFIG.clientId) {
    return NextResponse.json(
      { error: 'GitHub OAuth not configured' },
      { status: 503 }
    );
  }

  const state = crypto.randomBytes(32).toString('hex');

  const url = new URL('https://github.com/login/oauth/authorize');
  url.searchParams.set('client_id', GITHUB_CONFIG.clientId);
  url.searchParams.set('scope', GITHUB_CONFIG.scopes.join(' '));
  url.searchParams.set('state', state);
  url.searchParams.set('redirect_uri', GITHUB_CONFIG.callbackUrl);

  const response = NextResponse.redirect(url.toString());
  response.cookies.set('github_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 600,
    path: '/',
  });

  return response;
}
