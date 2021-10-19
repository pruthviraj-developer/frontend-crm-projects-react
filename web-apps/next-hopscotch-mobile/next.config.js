/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['hopscotch.in'],
    imageSizes: [360, 480, 720, 1080],
  },
  env: {
    WEB_HOST: process.env.MY_ENV_VAR,
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
        source: '/product/:path*',
        destination: '/product/:path*',
      },
      {
        source: '/:path*',
        destination: process.env.WEB_HOST + '/:path*',
      },
    ];
  },
};
