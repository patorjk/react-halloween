# react-halloween

This is a repo with some fun Halloween-themed components. Currently its still in a 0.* version so its APIs may change as I flesh things out.

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

|Name|Type|Default|Description
|:--:|:-----|:--|:-----|
|**`open`**|boolean|true|Indicates if the eyes are open
|**`variant`**|number or object `{leftOpened,leftClosed,rightOpened,rightClosed}`|0|There are preset variants that determine the eye shape. If you enter a number it will use one of those, or you can pass in an object which defines the clip paths for the eye shape. 
|**`animationTime`**|number|1.5|Time it takes for the eyes to open or close in seconds.
|**`width`**|number|200|The width of the component. The underlying SVGs will size themselves depending on this.
|**`irisColor`**|string|"#333"|CSS color for the iris.
|**`eyeBallColor`**|string|"white"|CSS color for the eyeball.
|**`pupilColor`**|string|"white"|CSS color for the pupil.
|**`pupilSize`**|number|1|Number between 0 and 2, representing the pupil size.
|**`style`**|object|{}|Style props to spread onto the container.
|**`follow`**|boolean|true|If the eyes should follow the cursor.

### &lt;Haunted />

A container which ghost will fly out of and which will glow when the cursor is hovered over it.
This component accepts the following props:

|Name|Type|Default|Description
|:--:|:-----|:--|:-----|
|**`glowOptions`**|object|{animationTime: 3, boxShadowOff: '0px 0px 0px rgba(255,0,0,0)', boxShadowOn: '0px 0px 40px rgba(255,0,0,1)'}|Options for the glow effect.
