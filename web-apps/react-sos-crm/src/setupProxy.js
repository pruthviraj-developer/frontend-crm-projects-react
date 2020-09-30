/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/crm-api/',
    createProxyMiddleware({
      pathRewrite: { '^/crm-api': '' },
      target: 'http://qa.hopscotch.in',
      secure: false,
      changeOrigin: true,
    }),
  );
};
