import React, {useState} from 'react';

import { Eyes } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Containers/Eyes',
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


