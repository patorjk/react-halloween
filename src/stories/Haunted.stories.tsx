import React from 'react';

import { Haunted, GhostAltSVG } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Containers/Haunted',
  component: Haunted,
  parameters: {
    layout: 'fullscreen',
  },
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// @ts-expect-error TODO: figure this out later
function Template(args) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        padding: '200px',
        backgroundColor: 'black',
      }}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Haunted {...args}>
        <div
          style={{
            backgroundColor: 'red',
            width: '200px',
            height: '200px',
            display: 'inline-block',
          }}
        >
          This is a test
        </div>
      </Haunted>
      <div style={{ marginLeft: '40px', display: 'inline-block' }}>
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Haunted {...args}>
          <div style={{ backgroundColor: 'red', display: 'inline-block' }}>This is a test</div>
        </Haunted>
      </div>
    </div>
  );
}

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// @ts-expect-error TODO: figure this out later
Simple.args = {};

export const PlayOnce = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// @ts-expect-error TODO: figure this out later
PlayOnce.args = {
  creatureOptions: {
    repeat: false,
  },
};

export const CustomGhost = Template.bind({});
// @ts-expect-error TODO: figure this out later
CustomGhost.args = {
  Creature: GhostAltSVG,
};

export const CustomGlow = Template.bind({});
// @ts-expect-error TODO: figure this out later
CustomGlow.args = {
  glowOptions: {
    animationTime: 4,
    boxShadowOff: '0px 0px 0px rgba(0,255,0,0)',
    boxShadowOn: '0px 0px 60px rgba(0,255,0,1)',
  },
};

export const NoGhosts = Template.bind({});
// @ts-expect-error TODO: figure this out later
NoGhosts.args = {
  creatureOptions: null,
};

export const NoGlow = Template.bind({});
// @ts-expect-error TODO: figure this out later
NoGlow.args = {
  glowOptions: null,
};

export const Disable = Template.bind({});
// @ts-expect-error TODO: figure this out later
Disable.args = {
  disableFun: true,
};
