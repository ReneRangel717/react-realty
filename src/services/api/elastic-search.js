import 'isomorphic-fetch';
import config from 'config';

import { SEARCH_API_PROXY_ROOT } from 'constants/api';

const normalizers = {
  properties: (property) => {
    const { _source, ...otherProps } = property;
    const { location } = _source;
    const [lat, lng] = location.split(',');
    return {
      ...otherProps,
      ..._source,
      lat: lat * 1,
      lng: lng * 1
    };
  },
  default: (item) => {
    const { _source, ...otherProps } = item;
    return {
      ...otherProps,
      ..._source
    };
  },
};

function normalize(result) {
  return (result || []).map((item) => {
    const normalizer = normalizers[item._index] || normalizers.default;
    return normalizer(item);
  });
}

// @TODO handle ES error more properly
function callESApi(endpoint, payload) {
  let fullUrl = (endpoint.indexOf(SEARCH_API_PROXY_ROOT) === -1) ? `${SEARCH_API_PROXY_ROOT}/${endpoint}` : endpoint;

  // If request comes from server side, call API url directly.
  if (__SERVER__) {
    fullUrl = (endpoint.indexOf(config.esApiBaseUrl) === -1) ? `${config.esApiBaseUrl}/${endpoint}` : endpoint;
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
export const fetchESResult = (url, payload) => callESApi(url, payload);
