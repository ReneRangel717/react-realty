import React from 'react';
import { IndexRoute, Route } from 'react-router';
import {
  Layout,
  NotFound,
  CommunityOrProperty
} from 'containers';
import {
  HomePage,
  Search,
  PropertySearch,
  AgentDetail
} from './modules/pages';

export default () => {
  const routes = (
    <Route path="/" component={Layout}>
      <IndexRoute component={HomePage} />
      <Route path="/home" component={Search} />
      <Route path="/realtors">
        <Route path=":username" component={AgentDetail} />
      </Route>
      <Route path="/:city">
        <IndexRoute component={PropertySearch} />
        <Route path=":slug" component={CommunityOrProperty} />
      </Route>
      <Route path="/404" component={NotFound} />
      <Route path="*" component={NotFound} />
    </Route>
  );
  return routes;
};
