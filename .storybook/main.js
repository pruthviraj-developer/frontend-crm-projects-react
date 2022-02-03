const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const path = require('path');
module.exports = {
  stories: ['../packages/**/**/src/**/*.stories.@(ts|tsx|mdx)', '../packages/**/src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    '@storybook/preset-create-react-app',
    '@storybook/addon-actions/register',
    '@storybook/addon-links/register',
    '@storybook/addon-backgrounds',
    '@storybook/addon-docs',
    '@storybook/addon-viewport',
    '@storybook/addon-storysource',
    'storybook-addon-material-ui',
    'storybook-addon-next-router',
  ],
  typescript: {
    // Disable docgeneration due to TypeScript 2.3.x incompatability.
    // TODO: Fix this once https://github.com/styleguidist/react-docgen-typescript/issues/356
    // is addressed
    reactDocgen: 'none',
  },
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx|woff|woff2)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
          },
        },
        // {
        //   loader: require.resolve('react-docgen-typescript-loader'),
        // },
        {
          loader: require.resolve('babel-loader'),
          options: {
            plugins: ['emotion'],
            presets: [['react-app', { flow: false, typescript: true }]],
          },
        },
      ],
    });

    config.resolve.extensions.push('.ts', '.tsx');
    config.resolve.plugins = [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../packages/lib-react/components/tsconfig.json'),
      }),
    ];
    return config;
  },
};
