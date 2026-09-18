import type { GitHubRepository, ProjectCategory, MappedProject } from './types';
import {
  FEATURED_REPOS,
  HIDDEN_REPOS,
  CATEGORY_KEYWORDS,
  CATEGORY_LABELS,
  CATEGORY_GRADIENTS,
} from './config';

function detectCategory(repo: GitHubRepository): ProjectCategory {
  const nameLower = repo.name.toLowerCase();
  const descLower = (repo.description || '').toLowerCase();
  const topicsLower = repo.topics.map(t => t.toLowerCase());
  const allText = `${nameLower} ${descLower} ${topicsLower.join(' ')}`;

  // Check each category
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const keyword of keywords) {
      if (allText.includes(keyword)) {
        return category as ProjectCategory;
      }
    }
  }

  // Language-based fallback
  const lang = (repo.language || '').toLowerCase();
  if (lang === 'python' && allText.includes('fastapi')) return 'fullstack';
  if (lang === 'typescript' || lang === 'javascript') return 'fullstack';

  return 'other';
}

function detectTechnologies(repo: GitHubRepository): string[] {
  const techs: Set<string> = new Set();

  // Add primary language
  if (repo.language) {
    techs.add(repo.language);
  }

  // Add topics as technologies (filter out generic ones)
  const genericTopics = ['portfolio', 'project', 'personal', 'website', 'app'];
  for (const topic of repo.topics) {
    if (!genericTopics.includes(topic.toLowerCase())) {
      // Capitalize nicely
      const niceName = topic
        .replace(/-/g, ' ')
        .replace(/\b\w/g, c => c.toUpperCase());
      techs.add(niceName);
    }
  }

  return Array.from(techs).slice(0, 6);
}

function generateGradient(category: ProjectCategory): string {
  return CATEGORY_GRADIENTS[category] || CATEGORY_GRADIENTS.other;
}

function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = Math.floor(diffMs / 1000);
  const diffMins = Math.floor(diffSecs / 60);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffMonths = Math.floor(diffDays / 30);
  const diffYears = Math.floor(diffDays / 365);

  if (diffYears > 0) return `${diffYears}y ago`;
  if (diffMonths > 0) return `${diffMonths}mo ago`;
  if (diffDays > 0) return `${diffDays}d ago`;
  if (diffHours > 0) return `${diffHours}h ago`;
  if (diffMins > 0) return `${diffMins}m ago`;
  return 'just now';
}

export function mapRepository(repo: GitHubRepository): MappedProject {
  const category = detectCategory(repo);
  const isFeatured = FEATURED_REPOS.includes(repo.name as typeof FEATURED_REPOS[number]);
  const isHidden = HIDDEN_REPOS.includes(repo.name as typeof HIDDEN_REPOS[number]);

  const displayName = repo.name
    .replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase());

  return {
    id: repo.full_name,
    // `name` MUST be the real GitHub repo name (e.g. "my-cool-project").
    // This value is used as the key to join with project_settings.repo_name
    // in the database for custom images, visibility, and display order.
    name: repo.name,
    displayName,
    description: repo.description || 'No description provided.',
    category,
    categoryLabel: CATEGORY_LABELS[category],
    language: repo.language,
    languages: detectTechnologies(repo),
    topics: repo.topics,
    stars: repo.stargazers_count,
    forks: repo.forks_count,
    url: repo.html_url,
    homepage: repo.homepage,
    updatedAt: repo.updated_at,
    createdAt: repo.created_at,
    isFeatured,
    isHidden,
    gradient: generateGradient(category),
  };
}

export function mapRepositories(repos: GitHubRepository[]): MappedProject[] {
  return repos
    .map(mapRepository)
    .sort((a, b) => {
      // Featured first
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;

      // Then by stars
      return b.stars - a.stars;
    });
}

export function getFilteredProjects(
  projects: MappedProject[],
  filter: 'all' | ProjectCategory
): MappedProject[] {
  const visible = projects.filter(p => !p.isHidden);

  if (filter === 'all') return visible;
  return visible.filter(p => p.category === filter);
}

export { formatTimeAgo };
