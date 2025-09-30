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
// @ts-expect-error TODO: figure this out later
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
        padding: '100px',
        backgroundColor: 'white',
      }}
    >
      <div style={{ padding: '100px' }}>This is a test</div>
      <div>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <LightsOut key={loKey} {...args} />
        <button type="button">This button does nothing</button>
        <button type="button" onClick={updateKey}>
          Reset
        </button>
      </div>
    </div>
  );
}

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// @ts-expect-error TODO: figure this out later
Simple.args = {
  size: 300,
  onLightsOnStart: () => console.log('onLightsOnStart'),
  onLightsOnEnd: () => console.log('onLightsOnEnd'),
};

export const NoLightsOn = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// @ts-expect-error TODO: figure this out later
NoLightsOn.args = {
  clickToTurnOnLights: false,
};
