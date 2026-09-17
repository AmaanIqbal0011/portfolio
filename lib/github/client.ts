import { GITHUB_CONFIG } from './config';
import type { GitHubRepository, GitHubProfile } from './types';

const GITHUB_API = 'https://api.github.com';

class GitHubClient {
  private token: string | null = null;

  setToken(token: string) {
    this.token = token;
  }

  private async request<T>(endpoint: string): Promise<T> {
    const headers: Record<string, string> = {
      Accept: 'application/vnd.github.v3+json',
      'User-Agent': 'Manho-Portfolio',
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const res = await fetch(`${GITHUB_API}${endpoint}`, {
      headers,
      next: { revalidate: GITHUB_CONFIG.cacheRevalidation },
    });

    if (!res.ok) {
      throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  }

  async getProfile(username: string): Promise<GitHubProfile> {
    return this.request<GitHubProfile>(`/users/${username}`);
  }

  async getRepositories(username: string): Promise<GitHubRepository[]> {
    const repos: GitHubRepository[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const batch = await this.request<GitHubRepository[]>(
        `/users/${username}/repos?per_page=${perPage}&page=${page}&sort=updated&direction=desc&type=public`
      );

      repos.push(...batch);

      if (batch.length < perPage) break;
      page++;

      // Safety limit
      if (page > 10) break;
    }

    return repos;
  }

  async exchangeCodeForToken(code: string): Promise<string> {
    const res = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: GITHUB_CONFIG.clientId,
        client_secret: GITHUB_CONFIG.clientSecret,
        code,
      }),
    });

    const data = await res.json();

    if (data.error) {
      throw new Error(data.error_description || 'Failed to exchange code for token');
    }

    return data.access_token;
  }
}

export const githubClient = new GitHubClient();
