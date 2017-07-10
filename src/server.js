import Express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import favicon from 'serve-favicon';
import compression from 'compression';
import http from 'http';
import proxy from 'express-http-proxy';
import path from 'path';
import url from 'url';
import request from 'request';
import queryString from 'query-string';
import _ from 'lodash';
import { match, createMemoryHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import mongoose from 'mongoose';

import config from './config';
import configureStore from './redux/store/configureStore';
import Html from './helpers/Html';
import getRoutes from './routes';
import waitAll from './redux/sagas/waitAll';
import { selectLocationState } from './redux/selectors';
import { GOOGLE_PLACE_API_PATH } from './constants/api';
import mongoDBRoutes from './api/routes';
import { Root } from 'containers';

const app = new Express();
const server = new http.Server(app);

mongoose.Promise = global.Promise;

// mongodb connection
mongoose.connect(config.mongoUrl, (err) => {
  if (err) {
    console.error('Please check your MongoDB connection parameters');
    throw err;
  }

  console.log('Connected to MongoDB');
});

// disable `X-Powered-By` HTTP header
app.disable('x-powered-by');

app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));
app.use(Express.static(path.join(__dirname, '..', 'static')));

// mongodb API
app.use('/api', mongoDBRoutes);

// Proxy to API
app.use('/es-api', proxy(config.esApiBaseUrl, {
  // eslint-disable-next-line
  forwardPath: (req, res) => url.parse(req.url).path
}));

app.use('/google-place-api', (req, res) => {
  const query = queryString.stringify({
    key: config.googlePlaceAPIKey,
    ...req.query
  });
  request(`${GOOGLE_PLACE_API_PATH}?${query}`, (error, response, body) => {
    if (error) {
      return res.status(500).send(error);
    }

    return res.json(JSON.parse(body));
  });
});

app.use((req, res) => {
  if (__DEVELOPMENT__) {
    webpackIsomorphicTools.refresh();
  }

  const memoryHistory = createMemoryHistory(req.url);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store, {
    selectLocationState
  });
  // generate filter state
  if (req.url.indexOf('/home') === 0) {
    // only pick available filters
    const filters = _.pick(req.query, 'type', 'location', 'query', 'price');
    Object.keys(filters).forEach((filterName) => {
      const filter = filters[filterName];
      store.dispatch({ type: 'search/set_filter', filterName, filter });
    });
  }
  const allRoutes = getRoutes(store);
  const assets = webpackIsomorphicTools.assets();

  function hydrateOnClient() {
    const htmlComponent = <Html assets={assets} store={store} />;
    const renderedDomString = ReactDOMServer.renderToString(htmlComponent);
    res.send(`<!doctype html>\n ${renderedDomString}`);
  }

  if (__DISABLE_SSR__) {
    hydrateOnClient();
    return;
  }

  match({ history, routes: allRoutes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (redirectLocation) {
      res.redirect(redirectLocation.pathname + redirectLocation.search);
    } else if (error) {
      console.error('ROUTER ERROR:', error);
      res.status(500);
      hydrateOnClient();
    } else if (renderProps) {
      const rootComponent = (<Root
        store={store}
        routes={allRoutes}
        history={history}
        renderProps={renderProps}
        type="server"
      />);

      const preloaders = renderProps.components
      .filter((component) => component && component.preload)
      .map((component) => component.preload(renderProps.params, req))
      .reduce((result, preloader) => result.concat(preloader), []);

      const runTasks = store.runSaga(waitAll(preloaders));

      runTasks.done.then(() => {
        global.navigator = { userAgent: req.headers['user-agent'] };

        const htmlComponent = <Html assets={assets} component={rootComponent} store={store} />;
        const renderedDomString = ReactDOMServer.renderToString(htmlComponent);
        res.status(200).send(`<!doctype html>\n ${renderedDomString}`);
      }).catch((e) => {
        console.log(e.stack);
      });

      store.close();
    } else {
      res.status(404).send('Not found');
    }
  });
});

if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.error(err);
    }
    console.info('==> 💻  Open http://%s:%s in a browser to view the app.', config.host, config.port);
  });
} else {
  console.error('==>     ERROR: No PORT environment variable has been specified');
}
