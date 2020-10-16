/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/crm-api/',
    createProxyMiddleware({
      pathRewrite: { '^/crm-api/': '' },
      target: 'http://crm.qa.hopscotch.in',
      secure: false,
      changeOrigin: true,
    }),
  );
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
