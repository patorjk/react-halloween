module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      type: 'javascript/auto',
      test: /\.(js|mjs)$/,
      include: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-optional-chaining'],
        },
      },
    });

    // Return the altered config
    return config;
  },
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-webpack4',
  },
  // Add this to disable TypeScript docgen
  typescript: {
    reactDocgen: 'none', // This disables the problematic plugin
  },
};
