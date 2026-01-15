/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig = {
  output: 'export',
  basePath: isGithubPages ? '/tools' : '',
  images: { unoptimized: true },
  trailingSlash: true,
};

module.exports = nextConfig;
