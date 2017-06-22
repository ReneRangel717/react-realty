import 'isomorphic-fetch';
import config from 'config';

import { SEARCH_API_PROXY_ROOT } from 'constants/api';

function normalize(result) {
  return (result || []).map((property) => {
    const { _source, ...otherProps } = property;
    const { location } = _source;
    const [lat, lng] = location.split(',');
    return {
      ...otherProps,
      ..._source,
      lat: lat * 1,
      lng: lng * 1
    };
  });
}

// @TODO handle ES error more properly
function callESApi(endpoint, payload) {
  let fullUrl = (endpoint.indexOf(SEARCH_API_PROXY_ROOT) === -1) ? `${SEARCH_API_PROXY_ROOT}/${endpoint}` : endpoint;

  // If request comes from server side, call API url directly.
  if (__SERVER__) {
    fullUrl = (endpoint.indexOf(config.apiBaseUrl) === -1) ? `${config.apiBaseUrl}/${endpoint}` : endpoint;
  }

  return fetch(fullUrl, payload)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok || !json.hits || !json.hits.hits) {
        return Promise.reject(json);
      }

      return Object.assign(
        {},
        { data: normalize(json.hits.hits) },
        { total: json.hits.total }
      );
    })
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Something bad happened.' })
    );
}

// api services
export const fetchProperties = (url, payload) => callESApi(url, payload);
