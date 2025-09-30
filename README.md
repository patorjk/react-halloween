# react-halloween

This is a repo with some fun Halloween-themed components.
It was made to support the Halloween section of [patrickgillespie.com](https://patrickgillespie.com).
If you scroll to the bottom of that page, you can see the Haunted and Eyes components in-action.
You can see the LightsOut component on the Halloween Houses page, and the MagicalText
component in the app's title bar.

Currently this library is still in a 0.\* version, so its APIs may change.
However, I feel pretty confident in what I have now, so I don't anticipate any huge changes.

## Install

motion is a peer-dependency.

```
  npm install motion react-halloween
```

## Demo

### Storybook

To see a storybook, which contains demos of all of the components do the following: Clone the repo, install the deps,
and then run the storybook.

```
  npm ci
  npm run storybook
```

## Components

### &lt;DoomFire />

A fire effect. This component accepts the following props:

|        Name        | Type     | Default                 | Description                                                           |
| :----------------: | :------- | :---------------------- | :-------------------------------------------------------------------- |
|    **`height`**    | number   | 300                     | Height of the canvas containing the fire.                             |
|    **`width`**     | number   | 400                     | Width of the canvas containing the fire.                              |
|  **`pixelSize`**   | number   | 1                       | How big a pixel should be in the output. Larger means more pixelated. |
|  **`fireColors`**  | string[] | A default set of colors | Array of CSS color values.                                            |
| **`fireEnabled`**  | boolean  | true                    | CSS color for the iris.                                               |
| **`fireStrength`** | number   | 0.75                    | Number between 0 and 1, represents the "strength" of the fire.        |

### &lt;Eyes />

A set of eyes which open and close and follow the cursor. This component accepts the following props:

|        Name         | Type             | Default      | Description                                                                                                                                                                                                                                                |
| :-----------------: | :--------------- | :----------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`animationTime`** | number           | 0.75         | Time it takes for the eyes to open or close in seconds.                                                                                                                                                                                                    |
| **`eyeBallColor`**  | string           | "white"      | CSS color for the eyeball.                                                                                                                                                                                                                                 |
|   **`eyeLayout`**   | string or object | 'unfriendly' | Defines the shape of the eye. Either a string representing a preset ("unfriendly", "menacing", "neutral"), or an object defining the details. [See here](https://github.com/patorjk/react-halloween/blob/main/src/components/Eyes/Eyes.jsx) for more info. |
|    **`follow`**     | boolean          | true         | If the eyes should follow the cursor.                                                                                                                                                                                                                      |
|   **`irisColor`**   | string           | "#333"       | CSS color for the iris.                                                                                                                                                                                                                                    |
|     **`open`**      | boolean          | true         | Indicates if the eyes are open.                                                                                                                                                                                                                            |
|     **`style`**     | object           | {}           | Style props to spread onto the container.                                                                                                                                                                                                                  |
|  **`pupilColor`**   | string           | "white"      | CSS color for the pupil.                                                                                                                                                                                                                                   |
|   **`pupilSize`**   | number           | 1            | Number between 0 and 2, representing the pupil size.                                                                                                                                                                                                       |
|     **`width`**     | number           | 200          | The width of the component. The underlying SVGs will size themselves depending on this.                                                                                                                                                                    |

### &lt;Eye />

An eye which can open and close and can follow the cursor.
This component accepts the following props:

|         Name         | Type    | Default                              | Description                                     |
| :------------------: | :------ | :----------------------------------- | :---------------------------------------------- |
| **`animationTime`**  | number  | 0.75                                 | Time it takes the eye to open or close.         |
| **`closedClipPath`** | string  | 'M 0 4 C 3 4 7 4 10 4 C 7 4 3 4 0 4' | Clip path for a closed eye.                     |
|  **`eyeBallColor`**  | string  | 'white'                              | CSS color of the eye.                           |
|     **`follow`**     | boolean | true                                 | If the eye should follow the cursor.            |
|   **`irisColor`**    | string  | '#333'                               | CSS color of the iris.                          |
|      **`open`**      | boolean | true                                 | Indicates if the eye is open.                   |
| **`openedClipPath`** | string  | 'M 0 4 C 3 7 7 7 10 4 C 7 1 3 1 0 4' | Clip path for an opened eye.                    |
|   **`pupilColor`**   | string  | 'black'                              | CSS color of the pupil.                         |
|  **`pupilCoords`**   | object  | {cx:5,cy:4}                          | The coordinates of the pupil.                   |
|   **`pupilSize`**    | number  | 1                                    | Pupil size. Should be a number between 0 and 2. |
|     **`width`**      | number  | 50                                   | Width of the eye.                               |

### &lt;Haunted />

A container which creatures (by default ghosts) will fly out of and which will glow when the cursor is hovered over it.
This component accepts the following props:

|                Name                 | Type      | Default                                                                                             | Description                                                       |
| :---------------------------------: | :-------- | :-------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
|           **`Creature`**            | component | [see here](https://github.com/patorjk/react-halloween/blob/main/src/stories/Haunted.stories.jsx)    | Prop for overriding the creature that flies out of the container. |
|        **`creatureOptions`**        | object    | [see here](https://github.com/patorjk/react-halloween/blob/main/src/components/Haunted/Haunted.jsx) | Options for the creatures that fly out of the container.          |
| **`creatureOptions.animationTime`** | number    | 1.5                                                                                                 | Fly-out time in seconds.                                          |
|   **`creatureOptions.numberOf`**    | number    | 6                                                                                                   | Number of creatures/ghosts to fly out.                            |
|   **`creatureOptions.distance`**    | number    | 200                                                                                                 | Distance creature should travel in pixels.                        |
|    **`creatureOptions.repeat`**     | boolean   | true                                                                                                | false if you only want creatures to come out once.                |
|  **`creatureOptions.dimensions`**   | object    | { width: 44, height: 44 }                                                                           | The height and width of the creature/ghost.                       |
|          **`disableFun`**           | boolean   | false                                                                                               | true to turn off the effects.                                     |
|          **`glowOptions`**          | object    | [see here](https://github.com/patorjk/react-halloween/blob/main/src/components/Haunted/Haunted.jsx) | Options for the glow effect.                                      |
|   **`glowOptions.animationTime`**   | number    | 3                                                                                                   | Duration of glow in seconds.                                      |
|   **`glowOptions.boxShadowOff`**    | string    | "0px 0px 0px rgba(255,0,0,0)"                                                                       | Box-shadow value when at glow lowest point.                       |
|    **`glowOptions.boxShadowOn`**    | string    | "0px 0px 40px rgba(255,0,0,1)"                                                                      | Box-shadow value when at glow highest point.                      |
|             **`style`**             | object    | {}                                                                                                  | Style props to spread over the container.                         |

### &lt;LightsOut />

Puts a website into darkness and creates a spotlight around the mouse. This should not be used for mobile/touch devices.
This component accepts the following props:

|           Name            | Type     | Default           | Description                                     |
| :-----------------------: | :------- | :---------------- | :---------------------------------------------- |
|        **`size`**         | number   | 300               | Size of the spotlight around the mouse.         |
|      **`darkColor`**      | string   | 'rgba(0,0,0,0.9)' | Color of the backdrop.                          |
| **`clickToTurnOnLights`** | boolean  | false             | true to turn off the effects.                   |
|   **`onLightsOnStart`**   | function | undefined         | Callback executed when lights start to turn on  |
|    **`onLightsOnEnd`**    | function | undefined         | Callback executed when lights finish turning on |
|       **`zIndex`**        | number   | 100000            | z-index of overlay                              |

### &lt;MagicalText />

Not your granddaddy's color faded text, this component creates a gradient that moves and has (optional) sparkles or
other adornments (such as ghosts or hearts). Initial idea was inspired by
a [Hyperplexed](https://www.youtube.com/watch?v=yu0Cm4BqQv0) video.
The adornments which appear around the text are simple SVG components. This library
contains several which can be used with this component. You can see what these
look like [here](https://github.com/patorjk/react-halloween/tree/main/src/components/svgs).

This component accepts the following props:

|                 Name                 | Type                       | Default                  | Description                                                                     |
| :----------------------------------: | :------------------------- | :----------------------- | :------------------------------------------------------------------------------ |
|              **`text`**              | string                     | ''                       | The text to display.                                                            |
|         **`animationTime`**          | number                     | 10                       | Length of the fade animation in seconds.                                        |
|             **`colors`**             | Array<String>              | ['darkorange', 'purple'] | Array of CSS colors to fade.                                                    |
|            **`fadeText`**            | boolean                    | true                     | true if text should be color faded, false otherwise.                            |
|           **`disableFun`**           | boolean                    | false                    | true to disable fade and adornment effects.                                     |
|             **`style`**              | object                     | {}                       | Style props to spread over the container.                                       |
|           **`Adornment`**            | Component                  | StarCrossSVG             | Component to use as the adornment. Several come from the library. See examples. |
|         **`showAdornments`**         | boolean                    | true                     | If the adornments/sparkles should be shown.                                     |
|        **`adornmentOptions`**        | Object                     |                          | Options to customize the adornment.                                             |
| **`adornmentOptions.animationType`** | One of: 'sparkle', 'scale' | 'sparkle'                | How the adornment will be animated.                                             |
|     **`adornmentOptions.width`**     | number                     | 16                       | Width of adornment.                                                             |
|    **`adornmentOptions.height`**     | number                     | 16                       | Height of adornment.                                                            |
|    **`adornmentOptions.opacity`**    | number                     | 0.7                      | Opacity of adornment.                                                           |
|   **`adornmentOptions.duration`**    | number                     | 1                        | Duration of adornment in seconds.                                               |
|   **`adornmentOptions.numberOf`**    | number                     | 3                        | Number of adornments.                                                           |
