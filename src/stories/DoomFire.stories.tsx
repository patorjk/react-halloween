import React, { useState } from 'react';

import { DoomFire } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SpecialEffects/DoomFire',
  component: DoomFire,
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
        marginTop: '1rem',
        backgroundColor: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <DoomFire key={loKey} {...args} />
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

export const NoLightsOn = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoLightsOn.args = {
  clickToTurnOnLights: false,
};
