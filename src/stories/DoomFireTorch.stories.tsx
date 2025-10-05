import React, { type ChangeEvent, useCallback, useMemo, useState } from 'react';

import { DoomFireTorch } from '../components';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'SpecialEffects/DoomFireTorch',
  component: DoomFireTorch,
  parameters: {
    layout: 'fullscreen',
  },
};

const purpleRedFireColor = [
  '#FF000000', // transparent
  '#FF0000', // Red
  'purple',
];

const greenFireColors = [
  '#66FF0000', // transparent
  '#66FF00',
  '#097969',
];

const yellowRedFireColors = ['#FF634700', '#FF6347', '#FFD700'];

const purpleFireColors = ['#FF69B400', '#FF69B4', '#BA55D3'];

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
// @ts-expect-error TODO: figure this out later
function Template(args) {
  const [loKey, setLoKey] = useState(0);
  const [enabled, setEnabled] = useState(true);

  const updateKey = () => {
    setLoKey(loKey + 1);
  };
  const toggleEnabled = () => setEnabled((prev) => !prev);

  const [firePixelation, setFirePixelation] = useState(1);
  const handlePixelationChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFirePixelation(Number(event.target.value));
  }, []);

  const [fireStrength, setFireStrength] = useState(0.75);
  const handleFireStrengthChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setFireStrength(Number(event.target.value));
  }, []);

  const [colorSelectValue, setColorSelectValue] = useState('default');

  const colors = useMemo(() => {
    if (colorSelectValue === 'purpleRedFireColor') {
      return purpleRedFireColor;
    }
    if (colorSelectValue === 'greenFireColors') {
      return greenFireColors;
    }
    if (colorSelectValue === 'yellowRedFireColors') {
      return yellowRedFireColors;
    }
    if (colorSelectValue === 'purpleFireColors') {
      return purpleFireColors;
    }
    return undefined;
  }, [colorSelectValue]);

  const handleColorChnage = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    setColorSelectValue(event.target.value);
  }, []);

  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        marginTop: '1rem',
        backgroundColor: 'black',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem',
      }}
    >
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <DoomFireTorch
        key={loKey}
        fireEnabled={enabled}
        fireColors={colors}
        pixelSize={firePixelation}
        fireStrength={fireStrength}
      />
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button type="button" onClick={updateKey}>
          Reset
        </button>
        <button type="button" onClick={toggleEnabled}>
          {enabled ? 'Disable' : 'Enable'}
        </button>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="fire-colors">Fire Colors</label>
        <select id="fire-colors" name="fire-colors" value={colorSelectValue} onChange={handleColorChnage}>
          <option value="default">Default</option>
          <option value="purpleRedFireColor">Purple to Red Fire</option>
          <option value="greenFireColors">Green Fire</option>
          <option value="yellowRedFireColors">Yellow Red Fire</option>
          <option value="purpleFireColors">Purple Pink Fire</option>
        </select>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="fire-pixelation">Fire Pixelation</label>
        <input
          type="range"
          id="fire-pixelation"
          name="fire-pixelation"
          min="1"
          max="10"
          value={firePixelation}
          onChange={handlePixelationChange}
        />
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="fire-strength">Fire Strength</label>
        <input
          type="range"
          id="fire-strength"
          name="fire-strength"
          min="0.1"
          max="1"
          step="0.05"
          value={fireStrength}
          onChange={handleFireStrengthChange}
        />
      </div>
    </div>
  );
}

export const Simple = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
// @ts-expect-error TODO: figure this out later
Simple.args = {};
