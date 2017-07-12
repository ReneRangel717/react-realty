import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Menu, Button } from 'semantic-ui-react';

import SearchInput from 'modules/Search/components/SearchInput';
import PriceFilter from 'modules/Search/components/PriceFilter';
import TypeFilter from 'modules/Search/components/TypeFilter';
import actions from 'modules/Search/redux/actions';
import selectors from 'modules/Search/redux/selectors';
import styles from './styles.scss';

class SearchToolBar extends Component {
  render() {
    return (
      <Grid>
        <Grid.Row only="computer tablet" as={Menu} className={styles.gridRow}>
          <Menu.Item>
            <SearchInput />
          </Menu.Item>
          <Menu.Item>
            <PriceFilter />
          </Menu.Item>
          <Menu.Item>
            <TypeFilter />
          </Menu.Item>
        </Grid.Row>
        <Grid.Row only="mobile" as={Menu} className={styles.gridRow}>
          <Menu.Item>
            <Button>Filters</Button>
          </Menu.Item>
          <Menu.Item position="right">
            <Button.Group>
              <Button onClick={() => this.props.toggleSidebar(false)}>Map</Button>
              <Button.Or />
              <Button positive onClick={() => this.props.toggleSidebar(true)}>List</Button>
            </Button.Group>
          </Menu.Item>
        </Grid.Row>
      </Grid>
    );
  }
}

SearchToolBar.propTypes = {
  filters: PropTypes.any,
  setFilter: PropTypes.func.isRequired,
  toggleSidebar: PropTypes.func.isRequired
};

const mapStatesToProps = (state) => ({
  filters: selectors.selectFilters(state),
});

const mapDispatchToProps = (dispatch) => ({
  toggleSidebar: (value) => dispatch(actions.toggleSidebar(value)),
  setFilter: (filterName, filter) => dispatch(actions.setFilter(filterName, filter)),
});

export default connect(mapStatesToProps, mapDispatchToProps)(SearchToolBar);
