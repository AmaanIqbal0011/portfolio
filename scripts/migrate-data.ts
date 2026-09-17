import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { projectSettings, certificates } from '../lib/db/schema';
import { readFile } from 'fs/promises';
import { join } from 'path';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

async function migrateProjectSettings() {
  const filePath = join(process.cwd(), 'data', 'project-settings.json');
  let data: { hidden: string[]; customImages: Record<string, string> };

  try {
    const raw = await readFile(filePath, 'utf-8');
    data = JSON.parse(raw);
  } catch {
    console.log('No project-settings.json found, skipping.');
    return;
  }

  const allRepoNames = new Set([...data.hidden, ...Object.keys(data.customImages)]);

  for (const repoName of allRepoNames) {
    const isHidden = data.hidden.includes(repoName);
    const customImageUrl = data.customImages[repoName] || null;

    await db
      .insert(projectSettings)
      .values({ repoName, isHidden, customImageUrl })
      .onConflictDoUpdate({
        target: projectSettings.repoName,
        set: { isHidden, customImageUrl, updatedAt: new Date() },
      });
  }

  console.log(`Migrated ${allRepoNames.size} project settings.`);
}

async function migrateCertificates() {
  const filePath = join(process.cwd(), 'data', 'certificates.json');
  let data: { certificates: { name: string; score: string; issuer: string; date: string; link: string }[] };

  try {
    const raw = await readFile(filePath, 'utf-8');
    data = JSON.parse(raw);
  } catch {
    console.log('No certificates.json found, skipping.');
    return;
  }

  await db.delete(certificates);

  for (let i = 0; i < data.certificates.length; i++) {
    const cert = data.certificates[i];
    await db.insert(certificates).values({
      name: cert.name,
      score: cert.score || '',
      issuer: cert.issuer || '',
      date: cert.date || '',
      link: cert.link || '',
      displayOrder: i,
    });
  }

  console.log(`Migrated ${data.certificates.length} certificates.`);
}

async function main() {
  console.log('Starting migration to Neon PostgreSQL...\n');
  await migrateProjectSettings();
  await migrateCertificates();
  console.log('\nMigration complete!');
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
