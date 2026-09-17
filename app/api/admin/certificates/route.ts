import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

const CERT_PATH = join(process.cwd(), 'data', 'certificates.json');

export interface Certificate {
  name: string;
  score: string;
  issuer: string;
  date: string;
  link: string;
}

export interface CertificatesData {
  certificates: Certificate[];
}

async function readCerts(): Promise<CertificatesData> {
  try {
    const data = await readFile(CERT_PATH, 'utf-8');
    return JSON.parse(data);
  } catch {
    return { certificates: [] };
  }
}

async function writeCerts(certs: CertificatesData): Promise<void> {
  await writeFile(CERT_PATH, JSON.stringify(certs, null, 2));
}

export async function GET() {
  const certs = await readCerts();
  return NextResponse.json(certs);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { certificates } = body;

  if (!Array.isArray(certificates)) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
  }

  await writeCerts({ certificates });
  return NextResponse.json({ success: true });
}
