import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import GoogleMap from 'google-map-react';

import { customDistanceToMouse } from 'modules/PropertySearch/utils';
import actions from 'modules/PropertySearch/redux/actions';
import selectors from 'modules/PropertySearch/redux/selectors';

// @TODO move these constants to configuration
const K_MARGIN_TOP = 30;
const K_MARGIN_RIGHT = 30;
const K_MARGIN_BOTTOM = 30;
const K_MARGIN_LEFT = 30;
const K_HOVER_DISTANCE = 30;

class PropertyMap extends Component {
  _onBoundsChange = (center, zoom, bounds, marginBounds) => {
    this.props.mapBoundsChange({ center, zoom, bounds, marginBounds });
  }

  // @TODO implement child events for markers
  _onChildClick = (key, childProps) => {
    console.log(key, childProps);
  };

  _onChildMouseEnter = (key, childProps) => {
    console.log(key, childProps);
  };

  _onChildMouseLeave = (key, childProps) => {
    console.log(key, childProps);
  };

  _distanceToMouse = customDistanceToMouse

  render() {
    const { zoom, center } = this.props;
    return (
      <GoogleMap
        center={center}
        zoom={zoom}
        onBoundsChange={this._onBoundsChange}
        onChildClick={this._onChildClick}
        onChildMouseEnter={this._onChildMouseEnter}
        onChildMouseLeave={this._onChildMouseLeave}
        distanceToMouse={this._distanceToMouse}
        margin={[K_MARGIN_TOP, K_MARGIN_RIGHT, K_MARGIN_BOTTOM, K_MARGIN_LEFT]}
        hoverDistance={K_HOVER_DISTANCE}
      >
        {}
      </GoogleMap>
    );
  }
}

PropertyMap.propTypes = {
  zoom: PropTypes.number,
  center: PropTypes.any,
  mapBoundsChange: PropTypes.func,
  mapToggleBrief: PropTypes.func,
  mapToggleInfobox: PropTypes.func
};

const mapStatesToProps = (state) => ({
  zoom: selectors.selectMapInfo(state).get('zoom'),
  center: selectors.selectMapInfo(state).get('center').toJS(),
});

const mapDispatchToProps = (dispatch) => ({
  mapBoundsChange: (params) => dispatch(actions.mapBoundsChange(params)),
  mapToggleBrief: (markerIndex) => dispatch(actions.mapToggleBrief(markerIndex)),
  mapToggleInfobox: (markerIndex) => dispatch(actions.mapToggleInfobox(markerIndex))
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertyMap);
