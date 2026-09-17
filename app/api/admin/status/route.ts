import { NextResponse } from 'next/server';
import { verifyOwnerSession } from '@/lib/auth/owner';

export async function GET() {
  const isOwner = await verifyOwnerSession();
  return NextResponse.json({ authenticated: isOwner });
}
