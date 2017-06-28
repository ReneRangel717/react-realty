import 'isomorphic-fetch';
import config from 'config';

import { MONGO_API_PATH } from 'constants/api';

// @TODO update normalize or remove it
function normalize(result) {
  return result;
}

function callAPI(endpoint, payload) {
  let fullUrl = (endpoint.indexOf(MONGO_API_PATH) === -1) ? `${MONGO_API_PATH}/${endpoint}` : endpoint;

  // If request comes from server side, call API url directly.
  if (__SERVER__) {
    fullUrl = (endpoint.indexOf(config.dbApiBaseUrl) === -1) ? `${config.dbApiBaseUrl}/${endpoint}` : endpoint;
  }

  return fetch(fullUrl, payload)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return Object.assign(
        {},
        { data: normalize(json) },
      );
    })
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Something bad happened.' })
    );
}

// api services
export const fetchPropertyDetail = (url, payload) => callAPI(url, payload);
