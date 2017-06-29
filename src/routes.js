import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  Layout,
  NotFound
} from 'containers';
import {
  HomePage,
  PropertySearch,
  PropertyDetail
} from './modules/pages';

export default () => {
  const routes = (
    <Route path="/" component={Layout}>
      <IndexRoute component={HomePage} />
      <Route path="s">
        <Route path=":city">
          <IndexRoute component={PropertySearch} />
          <Route path=":property" component={PropertyDetail} />
        </Route>
      </Route>
      <Route path="/404" component={NotFound} />
      <Route path="*" component={NotFound} />
    </Route>
  );
  return routes;
};
