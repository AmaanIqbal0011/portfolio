import { pgTable, serial, text, boolean, integer, timestamp } from 'drizzle-orm/pg-core';

export const projectSettings = pgTable('project_settings', {
  id: serial('id').primaryKey(),
  repoName: text('repo_name').notNull().unique(),
  isHidden: boolean('is_hidden').notNull().default(false),
  customImageUrl: text('custom_image_url'),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export const certificates = pgTable('certificates', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  score: text('score').notNull().default(''),
  issuer: text('issuer').notNull().default(''),
  date: text('date').notNull().default(''),
  link: text('link').default(''),
  displayOrder: integer('display_order').notNull().default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type ProjectSetting = typeof projectSettings.$inferSelect;
export type Certificate = typeof certificates.$inferSelect;
