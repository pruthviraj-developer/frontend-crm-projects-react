/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/react-monorepo/PageCarousel/carouselservice',
    createProxyMiddleware({
      pathRewrite: { '^/react-monorepo/PageCarousel': '' },
      target: 'http://qa.hopscotch.in',
      secure: false,
      changeOrigin: true,
    }),
  );
};
