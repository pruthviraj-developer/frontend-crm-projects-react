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
    '/v1/merchplatform/',
    createProxyMiddleware({
      target: 'http://procurement-service.qa.hs.internal:9011/',
      secure: false,
      changeOrigin: true,
    }),
  );

  app.use(
    '/markstatus/',
    createProxyMiddleware({
      target: 'http://procurement-service.qa.hs.internal:9011/',
      secure: false,
      changeOrigin: true,
    }),
  );

  // http://procurement-service.qa.hs.internal:9011/v1/sos/merchplatform/filters

  // app.use(
  //   '/react-monorepo/sos/intranet/',
  //   createProxyMiddleware({
  //     pathRewrite: { '^/react-monorepo/sos/intranet': '/intranet' },
  //     target: 'http://qa.hopscotch.in',
  //     secure: false,
  //     changeOrigin: true,
  //   }),
  // );
};
