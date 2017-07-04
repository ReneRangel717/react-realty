import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import PropertyMap from './components/PropertyMap';
import PropertyTable from './components/PropertyTable';
import actions from './redux/actions';
import styles from './styles.scss';

class PropertySearch extends Component {
  render() {
    const mapClassName = cx(styles.mapContainer, 'mapContainer'); // mapContainer is used to determine size with jQuery
    return (
      <div className={styles.container}>
        <div className={mapClassName}>
          <PropertyMap />
        </div>
        <div className={styles.tableContainer}>
          <PropertyTable />
        </div>
      </div>
    );
  }
}

PropertySearch.propTypes = {
  esPropertySearchRequest: PropTypes.func.isRequired,
};

const mapStatesToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  esPropertySearchRequest: () => dispatch(actions.esPropertySearchRequest()),
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertySearch);
