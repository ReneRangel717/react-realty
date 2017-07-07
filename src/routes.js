import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  Layout,
  NotFound
} from 'containers';
import {
  HomePage,
  Search,
  PropertySearch,
  PropertyDetail,
  AgentDetail
} from './modules/pages';

export default () => {
  const routes = (
    <Route path="/" component={Layout}>
      <IndexRoute component={HomePage} />
      <Route path="home" component={Search} />
      <Route path="s">
        <Route path=":city">
          <IndexRoute component={PropertySearch} />
          <Route path=":property" component={PropertyDetail} />
        </Route>
      </Route>
      <Route path="realtors">
        <Route path=":agent" component={AgentDetail} />
      </Route>
      <Route path="/404" component={NotFound} />
      <Route path="*" component={NotFound} />
    </Route>
  );
  return routes;
};
