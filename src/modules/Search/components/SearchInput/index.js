import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';
import { push } from 'react-router-redux';
import { getImageUrl, getDisplayPrice } from 'utils';
import { getSlug } from 'utils/slug';
import actions from 'modules/Search/redux/actions';
import selectors from 'modules/Search/redux/selectors';

import {
  PROPERTY_RESULT_LIMIT,
  CITY_RESULT_LIMIT,
  COMMUNITY_RESULT_LIMIT,
  AGENT_RESULT_LIMIT
} from 'constants/api';

class SearchInput extends Component {
  _onSearchChange = (e, value) => {
    const { setFilter, filters, esCitySearchRequest, esCommunitySearchRequest, esAgentSearchRequest } = this.props;

    if (filters.get('query') !== value) {
      setFilter('query', value);
      esCitySearchRequest();
      esCommunitySearchRequest();
      esAgentSearchRequest();
    }
  }

  _onResultSelect = (e, value) => {
    switch (value.type) {
      case 'city':
        this.props.setFilter('query', '', true);
        this.props.googlePlaceCitySearchRequest(value.title);
        break;
      case 'community':
        this.props.dispatch(push(`/${getSlug(value.city)}/${getSlug(value.title)}`));
        this.props.setFilter('query', '', true);
        break;
      case 'property':
        this.props.dispatch(push(`/${value.url}`));
        break;
      case 'agent':
        this.props.dispatch(push(`/realtors/${value.id}`));
        break;
      default:
    }
  }

  _getResults = (cities, communities, agents, properties) => {
    const result = {};
    const cityResult = cities.map((city) => ({
      title: `${city.city}, ${city.state}`,
      id: city._id,
      type: 'city'
    })).slice(0, CITY_RESULT_LIMIT);

    const communityResult = communities.map((community) => ({
      title: community.community,
      id: community._id,
      image: getImageUrl(`community_images/${community.image}`, 'original', ''),
      type: 'community',
      city: community.city,
      address: `${community.city}, ${community.state}`
    })).slice(0, COMMUNITY_RESULT_LIMIT);

    const propertyResult = properties.map((property) => ({
      title: property.address,
      image: getImageUrl(`${property._id}-1`, 'sm'),
      id: property._id,
      price: getDisplayPrice(property.price),
      type: 'property',
      url: property.url
    })).slice(0, PROPERTY_RESULT_LIMIT);

    const agentResult = agents.map((agent) => ({
      title: agent.name,
      id: agent.user,
      type: 'agent',
      image: getImageUrl(`agents/${agent.user}`, [100, 100], 'png')
    })).slice(0, AGENT_RESULT_LIMIT);


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

    if (agentResult.length) {
      result.agents = {
        name: 'Agent',
        results: agentResult
      };
    }

    return result;
  };

  render() {
    const { searching, cities, properties, communities, filters, agents } = this.props;
    const onSearchChange = _.debounce(this._onSearchChange, 100);

    // experimental search usage
    const results = this._getResults(cities.toJS(), communities.toJS(), agents.toJS(), properties.toJS());

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
  agents: PropTypes.any,
  filters: PropTypes.any,
  setFilter: PropTypes.func.isRequired,
  esCitySearchRequest: PropTypes.func.isRequired,
  esCommunitySearchRequest: PropTypes.func.isRequired,
  esAgentSearchRequest: PropTypes.func.isRequired,
  googlePlaceCitySearchRequest: PropTypes.func.isRequired,
  googlePlaceCommunitySearchRequest: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired
};

const mapStatesToProps = (state) => ({
  filters: selectors.selectFilters(state),
  searching: selectors.selectSearching(state),
  properties: selectors.selectProperties(state),
  cities: selectors.selectCities(state),
  communities: selectors.selectCommunities(state),
  agents: selectors.selectAgents(state)
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  setFilter: (filterName, filter) => dispatch(actions.setFilter(filterName, filter)),
  esCitySearchRequest: () => dispatch(actions.esCitySearchRequest()),
  esCommunitySearchRequest: () => dispatch(actions.esCommunitySearchRequest()),
  esAgentSearchRequest: () => dispatch(actions.esAgentSearchRequest()),
  googlePlaceCitySearchRequest: (city) => dispatch(actions.googlePlaceCitySearchRequest(city)),
  googlePlaceCommunitySearchRequest: (community, address) => dispatch(actions.googlePlaceCommunitySearchRequest(community, address)),
});

export default connect(mapStatesToProps, mapDispatchToProps)(SearchInput);
