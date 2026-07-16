const AppError = require('../../utils/AppError');

const GITHUB_API_URL = 'https://api.github.com';
const IMPORTANT_CONFIG_FILES = new Set(['package.json', 'README.md', 'Dockerfile', 'docker-compose.yml', '.env.example', 'vite.config.js', 'next.config.js']);

const parseRepositoryUrl = (repositoryUrl) => {
  let url;

  try {
    url = new URL(repositoryUrl);
  } catch {
    throw new AppError('Please provide a valid public GitHub repository URL.', 400);
  }

  if (url.protocol !== 'https:' || url.hostname !== 'github.com') {
    throw new AppError('Repository URL must use https://github.com/owner/repository.', 400);
  }

  const [owner, repository, ...extra] = url.pathname.split('/').filter(Boolean);
  const repositoryName = repository?.replace(/\.git$/, '');

  if (!owner || !repositoryName || extra.length > 0) {
    throw new AppError('Repository URL must use https://github.com/owner/repository.', 400);
  }

  return { owner, repository: repositoryName, canonicalUrl: `https://github.com/${owner}/${repositoryName}` };
};

const githubRequest = async (path) => {
  const response = await fetch(`${GITHUB_API_URL}${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'User-Agent': 'MentorLoop',
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
    signal: AbortSignal.timeout(8000),
  });

  if (response.status === 404) throw new AppError('Public GitHub repository not found.', 404);
  if (!response.ok) throw new AppError('GitHub could not fetch this repository. Please try again later.', 503);

  return response.json();
};

const fetchRepositoryInformation = async (repositoryUrl) => {
  const { owner, repository, canonicalUrl } = parseRepositoryUrl(repositoryUrl);
  const metadata = await githubRequest(`/repos/${owner}/${repository}`);
  const [languagesData, readmeResult, treeResult] = await Promise.allSettled([
    githubRequest(`/repos/${owner}/${repository}/languages`),
    githubRequest(`/repos/${owner}/${repository}/readme`),
    githubRequest(`/repos/${owner}/${repository}/git/trees/${metadata.default_branch}?recursive=1`),
  ]);

  const readme = readmeResult.status === 'fulfilled' && readmeResult.value.content
    ? Buffer.from(readmeResult.value.content, 'base64').toString('utf8').slice(0, 8000)
    : '';
  const tree = treeResult.status === 'fulfilled'
    ? treeResult.value.tree.filter((item) => item.path.split('/').length <= 4).slice(0, 150).map((item) => item.path)
    : [];

  return {
    repositoryUrl: canonicalUrl,
    repositoryName: metadata.name,
    repositoryDescription: metadata.description || '',
    languages: languagesData.status === 'fulfilled' ? Object.keys(languagesData.value) : [],
    readme,
    folderStructure: tree,
    importantConfigFiles: tree.filter((path) => IMPORTANT_CONFIG_FILES.has(path.split('/').pop())),
  };
};

module.exports = { fetchRepositoryInformation, parseRepositoryUrl };
