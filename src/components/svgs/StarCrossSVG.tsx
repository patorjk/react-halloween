import React from 'react';

export interface StarCrossSVGProps {
  pathRef: React.Ref<SVGPathElement>;
  width: number;
  height: number;
  style?: React.CSSProperties;
  className?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<SVGSVGElement>) => void;
}

/**
 * @component
 * A component that returns an SVG component that can be used with several of the components in this library.
 * It takes in a pathRef component which is used in the MagicalTextSparkleAnimator (for MagicalText).
 */
const StarCrossSVG = React.forwardRef(
  (
    {
      pathRef,
      width,
      height,
      style = {},
      className,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
      onKeyDown,
    }: StarCrossSVGProps,
    ref: React.RefObject<SVGSVGElement> | null = null,
  ) => (
    <svg
      ref={ref}
      className={className}
      width={width}
      height={height}
      style={style}
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    >
      <g>
        <path ref={pathRef} d="M 9.5, 6.5 8, 0 6.5, 6.5 0, 8 6.5, 9.5 8, 16 9.5, 9.5 16, 8 Z" />
      </g>
    </svg>
  ),
);

export { StarCrossSVG };
