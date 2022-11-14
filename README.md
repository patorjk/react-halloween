# react-halloween

This is a repo with some fun Halloween-themed components. Currently its still in a 0.\* version so its APIs may change as I flesh things out.

## Install

```
  npm install framer-motion
  npm install react-halloween
```

## Demo

### Storybook

To see a storybook, which contains demos of all of the components do the following: Clone the repo, install the deps, and then run the storybook.

```
  npm ci
  npm run storybook
```

## Components

### &lt;Eyes />

A set of eyes which open and close and follow the cursor. This component accepts the following props:

|        Name         | Type             | Default      | Description                                                                                                                                                                                                                                     |
| :-----------------: | :--------------- | :----------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`animationTime`** | number           | 0.75         | Time it takes for the eyes to open or close in seconds.                                                                                                                                                                                         |
| **`eyeBallColor`**  | string           | "white"      | CSS color for the eyeball.                                                                                                                                                                                                                      |
|   **`eyeLayout`**   | string or object | 'unfriendly' | Defines the shape of the eye. Either a string representing a preset ("unfriendly", "menacing"), or an object defining the details. [See here](https://github.com/patorjk/react-halloween/blob/main/src/components/Eyes/Eyes.jsx) for more info. |
|    **`follow`**     | boolean          | true         | If the eyes should follow the cursor.                                                                                                                                                                                                           |
|   **`irisColor`**   | string           | "#333"       | CSS color for the iris.                                                                                                                                                                                                                         |
|     **`open`**      | boolean          | true         | Indicates if the eyes are open.                                                                                                                                                                                                                 |
|     **`style`**     | object           | {}           | Style props to spread onto the container.                                                                                                                                                                                                       |
|  **`pupilColor`**   | string           | "white"      | CSS color for the pupil.                                                                                                                                                                                                                        |
|   **`pupilSize`**   | number           | 1            | Number between 0 and 2, representing the pupil size.                                                                                                                                                                                            |
|     **`width`**     | number           | 200          | The width of the component. The underlying SVGs will size themselves depending on this.                                                                                                                                                         |

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

|         Name          | Type      | Default                                                                                             | Description                                                       |
| :-------------------: | :-------- | :-------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
|    **`Creature`**     | component | [see here](https://github.com/patorjk/react-halloween/blob/main/src/stories/Haunted.stories.jsx)    | Prop for overriding the creature that flies out of the container. |
| **`creatureOptions`** | object    | [see here](https://github.com/patorjk/react-halloween/blob/main/src/components/Haunted/Haunted.jsx) | Options for the creatures that fly out of the container.          |
|   **`disableFun`**    | boolean   | false                                                                                               | true to turn off the effects.                                     |
|   **`glowOptions`**   | object    | [see here](https://github.com/patorjk/react-halloween/blob/main/src/components/Haunted/Haunted.jsx) | Options for the glow effect.                                      |
|      **`style`**      | object    | {}                                                                                                  | Style props to spread over the container.                         |
