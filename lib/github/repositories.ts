import { githubClient } from './client';
import { mapRepositories } from './mapper';
import { GITHUB_CONFIG } from './config';
import type { GitHubRepository, GitHubCache, GitHubStats } from './types';

// In-memory cache (resets on server restart)
let cache: GitHubCache = {
  profile: null,
  repositories: [],
  stats: { publicRepos: 0, followers: 0, following: 0, totalStars: 0, topLanguages: [] },
  mappedProjects: [],
  lastSynced: null,
};

function calculateStats(repos: GitHubRepository[]): GitHubStats {
  const totalStars = repos.reduce((sum, r) => sum + r.stargazers_count, 0);

  const langCounts: Record<string, number> = {};
  for (const repo of repos) {
    if (repo.language) {
      langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
    }
  }

  const topLanguages = Object.entries(langCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  return {
    publicRepos: repos.filter(r => !r.private).length,
    followers: 0,
    following: 0,
    totalStars,
    topLanguages,
  };
}

export async function fetchAndCacheRepositories(username: string): Promise<GitHubCache> {
  try {
    const [profile, repositories] = await Promise.all([
      githubClient.getProfile(username),
      githubClient.getRepositories(username),
    ]);

    const mappedProjects = mapRepositories(repositories);
    const stats = calculateStats(repositories);
    stats.followers = profile.followers;
    stats.following = profile.following;

    cache = {
      profile,
      repositories,
      stats,
      mappedProjects,
      lastSynced: new Date().toISOString(),
    };

    return cache;
  } catch (error) {
    console.error('Failed to fetch GitHub data:', error);
    return cache;
  }
}

export function getCachedData(): GitHubCache {
  return cache;
}

export function isCacheStale(): boolean {
  if (!cache.lastSynced) return true;
  const lastSync = new Date(cache.lastSynced).getTime();
  const now = Date.now();
  const hourMs = 3600 * 1000;
  return now - lastSync > hourMs;
}

/**
 * Ensures the in-memory cache is populated with fresh GitHub data.
 * Uses the server-side GITHUB_TOKEN (or unauthenticated for public repos)
 * so this works for ALL visitors, not just after an admin OAuth connect.
 *
 * Call this from API routes that serve public project data.
 * The cache acts as a performance optimization — this is the source of truth
 * for whether data needs refreshing.
 */
export async function ensureCachePopulated(): Promise<void> {
  if (!isCacheStale()) return;

  // Set server-side token for fetching public repos without admin session.
  // If no GITHUB_TOKEN env var is set, requests go unauthenticated
  // (subject to GitHub's lower unauthenticated rate limits).
  if (GITHUB_CONFIG.serverToken) {
    githubClient.setToken(GITHUB_CONFIG.serverToken);
  }

  try {
    await fetchAndCacheRepositories(GITHUB_CONFIG.owner);
  } catch (error) {
    // If fetch fails and cache is empty, log but don't throw —
    // callers should handle empty cache gracefully.
    console.error('ensureCachePopulated: Failed to refresh GitHub cache:', error);
  }
}
