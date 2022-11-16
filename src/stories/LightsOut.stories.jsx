import React from 'react';

import { LightsOut } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SpecialEffects/LightsOut',
  component: LightsOut,
  parameters: {
    layout: 'fullscreen',
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
function Template(args) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        padding: '300px',
        backgroundColor: 'white',
      }}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <LightsOut {...args} />
      <button type="button">This button does nothing</button>
    </div>
  );
}

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  size: 300,
};
