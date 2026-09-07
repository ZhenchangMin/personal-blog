import { defineConfig } from 'astro/config';

const owner = process.env.GITHUB_REPOSITORY_OWNER;
const repository = process.env.GITHUB_REPOSITORY?.split('/')[1];
const isGitHubAction = process.env.GITHUB_ACTIONS === 'true';
const isUserSite = Boolean(owner && repository && repository.toLowerCase() === `${owner.toLowerCase()}.github.io`);

const inferredSite = owner ? `https://${owner}.github.io` : 'http://localhost:4321';
const inferredBase = isGitHubAction && repository && !isUserSite ? `/${repository}` : '/';

export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || inferredSite,
  base: process.env.BASE_PATH || inferredBase,
  trailingSlash: 'never',
});
