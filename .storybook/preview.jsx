import React from 'react';
import { themes } from '@storybook/theming';

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      theme: {
        ...themes.dark,
        brandTitle: 'React Halloween',
        brandUrl: 'https://github.com/patorjk/react-halloween',
      },
    },
    // This ensures any motion from framer-motion is properly handled
    viewport: {
      viewports: {
        // Your viewport definitions
      },
    },
  },

  decorators: [
    (Story) => (
      <div style={{ margin: '1rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
