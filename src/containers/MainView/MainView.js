import React, { PropTypes, Component } from 'react';
import shouldPureComponentUpdate from 'react-pure-render/function';

import MainViewLayout from './MainViewLayout';
import PropertyMap from '../../components/PropertyMap';
import { Connector, bindActionCreators } from 'redux';

import * as allMapActions from '../../actions/mapActions';

// slice actions to support map and table interfaces
const mapActions = (({ changeBounds: onBoundsChange, markerHoverIndexChange: onMarkerHover, showBallon: onChildClick }) => ({
  onBoundsChange, onMarkerHover, onChildClick
}))(allMapActions);

export default class MainView extends Component {
  static propTypes = {
    layout: PropTypes.string
  };

  shouldComponentUpdate = shouldPureComponentUpdate;

  _renderMap() {
    return (
      <Connector
        select={state => ({
          center: state.map.get('mapInfo').get('center'),
          zoom: state.map.get('mapInfo').get('zoom'),
          markers: state.map.get('dataFiltered'),
          visibleRowFirst: state.map.get('tableRowsInfo').get('visibleRowFirst'),
          visibleRowLast: state.map.get('tableRowsInfo').get('visibleRowLast'),
          maxVisibleRows: state.map.get('tableRowsInfo').get('maxVisibleRows'),
          hoveredRowIndex: state.map.get('tableRowsInfo').get('hoveredRowIndex'),
          openBallonIndex: state.map.get('openBalloonIndex')
        })}
      >
        {({ dispatch, ...mapProps }) => (<PropertyMap {...mapProps} {...bindActionCreators(mapActions, dispatch)} />)}
      </Connector>
    );
  }

  render() {
    return (
      <MainViewLayout layout={this.props.layout} renderMap={this._renderMap} />
    );
  }
}
