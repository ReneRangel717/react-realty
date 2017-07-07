import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';

import PROPERTY_TYPE from 'constants/property-type';
import actions from 'modules/Search/redux/actions';
import selectors from 'modules/Search/redux/selectors';

const options = Object.keys(PROPERTY_TYPE).map((type) => ({
  key: type,
  text: type,
  value: PROPERTY_TYPE[type]
}));

class TypeFilter extends Component {
  _onSelectionChange = (e, data) => {
    const { filters, setFilter } = this.props;
    const type = filters.get('type');
    if (type !== data.value) {
      setFilter('type', data.value);
    }
  }

  render() {
    const { filters } = this.props;
    const type = filters.get('type');
    return (
      <Dropdown
        selection
        compact
        defaultValue={type}
        placeholder="Type"
        options={options}
        onChange={this._onSelectionChange}
      />
    );
  }
}

TypeFilter.propTypes = {
  filters: PropTypes.any,
  setFilter: PropTypes.func.isRequired,
};

const mapStatesToProps = (state) => ({
  filters: selectors.selectFilters(state),
});

const mapDispatchToProps = (dispatch) => ({
  setFilter: (filterName, filter) => dispatch(actions.setFilter(filterName, filter)),
});

export default connect(mapStatesToProps, mapDispatchToProps)(TypeFilter);
