import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';

import SearchInput from 'modules/Search/components/SearchInput';
import PriceFilter from 'modules/Search/components/PriceFilter';
import TypeFilter from 'modules/Search/components/TypeFilter';
import actions from 'modules/Search/redux/actions';
import selectors from 'modules/Search/redux/selectors';

class SearchToolBar extends Component {
  render() {
    return (
      <Menu>
        <Menu.Item>
          <SearchInput />
        </Menu.Item>
        <Menu.Item>
          <PriceFilter />
        </Menu.Item>
        <Menu.Item>
          <TypeFilter />
        </Menu.Item>
      </Menu>
    );
  }
}

SearchToolBar.propTypes = {
  filters: PropTypes.any,
  setFilter: PropTypes.func.isRequired,
};

const mapStatesToProps = (state) => ({
  filters: selectors.selectFilters(state),
});

const mapDispatchToProps = (dispatch) => ({
  setFilter: (filterName, filter) => dispatch(actions.setFilter(filterName, filter)),
});

export default connect(mapStatesToProps, mapDispatchToProps)(SearchToolBar);
