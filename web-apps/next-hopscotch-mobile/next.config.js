/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['hopscotch.in'],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: process.env.API_HOST + '/:path*',
      },
    ];
  },
};
