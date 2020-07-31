<h1 align="center">Frontend-monorepo</h1>

<p align="center">The monorepo for developing components and web pages for CRM and Hopsctoch main site</p>

<p align="center">
  <a aria-label="made with lerna" href="https://lerna.js.org/">
    <img alt="" src="https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg">
  </a>
  <a aria-label="Size" href ="https://github.com/rtiwarihs/frontend-monorepo">
    <img src="https://img.shields.io/github/size/webcaetano/craft/build/phaser-craft.min.js.svg">
  </a>
  <a aria-label="last commit" href="https://github.com/rtiwarihs/frontend-monorepo/commits/master">
    <img alt="" src="https://img.shields.io/github/last-commit/primer/css.svg">
  </a>
  <a href="https://github.com/storybooks/storybook" target="_blank"><img src="https://raw.githubusercontent.com/storybooks/brand/master/badge/badge-storybook.svg"></a>

</p>

## Node version

Use node version 12

## Packages

The Repo is a collection of these packages, which can be composed together on demand:

| Package             | Description                                |
| ------------------- | ------------------------------------------ |
| [@hs/ui-components] | React components Library for building SPAs |
| [@hs/stores]        | State management with Redux                |
| [@hs/services]      | Server-side Api calls                      |
| <a  href ="https://github.com/rtiwarihs/frontend-monorepo/tree/master/packages/icons"><img src="https://img.shields.io/badge/Package-@hs/icons-ED54A4"></a>        | App Icons                     |
| [web-apps]          | Microfrontend Apps using packages          |

##

[@hs/ui-components]: https://github.com/rtiwarihs/frontend-monorepo/tree/master/packages/react-lib/ui-components
[@hs/stores]: https://github.com/rtiwarihs/frontend-monorepo/tree/master/packages/stores
[@hs/services]: https://github.com/rtiwarihs/frontend-monorepo/tree/master/packages/services
[web-apps]: https://github.com/rtiwarihs/frontend-monorepo/tree/master/web-apps


## Usage

To run all the packages <a href="https://lerna.js.org/">lerna</a> should be installed globally.
After lerna install follow below commands

```sh
// To install package dependencies  
lerna bootstrap

// To start debugging all the packages 
lerna start

```
## React cheatsheet
> If you’re new to TypeScript and React, checkout [this handy cheatsheet](https://github.com/sw-yx/react-typescript-cheatsheet/)
