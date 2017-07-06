import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

import { getMapSize } from 'utils';
import PropertyMarker from 'modules/Search/components/PropertyMarker';
import actions from 'modules/Search/redux/actions';
import selectors from 'modules/Search/redux/selectors';

class PropertyMap extends Component {
  constructor(props) {
    super(props);
    this.firstRender = true;
  }

  _onBoundsChange = (center, zoom, bounds) => {
    const { location: locationImmutable } = this.props;
    const location = locationImmutable && locationImmutable.toJS();
    if (this.firstRender && location && location.length) {
      // on first render, relocate the map to filter
      this.firstRender = false;
      const size = getMapSize();
      const newBounds = {
        nw: { lat: location[0], lng: location[1] },
        se: { lat: location[2], lng: location[3] }
      };
      const result = fitBounds(newBounds, size);
      this.props.mapBoundsChange({ center: result.center, zoom: result.zoom });
    } else {
      this.props.mapBoundsChange({ center, zoom });
      this.props.setFilter('location', bounds.slice(0, 4));
    }
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
  location: PropTypes.any,
};

const mapStatesToProps = (state) => ({
  zoom: selectors.selectMapInfo(state).get('zoom'),
  center: selectors.selectMapInfo(state).get('center').toJS(),
  location: selectors.selectFilters(state).get('location'),
  markers: selectors.selectProperties(state)
});

const mapDispatchToProps = (dispatch) => ({
  mapBoundsChange: (params) => dispatch(actions.mapBoundsChange(params)),
  setFilter: (filterName, filter) => dispatch(actions.setFilter(filterName, filter)),
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertyMap);
