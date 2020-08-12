const url = require('@rollup/plugin-url');
const svgr = require('@svgr/rollup').default;

module.exports = {
  rollup(config, options) {
    config.plugins = [
      url(),
      svgr({
        // configure however you like, this is just an example
        // ref: true,
        memo: true,
        typescript: true,
        svgoConfig: {
          plugins: [
            { removeViewBox: false },
            { removeAttrs: { attrs: '(stroke|fill)' } },
            { removeEmptyAttrs: true },
            { mergePaths: true },
            {
              addAttributesToSVGElement: {
                attributes: [
                  { 'fill-rule': 'currentColor' },
                  { 'aria-hidden': 'true' },
                ],
              },
            },
          ],
        },
      }),
      ...config.plugins,
    ];

    return config;
  },
};
