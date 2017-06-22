import 'isomorphic-fetch';
import queryString from 'query-string';
import config from 'config';

import { GOOGLE_PLACE_API_PATH } from 'constants/api';

function normalize(results) {
  const { name, formatted_address, geometry } = results[0];
  return {
    address: formatted_address,
    name,
    geometry
  };
}

export function callGooglePlaceAPI(place) {
  const query = queryString.stringify({
    query: `${place} USA`, // only search in USA for now!
  });
  let fullUrl = `/google-place-api?${query}`;
  if (__SERVER__) {
    fullUrl = `${GOOGLE_PLACE_API_PATH}?${query}&key=${config.googlePlaceAPIKey}`;
  }

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok || (json.status !== 'OK') || !json.results || !json.results.length) {
        return Promise.reject(json);
      }

      return normalize(json.results);
    })
    .then(
      response => ({ response }),
      error => ({ error: error.message || 'Something bad happened.' })
    );
}
