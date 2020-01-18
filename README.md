# Gable

A modular UI pattern system.

## Overview

Currently a work in progress, Gable collects a whole bunch of UI patterns and CSS library code that I’ve used on many different apps and websites over the past few years, often copy/pasted between projects. I wanted one place to put it and a clean way to install it.

It doesn’t currently include JavaScript or React implementations but it might in future.

## Install

```
npm install gable
```

## Importing Styles

### Compiled CSS

Import production-ready compiled CSS from the `bundle` path.

Assuming a JavaScript build pipeline in place (eg: `style-loader` and `css-loader` in Webpack), you can bundle the full set of Gable styles using the following import at your app’s entry point:

```js
import "gable/bundle/gable.css";
```

### Source Sass

For projects using Sass, you can import the source files directly:

```scss
@import "~gable/foundation";
@import "~gable/components/breadcrumbs";
```
