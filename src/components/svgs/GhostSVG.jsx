import React from 'react';
import PropTypes from 'prop-types';

/**
 * @component
 * A component that returns an SVG component that can be used with several of the components in this library.
 * Original SVG was CC0 (source: https://www.svgrepo.com/svg/400277/ghost)
 */
const GhostSVG = React.forwardRef(({
  width,
  height,
  style = {},
}, ref) => {
  const ghostStyle = {
    enableBackground: 'new 0 0 512 512',
    ...style,
  };

  return (
    <svg
      ref={ref}
      width={`${width}`}
      height={`${height}`}
      version="1.1"
      id="Layer_1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      x="0px"
      y="0px"
      viewBox="0 0 512 512"
      style={ghostStyle}
      xmlSpace="preserve"
    >
      <path
        style={{ fill: '#E6E6E6' }}
        d="M420.607,164.6v303.522c0,20.451-23.636,31.857-39.647,19.119v-0.013
c-8.906-7.079-21.53-7.079-30.436,0l-24.435,19.449c-8.906,7.092-21.517,7.092-30.423,0l-24.435-19.449
c-8.906-7.079-21.53-7.079-30.436,0l-24.435,19.462c-8.906,7.079-21.517,7.079-30.423,0l-24.448-19.462
c-8.906-7.079-21.53-7.079-30.436,0l-0.013,0.013c-15.998,12.738-39.647,1.345-39.647-19.119V164.6
C91.393,73.686,165.092,0,256.006,0c45.445,0,86.601,18.421,116.39,48.21C402.185,77.987,420.607,119.143,420.607,164.6z"
      />
      <g>
        <path
          style={{ fill: '#666666' }}
          d="M327.878,275.928H184.122c0-39.697,32.187-71.884,71.884-71.884S327.878,236.231,327.878,275.928z"
        />
        <path
          style={{ fill: '#666666' }}
          d="M195.084,114.487c17.838,0,32.301,14.45,32.301,32.288s-14.463,32.301-32.301,32.301
s-32.288-14.463-32.288-32.301S177.246,114.487,195.084,114.487z"
        />
        <path
          style={{ fill: '#666666' }}
          d="M316.916,114.487c17.838,0,32.288,14.45,32.288,32.288s-14.45,32.301-32.288,32.301
c-17.838,0-32.288-14.463-32.288-32.301S299.078,114.487,316.916,114.487z"
        />
      </g>
      <path
        style={{ fill: '#CCCCCC' }}
        d="M283.918,2.36C274.846,0.812,265.522,0,256.006,0C165.092,0,91.393,73.686,91.393,164.6v303.522
  c0,20.464,23.648,31.857,39.647,19.119l0.013-0.013c6.014-4.783,13.727-6.331,20.845-4.656c-2.918-3.933-4.681-8.855-4.681-14.45
  V164.6C147.216,83.201,206.299,15.605,283.918,2.36z"
      />
    </svg>
  );
});

GhostSVG.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
};

export { GhostSVG };
export default GhostSVG;
