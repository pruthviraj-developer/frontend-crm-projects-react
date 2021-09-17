/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ['hopscotch.in'],
    imageSizes: [360, 480, 720, 1080],
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
