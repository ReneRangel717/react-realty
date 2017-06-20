import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import GoogleMap from 'google-map-react';

import PropertyMarker from 'modules/PropertySearch/components/PropertyMarker';
import actions from 'modules/PropertySearch/redux/actions';
import selectors from 'modules/PropertySearch/redux/selectors';

class PropertyMap extends Component {
  _onBoundsChange = (center, zoom, bounds, marginBounds) => {
    this.props.mapBoundsChange({ center, zoom, bounds, marginBounds });
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
    const { zoom, center, filteredMarkers } = this.props;
    return (
      <GoogleMap
        apiKey={process.env.GOOGLE_MAP_KEY}
        center={center}
        zoom={zoom}
        onBoundsChange={this._onBoundsChange}
      >
        {
          // @TODO load marekrs from redux
          filteredMarkers.map((marker) => this.renderMarker(marker))
        }
      </GoogleMap>
    );
  }
}

PropertyMap.propTypes = {
  zoom: PropTypes.number,
  center: PropTypes.any,
  filteredMarkers: PropTypes.any.isRequired,
  mapBoundsChange: PropTypes.func,
};

const mapStatesToProps = (state) => ({
  zoom: selectors.selectMapInfo(state).get('zoom'),
  center: selectors.selectMapInfo(state).get('center').toJS(),
  filteredMarkers: selectors.selectFilteredMarkers(state)
});

const mapDispatchToProps = (dispatch) => ({
  mapBoundsChange: (params) => dispatch(actions.mapBoundsChange(params)),
});

export default connect(mapStatesToProps, mapDispatchToProps)(PropertyMap);
