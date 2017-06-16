import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  App,
  NotFound
} from 'containers';

export default () => {
  const routes = (
    <Route path="/" component={App}>
      <IndexRoute component={NotFound} />
      <Route path="/404" component={NotFound} />
      <Route path="*" component={NotFound} />
    </Route>
  );
  return routes;
};
