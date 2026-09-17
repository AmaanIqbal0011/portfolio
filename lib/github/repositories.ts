import { githubClient } from './client';
import { mapRepositories } from './mapper';
import type { GitHubRepository, MappedProject, GitHubCache, GitHubStats } from './types';

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
