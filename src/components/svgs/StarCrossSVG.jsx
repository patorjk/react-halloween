import React from "react";
import PropTypes from "prop-types";

/**
 * @component
 * A component that returns an SVG component that can be used with several of the components in this library.
 * It takes in a pathRef component which is used in the MagicalTextSparkleAnimator (for MagicalText).
 */
const StarCrossSVG = React.forwardRef(({pathRef, width, height, style = {}}, ref) => {
  return (
    <svg
      ref={ref}
      width={width}
      height={height}
      style={style}
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <path
          ref={pathRef}
          d="M 9.5, 6.5 8, 0 6.5, 6.5 0, 8 6.5, 9.5 8, 16 9.5, 9.5 16, 8 Z"
        />
      </g>
    </svg>
  )
});

StarCrossSVG.propTypes = {
  // A ref to attach to the path, which will make it possible to change the color
  pathRef: PropTypes.oneOfType([
    // Either a function
    PropTypes.func,
    // Or the instance of a DOM native element (see the note about SSR)
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  width: PropTypes.number,
  height: PropTypes.number,
  style: PropTypes.object,
};

export {StarCrossSVG};
export default StarCrossSVG;
