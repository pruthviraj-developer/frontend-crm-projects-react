/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/crm-api/',
    createProxyMiddleware({
      pathRewrite: function (path) {
        return path.replace('/crm-api', '');
      },
      target: 'http://crm.qa.hopscotch.in',
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

  app.use(
    '/reorder-dashboard/',
    createProxyMiddleware({
      target: 'http://crm.qa.hopscotch.in',
      secure: false,
      changeOrigin: true,
    }),
  );

  // app.use(
  //   '/markstatus/',
  //   createProxyMiddleware({
  //     target: 'http://procurement-service.qa.hs.internal:9011/',
  //     secure: false,
  //     changeOrigin: true,
  //   }),
  // );
};
