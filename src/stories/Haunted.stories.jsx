import React from 'react';

import { Haunted } from '../components';
import GhostAlt from '../components/Haunted/GhostAlt';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Containers/Haunted',
  component: Haunted,
  parameters: {
    layout: 'fullscreen'
  }
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => (
  <div style={{height: '100%', width:'100%', padding: '200px', backgroundColor: 'black'}}>
    <Haunted {...args} ><div style={{backgroundColor: 'red', width: '200px', height:'200px', display:'inline-block'}}>This is a test</div></Haunted>
    <div style={{ marginLeft:'40px', display: 'inline-block'}}>
      <Haunted {...args} ><div style={{backgroundColor: 'red', display:'inline-block'}}>This is a test tes test tests</div></Haunted>
    </div>
  </div>
);

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
};

export const CustomGhost = Template.bind({});
CustomGhost.args = {
  Creature: GhostAlt,
};

export const CustomGlow = Template.bind({});
CustomGlow.args = {
  glowOptions: {
    animationTime: 4,
    boxShadowOff: '0px 0px 0px rgba(0,255,0,0)',
    boxShadowOn: '0px 0px 60px rgba(0,255,0,1)'
  }
};

export const NoGhosts = Template.bind({});
NoGhosts.args = {
  creatureOptions: null,
};

export const NoGlow = Template.bind({});
NoGlow.args = {
  glowOptions: null,
};

export const Disable = Template.bind({});
Disable.args = {
  disableFun: true,
};
