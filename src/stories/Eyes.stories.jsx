import React, {useState} from 'react';

import { Eyes } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Decorations/Eyes',
  component: Eyes,
  parameters: {
    layout: 'fullscreen'
  }
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = (args) => {
  const [open, setOpen] = useState(true);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div style={{height: '100%', width: '100%', padding: '100px', backgroundColor: 'black'}}>
      <Eyes open={open} {...args} />
      <button onClick={toggleOpen}>{open ? 'Close' : 'Open'}</button>
    </div>
  )
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  width: 400
};

export const Variant1 = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Variant1.args = {
  width: 400,
  irisColor: 'crimson',
  eyeBallColor: 'rgb(255,220,220)',
  pupilColor: 'rgb(70,0,0)',
  pupilSize: 0.7,
  variant: 1,
};

export const CustomVariant = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
CustomVariant.args = {
  width: 400,
  // for designing a path: https://yqnn.github.io/svg-path-editor/
  variant: {
    leftOpened: 'M 0 4 C 3 7 7 7 10 4 C 7 2 3 2 0 4',
    leftClosed: 'M 0 4 C 4 4 7 4 10 4 C 7 4 4 4 0 4',
    rightOpened: 'M 0 4 C 3 7 7 7 10 4 C 7 2 3 2 0 4',
    rightClosed: 'M 0 4 C 4 4 7 4 10 4 C 7 4 4 4 0 4',
  },
  irisColor: 'steelblue',
};

export const NoFollow = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoFollow.args = {
  width: 400,
  follow: false,
};

export const Small = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Small.args = {
  width: 50,
};
