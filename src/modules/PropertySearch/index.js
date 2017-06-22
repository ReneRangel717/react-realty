import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';

import PropertyMap from './components/PropertyMap';
import PropertyTable from './components/PropertyTable';
import actions from './redux/actions';
import {
  // propertySearchRequest as propertySearchRequestSaga,
  googlePlaceSearchRequest as googlePlaceSaga
} from './redux/saga';
import styles from './styles.scss';

class PropertySearch extends Component {
  componentWillMount() {
    // @TODO handle when city is wrong
    this.props.propertySearchRequest();
    this.props.googlePlaceSearchRequest(this.props.params.city);
  }

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

// [propertySearchRequestSaga, {}],
PropertySearch.preload = (params) => ([
  [googlePlaceSaga, { place: params.city }]
]);

PropertySearch.propTypes = {
  propertySearchRequest: PropTypes.func.isRequired,
  googlePlaceSearchRequest: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

const mapStatesToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  propertySearchRequest: () => dispatch(actions.propertySearchRequest()),
  googlePlaceSearchRequest: (place) => dispatch(actions.googlePlaceSearchRequest(place))
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertySearch);
