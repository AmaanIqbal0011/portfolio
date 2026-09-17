export const GITHUB_CONFIG = {
  clientId: process.env.GITHUB_CLIENT_ID || '',
  clientSecret: process.env.GITHUB_CLIENT_SECRET || '',
  callbackUrl: process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000/api/github/callback',
  scopes: ['read:user', 'repo'],
  cacheRevalidation: 3600, // 1 hour in seconds
  owner: process.env.GITHUB_OWNER || 'manho',
} as const;

export const FEATURED_REPOS = [
  'contentpilot',
] as const;

export const HIDDEN_REPOS = [
  '.gitignore',
  'dotfiles',
  'old-projects',
] as const;

export const CATEGORY_KEYWORDS: Record<string, string[]> = {
  ai: [
    'ai', 'agent', 'llm', 'openai', 'gpt', 'machine-learning', 'ml',
    'nlp', 'chatbot', 'neural', 'deep-learning', 'tensorflow', 'pytorch',
    'langchain', 'openai-agent', 'agentic', 'prompt', 'embedding',
    'rag', 'vector', 'generative', 'genai', 'artificial-intelligence',
  ],
  fullstack: [
    'nextjs', 'next.js', 'react', 'vue', 'svelte', 'fullstack', 'full-stack',
    'saas', 'dashboard', 'webapp', 'web-app', 'frontend', 'backend',
    'api', 'database', 'postgresql', 'mongodb', 'prisma', 'drizzle',
    'fastapi', 'express', 'nestjs', 'django', 'rails',
  ],
  automation: [
    'automation', 'workflow', 'n8n', 'trigger', 'cron', 'scheduler',
    'bot', 'discord-bot', 'telegram-bot', 'slack-bot', 'webhook',
    'pipeline', 'ci-cd', 'devops', 'integration', 'zapier',
  ],
};

export const CATEGORY_LABELS: Record<string, string> = {
  ai: 'AI & Agents',
  fullstack: 'Full Stack',
  automation: 'Automation',
  other: 'Other',
};

export const CATEGORY_GRADIENTS: Record<string, string> = {
  ai: 'from-brand/10 via-purple-500/5 to-blue-500/10',
  fullstack: 'from-blue-500/10 to-cyan-500/5',
  automation: 'from-emerald-500/10 to-teal-500/5',
  other: 'from-orange-500/10 to-amber-500/5',
};

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-400',
  JavaScript: 'bg-yellow-300',
  Python: 'bg-yellow-400',
  Rust: 'bg-orange-500',
  Go: 'bg-cyan-400',
  Java: 'bg-red-400',
  'C++': 'bg-pink-400',
  C: 'bg-gray-400',
  Ruby: 'bg-red-500',
  PHP: 'bg-purple-400',
  Swift: 'bg-orange-400',
  Kotlin: 'bg-purple-500',
  Dart: 'bg-cyan-500',
  HTML: 'bg-orange-300',
  CSS: 'bg-blue-300',
  Shell: 'bg-gray-300',
  Vue: 'bg-green-400',
  Svelte: 'bg-orange-400',
};
