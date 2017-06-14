
## Getting Started

`$ git clone git@bitbucket.org:drewnick/react-realty.git`

`$ cd react-universal-saga && npm install`

`$ npm run dev` (run in development mode)

Live Dev Site: [dev.palmettopark.com](https://dev.palmettopark.com)

## Deployment

`$ npm run build`

`$ npm run start`

## Features

* [Universal](https://medium.com/@mjackson/universal-javascript-4761051b7ae9) rendering, with Client and Server Side Data Fetching
* [React](https://github.com/facebook/react) - latest version `^15.4.2`
* [Redux](https://github.com/rackt/redux)'s futuristic [Flux](https://facebook.github.io/react/blog/2014/05/06/flux.html) implementation
* [Redux Saga](https://github.com/yelouafi/redux-saga) to handle all of your Side Effects logic in a central place
* [React Router](https://github.com/ReactTraining/react-router/tree/v2.8.1)
* [Express](http://expressjs.com)
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Webpack](http://webpack.github.io) for bundling
* [Webpack Dev Middleware](http://webpack.github.io/docs/webpack-dev-middleware.html)
* [Webpack Hot Middleware](https://github.com/glenjamin/webpack-hot-middleware)
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools) for next generation DX (developer experience). Watch [Dan Abramov's talk](https://www.youtube.com/watch?v=xsSnOQynTHs).
* [ESLint](http://eslint.org) to maintain a consistent code style
* [redux-form](https://github.com/erikras/redux-form) to manage form state in Redux
* [PostCSS](https://github.com/postcss/postcss-loader), [style-loader](https://github.com/webpack/style-loader), [sass-loader](https://github.com/jtangelder/sass-loader) and [less-loader](https://github.com/webpack/less-loader) to allow import of stylesheets in plain css, sass and less,
* [bootstrap-loader](https://github.com/shakacode/bootstrap-loader) and [font-awesome-webpack](https://github.com/gowravshekar/font-awesome-webpack) to customize Bootstrap and FontAwesome
* [react-helmet](https://github.com/nfl/react-helmet) to manage title and meta tag information on both server and client
* [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) to allow require() work for statics both on client and server
* [Jest](https://facebook.github.io/jest/) to allow writing unit tests for the project.
* Refer to `package.json` for more details

## How Everything Works?

What initially gets run is `bin/server.js`, which does little more than enable ES6 and ES7 awesomeness in the
server-side node code. It then initiates `server.js`. In `server.js` we perform data fetching using Redux Saga ([details](https://github.com/yelouafi/redux-saga/issues/13#ref-commit-3e8321c)). Aside from serving the favicon and static content from `/static`, the only thing `server.js` does is initiate delegate rendering to `react-router`. At the bottom of `server.js`, we listen to port `3000` and initiate the API server.

### Routing and HTML return

The primary section of `server.js` generates an HTML page with the contents returned by `react-router`. Then we perform [server-side data fetching](#server-side-data-fetching), wait for the data to be loaded, and render the page with the now-fully-loaded `redux` state.

The last interesting bit of the main routing section of `server.js` is that we swap in the hashed script and css from the `webpack-assets.json` that the Webpack Dev Server – or the Webpack build process on production – has spit out on its last run. You won't have to deal with `webpack-assets.json` manually because [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) take care of that.

We also spit out the `redux` state into a global `window.__data` variable in the webpage to be loaded by the client-side `redux` code.

### Server-side Data Fetching

The [redux-saga](https://github.com/yelouafi/redux-saga) provides a mechanism for server-side data fetching from the actual backend API servers/services, when it reaches client-side (React) there is no need to do additional network call. You have to define the Sagas that a container need (refers to `containers/UserPage.js > UserPage.preload` for example) for server-side to fetch. PS: You have the flexibility to implement additional logic (e.g. handle authentication) when fetching data at server-side rendering stage, as it differs from client-side.

### Client Side

The client side entry point is reasonably named `client.js`. All it does is load the routes, initiate `react-router`, rehydrate the redux state from the `window.__data` passed in from the server, and render the page over top of the server-rendered DOM. This makes React enable all its event listeners without having to re-render the DOM.

### Redux Middleware

Currently, we only use Saga Middleware and Logger Middleware (for development). If you need to use or add custom middlewares, you can do so by modifying `store/configureStore.dev.js` (for dev env) or `store/configureStore.prod.js` (for prod env).

### Unit Tests

The project uses [Jest](https://facebook.github.io/jest) to run your unit tests and the [Test Utilities](http://facebook.github.io/react/docs/test-utils.html) from Facebook api.

An example is available at `components > User`.

To run the tests in the project, just simply run `npm test`.

## Styling

### Local Styles

This project uses [local styles](https://medium.com/seek-ui-engineering/the-end-of-global-css-90d2a4a06284) using [css-loader](https://github.com/webpack/css-loader). The way it works is that you import your stylesheet at the top of the `render()` function in your React Component, and then you use the classnames returned from that import. Like so:

`render() { const styles = require('./App.scss'); }`

Then you set the `className` of your element to match one of the CSS classes in your SCSS file, and you're good to go!

`<div className={styles.mySection}> ... </div>`

### Global Style Variables

`react-universal-saga` support global style variables by defining the variable in `theme/style.scss`. Once defined, you can use in any scss file so long it is imported (refer to `RepoPage.scss` for example).
