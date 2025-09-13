import React, { CSSProperties } from 'react';
import { Eye } from './Eye';

export interface EyeLayout {
  left: {
    opened: string;
    closed: string;
  };
  right: {
    opened: string;
    closed: string;
  };
  pupil: {
    cx: number;
    cy: number;
  };
}

// design path with: https://yqnn.github.io/svg-path-editor/
const eyeLayoutVariants: Record<string, EyeLayout> = {
  unfriendly: {
    left: {
      opened: 'M 0 4 C 3 6 6 7 10 4 C 6 3 3 3 0 4',
      closed: 'M 0 4 C 4 4 7 4 10 4 C 7 4 4 4 0 4',
    },
    right: {
      opened: 'M 0 4 C 4 7 7 6 10 4 C 7 3 4 3 0 4',
      closed: 'M 0 4 C 4 4 7 4 10 4 C 7 4 4 4 0 4',
    },
    pupil: {
      cx: 5,
      cy: 4.5,
    },
  },
  menacing: {
    left: {
      opened: 'M 0 4 C 3 7 6 7 10 4 C 6 3 3 2 0 4',
      closed: 'M 0 4 C 4 4 7 4 10 4 C 7 4 4 4 0 4',
    },
    right: {
      opened: 'M 0 4 C 4 7 7 7 10 4 C 7 2 4 3 0 4',
      closed: 'M 0 4 C 4 4 7 4 10 4 C 7 4 4 4 0 4',
    },
    pupil: {
      cx: 5,
      cy: 4.5,
    },
  },
  neutral: {
    left: {
      opened: 'M 0 4 C 3 7 7 7 10 4 C 7 1 3 1 0 4',
      closed: 'M 0 4 C 3 4 7 4 10 4 C 7 4 3 4 0 4',
    },
    right: {
      opened: 'M 0 4 C 3 7 7 7 10 4 C 7 1 3 1 0 4',
      closed: 'M 0 4 C 3 4 7 4 10 4 C 7 4 3 4 0 4',
    },
    pupil: {
      cx: 5,
      cy: 4,
    },
  },
};

export type EyeLayoutPresets = 'unfriendly' | 'menacing' | 'neutral';

export interface EyesProps {
  open?: boolean;
  eyeLayout?: EyeLayoutPresets | EyeLayout;
  animationTime?: number;
  width?: number;
  irisColor?: string;
  eyeBallColor?: string;
  pupilColor?: string;
  style?: CSSProperties;
  pupilSize?: number;
  follow?: boolean;
}

function Eyes({
  open = true,
  eyeLayout = 'unfriendly',
  animationTime = 0.75,
  width = 200,
  irisColor = '#333',
  eyeBallColor = 'white',
  pupilColor = 'black',
  style = {},
  pupilSize = 1,
  follow = true,
}: EyesProps) {
  if (typeof pupilSize !== 'number') throw new Error('pupilSize must be a number');
  if (pupilSize < 0 || pupilSize > 2) throw new Error('pupilSize must be between 0 and 2');

  let eyeVariant: EyeLayout;
  if (typeof eyeLayout === 'string') {
    eyeVariant = eyeLayoutVariants[eyeLayout];
  } else {
    eyeVariant = {
      ...eyeLayoutVariants.unfriendly,
      ...eyeLayout,
    };
  }

  const { left, right, pupil } = eyeVariant;

  const containerStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    width: `${width}px`,
    ...style,
  };

  return (
    <div style={containerStyles}>
      <Eye
        open={open}
        width={(width / 10) * 4.5}
        animationTime={animationTime}
        openedClipPath={left.opened}
        closedClipPath={left.closed}
        irisColor={irisColor}
        eyeBallColor={eyeBallColor}
        pupilColor={pupilColor}
        pupilSize={pupilSize}
        follow={follow}
        pupilCoords={pupil}
      />
      <Eye
        open={open}
        width={(width / 10) * 4.5}
        animationTime={animationTime}
        openedClipPath={right.opened}
        closedClipPath={right.closed}
        irisColor={irisColor}
        eyeBallColor={eyeBallColor}
        pupilColor={pupilColor}
        pupilSize={pupilSize}
        follow={follow}
        pupilCoords={pupil}
      />
    </div>
  );
}

export { Eyes };
