import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import PropertyMap from './components/PropertyMap';
import PropertyTable from './components/PropertyTable';
import actions from './redux/actions';
import { propertySearchRequest as propertySearchRequestSaga } from './redux/saga';
import styles from './styles.scss';

class PropertySearch extends Component {
  componentWillMount() {
    this.props.propertySearchRequest();
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.mapContainer}>
          <PropertyMap />
        </div>
        <div className={styles.tableContainer}>
          <PropertyTable />
        </div>
      </div>
    );
  }
}

PropertySearch.preload = (params) => {
  console.log(params);
  return [
    [propertySearchRequestSaga, {}]
  ];
};

PropertySearch.propTypes = {
  propertySearchRequest: PropTypes.func.isRequired,
};

const mapStatesToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  propertySearchRequest: () => dispatch(actions.propertySearchRequest())
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertySearch);
