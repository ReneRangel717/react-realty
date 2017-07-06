import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Search } from 'semantic-ui-react';
import _ from 'lodash';
import { getImageUrl, getDisplayPrice } from 'utils';

import actions from 'modules/Search/redux/actions';
import selectors from 'modules/Search/redux/selectors';

class SearchInput extends Component {
  _onSearchChange = (e, value) => {
    const { setFilter, filters } = this.props;

    if (filters.get('query') !== value) {
      setFilter('query', value);
    }
  }

  render() {
    const { searching, properties, filters } = this.props;
    const onSearchChange = _.debounce(this._onSearchChange, 500);

    // experimental search usage
    const options = properties.toJS().map((property) => ({
      title: property.address,
      image: getImageUrl(property._id, 1, 'sm'),
      id: property._id,
      price: getDisplayPrice(property.price)
    })).slice(0, 5);

    return (
      <Search
        defaultValue={filters.get('query')}
        results={options}
        onSearchChange={onSearchChange}
        loading={searching}
      />
    );
  }
}

SearchInput.propTypes = {
  searching: PropTypes.bool.isRequired,
  properties: PropTypes.any,
  filters: PropTypes.any,
  setFilter: PropTypes.func.isRequired,
  esPropertySearchRequest: PropTypes.func.isRequired
};

const mapStatesToProps = (state) => ({
  filters: selectors.selectFilters(state),
  searching: selectors.selectSearching(state),
  properties: selectors.selectProperties(state)
});

const mapDispatchToProps = (dispatch) => ({
  setFilter: (filterName, filter) => dispatch(actions.setFilter(filterName, filter)),
  esPropertySearchRequest: () => dispatch(actions.esPropertySearchRequest()),
});

export default connect(mapStatesToProps, mapDispatchToProps)(SearchInput);
