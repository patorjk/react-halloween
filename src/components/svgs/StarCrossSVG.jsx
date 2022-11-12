import React from "react";
import PropTypes from "prop-types";

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
      <g
        stroke="none"
        strokeWidth="1"
        fill="none"
        fillRule="evenodd"
      >
        <path
          ref={pathRef}
          d="M 9.601,6.4 8,0 6.398,6.4 0,8 6.398,9.601 8,16 9.601,9.601 16,8 Z"
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
