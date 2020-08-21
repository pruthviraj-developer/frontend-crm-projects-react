/* eslint-disable @typescript-eslint/no-var-requires */
const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      pathRewrite: { '^/api': '' },
      target: 'http://qa.hopscotch.in',
      secure: false,
      changeOrigin: true,
    }),
  );
};
