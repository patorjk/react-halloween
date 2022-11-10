import React, {useState} from 'react';

import { MagicalText } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Decorations/MagicalText',
  component: MagicalText,
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
    <div style={{height: '100%', width: '100%', padding: '300px', backgroundColor: 'black'}}>
      <MagicalText {...args} />
    </div>
  )
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  text: 'This is so magical!'
};

