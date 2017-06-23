import { SEARCH_API_PATH } from 'constants/api';
export const DEFAULT_SIZE = 30;

/**
 * @param { String } params.city
 * @param { Array[4] } params.bounds
 */
export default function makeESParams(params) {
  const { bounds } = params;
  const postBody = {
    query: {
      bool: {
        must: {
          match_all: {}
        },
        filter: {
          geo_bounding_box: {
            location: {
              top_left: {
                lat: bounds[0],
                lon: bounds[1]
              },
              bottom_right: {
                lat: bounds[2],
                lon: bounds[3]
              }
            }
          }
        } // end of filter
      }
    }
  };

  return {
    apiPath: `${SEARCH_API_PATH}?size=${DEFAULT_SIZE}`,
    payload: {
      method: 'POST',
      body: JSON.stringify(postBody)
    }
  };
}
