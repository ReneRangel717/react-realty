import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import GoogleMap from 'google-map-react';

import PropertyMarker from 'modules/Search/components/PropertyMarker';
import actions from 'modules/Search/redux/actions';
import selectors from 'modules/Search/redux/selectors';

class PropertyMap extends Component {
  _onBoundsChange = (center, zoom, bounds, marginBounds) => {
    this.props.mapBoundsChange({ center, zoom, bounds, marginBounds });
    this.props.setFilter('location', bounds);
  }

  renderMarker = (marker) => {
    const id = marker.get('_id');
    return (
      <PropertyMarker
        key={id}
        id={id}
        data={marker}
        lat={marker.get('lat')}
        lng={marker.get('lng')}
      />
    );
  }

  render() {
    const { zoom, center, markers } = this.props;
    return (
      <GoogleMap
        apiKey={process.env.GOOGLE_MAP_KEY}
        center={center}
        zoom={zoom}
        resetBoundsOnResize
        onBoundsChange={this._onBoundsChange}
      >
        {
          markers.map((marker) => this.renderMarker(marker))
        }
      </GoogleMap>
    );
  }
}

PropertyMap.propTypes = {
  zoom: PropTypes.number,
  center: PropTypes.any,
  markers: PropTypes.any.isRequired,
  mapBoundsChange: PropTypes.func,
  setFilter: PropTypes.func,
};

const mapStatesToProps = (state) => ({
  zoom: selectors.selectMapInfo(state).get('zoom'),
  center: selectors.selectMapInfo(state).get('center').toJS(),
  markers: selectors.selectProperties(state)
});

const mapDispatchToProps = (dispatch) => ({
  mapBoundsChange: (params) => dispatch(actions.mapBoundsChange(params)),
  setFilter: (filterName, filter) => dispatch(actions.setFilter(filterName, filter)),
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertyMap);
