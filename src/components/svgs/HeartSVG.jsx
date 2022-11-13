import React from 'react';
import PropTypes from "prop-types";

/**
 * A component that returns an SVG component that can be used with several of the components in this library.
 * Original SVG was CC0 (source: https://www.svgrepo.com/svg/165566/heart)
 */
const HeartSVG = React.forwardRef(({width, height, style = {},}, ref) => {
  const svgStyle = {
    enableBackground:'0 0 230 230',
    ...style,
  };
  return (
    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
         viewBox="0 0 230 230" style={svgStyle} xmlSpace="preserve" width={width} height={height}>
      <path
        fill={'#f00'}
        d="M213.588,120.982L115,213.445l-98.588-92.463C-6.537,96.466-5.26,57.99,19.248,35.047l2.227-2.083
        c24.51-22.942,62.984-21.674,85.934,2.842L115,43.709l7.592-7.903c22.949-24.516,61.424-25.784,85.936-2.842l2.227,2.083
        C235.26,57.99,236.537,96.466,213.588,120.982z"/>
    </svg>

  );
});

HeartSVG.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
};

export {HeartSVG};
