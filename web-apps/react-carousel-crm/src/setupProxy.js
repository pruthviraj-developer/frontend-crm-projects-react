/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/react-monorepo/PageCarousel/api/',
    createProxyMiddleware({
      pathRewrite: { '^/react-monorepo/PageCarousel/api': '' },
      target: 'http://qa.hopscotch.in',
      secure: false,
      changeOrigin: true,
    }),
  );
  app.use(
    '/react-monorepo/PageCarousel/edit-carousel/api/',
    createProxyMiddleware({
      pathRewrite: { '^/react-monorepo/PageCarousel/edit-carousel/api': '' },
      target: 'http://qa.hopscotch.in',
      secure: false,
      changeOrigin: true,
    }),
  );
};
