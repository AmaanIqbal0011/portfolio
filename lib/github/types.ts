export interface GitHubOwner {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  type: string;
}

export interface GitHubLicense {
  key: string;
  name: string;
  spdx_id: string;
  url: string;
  node_id: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  private: boolean;
  owner: GitHubOwner;
  html_url: string;
  description: string | null;
  fork: boolean;
  url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  open_issues_count: number;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  default_branch: string;
  visibility: 'public' | 'private';
  license: GitHubLicense | null;
}

export interface GitHubProfile {
  login: string;
  id: number;
  avatar_url: string;
  html_url: string;
  name: string | null;
  company: string | null;
  blog: string | null;
  location: string | null;
  email: string | null;
  bio: string | null;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
}

export type ProjectCategory = 'ai' | 'fullstack' | 'automation' | 'other';

export interface MappedProject {
  id: string;
  name: string;
  displayName: string;
  description: string;
  category: ProjectCategory;
  categoryLabel: string;
  language: string | null;
  languages: string[];
  topics: string[];
  stars: number;
  forks: number;
  url: string;
  homepage: string | null;
  updatedAt: string;
  createdAt: string;
  isFeatured: boolean;
  isHidden: boolean;
  gradient: string;
  customDescription?: string;
  customImage?: string;
  customOrder?: number;
}

export interface GitHubStats {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  topLanguages: { name: string; count: number }[];
}

export interface GitHubCache {
  profile: GitHubProfile | null;
  repositories: GitHubRepository[];
  stats: GitHubStats;
  mappedProjects: MappedProject[];
  lastSynced: string | null;
}
