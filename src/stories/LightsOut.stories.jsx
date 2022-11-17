import React, { useState } from 'react';

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
  const [loKey, setLoKey] = useState(0);

  const updateKey = () => {
    setLoKey(loKey + 1);
  };

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
      <LightsOut key={loKey} {...args} />
      <button type="button">This button does nothing</button>
      <button type="button" onClick={updateKey}>
        Reset
      </button>
    </div>
  );
}

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  size: 300,
};
