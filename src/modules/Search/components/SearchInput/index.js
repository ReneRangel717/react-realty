import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';
import { push } from 'react-router-redux';
import { getImageUrl, getDisplayPrice, getCommunityImageUrl } from 'utils';
import actions from 'modules/Search/redux/actions';
import selectors from 'modules/Search/redux/selectors';

import {
  PROPERTY_RESULT_LIMIT,
  CITY_RESULT_LIMIT,
  COMMUNITY_RESULT_LIMIT
} from 'constants/api';

class SearchInput extends Component {
  _onSearchChange = (e, value) => {
    const { setFilter, filters, esCitySearchRequest, esCommunitySearchRequest } = this.props;

    if (filters.get('query') !== value) {
      setFilter('query', value);
      esCitySearchRequest();
      esCommunitySearchRequest();
    }
  }

  _onResultSelect = (e, value) => {
    switch (value.type) {
      case 'city':
        this.props.setFilter('query', '', true);
        this.props.googlePlaceCitySearchRequest(value.title);
        break;
      case 'community':
        this.props.setFilter('query', '', true);
        this.props.googlePlaceCommunitySearchRequest(value.title, value.address);
        break;
      case 'property':
        this.props.dispatch(push(`/s/${value.url}`));
        break;
      default:
    }
  }

  _getResults = (cities, communities, properties) => {
    const result = {};
    const cityResult = cities.map((city) => ({
      title: `${city.city}, ${city.state}`,
      id: city._id,
      type: 'city'
    })).slice(0, CITY_RESULT_LIMIT);

    const communityResult = communities.map((community) => ({
      title: community.community,
      id: community._id,
      image: getCommunityImageUrl(community.image),
      type: 'community',
      address: `${community.city}, ${community.state}`
    })).slice(0, COMMUNITY_RESULT_LIMIT);

    const propertyResult = properties.map((property) => ({
      title: property.address,
      image: getImageUrl(property._id, 1, 'sm'),
      id: property._id,
      price: getDisplayPrice(property.price),
      type: 'property',
      url: property.url
    })).slice(0, PROPERTY_RESULT_LIMIT);

    if (cityResult.length) {
      result.cities = {
        name: 'City',
        results: cityResult
      };
    }

    if (communityResult.length) {
      result.communities = {
        name: 'Community',
        results: communityResult
      };
    }

    if (propertyResult.length) {
      result.properties = {
        name: 'Property',
        results: propertyResult
      };
    }

    return result;
  };

  render() {
    const { searching, cities, properties, communities, filters } = this.props;
    const onSearchChange = _.debounce(this._onSearchChange, 100);

    // experimental search usage
    const results = this._getResults(cities.toJS(), communities.toJS(), properties.toJS());

    return (
      <Search
        category
        defaultValue={filters.get('query')}
        results={results}
        onSearchChange={onSearchChange}
        onResultSelect={this._onResultSelect}
        loading={searching}
      />
    );
  }
}

SearchInput.propTypes = {
  searching: PropTypes.bool.isRequired,
  properties: PropTypes.any,
  cities: PropTypes.any,
  communities: PropTypes.any,
  filters: PropTypes.any,
  setFilter: PropTypes.func.isRequired,
  esCitySearchRequest: PropTypes.func.isRequired,
  esCommunitySearchRequest: PropTypes.func.isRequired,
  googlePlaceCitySearchRequest: PropTypes.func.isRequired,
  googlePlaceCommunitySearchRequest: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStatesToProps = (state) => ({
  filters: selectors.selectFilters(state),
  searching: selectors.selectSearching(state),
  properties: selectors.selectProperties(state),
  cities: selectors.selectCities(state),
  communities: selectors.selectCommunities(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  setFilter: (filterName, filter) => dispatch(actions.setFilter(filterName, filter)),
  esCitySearchRequest: () => dispatch(actions.esCitySearchRequest()),
  esCommunitySearchRequest: () => dispatch(actions.esCommunitySearchRequest()),
  googlePlaceCitySearchRequest: (city) => dispatch(actions.googlePlaceCitySearchRequest(city)),
  googlePlaceCommunitySearchRequest: (community, address) => dispatch(actions.googlePlaceCommunitySearchRequest(community, address)),
});

export default connect(mapStatesToProps, mapDispatchToProps)(SearchInput);
