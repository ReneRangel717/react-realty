import React from 'react';
import { render } from 'react-dom';
import GoogleAnalytics from 'react-ga';
import { syncHistoryWithStore } from 'react-router-redux';

import { Root } from 'containers';
import getRoutes from './routes';
import { history } from './services';
import rootSaga from './redux/sagas';
import configureStore from './redux/store/configureStore';
import config from './config';

const dest = document.getElementById('content');
const store = configureStore(history, window.__data); // eslint-disable-line
const syncedHistory = syncHistoryWithStore(history, store);

GoogleAnalytics.initialize(config.app.googleAnalytics.appId);
store.runSaga(rootSaga);

render(
  <Root
    store={store}
    history={syncedHistory}
    routes={getRoutes(store)}
  />,
  dest
);

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger
}
