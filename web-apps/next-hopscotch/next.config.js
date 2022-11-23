/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['hopscotch.in'],
    loader: 'custom',
    imageSizes: [360, 480, 720, 1080],
    deviceSizes: [360, 480, 720, 1080],
  },
  env: {
    WEB_HOST: process.env.WEB_HOST,
    NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID: process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER_ID,
    ANALYTIC_HOST: process.env.ANALYTIC_HOST,
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.WEB_HOST + '/api/:path*',
      },
      {
        source: '/product/:id(\\d{1,})/:path*',
        destination: '/product/:id(\\d{1,})/:path*',
      },
      {
        source: '/products/:id(\\d{1,})/:path*',
        destination: '/products/:id(\\d{1,})/:path*',
      },
      {
        source: '/:path*',
        destination: process.env.WEB_HOST + '/:path*',
      },
    ];
  },
  generateBuildId: async () => {
    const cp = require('child_process');
    const gitSha = cp.execSync('git rev-parse --short HEAD', {
      cwd: __dirname,
      encoding: 'utf8',
    });
    return gitSha;
  },
};
