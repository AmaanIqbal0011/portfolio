import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { certificates } from '@/lib/db/schema';
import { verifyOwnerSession } from '@/lib/auth/owner';

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(certificates)
      .orderBy(certificates.displayOrder);

    return NextResponse.json({ certificates: rows });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to load certificates', details: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const isOwner = await verifyOwnerSession();
    if (!isOwner) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { certificates: certs } = body;

    if (!Array.isArray(certs)) {
      return NextResponse.json({ error: 'Invalid data: certificates must be an array' }, { status: 400 });
    }

    await db.delete(certificates);

    for (let i = 0; i < certs.length; i++) {
      const cert = certs[i];
      await db.insert(certificates).values({
        name: cert.name,
        score: cert.score || '',
        issuer: cert.issuer || '',
        date: cert.date || '',
        link: cert.link || '',
        displayOrder: i,
      });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: 'Failed to save certificates', details: message }, { status: 500 });
  }
}
