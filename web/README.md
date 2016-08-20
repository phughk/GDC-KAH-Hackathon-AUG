# React Fluorine Boilerplate

## About

This is a simple boilerplate to get you started with React and [Fluorine](https://fluorinejs.org/).

It comes preconfigured with:

- Babel
- React
- React Router
- Fluorine
- Webpack
- ESLint

This is not the complete package for your project, but it should give a great compromise, so that
it gets easy to extend on.

## Getting Started

First thing you want to do is installing the npm dependencies: `npm install`.

Next thing in case you've cloned this repository is removing the git directory: `rm -R .git`.

To start up the local server run `npm start` and go to `localhost:3000`.

## Production Build

Building your app should be a simple: `npm run build`.
After that the `www/` folder will hold your production ready code.

## Adding assets

All files inside the `assets/` folder will be copied to `www/` before starting a build or local server.
Thus you need to either restart the build if you've changed something or run: `npm run copy`.

## Tips and Tricks

**Empty for now**

