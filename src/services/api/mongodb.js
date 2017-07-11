import 'isomorphic-fetch';
import queryString from 'query-string';
import config from 'config';
import { MONGO_API_PATH } from 'constants/api';

export function callMongoAPI(endpoint, queryObj = {}) {
  const query = queryString.stringify(queryObj);
  let fullUrl = `${MONGO_API_PATH}/${endpoint}?${query}`;
  if (__SERVER__) {
    fullUrl = (fullUrl.indexOf(config.apiBaseUrl) === -1) ? `${config.apiBaseUrl}${fullUrl}` : fullUrl;
  }

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return json;
    })
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Something bad happened.' })
    );
}
