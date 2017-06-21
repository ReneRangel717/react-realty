import 'isomorphic-fetch';
import config from 'config';

// @TODO move this over to config
const PROXY_ROOT = '/api';

function normalize(result) {
  return (result || []).map((property) => {
    const { _source, ...otherProps } = property;
    return {
      ...otherProps,
      ..._source
    };
  });
}

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
function callApi(endpoint, payload) {
  let fullUrl = (endpoint.indexOf(PROXY_ROOT) === -1) ? `${PROXY_ROOT}/${endpoint}` : endpoint;

  // If request comes from server side, call API url directly.
  if (__SERVER__) {
    fullUrl = (endpoint.indexOf(config.apiBaseUrl) === -1)
                  ? `${config.apiBaseUrl}/${endpoint}` : endpoint;
    console.log(fullUrl);
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

// We use this Normalizr schemas to transform API responses from a nested form
// to a flat form where repos and users are placed in `entities`, and nested
// JSON objects are replaced with their IDs. This is very convenient for
// consumption by reducers, because we can easily build a normalized tree
// and keep it updated as we fetch more data.

// Read more about Normalizr: https://github.com/paularmstrong/normalizr

// api services
export const fetchProperties = (url, payload) => callApi(url, payload);
