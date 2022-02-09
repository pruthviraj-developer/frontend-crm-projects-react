/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/react-monorepo/PageCarousel/api/',
    createProxyMiddleware({
      pathRewrite: { '^/react-monorepo/PageCarousel/api': '' },
      target: 'https://crm.qa.hopscotch.in',
      secure: false,
      changeOrigin: true,
    }),
  );
  app.use(
    '/react-monorepo/PageCarousel/edit-carousel/api/',
    createProxyMiddleware({
      pathRewrite: { '^/react-monorepo/PageCarousel/edit-carousel/api': '' },
      target: 'https://crm.qa.hopscotch.in',
      secure: false,
      changeOrigin: true,
    }),
  );

  app.use(
    '/intranet/login/',
    createProxyMiddleware({
      target: 'http://crm.qa.hopscotch.in/',
      secure: false,
      changeOrigin: true,
    }),
  );
};
