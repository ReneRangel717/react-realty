import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  Layout,
  NotFound
} from 'containers';
import {
  PropertySearch
} from './modules/pages';

export default () => {
  const routes = (
    <Route path="/" component={Layout}>
      <IndexRoute component={PropertySearch} />
      <Route path="/404" component={NotFound} />
      <Route path="*" component={NotFound} />
    </Route>
  );
  return routes;
};
