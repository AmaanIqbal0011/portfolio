import { cookies } from 'next/headers';
import crypto from 'crypto';

const OWNER_PASSWORD = process.env.OWNER_PASSWORD || '';
const SESSION_SECRET = process.env.SESSION_SECRET || crypto.randomBytes(32).toString('hex');
const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function sign(data: string, secret: string): string {
  return crypto.createHmac('sha256', secret).update(data).digest('hex');
}

export function createOwnerSession(): string {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_MAX_AGE;
  const payload = `authenticated=true&expires=${expiresAt}`;
  const signature = sign(payload, SESSION_SECRET);
  const session = `${payload}&sig=${signature}`;
  return Buffer.from(session).toString('base64url');
}

export async function verifyOwnerSession(): Promise<boolean> {
  if (!OWNER_PASSWORD) return false;

  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get('owner_session')?.value;
  if (!sessionCookie) return false;

  try {
    const session = Buffer.from(sessionCookie, 'base64url').toString();
    const params = new URLSearchParams(session);
    const sig = params.get('sig');
    const expires = params.get('expires');
    const auth = params.get('authenticated');

    if (!sig || !expires || auth !== 'true') return false;
    if (Number(expires) < Math.floor(Date.now() / 1000)) return false;

    const payload = `authenticated=true&expires=${expires}`;
    const expectedSig = sign(payload, SESSION_SECRET);

    const sigBuf = Buffer.from(sig, 'hex');
    const expectedBuf = Buffer.from(expectedSig, 'hex');
    if (sigBuf.length !== expectedBuf.length) return false;

    return crypto.timingSafeEqual(sigBuf, expectedBuf);
  } catch {
    return false;
  }
}

export function validateOwnerPassword(password: string): boolean {
  if (!OWNER_PASSWORD) return false;
  return password === OWNER_PASSWORD;
}
