import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import _ from 'lodash';

import actions from 'modules/Search/redux/actions';
import selectors from 'modules/Search/redux/selectors';

class SearchBox extends Component {
  _onSearchChange = (e, value) => {
    const { setFilter, filters } = this.props;

    if (filters.get('query') !== value) {
      setFilter('query', value);
    }
  }

  _renderOption = (property) => {
    const { address } = property;
    return <span>{address}</span>;
  }

  render() {
    const { searching, properties } = this.props;
    const onSearchChange = _.debounce(this._onSearchChange, 500);
    const options = properties.toJS().map((property) => ({
      key: property._id,
      text: property.address,
      value: property._id,
      content: this._renderOption(property)
    }));
    return (
      <Dropdown
        search
        selection
        fluid
        minCharacters={0}
        icon="search"
        placeholder="Search..."
        options={options}
        onSearchChange={onSearchChange}
        disabled={searching}
        loading={searching}
      />
    );
  }
}

SearchBox.propTypes = {
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

export default connect(mapStatesToProps, mapDispatchToProps)(SearchBox);
