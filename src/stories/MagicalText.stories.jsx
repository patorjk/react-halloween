import React, {useState} from 'react';

import {GhostSVG, HeartSVG, MagicalText} from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Decorations/MagicalText',
  component: MagicalText,
  parameters: {
    layout: 'fullscreen'
  }
};

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template = ({notes, ...args}) => {
  const [hover, setHover] = useState(false);

  const onMouseEnter = () => {
    setHover(true);
  };
  const onMouseLeave = () => {
    setHover(false);
  };

  return (
    <div style={{
      height: '100%',
      width: '100%',
      padding: '20px',
      backgroundColor: 'black',
      color: '#eee',
    }}>
      <div>
        <MagicalText {...args} />
      </div>
      <div
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        style={{display:'inline-block', border: '1px solid grey', marginTop: '20px', borderRadius:'10px', padding: '10px'}}
      >
        <MagicalText showAdornments={hover} {...args} />
      </div>
      {notes && (
        <div style={{marginTop:'20px'}}>{notes}</div>
      )}
    </div>
  )
};

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Simple.args = {
  text: 'This is so magical!',
  notes: 'The div on the bottom only has sparkles when hovered over.'
};

export const VerySparkly = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
VerySparkly.args = {
  text: 'This is so magical! Oh wow is this a lot of sparkles...',
  colors: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'violet'],
  numberOfAdornments: 10,
  notes: 'The more colors there are, the bigger the chance the sparkle color will clash with the text color. This is not that noticeable when there is just 2 colors.'
};

export const NoAdnornments = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
NoAdnornments.args = {
  text: 'This is so magical! Except there are no sparkles.',
  numberOfAdornments: 0
};

export const DisableFun = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
DisableFun.args = {
  text: 'This is so magical!',
  disableFun: true,
};

export const Ghost = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Ghost.args = {
  text: 'This is kind of spooky!',
  Adornment: GhostSVG,
  adornmentType: 'scale',
  adornmentDuration: 2,
};

export const Heart = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Heart.args = {
  text: 'I feel so loved...',
  Adornment: HeartSVG,
  adornmentType: 'scale',
  adornmentDuration: 2,
  adornmentWidth: 12,
  adornmentHeight: 12,
};

