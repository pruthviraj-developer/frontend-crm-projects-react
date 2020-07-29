module.exports = {
  addons: [
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-backgrounds/register',
    '@storybook/addon-docs',
    '@storybook/addon-viewport/register',
    '@storybook/addon-storysource',
  ],
  webpackFinal: async (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: [
        {
          loader: require.resolve('ts-loader'),
          options: {
            transpileOnly: true,
          },
        },
        {
          loader: require.resolve('react-docgen-typescript-loader'),
        },
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

    return config;
  },
};
