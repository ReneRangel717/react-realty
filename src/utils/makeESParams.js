import { SEARCH_API_PATH } from 'constants/api';
export const DEFAULT_SIZE = 30;

const queryMaker = {
  match: (field, value) => ({
    [field]: { query: value, operator: 'and' }
  }),
  range: (field, gte = 0, lte = 0) => ({
    [field]: { gte, lte }
  }),
  term: (field, value) => ({
    [field]: value
  }),
  geo_bounding_box: (field, bounds) => ({
    [field]: {
      top_left: {
        lat: bounds[0],
        lon: bounds[1]
      },
      bottom_right: {
        lat: bounds[2],
        lon: bounds[3]
      }
    }
  })
};

const filterType = {
  query: 'match',
  price: 'range',
  type: 'term',
  location: 'geo_bounding_box'
};

/**
 * @param { String } params.city
 * @param { Array[4] } params.bounds
 */
export default function makeESParams(params) {
  const postBody = {
    query: {
      bool: {
        must: [],
        filter: []
      }
    }
  };

  Object.keys(params).forEach((field) => {
    if (!filterType[field]) {
      console.error(`Query maker not found for ${field}`);
      return;
    }
    const value = params[field];
    const type = filterType[field];
    const query = {
      [type]: queryMaker[type](field, value)
    };

    if (field === 'query') {
      postBody.query.bool.must.push(query);
    } else {
      postBody.query.bool.filter.push(query);
    }
  });

  return {
    apiPath: `${SEARCH_API_PATH}?size=${DEFAULT_SIZE}`,
    payload: {
      method: 'POST',
      body: JSON.stringify(postBody)
    }
  };
}
