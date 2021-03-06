import { createStore, applyMiddleware, compose } from 'redux';
import { fromJS } from 'immutable';
// import { createLogger } from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';
import { routerMiddleware } from 'react-router-redux';
import DevTools from 'containers/DevTools/DevTools';
import rootReducer from '../reducers';

export default function configureStore(history, initialState) {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    fromJS(initialState),
    compose(
      applyMiddleware(
        routerMiddleware(history),
        sagaMiddleware,
        // createLogger()
      ),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      //eslint-disable-next-line
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);
  return store;
}
