import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { push } from 'react-router-redux';

import PropertyMap from './components/PropertyMap';
import PropertyTable from './components/PropertyTable';
import actions from './redux/actions';
//   propertySearchRequest as propertySearchRequestSaga,
//   googlePlaceSearchRequest as googlePlaceSaga
// } from './redux/saga';
import styles from './styles.scss';

class PropertySearch extends Component {
  componentWillMount() {
    if (!this.props.params.city) {
      this.props.dispatch(push('/404'));
      return;
    }

    this.props.setCity(this.props.params.city);
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

// no need for server side fetch for below atm
// [propertySearchRequestSaga, {}],
// [googlePlaceSaga, { place: params.city }]
// PropertySearch.preload = (params) => ([
// ]);

PropertySearch.propTypes = {
  propertySearchRequest: PropTypes.func.isRequired,
  googlePlaceSearchRequest: PropTypes.func.isRequired,
  setCity: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired
};

const mapStatesToProps = () => ({
});

const mapDispatchToProps = (dispatch) => ({
  dispatch,
  setCity: (city) => dispatch(actions.setCity(city)),
  propertySearchRequest: () => dispatch(actions.propertySearchRequest()),
  googlePlaceSearchRequest: (place) => dispatch(actions.googlePlaceSearchRequest(place))
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertySearch);
