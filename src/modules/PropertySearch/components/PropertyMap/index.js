import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import GoogleMap from 'google-map-react';
import immutable from 'immutable';

import PropertyMarker from 'modules/PropertySearch/components/PropertyMarker';
import actions from 'modules/PropertySearch/redux/actions';
import selectors from 'modules/PropertySearch/redux/selectors';

const customData = immutable.fromJS([{
  _id: '123',
  lat: 60.138043,
  lng: 30.237157,
  price: 203000,
  remarks: 'Nice 1 bed 1.5 bath top floor unit with wood laminate flooring in the living area, an updated kitchen...',
  images: ['img_18231432409428673.jpg']
}, {
  _id: '124',
  lat: 59.934280,
  lng: 30.335099,
  price: 1203000,
  remarks: 'Great 1 bed 1.5 bath top floor unit with wood laminate flooring in the living area, an updated kitchen...',
  images: ['img_18231432409428673.jpg']
}, {
  _id: '125',
  lat: 60.338043,
  lng: 29.835157,
  price: 2300000,
  remarks: 'Awesome 1 bed 1.5 bath top floor unit with wood laminate flooring in the living area, an updated kitchen...',
  images: ['img_18231432409428673.jpg']
}]);

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
    const { zoom, center } = this.props;
    return (
      <GoogleMap
        center={center}
        zoom={zoom}
        onBoundsChange={this._onBoundsChange}
      >
        {
          // @TODO load marekrs from redux
          customData.map((marker) => this.renderMarker(marker))
        }
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
