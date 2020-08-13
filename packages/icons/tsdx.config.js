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
            // { removeAttrs: { attrs: '(stroke|fill)' } }, // enabling the default styles for the svg icons - uncomment this to improve the build performance and check the icons
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
