import { NextRequest, NextResponse } from 'next/server';
import { verifyOwnerSession } from '@/lib/auth/owner';

export async function POST(request: NextRequest) {
  const isOwner = await verifyOwnerSession();
  if (!isOwner) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set('github_token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });

  return response;
}
