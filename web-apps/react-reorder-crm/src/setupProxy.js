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
    '/vendor-management-service/',
    createProxyMiddleware({
      target: 'http://inventory-management-service.qa.hs.internal:9002',
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
