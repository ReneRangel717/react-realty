import { SEARCH_API_PATH } from 'constants/api';
export const DEFAULT_SIZE = 30;

const queryMaker = {
  match: (field, value) => ({
    [field]: { query: value, operator: 'and' }
  }),
  range: (field, value) => {
    const query = {};
    if (value[0]) query.gte = value[0];
    if (value[1]) query.lte = value[1];
    return {
      [field]: query
    };
  },
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
  address: 'match',
  price: 'range',
  type: 'term',
  sqft: 'range',
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
    const value = params[field];
    const type = filterType[field];

    if (!type) {
      console.error(`Query maker not found for ${field}`);
      return;
    }

    if (!value) {
      return;
    }

    if (Array.isArray(value) && !value.length) {
      return;
    }

    const query = {
      [type]: queryMaker[type](field, value)
    };

    if (field === 'address') {
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
