<h1 align="center">
  Icon Library
  <a  href ="/">
  <img src="https://img.shields.io/badge/Package-@hs/icons-ED54A4"> 
  </a>
</h1>

<p align="center"> Icons for CRM and Hopsctoch main site</p>

<p align="center">
   <a  href ="https://tsdx.io/">
  <img src="https://img.shields.io/badge/ScaffoldWith-TSDX-007ACC"> 
  </a>
    <a  href ="https://react-svgr.com/">
  <img src="https://img.shields.io/badge/MadeWith-SVGR-ED54A4"> 
  </a>
  <a aria-label="Size" href ="https://github.com/rtiwarihs/frontend-monorepo">
    <img src="https://img.shields.io/github/size/webcaetano/craft/build/phaser-craft.min.js.svg">
  </a>
  <a aria-label="last commit" href="https://github.com/rtiwarihs/frontend-monorepo/commits/master">
    <img alt="" src="https://img.shields.io/github/last-commit/primer/css.svg">
  </a>
</p>

# Icon User Guide

## Commands

To run/debug  Icon library

The recommended workflow is to run below in one terminal:

```bash
yarn start
```

This builds to `/dist` and runs the project in watch mode so any edits you save inside `src` causes a rebuild to `/dist`.


The compoenent using icon imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above.

To do a one-off build, use  `yarn build`.

## Usage

Install the package in your project or other package directory with:

```sh
lerna add @hs/icons --scope=yourmodule

```

## Configuration

### Rollup

TSDX uses [Rollup v1.x](https://rollupjs.org) as a bundler and generates multiple rollup configs for various module formats and build settings. See [Optimizations](#optimizations) for details.

### TypeScript

`tsconfig.json` is set up to interpret `dom` and `esnext` types, as well as `react` for `jsx`. Adjust according to your needs.

## Optimizations

Please see the main `tsdx` [optimizations docs](https://github.com/palmerhq/tsdx#optimizations). In particular, know that you can take advantage of development-only optimizations:

```js
// ./types/index.d.ts
declare var __DEV__: boolean;

// inside your code...
if (__DEV__) {
  console.log('foo');
}
```

You can also choose to install and use [invariant](https://github.com/palmerhq/tsdx#invariant) and [warning](https://github.com/palmerhq/tsdx#warning) functions.

## Module Formats

CJS, ESModules, and UMD module formats are supported.

The appropriate paths are configured in `package.json` and `dist/index.js` accordingly. Please report if any issues are found.

The default example imports and live reloads whatever is in `/dist`, so if you are seeing an out of date component, make sure TSDX is running in watch mode like we recommend above. **No symlinking required**!


## Named Exports

[always use named exports.](https://github.com/palmerhq/typescript#exports) Code split inside your React app instead of your React library.
